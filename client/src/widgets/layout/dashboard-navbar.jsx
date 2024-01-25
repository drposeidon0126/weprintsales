import { useLocation, Link } from "react-router-dom";
import DefaultAvart from '../../../public/img/default_avatar.png';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import UserService from "@/services/user-service";
import { useEffect, useState } from "react";
import { useNavigate, Router } from 'react-router-dom';




export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [users, setUsers] = useState([]);
  const [isShowed, setIsShowed] = useState(false);
  const API_URL = process.env.API_URL;
  console.log(API_URL, "api_url")


  useEffect(() => {
    async function fetchData() {
      const response = await UserService.pendingUser();
      setUsers(response.entities);
      console.log(users, 'notification');
    }
    fetchData();
  }, []);

  function getTimeDifference(createdAt) {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = currentDate - createdDate;

    // calculate time difference in days
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (days > 0) {
      return `${days} days ago`;
    }

    // calculate time difference in hours
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    if (hours > 0) {
      return `${hours} hours ago`;
    }

    // if time difference is less than an hour, return "just now"
    return "just now";
  }


  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          {/* <Typography variant="h6" color="blue-gray">
            {page}
          </Typography> */}
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="/auth/sign-in">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              LOG OUT
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Menu>
            <MenuHandler >
              <IconButton variant="text" color="blue-gray">
                <IconButton variant="text" color="blue-gray" onClick={() => setIsShowed(true)}>
                  <BellIcon className="h-5 w-5 text-blue-gray-500" />
                </IconButton>
                {users.length > 0 && !isShowed ? (
                  <div className="absolute -top-0 -right-1 bg-blue-500 text-white rounded-full flex items-center justify-center w-4 h-4 text-xs">
                    {users.length}
                  </div>
                ) : null}
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
            <Link to='/dashboard/users'>
              {users.map((user) => (
                <div key={user._id}>

                  <MenuItem className="flex items-center gap-4">
                    <Avatar
                      src={ user.profile_image ? `http://127.0.0.1:5000/${user.profile_image}` : DefaultAvart}
                      alt={user.contact_person}
                      size="sm"
                      variant="circular"
                    />
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-1 font-normal"
                      >
                        <strong>New message</strong> from {user.contact_person}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                      >
                        <ClockIcon className="h-3.5 w-3.5" /> {getTimeDifference(user.created_at)}
                      </Typography>
                    </div>
                  </MenuItem>
                </div>
              ))}
              </Link>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
