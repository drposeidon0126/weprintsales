import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Profile,
  Productions,
  Orders,
  Customers,
  Users,
  Settings,
  Payments,
  Notifications
} from "@/pages/dashboard";
import {
  UserEdit
} from "@/pages/dashboard/users/edit";
import { SignIn, SignUp } from "@/pages/auth";
import OrderEdit from "./pages/dashboard/orders/edit";
import OrderView from "./pages/dashboard/orders/view";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "Main pages",
    layout: "dashboard",
    role: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "payments",
        path: "/payments",
        element: <Payments />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "productions",
        path: "/productions",
        element: <Productions />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "customers",
      //   path: "/customers",
      //   element: <Customers />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "settings",
      //   path: "/settings",
      //   element: <Settings />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   path: "/notifactions",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "other pages",
    layout: "other",
    role: "admin",
    pages: [
      {
        // name: "user edit",
        path: "/users/edit/:id",
        element: <UserEdit />,
      },
      {
        // name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        // name: "order add",
        path: "/orders/edit",
        element: <OrderEdit />,
      },
      {
        // name: "order add",
        path: "/orders/view",
        element: <OrderView />,
      },
    ],
  },
  {
    title: "customer pages",
    layout: "dashboard",
    role: "normal",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "payments",
        path: "/payments",
        element: <Customers />,
      },
    ],
  },
  {
    title: "Artworker pages",
    layout: "dashboard",
    role: "artworker",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "payments",
        path: "/payments",
        element: <Customers />,
      },
    ],
  },
  {
    title: "Project Stuff pages",
    layout: "dashboard",
    role: "projectstuff",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "payments",
        path: "/payments",
        element: <Customers />,
      },
    ],
  },


  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
