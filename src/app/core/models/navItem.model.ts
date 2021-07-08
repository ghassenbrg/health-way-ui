export class NavItem {
    label: string;
    icon?: string;
    path?: string;
    isActive?: boolean;
    authorizedRoles?: string[];
    children?: NavItemChild[];
}

export class NavItemChild {
    label: string;
    icon?: string;
    isActive?: boolean;
    path: string;
    authorizedRoles?: string[];
}