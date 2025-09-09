export interface UseNotificationMessageState {
  notification: {
    message: string | null;
    type: "warning" | "error" | "success" | null;
  };
  setNotification: (notification: {
    message: string;
    type: "warning" | "error" | "success";
  }) => void;
}
