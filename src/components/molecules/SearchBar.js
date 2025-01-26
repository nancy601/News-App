// <!-- /src/components/molecules/SearchBar.js -->
import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex">
      <Input
        type="text"
        placeholder="Search news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mr-2"
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;