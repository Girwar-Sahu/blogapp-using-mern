import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdmin from "./components/OnlyAdmin";
import ScrollToTop from "./components/ScrollToTop";
const HomePage = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const ProjectPage = lazy(() => import("./pages/Projects"));
const SignInPage = lazy(() => import("./pages/SignIn"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const CreatePostPage = lazy(() => import("./pages/CreatePost"));
const UpdatePostPage = lazy(() => import("./pages/UpdatePost"));
const PostPage = lazy(() => import("./pages/Post"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <PostPage />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <DashboardPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/project"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <SignInPage />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <SignUpPage />
            </Suspense>
          }
        />
        <Route element={<OnlyAdmin />}>
          <Route
            path="/create-post"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <CreatePostPage />
              </Suspense>
            }
          />
          <Route
            path="/update-post/:postId"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <UpdatePostPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
