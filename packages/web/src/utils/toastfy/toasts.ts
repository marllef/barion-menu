import { toast } from "react-toastify";

export const showError = (message: string, id = "error") =>
  toast(message, {
    type: "error",
    toastId: id,
    theme: "colored",
  });

export const showSuccess = (message: string, id = "success") =>
  toast(message, {
    type: "success",
    toastId: id,
    theme: "colored",
  });
