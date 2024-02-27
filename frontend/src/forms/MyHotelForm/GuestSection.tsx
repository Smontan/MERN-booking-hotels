import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="flex gap-4 p-5 rounded bg-gray-300 ">
        <label className="flex-1 text-gray-700 font-bold text-sm">
          Adults
          <input
            type="number"
            min={1}
            className="border rounded w-full px-2 py-1 font-normal"
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="flex-1 text-gray-700 font-bold text-sm">
          Childs
          <input
            type="number"
            min={0}
            className="border rounded w-full px-2 py-1 font-normal"
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
export default GuestSection;
