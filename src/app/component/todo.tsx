'use client'


import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import {  format} from "date-fns";
import Update from "./update";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setId } from "../redux/slices/global";

type Todo = {
    id: number;
    text: string;
    createdAT: string;
}

export default function TodoAPP() {
     const [value, setValue] = useState<Todo[]>([]);
     const dispatch = useAppDispatch();
     const todoId = useAppSelector((state) => state.todo.id);

    const {register, handleSubmit, reset} = useForm<Todo>();
    const onSubmit: SubmitHandler<Todo> = async (data) =>  {
        await createTODO(data);
        reset();
    }

    const createTODO = async (data: Todo) => {
        try {
            const response = await fetch('/api/todo', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                console.log('Failed todo')
            }
        } catch (err) {
            console.error('Failed to create todo',err)
        }
    }

    useEffect(() => {
    const fetchapi = async () => {
        try {
        const response = await fetch('/api/todo', {
            method: "GET"
        })
        
         const data = await response.json();   
         setValue(data.todos);
          }
          catch (err) {
            console.error("Failed to fetch to do", err)
          }
    }
    fetchapi()
     },[])


     const deleteAPI = async (id: number) => {
        try {
            const response = await fetch('/api/todo', {
                method: 'DELETE',
                body: JSON.stringify({id: id})
            })

            
            if (!response.ok) {
                console.log('Failed to delete')
            }
        } catch (err) {
            console.error("Failed To delete Todo", err);
        }
     }

    return(
        <>       
        <div className="flex flex-col justify-center items-center mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
            <input className="border-red-500 border-2 p-4 w-[400px] rounded-2xl"  {...register('text')} placeholder="Enter To do" />
            <input className="border-red-500 border-2 p-4 rounded-2xl" type="submit" />
            </div>
        </form>

    {value.map((todo, i) => (
  <div className="flex m-4 border-2 border-green-500 p-5 rounded-3xl max-w-[500px] w-[100%]" key={i}>
    <h1>{todo.text}</h1>
    <h2>{format(new Date (todo.createdAT), "dd MMM yyy" )}</h2>
    <h4 className="ml-auto">{todo.id}</h4>
    <h2 className="ml-4 bg-amber-700 p-3 cursor-pointer" onClick={() => deleteAPI(todo.id)}>Delete</h2>
    <h2 className="bg-blue-600 cursor-pointer p-6" onClick={() => {dispatch(setId(todo.id)); if(todo.id === todoId) dispatch(setId(0))}}>Update</h2>
    <Update current={todo.id}/>
  </div>
))}
</div>
        </>
    )
}