import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/MyHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const navigate = useNavigate()
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ''),
    {
      enabled: !!hotelId,
    }
  );

  const {showToast} = useAppContext()
  const {mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel updated successfully", type: "SUCCESS"})
      navigate("/my-hotels")
    }, onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR"})

    }
  })

  const handleSave = (updatedFormData: FormData) => {
    mutate(updatedFormData)
  }

  return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>;
};
export default EditHotel;
