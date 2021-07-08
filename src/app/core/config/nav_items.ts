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
                path: 'grid-map'
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
                path: 'grid-map'
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