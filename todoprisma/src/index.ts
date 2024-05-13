import { PrismaClient } from "@prisma/client";
import { timeLog } from "node:console";
import { todo } from "node:test";

const prisma = new PrismaClient();

// async function insertUser(
//   email: string,
//   password: string,
//   firstName: string,
//   lastName: string
// ) {
//   const res = await prisma.user.create({
//     data: {
//       email: email,
//       password: password,
//       firstName: firstName,
//       lastName: lastName,
//     },
//   });

//   console.log(res);
// }

// insertUser("s@gmail.com", "123", "sanket", "dadali");

// async function createTodo(userId: number, title: string, description: string) {
//   const res = await prisma.todos.create({
//     data: {
//       userId: userId,
//       title: title,
//       description: description,
//     },
//   });
//   console.log(res);
// }

// createTodo(1, "go to gym", "go to gym and do 10 pushups");

async function getTodos(userId: number) {
  const res = await prisma.todos.findMany({
    where: {
      id: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      user: true,
    },
  });
  console.log(res);
}

getTodos(1);
