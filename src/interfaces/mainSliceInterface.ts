export interface AlertProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface main {
  alert: AlertProps;
  loading: boolean;
}
