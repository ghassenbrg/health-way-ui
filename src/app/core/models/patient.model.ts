import { User } from "./user.model";

export class Patient extends User {
    id: number ;
    feedbacks: [
        string
    ];
    appointments: [
        string
    ];
    email: string;
    username: string;
    roles: [
        string
    ];
    password: string;
    salt: string;
    firstName: string;
    lastName: string;
    isActive: true;
    createdAt: Date;
    updatedAt: Date;
    avatar: string;
    imageFile: {
        mimeType: string;
        path: string;
        filename: string;
        extension: string;
        basename: string;
        pathname: string;
        perms: string;
        inode: string;
        size: string;
        owner: string;
        group: string;
        ATime: string;
        MTime: string;
        CTime: string;
        type: string;
        writable: true;
        readable: true;
        executable: true;
        file: true;
        dir: true;
        link: true;
        linkTarget: string;
        realPath: string;
        fileInfo: string;
        pathInfo: string
    }
}
