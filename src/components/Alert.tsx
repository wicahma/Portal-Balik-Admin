import { AlertProps } from "@/interfaces/mainSliceInterface";
import { Alert } from "@/components/materials/index";
import { color } from "@material-tailwind/react/types/components/alert";
import React, { useEffect } from "react";

const Alerts = (props: AlertProps) => {
  const { show, message, type } = props;
  const [color, setColor] = React.useState<color | undefined>();

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
  }, [color]);

  return (
    <Alert
      open={show}
      className="fixed lg:container w-[90%] top-16 left-1/2 !z-[3000]"
      color={color}
      variant="gradient"
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
