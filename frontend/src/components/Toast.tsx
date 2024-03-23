import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 p-4 bg-green-600 bg-opacity-90  rounded font-bold text-white max-w-md z-10"
      : "fixed top-4 right-4 p-4 bg-red-600 bg-opacity-90 rounded font-bold text-white max-w-md z-10";

  return (
    <div className={styles}>
      <div className="flex items-center justify-center">
        <span>{message}</span>
      </div>
    </div>
  );
};
export default Toast;
