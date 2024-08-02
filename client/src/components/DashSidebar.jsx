import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocumentText } from "react-icons/hi";
import { signoutSuccess } from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import api from "../axios.config.js";

function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await api.post("/auth/signout");
      const data = res.data;
      if (data.success === false) {
        console.log(data.message);
      }
      if (res.statusText === "OK") {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=post">
              <Sidebar.Item
                active={tab === "post"}
                icon={HiDocumentText}
                as="div"
              >
                Post
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            onClick={handleSignOut}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
