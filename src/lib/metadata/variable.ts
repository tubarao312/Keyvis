import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

/* 
    VARIABLE CRUD OPERATIONS
*/

export async function createVariable({ name, description, value }: Prisma.VariableCreateInput) {
    try {
        return await prisma.variable.create({
            data: {
                name,
                description,
                value,
                History: {
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

export async function getVariable({ id }: Prisma.VariableWhereUniqueInput) {
    return await prisma.variable.findUnique({
        where: { id },
        include: {
            Tags: true,
        }
    });
}

export async function getVariables() {
    return await prisma.variable.findMany();
}

export async function updateVariable({ id, description, value }: Prisma.VariableUpdateInput) {
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
            History: {
                create: {
                    value: value as string
                }
            }
        }
    });
}

export async function deleteVariable({ id }: Prisma.VariableWhereUniqueInput) {
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

export async function createTag({ name, color }: Prisma.TagCreateInput) {
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

export async function editTagColor({ id, color }: Prisma.TagUpdateInput) {
    if (color && !isValidColor(color as string)) {
        throw new Error('Invalid color format');
    }

    return await prisma.tag.update({
        where: { id: id as string },
        data: { color }
    });
}

export async function addTagToVariable({ variableId, tagId }: { variableId: string, tagId: string }) {
    return await prisma.variable.update({
        where: { id: variableId },
        data: {
            Tags: {
                connect: { id: tagId }
            }
        }
    });
}