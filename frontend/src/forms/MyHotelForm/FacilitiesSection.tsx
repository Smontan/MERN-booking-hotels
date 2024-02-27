import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="flex gap-1 text-gray-700 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                required: "This field is required",
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 font-bold text-sm">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};
export default FacilitiesSection;
