import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Spinner from "../components/Spinner"

const MyBookings = () => {
  const { data: hotels, isLoading } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if(isLoading) return <Spinner />

  if (!hotels || hotels.length === 0) {
    return <span>No booking found</span>;
  }
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        {hotels.map((hotel) => (
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] border border-slate-300 rounded-lg p-5 gap-5"
            key={hotel._id}
          >
            <div className="lg:w-full lg-h-[250px]">
              <img
                src={hotel.imageUrls[0]}
                alt={hotel.name}
                className="w-full h-full object-cover object-center rounded"
              />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[240px] min-h-[240px]">
              <div className="text-2xl font-bold">
                {hotel.name}
                <div className="text-xs text-gray-800">
                  {hotel.city}, {hotel.country}
                </div>
              </div>
              {hotel.bookings.map((booking) => (
                <div key={booking._id}>
                  <div>
                    <span className="font-bold mr-2 text-gray-700">
                      Dates:{" "}
                    </span>
                    <span className="text-sm text-gray-600">
                      {new Date(booking.checkIn).toDateString()} -
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold mr-2 text-gray-700">
                      Guests:{" "}
                    </span>
                    <span className="text-sm text-gray-600">
                      {booking.adultCount} adults & {booking.childCount}{" "}
                      childrens
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyBookings;
