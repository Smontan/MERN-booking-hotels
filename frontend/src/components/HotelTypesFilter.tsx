import { ChangeEvent } from "react";
import { hotelType } from "../config/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Types</h4>
      {hotelType.map((hotelType) => (
        <label className="flex items-center space-x-2" key={hotelType}>
          <input
            type="checkbox"
            className="rounded"
            value={hotelType}
            checked={selectedHotelTypes.includes(hotelType)}
            onChange={onChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
};
export default HotelTypesFilter;
