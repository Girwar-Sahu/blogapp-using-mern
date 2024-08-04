import React, {lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const DashProfile = lazy(()=> import('../components/DashProfile'))
const DashPosts = lazy(()=> import('../components/DashPost'))
const DashUsers = lazy(()=> import('../components/DashUsers'))
const DashNewPost = lazy(()=> import('./CreatePost'))
import DashSidebar from "../components/DashSidebar";


function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === "profile" && (
        <Suspense fallback={<p>Loading...</p>}>
          <DashProfile />
        </Suspense>
      )}
      {tab === "newpost" && (
        <Suspense fallback={<p>Loading...</p>}>
          <DashNewPost />
        </Suspense>
      )}
      {tab === "post" && (
        <Suspense fallback={<p>Loading...</p>}>
          <DashPosts />
        </Suspense>
      )}
      {tab === "users" && (
        <Suspense fallback={<p>Loading...</p>}>
          <DashUsers />
        </Suspense>
      )}
    </div>
  );
}

export default Dashboard;
