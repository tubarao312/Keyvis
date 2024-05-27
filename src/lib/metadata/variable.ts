'use server'

import { Prisma, Variable, DropdownOption, Tag } from '@prisma/client'
import prisma from '@/lib/prisma'

import { revalidateTag, unstable_cache } from 'next/cache'
import { writeConfigs } from '@/lib/redis/writeConfigs'
import { Types, BadgeColor } from './types'

// Has all the information about a variable but also the tags and options
export type VariableExt = Variable & {
  tags: Tag[]
  options: DropdownOption[]
}

/* 
    VARIABLE CRUD OPERATIONS
*/

/**
 * Validate the type of the variable based on the value and type combination
 * @param value - the value of the variable
 * @param type - the type of the variable
 *
 * @return - a boolean value indicating if the variable type is valid
 */
function validateVariableType(value: string, type: string) {
  // Type can only be present in enumerate
  if (type && !Object.values(Types).includes(type as Types)) {
    throw new Error('Invalid variable type')
  }

  switch (type) {
    case Types.INTEGER:
      return !isNaN(parseInt(value))
    case Types.FLOAT:
      return !isNaN(parseFloat(value))
    default:
      return true
  }
}

/**
 * Create a new variable and saves it in redis
 *
 * @param name - the name of the variable
 * @param description - the description of the variable
 * @param value - the value of the variable
 * @param defaultValue - the default value of the variable
 * @param type - the type of the variable
 * @param selector - the selector of the variable
 *
 * @return - the created variable object
 */
export const createVariable = async ({
  name,
  description,
  value,
  defaultValue,
  type,
  selector,
}: Prisma.VariableCreateInput) => {
  if (!validateVariableType(value as string, type as Types)) {
    throw new Error('Invalid value for variable type')
  }

  try {
    const res = await prisma.variable.create({
      data: {
        name,
        description,
        value,
        defaultValue,
        type,
        selector,
        history: {
          create: {
            value,
          },
        },
      },
    })

    // Revalidate the cache
    revalidateTag('variable')

    // Write redis
    writeConfigs(name, value, type)

    return res
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw new Error('Variable with that name already exists')
      }
    }
  }
}

/**
 * Get a variable by its ID and caches it using the specified tag+id combination
 * @param id - the ID of the variable
 *
 * @return - the variable object
 */
export const getVariable = unstable_cache(
  async ({
    id,
  }: Prisma.VariableWhereUniqueInput): Promise<VariableExt | null> => {
    return (await prisma.variable.findUnique({
      where: { id },
      include: {
        tags: true,
        options: true,
      },
    })) as VariableExt | null
  },
  ['variable'],
  { tags: ['variable'] },
)

/**
 * Get all variables and cache them using the specified tag
 *
 * @return - an array of variable objects
 */
export const getVariables = unstable_cache(
  async (): Promise<VariableExt[]> => {
    return (await prisma.variable.findMany({
      include: {
        tags: true,
        options: true,
      },
    })) as VariableExt[] | []
  },
  ['variable'],
  { tags: ['variable'] },
)

/**
 * Update the variable with the specified ID and update the value in redis
 *
 * @param id - the ID of the variable
 * @param name - the name of the variable
 * @param description - the description of the variable
 * @param value - the value of the variable
 * @param type - the type of the variable
 * @param selector - the selector of the variable
 * @param alias - the alias of the variable
 *
 * @return - the updated variable object
 */
export const updateVariable = async ({
  id,
  name,
  description,
  value,
  type,
  selector,
  alias,
}: Prisma.VariableUpdateInput) => {
  if (!id) {
    throw new Error('ID is required')
  }

  // Validate if the variable type and value are correct
  if (!validateVariableType(value as string, type as Types)) {
    throw new Error(`Invalid value (${value}) for variable type ${type}`)
  }

  console.log(`Updating variable ${id} with name ${name} and alias ${alias}`)

  // If no value is present then just update variable
  const res = await prisma.variable.update({
    where: { id: id as string },
    data: { name, description, type, selector, alias },
  })

  // Else create a new history entry and update it in redis
  if (value) {
    await prisma.history.create({
      data: {
        value: value as string,
        variableId: id as string,
      },
    })

    // Update the variable in redis as well
    writeConfigs(name as string, value as string, type as string)
  }

  revalidateTag('variable')

  return res
}

export const updateVariableOptions = async ({
  id,
  options,
}: {
  id: string
  options: string[]
}) => {
  // Delete all old options
  await prisma.dropdownOption.deleteMany({ where: { variableId: id } })

  // Create the new options
  const newOptions = options.map((option) => ({
    variableId: id,
    value: option,
  }))

  await prisma.dropdownOption.createMany({
    data: newOptions,
  })

  revalidateTag('variable')
}

/**
 * Delete the variable with the specified ID
 *
 * @param id - the ID of the variable
 */
export const deleteVariable = async ({
  id,
}: Prisma.VariableWhereUniqueInput) => {
  await prisma.variable.delete({
    where: { id },
  })

  revalidateTag('variable')
}

/* 
    TAG CRUD OPERATIONS
*/

/**
 * Check if the color is in hexadecimal format or in the corresponding enum
 * @param color - a string representing the color in hexadecimal format
 *
 * @return - a boolean value indicating if the color is valid
 */
function isValidColor(color: string) {
  return (
    !/^#[0-9A-F]{6}$/i.test(color) ||
    Object.values(BadgeColor).includes(color as BadgeColor)
  )
}

export const createTag = async ({ name, color }: Prisma.TagCreateInput) => {
  if (!isValidColor(color)) {
    throw new Error('Invalid color format')
  }

  try {
    return await prisma.tag.create({
      data: {
        name,
        color,
      },
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw new Error('Tag with that name already exists')
      }
    }
  }
}

export const editTagColor = async ({ id, color }: Prisma.TagUpdateInput) => {
  if (color && !isValidColor(color as string)) {
    throw new Error('Invalid color format')
  }

  return await prisma.tag.update({
    where: { id: id as string },
    data: { color },
  })
}

export const deleteTag = async ({ id }: Prisma.TagWhereUniqueInput) => {
  return await prisma.tag.delete({
    where: { id },
  })
}

export const addTagToVariable = async ({
  variableId,
  tagId,
}: {
  variableId: string
  tagId: string
}) => {
  return await prisma.variable.update({
    where: { id: variableId },
    data: {
      tags: {
        connect: { id: tagId },
      },
    },
  })
}
