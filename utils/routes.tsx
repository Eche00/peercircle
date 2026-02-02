import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HistoryIcon from "@mui/icons-material/History";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import Groups3Icon from "@mui/icons-material/Groups3";
import TaskIcon from "@mui/icons-material/Task";
import React from "react";

type SideBarItem = {
  name: string;
  link: string;
  icon: React.ReactNode;
};
type PublicRoutes = {
  name: string;
  link: string;
};
// Sidebar Nav
export const sideBarItems: SideBarItem[] = [
  { name: "Home", link: "/dashboard", icon: <OtherHousesIcon /> },
  { name: "Sessions", link: "/dashboard/sessions", icon: <AssessmentIcon /> },
  { name: "Tasks", link: "/dashboard/tasks", icon: <TaskIcon /> },
  {
    name: "Communities",
    link: "/dashboard/communities",
    icon: <Groups3Icon />,
  },
];
export const sideBarItems2: SideBarItem[] = [
  { name: "History", link: "/dashboard/history", icon: <HistoryIcon /> },
  { name: "Profile", link: "/dashboard/profile", icon: <AccessibilityIcon /> },
];
export const publicItems: PublicRoutes[] = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HistoryIcon from '@mui/icons-material/History';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Groups3Icon from '@mui/icons-material/Groups3';
import React from 'react';
import { LocalConvenienceStore } from '@mui/icons-material';


type SideBarItem = {
    name: string;
    link: string;
    icon: React.ReactNode
}
type PublicRoutes = {
    name: string;
    link: string;
}
// Sidebar Nav 
export const sideBarItems: SideBarItem[] = [
    { name: "Home", link: '/dashboard', icon: <OtherHousesIcon /> },
    { name: "Sessions", link: '/dashboard/sessions', icon: <AssessmentIcon /> },
    { name: "Tasks", link: '/dashboard/tasks', icon: <LocalConvenienceStore /> },
    { name: "Communities", link: '/dashboard/communities', icon: <Groups3Icon /> },

];
export const sideBarItems2: SideBarItem[] = [
    { name: "History", link: '/dashboard/history', icon: <HistoryIcon /> },
    { name: "Profile", link: '/dashboard/profile', icon: <AccessibilityIcon /> },


];
export const publicItems: PublicRoutes[] = [
    { name: "Home", link: '/' },
    { name: "About", link: '/about' },
    { name: "Contact", link: '/contact' },


];