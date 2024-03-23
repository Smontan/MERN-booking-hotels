import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [menuToggle, setMenuToggle] = useState<Boolean>(false);
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between px-2 xl:px-0 items-center relative">
        <span className="text-md md:text-2xl text-white font-bold tracking-tight ">
          <Link to="/">MernBooking</Link>
        </span>

        <div className="space-x-2 hidden md:block">
          {isLoggedIn ? (
            <>
              <span className=" text-white md:font-semibold  rounded p-2.5 md:py-2.5 md:px-4   hover:bg-blue-500 ">
                <Link to="/my-bookings">My booking</Link>
              </span>
              <Link
                to="/my-hotels"
                className=" text-white  md:font-semibold rounded p-2.5 md:py-2.5 md:px-4    hover:bg-blue-500 "
              >
                My hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className=" text-blue-600 rounded py-2 px-4 font-bold  bg-gray-50 hover:bg-gray-100 "
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="  rounded py-2 px-4 font-bold  border border-white text-white hover:bg-blue-700 "
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <FaBars
            className={
              menuToggle
                ? "hidden"
                : "text-white text-lg cursor-pointer hover:text-gray-100"
            }
            onClick={() => setMenuToggle(!menuToggle)}
          />
          <div className={menuToggle ? "block" : "hidden"}>
            <div className="absolute w-screen h-screen bg-red"></div>
            {isLoggedIn ? (
              <>
                <span className=" text-white md:font-semibold  rounded p-2.5 md:py-2.5 md:px-4   hover:bg-blue-500 ">
                  <Link to="/my-bookings">My booking</Link>
                </span>
                <Link
                  to="/my-hotels"
                  className=" text-white  md:font-semibold rounded p-2.5 md:py-2.5 md:px-4    hover:bg-blue-500 "
                >
                  My hotels
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className=" text-blue-600 rounded py-2 px-4 font-bold  bg-gray-50 hover:bg-gray-100 "
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="  rounded py-2 px-4 font-bold  border border-white text-white hover:bg-blue-700 "
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
