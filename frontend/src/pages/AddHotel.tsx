import { useMutation } from "react-query";

import { useAppContext } from "../contexts/AppContext";
import ManageHotelForm from "../forms/MyHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }

  return (
      <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
  );
};
export default AddHotel;
