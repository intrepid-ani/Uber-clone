import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Land from "./pages/Land";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import SigninCaptain from "./pages/Signin-captain";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Land />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signin-captain" element={<SigninCaptain />} />
    </Route>
  )
);

export default router;
