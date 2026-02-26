import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { postsTable, usersTable } from '@/db/drizzle/schemas';
import { UserModel } from '@/models/users/user-model';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error(`Post com id não encontrado.`);

    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error(`Post não encontado para slug`);

    return post;
  }

  async deleteById(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error('Post não existe');
    }
    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));
    return post;
  }

  async createPost(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw new Error('Post com ID ou Slug já existe na base de dados');
    }

    await drizzleDb.insert(postsTable).values(post);

    return post;
  }

  async updatePost(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error('Post não existe');
    }

    const updatedAt = new Date().toISOString();

    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };
    await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }

  async createUser(user: UserModel): Promise<UserModel> {
    const userExists = await drizzleDb.query.users.findFirst({
      where: (users, { or, eq }) =>
        or(eq(users.email, user.email), eq(users.username, user.username)),
      columns: { id: true },
    });

    if (!!userExists) {
      throw new Error(
        'Usuário com email ou username já existe na base de dados',
      );
    }

    await drizzleDb.insert(usersTable).values(user);
    return user;
  }

  async findUser(user: string): Promise<UserModel | null> {
    const validUser = await drizzleDb.query.users.findFirst({
      where: (users, { or, eq }) =>
        or(eq(users.email, user), eq(users.username, user)),
    });

    return validUser || null;
  }
}
