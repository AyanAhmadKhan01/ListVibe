import { createTodo, getTodo, deleteTodo, Update } from "@/app/controllers/todoController";
import { NextRequest} from "next/server";

export async function POST(req: NextRequest) {
 return createTodo(req);
}

export async function GET(req: NextRequest) {
    return getTodo(req);
}

export async function DELETE(req: NextRequest) {
    return deleteTodo(req);
}

export async function PATCH(req: NextRequest) {
    return Update(req);
}