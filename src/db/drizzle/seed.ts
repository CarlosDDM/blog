import { postsTable, usersTable } from './schemas';
import { hashPassword } from '@/lib/login/manage-login';
import { UserModel } from '@/models/users/user-model';
import { v4 as uuidV4 } from 'uuid';
import { postRepository } from '@/repositories/post';
import { drizzleDb } from '.';

// (async () => {
//   const jsonPostRepository = new JsonPostRepository();
//   const posts = await jsonPostRepository.findAll();
//   if (!posts) return;
//   try {
//     console.log(posts.length);

//     // await drizzleDb.delete(postsTable);
//     await drizzleDb.insert(postsTable).values(posts);
//   } catch (error) {
//     console.log('Error seeding posts:', error);
//   }
// })();

(async () => {
  const username = process.env.DEFAULT_USERNAME || 'admin';
  const password = await hashPassword(
    process.env.DEFAULT_PASSWORD || 'theblog',
  );
  const email = process.env.DEFAULT_EMAIL || 'admin@example.com';

  const defaultUser: UserModel = {
    username,
    email,
    password,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4().replaceAll('-', ''),
  };
  try {
    const existUser = await drizzleDb.query.users.findMany();
    if (existUser.length > 0) return;

    await postRepository.createUser(defaultUser);
  } catch (err) {
    throw new Error(`Usuário não criado: ${err}`);
  }
})();

// (async () => {
//   const users = await drizzleDb.query.users.findMany();
//   console.log(users);
// })();
