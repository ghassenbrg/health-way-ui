export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    gender: string;
    birthDate?: string;
    jobTitle?: string;
    roles: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    password?: string;
    plainPassword?: string;
    token?: string;
}