import { NavItem } from "@models/navItem.model";

export const NAV_ITEMS: NavItem[] = [
    {
        label: 'Home',
        path: ''
    },
    {
        label: 'Doctors',
        children: [
            {
                label: 'Doctor Dashboard',
                authorizedRoles: ['ROLE_DOCTOR'],
                path: 'doctor-dashboard'
            },
            {
                label: 'Search Doctor',
                path: 'search'
            },
            {
                label: 'Appointments',
                path: 'appointments'
            },
            {
                label: 'Profile Settings',
                authorizedRoles: ['ROLE_DOCTOR'],
                path: 'doctor-profile-settings'
            },
        ]
    },
    {
        label: 'Patients',
        authorizedRoles: ['ROLE_USER'],
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
    }
];