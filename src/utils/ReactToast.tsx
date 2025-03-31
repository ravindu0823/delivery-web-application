import toast from "react-hot-toast";
import { ReactHotToastProps } from "./Props";

export const ReactToast = ({ message, type }: ReactHotToastProps) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "loading":
      toast.loading(message);
      break;
    default:
      toast(message);
      break;
  }
};
