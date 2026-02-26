import { UserModel } from '@/models/users/user-model';

export const makePartialUser = (user?: Partial<UserModel>): PublicUser => {
  return {
    email: user?.email || '',
    username: user?.username || '',
  };
};

export type PublicUser = Pick<UserModel, 'username' | 'email'>;
export const makePublicUserFromDb = (user: UserModel): PublicUser => {
  return makePartialUser(user);
};
