import React from 'react'
import * as AiIcons from "react-icons/ai";
import * as FaIcons from 'react-icons/fa'

export const SidebarDataProf = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome size="25"/>,
        cName: 'sidebar-text'
    },
    {
        title: 'All Courses',
        path: '/students',
        icon: <FaIcons.FaUserFriends size="25" />,
        cName: 'sidebar-text'
    }

]

