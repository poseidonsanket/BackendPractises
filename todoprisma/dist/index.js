"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todos.findMany({
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
    });
}
getTodos(1);
