import { PostModel } from '@/models/posts/post-model';

export interface PostRepository {
  findById(id: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel>;
}
