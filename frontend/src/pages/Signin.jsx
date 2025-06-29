import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";

function Signin() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_END_POINT}/user/register`,
        {
          fullname: {
            firstName: user.firstName,
            lastName: user.lastName,
          },
          email: user.email,
          password: user.password,
        }
      );
      toast.success(`${response.data?.message}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };
  return (
    <div className=" flex justify-center items-center bg-black">
      <div className="  shadow-lg rounded-lg px-8 py-4 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center bg-gradient-to-bl from-gray-200 to-gray-100 text-transparent bg-clip-text mb-6">
          Register at <span className="text-white">Uber</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-300 mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              name="firstName"
              placeholder="Enter your first name"
              value={user.firstName}
              onChange={handleChange}
              className=" rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-300 mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              name="lastName"
              placeholder="Enter your last name"
              value={user.lastName}
              onChange={handleChange}
              className=" rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
          </div>

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
              className=" rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50"
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
              className=" rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-50 text-gray-900 rounded-lg px-4 py-1.5 font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 my-4 cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <div className="mb-4">
          <span className="block text-xs font-medium text-gray-400">
            Already have account?
            <Link className="text-gray-300 underline mx-1" to="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signin;
