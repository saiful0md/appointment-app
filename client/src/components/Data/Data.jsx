import { FaHome, FaList, FaUser, FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";


// user menu
export const userMenu = [
    {
        name: 'Home',
        path: '/',
        icon: FaHome
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: FaUser
    },
    {
        name: 'Appointment',
        path: '/appointment',
        icon: FaList
    },
    {
        name: 'Apply Doctor',
        path: '/apply-doctor',
        icon: FaUserDoctor
    },

]


// Admin nemu
export const adminMenu = [
    {
        name: 'Home',
        path: '/',
        icon: FaHome
    },
    {
        name: 'Doctors',
        path: '/doctors',
        icon: FaUserDoctor
    },
    {
        name: 'Users',
        path: '/users',
        icon: FaUsers
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: FaUser
    },

]