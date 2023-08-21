export declare class UserEntity {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;
    refresh_token?: string;
    constructor(partial: Partial<UserEntity>);
}
