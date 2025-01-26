// <!-- /src/components/atoms/Button.js -->
import React from 'react';

const Button = ({ children, onClick, className }) => {
  return (
    <button className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;