import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls");
  const handleDeleteImg = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue("imageUrls", existingImageUrls.filter((url) => url !== imageUrl))

  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded w-full p-5 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group" key={url}>
                <img
                  src={url}
                  className="min-h-full object-cover"
                  alt="Hotel images"
                />
                <button
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 hover:text-white hover:font-semibold "
                  onClick={(event) =>handleDeleteImg(event, url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <label className="flex-1">
          <input
            type="file"
            multiple
            accept="image/*"
            className=" font-normal text-sm"
            {...register("imageFiles", {
              validate: (imageFiles) => {
                const totalLength = imageFiles.length + (existingImageUrls?.length || 0);
                if (totalLength === 0)
                  return "At least one image should be added";

                if (totalLength > 6)
                  return "Total number of images can't be more than 6";

                return true;
              },
            })}
          />

          {errors.imageFiles && (
            <span className="text-red-500 text-sm font-bold">
              {errors.imageFiles.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
export default ImageSection;
