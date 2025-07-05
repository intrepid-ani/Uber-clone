import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useCaptainContext from "../../context/CaptainContext.jsx";

function ProtectCaptain({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const { captainContext, setCaptainContext } = useCaptainContext();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true);

    if (!token) {
      toast("Login required to access");
      navigate("/login");
      isLoading(false);
    }

    axios
      .get(`${import.meta.env.VITE_END_POINT}/captain/getProfile`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
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

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Captain Not Found");
        setIsLoading(false);
        navigate("/login");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default ProtectCaptain;
