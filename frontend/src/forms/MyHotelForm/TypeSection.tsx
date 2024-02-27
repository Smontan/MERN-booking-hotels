import { useFormContext } from "react-hook-form";
import { hotelType } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3"> Type</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {hotelType.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer rounded-full px-4 py-2 font-semibold text-sm bg-blue-300 text-center"
                : "cursor-pointer rounded-full px-4 py-2 font-semibold text-sm bg-gray-300 text-center"
            }
            key={type}
          >
            <input
              type="radio"
              value={type}
              className="hidden"
              {...register("type", {
                validate: (facility) => {
                  if (!facility) return "At least one facility is required";
                  return true;
                },
              })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 font-bold text-sm">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};
export default TypeSection;
