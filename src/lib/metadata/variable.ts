"use server";

import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

import { cache } from 'react'

/* 
    VARIABLE CRUD OPERATIONS
*/
export const createVariable = async ({ name, description, value }: Prisma.VariableCreateInput) => {
    try {
        return await prisma.variable.create({
            data: {
                name,
                description,
                value,
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

export const getVariable = cache(async ({ id }: Prisma.VariableWhereUniqueInput) => {
    return await prisma.variable.findUnique({
        where: { id },
        include: {
            tags: true,
        }
    });
});

export const getVariables = cache(async () => {
    return await prisma.variable.findMany(
        {
            include: {
                tags: true,
            }
        }
    );
});

export const updateVariable = async ({ id, description, value }: Prisma.VariableUpdateInput) => {
    if (!id) {
        throw new Error('ID is required');
    }

    // If no value is present then just update variable
    if (!value) {
        return await prisma.variable.update({
            where: { id: id as string },
            data: { description }
        });
    }

    // Else also add the value to the history
    return await prisma.variable.update({
        where: { id: id as string },
        data: {
            description,
            value,
            history: {
                create: {
                    value: value as string
                }
            }
        }
    });
}

export const deleteVariable = async ({ id }: Prisma.VariableWhereUniqueInput) => {
    return await prisma.variable.delete({
        where: { id }
    });
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