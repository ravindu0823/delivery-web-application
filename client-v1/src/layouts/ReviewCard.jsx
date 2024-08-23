import React, { useEffect } from "react";

const ReviewCard = (props) => {
  useEffect(() => {
    // Load the Elfsight script
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.dataset.useServiceCore = "true";
    script.defer = true;
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full md:w-800 lg:w-906 bg-white border-2 border-lightText md:border-none p-5 rounded-lg shadow-md mx-auto">
      <div className="text-center mb-4">
        {/* Placeholder for review text */}
      </div>

      <div className="flex flex-col items-center mt-4">
        {/* Placeholder for image and name */}
      </div>

      {/* Add Elfsight widget */}
      <div className="elfsight-app-f9afce1b-988b-4561-99da-e52672c8791c" data-elfsight-app-lazy></div>
    </div>
  );
};

export default ReviewCard;
