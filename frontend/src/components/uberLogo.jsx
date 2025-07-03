import uberLogo from "/uberlogo.png";
import user_pfp from "/default_pfp.png";
import { Link } from "react-router";

function UberLogo() {
  return (
    <div className="relative top-0 z-10 w-full bg-black/95">
      <div className="flex justify-between items-center p-2 md:px-10 shadow-xl/35 shadow-black">
        <div className="w-[16%] sm:w-[5%] cursor-pointer">
          <Link to="/">
            <img src={uberLogo} alt="UBER" />
          </Link>
        </div>
        <div
          id="profile"
          className="rounded-full w-[10%] max-w-8 border-2 border-white overflow-hidden flex justify-between items-center"
        >
          {/* Might use Name dynamically */}
          <img src={user_pfp} alt="user_pfp" />
        </div>
      </div>
    </div>
  );
}

export default UberLogo;
