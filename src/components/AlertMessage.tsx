import React from "react";

interface Props {
  type?: "success" | "danger" | "warning" | "info";
  children: React.ReactNode;
}

const AlertMessage: React.FC<Props> = ({ type = "info", children }) => {
  return (
    <div className={`alert alert-${type} border border-success shadow-sm`} role="alert">
      {children}
    </div>
  );
};

export default AlertMessage;
