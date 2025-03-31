import { FC } from "react";

export const CustomLoadingPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  );
};
