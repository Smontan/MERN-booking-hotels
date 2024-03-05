import { useMutation } from "react-query";

import { useAppContext } from "../contexts/AppContext";
import ManageHotelForm from "../forms/MyHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
  const navigate = useNavigate()
  const { showToast } = useAppContext();
  const { mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
      navigate("/my-hotels")
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
