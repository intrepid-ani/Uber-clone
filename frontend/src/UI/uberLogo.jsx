import uberLogo from "/uberlogo.png";
import default_user_pic from "/default_profile_pic.png";

function UberLogo() {
  return (
    <div className="sticky top-0 z-10 w-full bg-black/95">
      <div className="flex justify-between items-center p-2 md:px-10 shadow-xl shadow-black">
        <div className="w-[16%] sm:w-[8%]">
          <img src={uberLogo} alt="UBER" />
        </div>
        <div
          id="profile"
          className="rounded-full w-10 border-2 border-white overflow-hidden p-auto"
        >
          <img src={default_user_pic} alt="Profile" />
        </div>
      </div>
    </div>
  );
}

export default UberLogo;
