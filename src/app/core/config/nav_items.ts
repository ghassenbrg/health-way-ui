import { NavItem } from "@models/navItem.model";
import { roles } from "./roles";

export const NAV_ITEMS: NavItem[] = [
    {
        label: 'Home',
        path: ''
    },
    {
        label: 'Patients',
        authorizedRoles: [roles.ROLE_ADMIN],
        children: [
            {
                label: 'Patients List',
                path: 'patients-list'
            }
        ]
    },
    {
        label: 'Doctor workspace',
        authorizedRoles: [roles.ROLE_DOCTOR],
        children: [
            {
                label: 'Doctor Dashboard',
                path: 'doctor-dashboard'
            },
            {
                label: 'Appointments',
                path: 'appointments'
            },
            {
                label: 'My patients',
                path: 'my-patients'
            },
            {
                label: 'My Available timings',
                path: 'schedule-timings'
            }
        ]
    },
    {
        label: 'Patient workspace',
        authorizedRoles: [roles.ROLE_PATIENT],
        children: [
            {
                label: 'Patient Dashboard',
                path: 'patient-dashboard'
            },
            {
                label: 'Favourites',
                path: 'favourites'
            }
        ]
    },
    {
        label: 'My Appointments',
        authorizedRoles: [roles.ROLE_PATIENT],
        path: 'patient-dashboard'
    },
    {
        label: 'Search Doctor',
        children: [
            {
                label: 'Simple Search',
                path: 'search'
            },
            {
                label: 'Map Search',
                path: 'map-grid'
            }
        ]
    },
    {
        label: 'Pharmacy',
        path: 'pharmacy-search'
    }
];


export const USER_MENU_ITEMS: NavItem[] = [
    {
        label: 'Patient Dashboard',
        path: 'patient-dashboard',
        authorizedRoles: [roles.ROLE_ADMIN],
    },
    {
        label: 'Doctor Dashboard',
        path: 'doctor-dashboard',
        authorizedRoles: [roles.ROLE_ADMIN],
    },
    {
        label: 'Dashboard',
        path: 'doctor-dashboard',
        authorizedRoles: [roles.ROLE_DOCTOR],
    },
    {
        label: 'Dashboard',
        path: 'patient-dashboard',
        authorizedRoles: [roles.ROLE_PATIENT],
    },
    {
        label: 'Profile Settings',
        path: 'doctor-profile-settings',
        authorizedRoles: [roles.ROLE_DOCTOR],
    },
    {
        label: 'Profile Settings',
        path: 'profile-settings',
        authorizedRoles: [roles.ROLE_PATIENT],
    },

];

export const FOOTER_ITEMS: NavItem[] = [
    {
        label: 'For Patients',
        authorizedRoles: [roles.ROLE_ADMIN],
        children: [
            {
                label: 'Search for Doctors',
                path: 'search'
            },
            {
                label: 'Login',
                path: 'login'
            },
            {
                label: 'Register',
                path: 'regsiter'
            },
            {
                label: 'Patient Dashboard',
                path: 'patient-dashboard'
            }
        ]
    },
    {
        label: 'For Doctors',
        authorizedRoles: [roles.ROLE_ADMIN],
        children: [
            {
                label: 'Appointments',
                path: 'appointments'
            },
            {
                label: 'Login',
                path: 'login'
            },
            {
                label: 'Register',
                path: 'regsiter'
            },
            {
                label: 'Doctor Dashboard',
                path: 'doctor-dashboard'
            }
        ]
    },
    {
        label: 'Activities',
        authorizedRoles: [roles.ROLE_DOCTOR],
        children: [
            {
                label: 'My Available timings',
                path: 'schedule-timings'
            },
            {
                label: 'Appointments',
                path: 'appointments'
            },
            {
                label: 'My patients',
                path: 'my-patients'
            }
        ]
    },
    {
        label: 'Activities',
        authorizedRoles: [roles.ROLE_PATIENT],
        children: [
            {
                label: 'Simple Search',
                path: 'search'
            },
            {
                label: 'Map Search',
                path: 'map-grid'
            },
            {
                label: 'My Appointments',
                path: 'patient-dashboard'
            }
        ]
    },
    {
        label: 'Workspace',
        authorizedRoles: [roles.ROLE_DOCTOR, roles.ROLE_PATIENT],
        children: [
            {
                label: 'My Dashboard',
                path: 'doctor-dashboard',
                authorizedRoles: [roles.ROLE_DOCTOR],
            },
            {
                label: 'My Dashboard',
                path: 'patient-dashboard',
                authorizedRoles: [roles.ROLE_PATIENT],
            },
            {
                label: 'Profile Settings',
                path: 'doctor-profile-settings',
                authorizedRoles: [roles.ROLE_DOCTOR],
            },
            {
                label: 'Profile Settings',
                path: 'profile-settings',
                authorizedRoles: [roles.ROLE_PATIENT],
            },
            {
                label: 'Change Password',
                path: 'change-password',
                authorizedRoles: [roles.ROLE_DOCTOR, roles.ROLE_PATIENT],
            }
        ]
    }
];