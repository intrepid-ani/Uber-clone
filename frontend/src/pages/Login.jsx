import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import useUserContext from "../context/UserContext.jsx";
import useCaptianContext from "../context/CaptainContext.jsx";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    userType: "", // Add userType to track the selected radio button
  });

  const navigate = useNavigate();

  const { setUserContext } = useUserContext();
  const { setCaptainContext } = useCaptianContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_END_POINT}/${user.userType}/login`,
        {
          email: user.email,
          password: user.password,
        }
      );
      if (response.status >= 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        if (user.userType === "user") {
          setUserContext(response);
          localStorage.setItem("userType", "user");
          navigate("/home");
        } else {
          localStorage.setItem("userType", "captain");
          setCaptainContext(response);
          navigate("/captain/home");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.request.status <= 400) {
        toast.error(error.response.data.message);
      } else {
        toast("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-black">
      <div className="shadow-lg rounded-lg px-8 py-4 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center bg-gradient-to-bl from-gray-200 to-gray-100 text-transparent bg-clip-text mb-6">
          Welcome back,
          <br /> Log In to continue
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-300 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              className="rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-300 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              className="rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50"
              required
            />
          </div>

          <span className="mr-2 text-sm font-medium text-gray-300">
            Log in as:{" "}
          </span>
          <div className="mb-2 inline-flex">
            <div className="mr-2.5">
              <input
                type="radio"
                id="user"
                name="userType"
                value="user"
                onChange={handleChange}
                required
              />
              <label
                htmlFor="user"
                className="text-sm ml-1.5 text-center font-medium text-gray-300"
              >
                User
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="captain"
                name="userType"
                value="captain"
                onChange={handleChange}
              />
              <label
                htmlFor="captain"
                className="text-sm ml-1.5 text-center font-medium text-gray-300"
              >
                Captain
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-50 text-gray-900 rounded-lg px-4 py-1.5 font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 my-4 cursor-pointer"
          >
            Log In
          </button>
        </form>
        <div className="mb-4">
          <span className="block text-xs font-medium text-gray-400">
            Don't have account? Regsister as
            <Link className="text-gray-300 underline mx-1" to="/signin">
              User
            </Link>
            <span>/</span>
            <Link className="text-gray-300 underline mx-1" to="/signin-captain">
              Captain
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
