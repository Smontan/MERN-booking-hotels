import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/Login";
import { HotelType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  // fetch data from api using post method
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  // check if the response is ok or not
  if (!response.ok) throw new Error(responseBody.message);
};

export const login = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  // check if the response is valid
  if (!response.ok) throw new Error("Token invalid");

  //
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) throw new Error("Something went wrong during signout");
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
    method: "POST",
    body: hotelFormData,
  });

  if (!response.ok) throw new Error("Failed to add hotel");

  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error fetching hotels");

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string) : Promise<HotelType> =>  {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  })

  if(!response.ok) throw new Error("Error fetching Hotel")

  return response.json();
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
    credentials: "include",
    method: "PUT",
    body: hotelFormData,
  })

  if(!response.ok) throw new Error("Failed to update this Hotel")

  return response.json();
}