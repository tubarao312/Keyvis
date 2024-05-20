"use server";

import { Prisma, Variable } from '@prisma/client';
import prisma from '@/lib/prisma';

import { revalidateTag, unstable_cache } from 'next/cache';

/* 
    VARIABLE CRUD OPERATIONS
*/
export const createVariable = async ({
    name,
    description,
    value,
    defaultValue,
    type,
    selector
}: Prisma.VariableCreateInput) => {
    // Here I have to verify that all the inputs are correct

    try {
        return await prisma.variable.create({
            data: {
                name,
                description,
                value,
                defaultValue,
                type,
                selector,
                history: {
                    create: {
                        value
                    }
                }
            }
        });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                throw new Error('Variable with that name already exists');
            }
        }
    }
}

export const getVariable = unstable_cache(async ({ id }: Prisma.VariableWhereUniqueInput): Promise<Variable | null> => {
    return await prisma.variable.findUnique({
        where: { id },
        include: {
            tags: true,
        }
    });
}, ['variable'], { tags: ['variable'] });

export const getVariables = unstable_cache(async (): Promise<Variable[]> => {
    return await prisma.variable.findMany(
        {
            include: {
                tags: true,
            }
        }
    );
}, ['variables'], { tags: ['variable'] });

export const updateVariable = async ({ id, name, description, value, type, selector }: Prisma.VariableUpdateInput) => {
    if (!id) {
        throw new Error('ID is required');
    }

    // If no value is present then just update variable
    await prisma.variable.update({
        where: { id: id as string },
        data: { name, description, type, selector }
    });

    if (value) {
        await prisma.history.create({
            data: {
                value: value as string,
                variableId: id as string
            }
        });
    }

    revalidateTag('variable');
}

export const deleteVariable = async ({ id }: Prisma.VariableWhereUniqueInput) => {
    await prisma.variable.delete({
        where: { id }
    });

    revalidateTag('variable');
}

/* 
    TAG CRUD OPERATIONS
*/
function isValidColor(color: string) {
    return !/^#[0-9A-F]{6}$/i.test(color);
}

export const createTag = async ({ name, color }: Prisma.TagCreateInput) => {
    if (!isValidColor(color)) {
        throw new Error('Invalid color format');
    }

    try {
        return await prisma.tag.create({
            data: {
                name,
                color
            }
        });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                throw new Error('Tag with that name already exists');
            }
        }
    }
}

export const editTagColor = async ({ id, color }: Prisma.TagUpdateInput) => {
    if (color && !isValidColor(color as string)) {
        throw new Error('Invalid color format');
    }

    return await prisma.tag.update({
        where: { id: id as string },
        data: { color }
    });
}

export const deleteTag = async ({ id }: Prisma.TagWhereUniqueInput) => {
    return await prisma.tag.delete({
        where: { id }
    });
}

export const addTagToVariable = async ({ variableId, tagId }: { variableId: string, tagId: string }) => {
    return await prisma.variable.update({
        where: { id: variableId },
        data: {
            tags: {
                connect: { id: tagId }
            }
        }
    });
}