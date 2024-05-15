import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export function addVariable({ name, description, value }: Prisma.VariableCreateInput) {
    try {
        return prisma.variable.create({
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

export function getVariable({ id }: Prisma.VariableWhereUniqueInput) {
    return prisma.variable.findUnique({
        where: { id }
    });
}

export function getVariables() {
    return prisma.variable.findMany();
}

export function updateVariable({ id, description, value }: Prisma.VariableUpdateInput) {
    if (!id) {
        throw new Error('ID is required');
    }

    // If no value is present then just update variable
    if (!value) {
        return prisma.variable.update({
            where: { id: id as string },
            data: { description }
        });
    }

    // Else also add the value to the history
    return prisma.variable.update({
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

export function deleteVariable({ id }: Prisma.VariableWhereUniqueInput) {
    return prisma.variable.delete({
        where: { id }
    });
}