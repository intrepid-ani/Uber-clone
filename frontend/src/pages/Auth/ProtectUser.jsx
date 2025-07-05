import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useUserContext from "../../context/UserContext.jsx";

function ProtectUser({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { userContext, setUserContext } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Start loading
    if (!token) {
      navigate("/login");
      toast("Login required to access");
      setIsLoading(false); // Stop loading if no token
    } else {
      const getProfile = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_END_POINT}/user/profile`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          console.log({
            fulllname: {
              firstName: response.data.fullname.firstName,
              lastName: response.data.fullname.lastName,
            },
            email: response.data.email,
          });
          setUserContext({
            fullname: {
              firstName: response.data.fullname.firstName,
              lastName: response.data.fullname.lastName,
            },
            email: response.data.email,
          });
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          localStorage.removeItem("token");
          setIsLoading(false); // Stop loading on error
          toast.error(error.message);
        }
      };

      getProfile();
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div id="Inside">{children}</div>;
}

export default ProtectUser;
