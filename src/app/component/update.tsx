'use client'

import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../redux/store";
import { todoType } from "../types/todo";



export default function Update({current}: {current: number}) {
    const {register, handleSubmit } = useForm<todoType>();
    const todoId = useAppSelector((state) => state.todo.id);

    const sumbit: SubmitHandler<todoType> = async (data) => {
        await updateTodo(data.text)
    }

    const updateTodo = async (data: string) => {
        try {
            const response = await fetch('/api/todo', {
                method: "PATCH",
               body: JSON.stringify({id: todoId, text: data})
            });
            
            if (!response.ok) {
                console.log('Failed to update todo')
            }

        } catch (err) {
            console.error('Failed to update', err)
        }
    }

    return(
        <>
       {todoId === current && (
        <div className="bg-yellow-500 w-[500px] h-[200px]">
            <form onSubmit={handleSubmit(sumbit)}>
            <input {...register('text')} placeholder="enter new text"/>
              <input className="border-red-500 border-2 p-4 rounded-2xl" type="submit" />
              </form>
        </div>
         )}
        </>
    )
}