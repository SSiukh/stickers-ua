import { Toaster } from "react-hot-toast";

const Notificator = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            padding: "16px",
            color: "#e3f2fd",
          },
          success: {
            style: {
              border: "1px solid #66bb6a",
              background: "#388e3c",
            },
          },
          error: {
            style: {
              border: "1px solid #f44336",
              background: "#d32f2f",
            },
          },
        }}
      />
    </div>
  );
};

export default Notificator;
