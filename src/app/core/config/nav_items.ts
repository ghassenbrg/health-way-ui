import { NavItem, NavItemChild } from '@models/navItem.model';
import { roles } from './roles';

export const DOCOTR_DASHBOARD_ITEMS: NavItemChild[] = [
  {
    label: 'Doctor Dashboard',
    subPath: 'dashboard',
    path: 'doctor-dashboard/dashboard',
    icon: 'fas fa-columns',
  },
  {
    label: 'All appointments',
    subPath: 'appointments',
    path: 'doctor-dashboard/appointments',
    icon: 'fas fa-calendar-check',
  },
  {
    label: 'My patients',
    subPath: 'my-patients',
    path: 'doctor-dashboard/my-patients',
    icon: 'fas fa-user-injured',
  },
  {
    label: 'My Available timings',
    subPath: 'schedule-timings',
    path: 'doctor-dashboard/schedule-timings',
    icon: 'fas fa-hourglass-start',
  },
  {
    label: 'Reviews',
    subPath: 'reviews',
    path: 'doctor-dashboard/reviews',
    icon: 'fas fa-star',
  },
  {
    label: 'Profile Settings',
    subPath: 'doctor-profile-settings',
    path: 'doctor-dashboard/doctor-profile-settings',
    icon: 'fas fa-user-cog',
  },
  {
    label: 'Change Password',
    subPath: 'doctor-change-password',
    path: 'doctor-dashboard/doctor-change-password',
    icon: 'fas fa-lock',
  },
];

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    path: '',
  },
  {
    label: 'Patients',
    authorizedRoles: [roles.ROLE_ADMIN],
    children: [
      {
        label: 'Patients List',
        path: 'patients-list',
      },
    ],
  },
  {
    label: 'Doctor workspace',
    authorizedRoles: [roles.ROLE_DOCTOR],
    children: DOCOTR_DASHBOARD_ITEMS,
  },
  {
    label: 'Patient workspace',
    authorizedRoles: [roles.ROLE_PATIENT],
    path: 'patient-dashboard'
  },
  {
    label: 'Search Doctor',
    children: [
      {
        label: 'Simple Search',
        path: 'search',
      },
      {
        label: 'Map Search',
        path: 'map-grid',
      },
    ],
  },
  {
    label: 'Pharmacy',
    path: 'pharmacy-search',
  },
  {
    label: 'Blood bank',
    path: 'blood-bank',
  },
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
        path: 'search',
      },
      {
        label: 'Login',
        path: 'login',
      },
      {
        label: 'Register',
        path: 'regsiter',
      },
      {
        label: 'Patient Dashboard',
        path: 'patient-dashboard',
      },
    ],
  },
  {
    label: 'For Doctors',
    authorizedRoles: [roles.ROLE_ADMIN],
    children: [
      {
        label: 'Appointments',
        path: 'appointments',
      },
      {
        label: 'Login',
        path: 'login',
      },
      {
        label: 'Register',
        path: 'regsiter',
      },
      {
        label: 'Doctor Dashboard',
        path: 'doctor-dashboard',
      },
    ],
  },
  {
    label: 'Activities',
    authorizedRoles: [roles.ROLE_DOCTOR],
    children: [
      {
        label: 'My Available timings',
        path: 'schedule-timings',
      },
      {
        label: 'Appointments',
        path: 'appointments',
      },
      {
        label: 'My patients',
        path: 'my-patients',
      },
    ],
  },
  {
    label: 'Activities',
    authorizedRoles: [roles.ROLE_PATIENT],
    children: [
      {
        label: 'Simple Search',
        path: 'search',
      },
      {
        label: 'Map Search',
        path: 'map-grid',
      },
      {
        label: 'My Appointments',
        path: 'patient-dashboard',
      },
    ],
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
      },
    ],
  },
];
