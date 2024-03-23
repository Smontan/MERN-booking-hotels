import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import Spinner from "../components/Spinner";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    { enabled: !!hotelId }
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      {/* Hotel Name and Rating */}
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar className="fill-yellow-400" key={index} />
          ))}
        </span>
        <h1 className="text-3xl font-bold pb-2 ">{hotel.name}</h1>
        <h4 className="font-semibold text-gray-500">
          {hotel.city}, {hotel.country}
        </h4>
      </div>
      {/* Hotel Images */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
        {hotel.imageUrls.map((image) => (
          <div className="h-[300px] shadow-md" key={image}>
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-center object-cover"
            />
          </div>
        ))}
      </div>

      {/* Hotel Description */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="flex flex-col gap-8">
          {/* Hotel Facilities */}
          <div className="flex gap-4">
            {hotel.facilities.map((facility) => (
              <div
                className="border border-slate-300 bg-slate-50 rounded-full py-2 px-4 text-sm font-bold text-gray-500"
                key={facility}
              >
                {facility}
              </div>
            ))}
          </div>
          <div className="whitespace-pre-line max-w-[720px]">
            {hotel.description}
          </div>
        </div>
        <div className="h-fit">
          <GuestInfoForm
            hotelId={hotel._id}
            pricePerNight={hotel.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};
export default Detail;
