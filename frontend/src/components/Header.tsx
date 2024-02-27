import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className=" space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/" className=" text-white p-3 hover:bg-blue-600 font-bold rounded">My booking</Link>
              <Link to="/" className=" text-white p-3 hover:bg-blue-600 font-bold rounded">My hotels</Link>
              <SignOutButton />
              
            </>
          ) : (
            <>
              <Link
                to="/login"
                className=" text-blue-600 p-3 bg-gray-50 hover:bg-gray-100 font-bold" 
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className=" text-blue-600 p-3 bg-gray-50 hover:bg-gray-100 font-bold" 
              >
                Sign up
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
