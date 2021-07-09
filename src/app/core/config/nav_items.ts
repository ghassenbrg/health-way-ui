import { NavItem } from "@models/navItem.model";
import { roles } from "./roles";

export const NAV_ITEMS: NavItem[] = [
    {
        label: 'Home',
        path: ''
    },
    {
        label: 'Doctors',
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
        label: 'Patients',
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
        label: 'Patient workspace',
        authorizedRoles: [roles.ROLE_USER],
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
        label: 'Schedule Timings',
        authorizedRoles: [roles.ROLE_DOCTOR],
        children: [
            {
                label: 'My Available timings',
                path: 'schedule-timings'
            },
            {
                label: 'Appointments',
                path: 'appointments'
            }
        ]
    },
    {
        label: 'My patients',
        authorizedRoles: [roles.ROLE_DOCTOR],
        path: 'my-patients'
    },
    {
        label: 'Search Doctor',
        authorizedRoles: [roles.ROLE_USER],
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
        label: 'My Appointments',
        authorizedRoles: [roles.ROLE_USER],
        path: 'patient-dashboard'
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
        authorizedRoles: [roles.ROLE_USER],
    },
    {
        label: 'Profile Settings',
        path: 'doctor-profile-settings',
        authorizedRoles: [roles.ROLE_DOCTOR],
    },
    {
        label: 'Profile Settings',
        path: 'profile-settings',
        authorizedRoles: [roles.ROLE_USER],
    },

];