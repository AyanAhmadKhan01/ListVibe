'use server'

import { prisma } from "@/lib/prisma"


export async function createTodo(text: string) {
    return prisma.todo.create({
        data: {
          text: text
    }
});
}

export async function getTodo() {
    return prisma.todo.findMany();
}

export async function deleteTodo(id: number) {
    return prisma.todo.delete({
        where: { id },
    });
}

export async function Updatetodo(id: number, text: string) {
    return prisma.todo.update({
        where: { id },
        data: {text},
    });
}