'use server'

import { prisma } from "@/lib/prisma"

export async function createTodo(text: string) {
    try {
        return await prisma.todo.create({
            data: {
                text: text
            }
        });
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
}

export async function getTodo() {
    try {
        return await prisma.todo.findMany({
            orderBy: {
                id: 'desc'
            }
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
}

export async function deleteTodo(id: number) {
    try {
        return await prisma.todo.delete({
            where: { id },
        });
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
}

export async function Updatetodo(id: number, text: string) {
    try {
        return await prisma.todo.update({
            where: { id },
            data: { text },
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
}