import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

export const toastNotify = (
  text: string,
  navigate?: NavigateFunction,
  postId?: number
) => {
  const notify = () =>
    toast(text, {
      onClick: () => {
        if (navigate) {
          navigate(`/post/${postId}`);
          navigate(0);
        }
      },
    });

  notify();
};
