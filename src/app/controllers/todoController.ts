import { NextRequest, NextResponse } from "next/server";
import { createTodo as createTodoService, getTodo as getTodoService, deleteTodo as deleteTodoService, Updatetodo as UpdatetodoService} from "../services/todoService";


export async function createTodo(req: NextRequest) {
const text = await req.json() as {text: string};
  try {
    if (!text.text) {
      return NextResponse.json(
        { message: "Failed to create Todo" },
        { status: 404 }
      );
    }

    const todo = await createTodoService(text.text)

    return NextResponse.json({ message: "Created Todo", todo: todo 
},
      
       { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Server Failed to create todo" , err},
      { status: 500 }
    );
  }
}

export async function getTodo(_req: NextRequest) {
  try {
    const todos = await getTodoService();

    return NextResponse.json({message: 'Fetched all todos', todos}, {status: 200})
  } catch (err) {
    return NextResponse.json({message: 'Failed to get todos', error: err}, {status: 500})
  }
}

export async function deleteTodo(req: NextRequest) {
  try {
   const {id} = await req.json() as {id: number};

   if(!id) {
    return NextResponse.json({message: 'No id provided'}, {status: 400});
   } 

    const todo = await deleteTodoService(id);

    return NextResponse.json({message: 'Todo deleted', todo}, {status: 200})
  } catch (err) {
    return NextResponse.json({message: 'Failed to delete todo', err}, {status: 500})
  }
}

export async function Update(req: NextRequest) {
  try {
    const {id, text} = await req.json() as {id: number, text: string};

    if(!id) {
      return NextResponse.json({message: 'No id provided'}, {status: 400});
    } 

    if(!text) {
      return NextResponse.json({message: 'No text provided'}, {status: 400});
    } 

    const todo = await UpdatetodoService(id, text);

    return NextResponse.json({message: 'Todo updated', todo}, {status: 200})
  } catch (err) {
    return NextResponse.json({message: 'Failed to update todo', err}, {status: 500});
  }
}