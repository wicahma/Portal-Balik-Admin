export interface AlertProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface Main {
  alert: AlertProps;
  isLoading: boolean;
  token: string;
}

export interface reduxState {
  main: Main;
}
