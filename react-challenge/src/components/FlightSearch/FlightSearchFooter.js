import React from 'react';
import Button from '../Button';

export default function FlightSearchPagination({ handleNextPage, handlePreviousPage, currentPage,  maxPage }) {

  return (
    <div className="m-t-2 m-b-2 d-space-between full-width">
      <Button disabled size="sm" onClick={handlePreviousPage}>Previous Page</Button>
      <p className="m-t-0 m-b-0">Page {currentPage} of {maxPage}</p>
      <Button size="sm" onClick={handleNextPage}>Next Page</Button>
    </div>
  );
  
}




