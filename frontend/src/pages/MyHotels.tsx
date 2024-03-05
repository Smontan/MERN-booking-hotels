import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );
  return (
    <div className="space-y-5">
      <span className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="rounded py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold"
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
          hotelData?.map((hotel) => {
            return (
              <div
                className="flex flex-col justify-between border border-slate-300 rounded p-8 gap-5"
                key={hotel._id}
              >
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <div className="border border-slate-300 rounded p-3 flex items-center justify-center whitespace-nowrap">
                    <BsMap className="mr-1 flex-none" />
                    {hotel.city}, {hotel.country}
                  </div>
                  <div className="border border-slate-300 rounded p-3 flex items-center whitespace-nowrap">
                    <BsBuilding className="mr-1 flex-none" />
                    {hotel.type}
                  </div>
                  <div className="border border-slate-300 rounded p-3 flex items-center whitespace-nowrap">
                    <BiMoney className="mr-1 flex-none" />
                    {hotel.pricePerNight} per night
                  </div>
                  <div className="border border-slate-300 rounded p-3 flex items-center whitespace-nowrap">
                    <BiStar className="mr-1 flex-none" />
                    {hotel.starRating} Star Rating
                  </div>
                  <div className="border border-slate-300 rounded p-3 flex items-center whitespace-nowrap">
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
            );
          })
        )}
      </div>
    </div>
  );
};
export default MyHotels;
