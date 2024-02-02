import { useEffect, useState } from "react";

interface NotificationModalProps {
  message: string | null;
}

export const NotificationModal = ({ message }: NotificationModalProps) => {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(message);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setValue("");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "8px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "4px",
        border: "2px solid",
        backgroundColor: "#f7fafc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
      }}
    >
      <span>{value}</span>
    </div>
  );
};
