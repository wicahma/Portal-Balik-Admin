import { Alert } from "@material-tailwind/react";
import { AlertProps, reduxState } from "@/interfaces/reduxInterface";
import { colors } from "@material-tailwind/react/types/generic";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Alerts = () => {
  const dispatch = useDispatch();
  const { show, message, type } = useSelector(
    (state: reduxState) => state.main.alert
  );
  const [color, setColor] = React.useState<colors | undefined>();

  useEffect(() => {
    switch (type) {
      case "success":
        setColor("green");
        break;
      case "error":
        setColor("red");
        break;
      case "warning":
        setColor("yellow");
        break;
      case "info":
        setColor("blue");
        break;
      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        dispatch({
          type: "main/setAlert",
          payload: { show: false, message: "none", type: "info" },
        });
      }, 3000);
    }
  }, [show, dispatch]);

  return (
    <Alert
      open={show}
      className="fixed shadow-xl lg:container w-[90%] top-16 left-1/2 !z-[3000]"
      color={color}
      variant="filled"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
      animate={{
        mount: { y: 0, x: "-50%" },
        unmount: { y: -100, x: "-50%" },
      }}
    >
      {message}
    </Alert>
  );
};

export type { AlertProps };

export default Alerts;
