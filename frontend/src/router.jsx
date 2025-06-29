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

function ErrorBoundary() {
  return <div>Something went wrong. Please try again later.</div>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route path="/" element={<Land />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signin-captain" element={<SigninCaptain />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export default router;
