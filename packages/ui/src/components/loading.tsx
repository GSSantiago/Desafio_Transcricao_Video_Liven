import React from "react";

type LoadingProps = {
  size?: "sm" | "md" | "lg";
};

export const LoadingSpinner: React.FC<LoadingProps> = ({ size = "md" }) => {
  const sizeClass = size === "sm" ? "w-6 h-6" : size === "lg" ? "w-12 h-12" : "w-8 h-8";

  return (
    <div
      className={`rounded-full border-4 border-gray-200 ${sizeClass} animate-spin`}
      style={{ borderTopColor: "#3D8D7A" }}
    ></div>
  );
};
