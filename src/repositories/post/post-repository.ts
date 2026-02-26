import { PostModel } from '@/models/posts/post-model';
import { UserModel } from '@/models/users/user-model';

export interface PostRepository {
  findById(id: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel>;
  deleteById(id: string): Promise<PostModel>;
  createPost(post: PostModel): Promise<PostModel>;
  updatePost(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel>;
  createUser(user: UserModel): Promise<UserModel>;
  findUser(user: string): Promise<UserModel | null>;
}
