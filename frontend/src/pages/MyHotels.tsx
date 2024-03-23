import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BsBuilding, BsFillStarFill } from "react-icons/bs";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { BiHotel, BiMoney } from "react-icons/bi";
import Spinner from "../components/Spinner";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData, isLoading } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  if(isLoading) return <Spinner />
  return (
    <div className="space-y-5">
      <span className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="rounded p-4 bg-blue-500 hover:bg-blue-600 text-white font-bold"
        >
          Add Hotel
        </Link>
      </span>
      <div className="flex flex-col gap-8">
        {!hotelData ? (
          <div className="flex w-full justify-center items-center">
            <h2 className="text-center">No hotel found!</h2>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            {hotelData?.map((hotel) => (
              <div
                className="flex flex-col justify-between border border-slate-300 rounded p-8 gap-5"
                key={hotel._id}
              >
                <div>
                  <h2 className="text-2xl font-bold">{hotel.name}</h2>
                  <span className="text-gray-700 text-sm">
                    {hotel.city}, {hotel.country}
                  </span>

                  <span className="text-gray-700 flex items-center text-sm">
                    <span className="font-semibold">{hotel.starRating}</span>
                    <BsFillStarFill className="mx-1 fill-yellow-400" /> Star
                    Rating
                  </span>
                </div>
                <div className="whitespace-pre-line text-gray-600 line-clamp-5">
                  {hotel.description}
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <div className="border border-slate-300 rounded-full px-3 py-1 bg-gray-200 text-gray-700 font-semibold flex items-center whitespace-nowrap">
                    <BsBuilding className="mr-1 flex-none" />
                    {hotel.type}
                  </div>
                  <div className="border border-slate-300 rounded-full px-3 py-1 bg-gray-200 text-gray-700 font-semibold flex items-center whitespace-nowrap">
                    <BiMoney className="mr-1 flex-none" />
                    {hotel.pricePerNight} per night
                  </div>

                  <div className="border border-slate-300 rounded-full px-3 py-1 bg-gray-200 text-gray-700 font-semibold flex items-center whitespace-nowrap">
                    <BiHotel className="mr-1 flex-none" />
                    {hotel.adultCount} Adults, {hotel.childCount} Child
                  </div>
                </div>
                <span className="flex justify-end">
                  <Link
                    to={`/edit-hotel/${hotel._id}`}
                    className="rounded py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                  >
                    View Detail
                  </Link>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MyHotels;
