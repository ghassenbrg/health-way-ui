export class OfficeImage {
    id: number;
    image: string;
    doctor: string;
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
    };
    createdAt: Date;
}