import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdAccountCircle,
  MdInsertChart,
  MdSwapHoriz,
  MdLock,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import AccountManagement from "views/admin/AccountManagement";
import CryptoPurchase from "views/admin/CryptoPurchase";
import Portfolio from "views/admin/Portfolio";
import TokenSwaps from "views/admin/TokenSwaps";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Account Management",
    layout: "/admin",
    path: "/AccountManagement",
    icon: <Icon as={MdAccountCircle} width='20px' height='20px' color='inherit' />,
    component: AccountManagement,
    secondary: true,
  },
  {
    name: "Portfolio",
    layout: "/admin",
    icon: <Icon as={MdInsertChart} width='20px' height='20px' color='inherit' />,
    path: "/Portfolio",
    component: Portfolio,
  },
  {
    name: "Token Swaps",
    layout: "/admin",
    path: "/TokenSwaps",
    icon: <Icon as={MdSwapHoriz} width='20px' height='20px' color='inherit' />,
    component: TokenSwaps,
  },
  {
    name: "Crypto Purchase",
    layout: "/admin",
    path: "/CryptoPurchase",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: CryptoPurchase,
  },
];

export default routes;
