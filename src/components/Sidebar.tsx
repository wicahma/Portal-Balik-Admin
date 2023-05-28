import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import Router from "next/router";
import React from "react";

const NavList = (props: any) => {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          href="/"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          <Button color="red" size="sm" type="button">
            Logout
          </Button>
        </Link>
      </Typography>
    </ul>
  );
};

const Sidebars = () => {
  const [open, setOpen] = React.useState<number>(0),
    router = Router,
    [openSidebar, setOpenSidebar] = React.useState<boolean>(false);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-[900]">
        <Button
          color="white"
          className="p-3 flex items-center gap-3"
          onClick={() => handleSidebar()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 aspect-square"
          >
            <path
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 012 10z"
              clip-rule="evenodd"
            />
          </svg>
          Sidebar
        </Button>
      </div>
      <div
        className={`bg-black/50 w-screen left-0 h-screen transition-all fixed top-0 ${
          openSidebar ? "opacity-100 z-[1000]" : "opacity-0 z-[-1]"
        }`}
        onClick={(e) => {
          handleSidebar();
        }}
      >
        <Card
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-4 h-[calc(100vh-2rem)] delay-50 transition-transform w-full max-w-[20rem] p-2 shadow-xl z-[1100] shadow-blue-gray-900/5 ${
            openSidebar ? "translate-x-4" : "-translate-x-1/3"
          }`}
        >
          <Button
            size="sm"
            className="p-2 shadow-none flex items-center w-max-full gap-3 m-2 capitalize text-xl"
            color="white"
            onClick={() => handleSidebar()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 aspect-square"
            >
              <path
                strokeOpacity={1}
                stroke="#263238"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.8}
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            Portal Balik
          </Button>
          <List>
            <ListItem
              onClick={() => {
                handleSidebar();
                router.push("/dashboard");
              }}
            >
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 aspect-square"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                    clip-rule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </ListItem>
            <ListItem
              onClick={() => {
                handleSidebar();
                router.push("/dashboard/laporan");
              }}
            >
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 aspect-square"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Laporan barang
              </Typography>
            </ListItem>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem
              className="bg-red-200 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-700 hover:text-white active:text-white focus:text-white"
              onClick={() => {
                handleSidebar();
                router.push("/");
              }}
            >
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 aspect-square"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clip-rule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
};

export default Sidebars;
