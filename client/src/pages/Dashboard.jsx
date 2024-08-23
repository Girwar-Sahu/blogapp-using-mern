import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const DashProfile = lazy(() => import("../components/DashProfile"));
const DashPosts = lazy(() => import("../components/DashPost"));
const DashUsers = lazy(() => import("../components/DashUsers"));
const DashComment = lazy(() => import("../components/DashComment"));
const Dash = lazy(() => import("../components/Dashboard"));
import DashSidebar from "../components/DashSidebar";
import { Spinner } from "flowbite-react";

const loading = (
  <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen">
    <Spinner size="lg" />
  </div>
);

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
        <Suspense fallback={loading}>
          <DashProfile />
        </Suspense>
      )}
      {tab === "comment" && (
        <Suspense fallback={loading}>
          <DashComment />
        </Suspense>
      )}
      {tab === "post" && (
        <Suspense fallback={loading}>
          <DashPosts />
        </Suspense>
      )}
      {tab === "users" && (
        <Suspense fallback={loading}>
          <DashUsers />
        </Suspense>
      )}
      {tab === "dash" && (
        <Suspense fallback={loading}>
          <Dash />
        </Suspense>
      )}
    </div>
  );
}

export default Dashboard;
