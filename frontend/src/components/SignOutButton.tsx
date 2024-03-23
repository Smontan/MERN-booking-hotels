import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      showToast({ message: "Logout successfully!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className=" text-blue-600 rounded py-2 px-4 font-bold  bg-gray-50 hover:bg-gray-100 m-0"
    >
      Sign out
    </button>
  );
};
export default SignOutButton;
