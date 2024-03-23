import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };


  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-2 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-5 items-center gap-2"
    >
      <div className="flex flex-row flex-1 items-center bg-white py-1 px-2  rounded">
        
        <input
          type="text"
          className="w-full text-md focus:outline-none placeholder:text-sm p-1 placeholder:text-center"
          placeholder="Where are you going?"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex bg-white py-2.5 rounded text-sm px-2 gap-2">
        <label className="items-center flex w-full gap-1">
          Adults:
          <input
            className="w-full text-md focus:outline-none font-bold text-center"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex w-full gap-1">
          Child:
          <input
            type="number"
            className="w-full text-md focus:outline-none font-bold text-center"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className="flex-1">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full bg-white p-2 focus:outline-none rounded  text-center placeholder:text-sm"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex-1">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="w-full bg-white p-2 focus:outline-none rounded text-center placeholder:text-sm"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button className="w-full bg-blue-600 text-white h-full p-2 font-bold rounded hover:bg-blue-700" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
