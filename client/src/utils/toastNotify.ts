import { toast } from "react-toastify";

export const toastNotify = (text: string) => {
  const notify = () => toast(text);

  notify();
};
