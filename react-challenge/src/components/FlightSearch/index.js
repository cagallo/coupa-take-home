import React, { useEffect, useState } from 'react';
import './index.style.css';
import FlightSearchItem from './FlightSearchItem';
import FlightSearchFooter from './FlightSearchFooter';
import useFetchFlightResults from './useFetchFlightResults';
import SortBy from './filters/SortBy';
import { SortByDefaultOption, SortByEnum } from './filters/SortBy/enums';
import { sortFuncs } from './sortFunctions';
import { filterByTime } from './utils';
import FilterBy from './filters/FilterBy';

export default function FlightSearch() {
  const flightsPerPage = 4;
  const [sortBy, setSortBy] = useState(SortByDefaultOption);
  const [filterBy, setFilterBy] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [offset, setOffset] = useState(flightsPerPage)


  let errorMsg;

  // Fetch Flights

  let { flights } = useFetchFlightResults()

  const sortFlights = () => {
    console.log('here')
    if (!flights.length) {
      errorMsg = `We are sorry, there are no available flights at this time, please try again later`
      return errorMsg
    }
      if (sortBy.value === SortByEnum.BEST) {
        return sortFuncs.sortByBest(flights)
      } else if (sortBy.value === SortByEnum.PRICE_LOW) {
        return sortFuncs.sortByPrice(flights)
      } else if (sortBy.value === SortByEnum.TIME_OF_DAY) {
        return sortFuncs.sortByTime(flights)
      }
    }

  sortFlights()

  const maxPage = Math.ceil(flights.length / flightsPerPage)

  const handlePreviousPage = () => {
    if (currentPage <= 1) {
      return currentPage;
    }
    let prevPage = currentPage - 1
    setCurrentPage(prevPage)
    setOffset(offset - flightsPerPage)
  }

  const handleNextPage = () => {
    if (currentPage >= maxPage) {
      return maxPage;
    }
    let nextPage = currentPage + 1
    setCurrentPage(nextPage)
    setOffset(offset + flightsPerPage)
  }

  const paginatedFlights = flights.slice(offset - flightsPerPage, offset);

  return (
    <div className="row">
      <div className="pane m-t-1">
        <div className="pane-header search-results__header">
          <div className="search-results__title">
            <b>Select an outbound flight</b>
            <p className="m-v-0 fade small">DEN → CHI</p>
          </div>
          <FilterBy value={filterBy} onChange={setFilterBy}/>
          <SortBy value={sortBy} onChange={setSortBy} />
        </div>
        {/* Display Flight Results */}
        <div className="pane-content" data-testid='pane-content'>
          {!flights.length && errorMsg}
          {Array.isArray(paginatedFlights) &&
            paginatedFlights.map(flight => (
              <FlightSearchItem key={flight.id} flight={flight} />
            ))}
        </div>
      </div>
      {/* Pagination */}
      <FlightSearchFooter handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} currentPage={currentPage} maxPage={maxPage}/>
    </div>
  );
}

// module.exports = {
//   handlePreviousPage,
//   handleNextPage
// }
