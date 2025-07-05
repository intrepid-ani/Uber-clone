import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import useCaptianContext from "../context/CaptainContext";
import { useNavigate } from "react-router";

function SigninCaptain() {
  const [captain, setCaptain] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vehicleName: "",
    numPlate: "",
    vehicleType: "",
    capacity: "",
  });

  const navigate = useNavigate();
  const { captainContext, setCaptainContext } = useCaptianContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaptain((prevCaptain) => ({ ...prevCaptain, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const captainData = {
        fullname: {
          firstName: captain.firstName,
          lastName: captain.lastName,
        },
        email: captain.email,
        password: captain.password,
        vehicle: {
          name: captain.vehicleName,
          numPlate: captain.numPlate,
          type: captain.vehicleType,
          capacity: captain.capacity,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_END_POINT}/captain/register`,
        captainData
      );

      if (response.status >= 200) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        setCaptainContext(captainData);
        navigate("/captain/home");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status >= 400) {
        toast.error(error.response.data.message || error.response.data.error);
      } else {
        // Handle unexpected errors
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-black">
      <div className="shadow-lg rounded-lg px-8 py-4 w-full max-w-sm ">
        <h2 className="text-xl font-bold text-center bg-gradient-to-bl from-gray-200 to-gray-100 text-transparent bg-clip-text mb-6">
          Register as <span className="text-white">Captain</span>
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex gap-1">
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                name="firstName"
                placeholder="Enter first name"
                value={captain.firstName}
                onChange={handleChange}
                className="rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50 placeholder:text-sm"
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
                placeholder="Enter last name"
                value={captain.lastName}
                onChange={handleChange}
                className="rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50 placeholder:text-sm"
              />
            </div>
          </div>
          {/* Email */}
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
              value={captain.email}
              onChange={handleChange}
              className="rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50 placeholder:text-sm"
            />
          </div>

          {/* Password */}
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
              value={captain.password}
              onChange={handleChange}
              className="rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50 placeholder:text-sm"
            />
          </div>

          {/* Vehicle Details */}
          <div className="flex gap-1">
            <div>
              {/* Vehicle Name */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-300 mb-1"
                  htmlFor="vehicleName"
                >
                  Vehicle Name
                </label>
                <input
                  name="vehicleName"
                  placeholder="Enter vehicle name"
                  value={captain.vehicleName}
                  onChange={handleChange}
                  className="rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50 placeholder:text-sm"
                />
              </div>

              {/* Vehicle Number Plate */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-300 mb-1"
                  htmlFor="numPlate"
                >
                  Number Plate
                </label>
                <input
                  name="numPlate"
                  placeholder="Enter vehicle number"
                  value={captain.numPlate}
                  onChange={handleChange}
                  className="rounded-lg pl-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50 placeholder:text-sm"
                />
              </div>
            </div>

            <div>
              {/* Vehicle Type */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-300 mb-1"
                  htmlFor="vehicleType"
                >
                  Vehicle Type
                </label>
                <select
                  name="vehicleType"
                  value={captain.vehicleType}
                  onChange={handleChange}
                  className="rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50 placeholder:text-sm "
                >
                  <option
                    className="text-sm text-gray-300"
                    value=""
                    unselectable="true"
                  >
                    Select Vehicle Type
                  </option>
                  <option className="text-sm text-gray-300" value="motorBike">
                    MotorBike
                  </option>
                  <option className="text-sm text-gray-300" value="auto">
                    Auto
                  </option>
                  <option className="text-sm text-gray-300" value="car">
                    Car
                  </option>
                </select>
              </div>
              {/* Vehicle Capacity */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-300 mb-1"
                  htmlFor="capacity"
                >
                  Capacity
                </label>
                <input
                  min={1}
                  name="capacity"
                  type="text"
                  placeholder="Enter capacity"
                  value={captain.capacity}
                  onChange={handleChange}
                  className="rounded-lg px-4 py-1.5 w-full bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-50 placeholder:text-sm"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-50 text-gray-900 rounded-lg px-4 py-1.5 font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 my-4 cursor-pointer"
          >
            Register
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

export default SigninCaptain;
