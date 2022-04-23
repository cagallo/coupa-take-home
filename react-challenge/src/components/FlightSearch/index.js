import React, { useEffect, useState } from 'react';
import './index.style.css';
import FlightSearchItem from './FlightSearchItem';
import FlightSearchFooter from './FlightSearchFooter';
import useFetchFlightResults from './useFetchFlightResults';
import SortBy from './filters/SortBy';
import { SortByDefaultOption, SortByEnum } from './filters/SortBy/enums';
import moment from 'moment';

export default function FlightSearch() {
  const flightsPerPage = 4;

  const [sortBy, setSortBy] = useState(SortByDefaultOption);
  const [currentPage, setCurrentPage] = useState(1)
  //const [paginatedFlights, setPaginatedFlights ] = useState([]);
  const [offset, setOffset] = useState(flightsPerPage)

  // Fetch Flights
  let { flights } = useFetchFlightResults();
  if (sortBy.value === SortByEnum.BEST) {
    flights = flights.sort((a, b) => a.score - b.score)
  } else if (sortBy.value === SortByEnum.PRICE_LOW) {
    flights = flights.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === SortByEnum.TIME_OF_DAY) {
    // sort the data by date using moment.js
    flights = flights.sort((a, b) => {

      // get date/time values from segmentsArray
      let currFlightDeparture = a.segmentsArray[0].departsAt;
      let nextFlightDeparture = b.segmentsArray[0].departsAt;;
      
      // get difference in milliseconds between the two times
      return moment.utc(currFlightDeparture).diff(moment.utc(nextFlightDeparture))
    });
  }

  const maxPage = Math.ceil(flights.length / flightsPerPage)

  const handlePreviousPage = (e) => {
    if (currentPage <= 1) {
      return;
    }
    let prevPage = currentPage - 1
    setCurrentPage(prevPage)
    setOffset(offset - flightsPerPage)
  }

  const handleNextPage = (e) => {
    if (currentPage >= maxPage) {
      return;
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
          <SortBy value={sortBy} onChange={setSortBy} />
        </div>
        {/* Display Flight Results */}
        <div className="pane-content">
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
