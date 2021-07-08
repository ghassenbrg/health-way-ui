import { NavItem } from "@models/navItem.model";

export const NAV_ITEMS: NavItem[] = [
    {
        label: 'Home',
        path: ''
    },
    {
        label: 'Doctors',
        authorizedRoles: ['ROLE_ADMIN'],
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
        label: 'Patients',
        authorizedRoles: ['ROLE_ADMIN'],
        children: [
            {
                label: 'Patient Dashboard',
                path: 'patient-dashboard'
            },
            {
                label: 'Simple Search',
                path: 'search'
            },
            {
                label: 'Map Search',
                path: 'map-grid'
            },
            {
                label: 'Favourites',
                path: 'favourites'
            }
        ]
    },
    {
        label: 'Schedule Timings',
        authorizedRoles: ['ROLE_DOCTOR'],
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
        authorizedRoles: ['ROLE_DOCTOR'],
        path: 'my-patients'
    },
    {
        label: 'Search Doctor',
        authorizedRoles: ['ROLE_PATIENT'],
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
        authorizedRoles: ['ROLE_PATIENT'],
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
        authorizedRoles: ['ROLE_ADMIN'],
    },
    {
        label: 'Doctor Dashboard',
        path: 'doctor-dashboard',
        authorizedRoles: ['ROLE_ADMIN'],
    },
    {
        label: 'Dashboard',
        path: 'doctor-dashboard',
        authorizedRoles: ['ROLE_DOCTOR'],
    },
    {
        label: 'Dashboard',
        path: 'patient-dashboard',
        authorizedRoles: ['ROLE_DOCTOR'],
    },
    {
        label: 'Profile Settings',
        path: 'doctor-profile-settings',
        authorizedRoles: ['ROLE_DOCTOR'],
    },
    {
        label: 'Profile Settings',
        path: 'profile-settings',
        authorizedRoles: ['ROLE_PATIENT'],
    },

];