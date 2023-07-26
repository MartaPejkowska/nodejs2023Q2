import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string; // uuid v4
  login: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
