import { BsLinkedin, BsMailbox2Flag } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-blue-800 pt-10">
      <div className="container mx-auto flex flex-col  pb-10 xl:flex-row gap-16 justify-between px-2 xl:px-0">
        <div className="flex max-w-[800px] flex-col gap-2 ">
          <span className="text-3xl text-white font-bold tracking-tight">
            <Link to="/">MernBooking</Link>
          </span>
          <p className="text-white">
            This website is created with inspiration from booking.com, the
            world's leading online accommodation platform. Created Frontend in
            React with Typescript and including{" "}
            <span>
              <i>
                "react-datepicker, react-hook-form, react-query,
                react-router-dom and react-icons"
              </i>
            </span>
            , Backend powered by Express in Server, Node.js with Typescript, MongoDB in Database,
            Cloudinary SDK in saving images and lastly Stripe regarding on
            Payment transaction.
          </p>
        </div>

        <div className=" flex flex-col lg:flex-auto gap-2">
          <h3 className="text-white font-bold text-2xl">Contact me</h3>
          <p className="text-white">
            <span className="text-white font-bold">Phone: </span>{" "}
            +6398-5520-6737
          </p>
          <div className="flex gap-4 mt-4">
            <Link to="https://facebook.com/profile.php?id=61550669022239">
              <FaFacebook className="h-8 w-8 text-gray-100 hover:text-gray-200 cursor-pointer" />
            </Link>
            <Link to="https://www.linkedin.com/in/sherwin-montañez-a6b038215">
              <BsLinkedin className="h-8 w-8 text-gray-100 hover:text-gray-200 cursor-pointer" />
            </Link>
            <Link to="https://sherwinmontanez0@gmail.com">
              <BsMailbox2Flag className="h-8 w-8 text-gray-100 hover:text-gray-200 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="border-t border-slate-50 border-opacity-40 py-4">
          <p className="text-center text-white font-semibold text-sm">
            © 2024 <Link to="https://dev-shin.netlify.app">Dev-shin</Link> . All
            Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
