// <!-- /src/components/atoms/Input.js -->
import React from 'react';

const Input = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default Input;