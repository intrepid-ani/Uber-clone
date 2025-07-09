import uberLogo from "/uberlogo.png";
import user_pfp from "/default_pfp.png";
import captain_pfp from "/captainprofile.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import useUserContext from "../context/UserContext.jsx";
import useCaptainContext from "../context/CaptainContext.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function UberLogo() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const { userContext, setUserContext } = useUserContext();
  const { captainContext, setCaptainContext } = useCaptainContext();
  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authPath = ["/login", "/signin", "/signin/captain"];
  let link = "";

  if (userType === "user") {
    link = `${import.meta.env.VITE_END_POINT}/user/profile`;
  } else if (userType === "captain") {
    link = `${import.meta.env.VITE_END_POINT}/captain/getprofile`;
  } else {
    // handle unexpected type
    setIsLoggedIn(false);
    setIsLoading(false);
  }

  useEffect(() => {
    if (authPath.includes(location.pathname)) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [location]);

  useEffect(() => {
    setIsLoading(true);

    if (!token && !userType) {
      setIsLoggedIn(false);
      setIsLoading(false);
    } else {
      axios
        .get(link, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (userType == "user") {
            setUserContext({
              fullname: {
                firstName: response.data.fullname.firstName,
                lastName: response.data.fullname.lastName,
              },
              email: response.data.email,
            });
          } else {
            setCaptainContext({
              fullname: {
                firstName: response.data.fullname.firstName,
                lastName: response.data.fullname.lastName,
              },
              email: response.data.email,
              vehicle: {
                name: response.data.vehicle.name,
                numPlate: response.data.vehicle.numPlate,
                type: response.data.vehicle.type,
                capacity: response.data.vehicle.capacity,
              },
            });
          }

          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoggedIn(false);
          setIsLoading(false);
        });
    }
  }, [token, userType]);

  return (
    <div className="relative top-0 z-10 w-full bg-black/95">
      <div className="flex justify-between items-center p-2 md:px-10 shadow-xl/35 shadow-black">
        <div className="w-[16%] sm:w-[5%] cursor-pointer">
          <Link to="/">
            <img src={uberLogo} alt="UBER" />
          </Link>
        </div>
        {isLoading ? (
          <div></div>
        ) : isLoggedIn ? (
          !isHidden && (
            <div
              id="profile"
              className="cursor-pointer rounded-full w-[10%] max-w-8 border-2 border-white overflow-hidden flex justify-between items-center hover:scale-105 hover:grayscale-100"
            >
              {/* Might use Name dynamically */}
              <img
                src={userType === "user" ? user_pfp : captain_pfp}
                alt={`${userType} Profile`}
                className="bg-cover"
              />
            </div>
          )
        ) : (
          !isHidden && (
            <div className="flex justify-center items-center gap-2 font-semibold">
              <Link to="/login">
                <button className="px-3 py-1 text-xs active:scale-90 border-2 rounded-2xl text-center cursor-pointer hover:bg-neutral-800 hover:scale-105">
                  Login
                </button>
              </Link>

              <Link to="/signin">
                <button className="bg-amber-50 text-gray-800 px-3 py-1 text-xs rounded-xl cursor-pointer hover:shadow-sm shadow-gray-300 hover:scale-105 active:scale-90 transition-all duration-200 border">
                  Register
                </button>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default UberLogo;
