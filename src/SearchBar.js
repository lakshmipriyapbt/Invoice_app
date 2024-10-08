// SearchBar.js

import React from 'react';
//import { Search } from 'react-bootstrap-icons';

const SearchBar = (items) => {
    
  return (
    <div className='row'>
      <input
      className="form-control col-sm-2"
      style={{border:"0.8px soild #dee2e6",borderRadius:"3px" }}
        type="text"
        placeholder="Search..."
      
      />
     
    </div>
  );
};

export default SearchBar;
