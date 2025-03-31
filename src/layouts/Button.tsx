import { ButtonProps } from "../utils/Props";

const Button = ({ title, className, onClick }: ButtonProps) => {
  return (
    <div>
      <button
        className={`
      px-20 py-3
      drop-shadow-lg
      border-0 
      border-brightColor 
      text-white 
      bg-green-500 
      hover:bg-green-800  
      hover:text-white 
      transition-all 
      font-semibold
      rounded-full
            ${className}
          `}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
