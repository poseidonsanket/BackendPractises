import { PrismaClient } from "@prisma/client";

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

interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdateParams
) {
  const res = await prisma.user.update({
    where: {
      email: username,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
    },
  });

  console.log(res)
}

updateUser("s@gmail.com", { firstName: "sa", lastName: "da" });


