import React from "react";
import { FaFilm } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { MdOutlineCalendarToday } from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
export const SidebarData = [
    {
        title: "Home",
        path: "/home",
        icon: <FaFilm />,
        cName: "nav-text",
    },
    {
        title: "Favourites",
        path: "/favourites",
        icon: <FaRegHeart />,
        cName: "nav-text",
    },
    {
        title: "Trending",
        path: "/trending",
        icon: <IoMdTrendingUp />,
        cName: "nav-text",
    },
    {
        title: "Coming soon",
        path: "/coming-soon",
        icon: <MdOutlineCalendarToday />,
        cName: "nav-text",
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <GiSettingsKnobs />,
        cName: "nav-text",
    },
    {
        title: "Logout",
        path: "/logout",
        icon: <LuLogOut />,
        cName: "nav-text",
    }
];