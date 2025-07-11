import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Land from "./pages/Land";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import SigninCaptain from "./pages/Signin-captain";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./pages/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import ProtectCaptain from "./pages/Auth/ProtectCaptain.jsx";
import ProtectUser from "./pages/Auth/ProtectUser.jsx";

function ErrorBoundary() {
  return <div>Something went wrong. Please try again later.</div>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Land />} />
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<Signin />} />
        <Route path="captain/signin" element={<SigninCaptain />} />
        <Route
          path="home"
          element={
            <ProtectUser>
              <Home />
            </ProtectUser>
          }
        />
        <Route
          path="captain/home"
          element={
            <ProtectCaptain>
              <CaptainHome />
            </ProtectCaptain>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Route>
  )
);

export default router;
