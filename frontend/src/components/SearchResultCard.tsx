import { Link } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";

type SearchResultCardType = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: SearchResultCardType) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      {/* hotel image */}
      <div className="w-full h-[280px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded"
          alt="Hotel image"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        {/* hotel name and rating and type */}
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                  <AiFillStar className="fill-yellow-400" key={index}/>
              ))}
            </span>
            <span className="ms-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        {/* hotel description */}
        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 2).map((facility) => (
              <span
                className="bg-slate-300 py-1 px-2 rounded-full font-bold text-xs"
                key={facility}
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 2 &&
                `+${hotel.facilities.length - 2} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">${hotel.pricePerNight}</span>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-blue-600 text-white h-full p-2 font-bold  max-w-fit hover:bg-blue-500 rounded"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResultCard;
