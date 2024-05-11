import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://test_owner:qlYiFDTd80JI@ep-summer-dew-a5vxd2xu.us-east-2.aws.neon.tech/test?sslmode=require",
});

// client.connect();

// // const createUserTable = async () => {
// //   const result = await client.query(`
// //         CREATE TABLE users (
// //             id SERIAL PRIMARY KEY,
// //             username VARCHAR(50) UNIQUE NOT NULL,
// //             email VARCHAR(255) UNIQUE NOT NULL,
// //             password VARCHAR(255) NOT NULL,
// //             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// //         );
// //     `);
// //   console.log(result);
// // };

// // createUserTable();

// const insertdata = async () => {
//   const res = await client.query(`
//         INSERT INTO users (username,email,password) VALUES ('sanket','s@gmail.com','123')
//     `);
//   console.log(res);
// };

// insertdata();

// Async function to fetch user data from the database given an email
// async function getUser(email: string) {
//   const client = new Client({
//     connectionString:
//       "postgresql://test_owner:qlYiFDTd80JI@ep-summer-dew-a5vxd2xu.us-east-2.aws.neon.tech/test?sslmode=require",
//   });

//   try {
//     await client.connect(); // Ensure client connection is established
//     const query = "SELECT * FROM users WHERE email = $1";
//     const values = [email];
//     const result = await client.query(query, values);

//     console.log(result.rows);
//   } catch (err) {
//     console.error("Error during fetching user:", err);
//     throw err; // Rethrow or handle error appropriately
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

// getUser("s@gmail.com");

// async function createAddressTable() {
//   await client.connect();

//   const res = await client.query(`
//         CREATE TABLE addresses (
//             id SERIAL PRIMARY KEY,
//             user_id INTEGER NOT NULL,
//             city VARCHAR(100) NOT NULL,
//             country VARCHAR(100) NOT NULL,
//             street VARCHAR(255) NOT NULL,
//             pincode VARCHAR(20),
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//             FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//         );
//     `);

//   console.log(res);
// }

// createAddressTable();

// async function insertAddressTable(
//   id: number,
//   city: string,
//   country: string,
//   street: string,
//   pincode: string
// ) {
//   await client.connect();
//   const query = `INSERT INTO addresses (user_id, city, country, street, pincode)
//   VALUES ($1, $2, $3, $4, $5);`;
//   const values = [id, city, country, street, pincode];
//   const res = await client.query(query,values);

//   console.log(res);
// }

// insertAddressTable(1,'pune','india','pandavnagar','411016')

async function getUsers() {
  await client.connect();

  const res = await client.query(`
            SELECT u.email,u.password,u.username,a.city,a.country
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = 1
        `);

  console.log(res.rows);
  client.end();
}

getUsers();
