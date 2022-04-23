import React from 'react';

const FLIGHTS_URL = 'http://localhost:4000/flights';

const useFetchFlightResults = () => {
  const [flights, setFlights] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchFlights = async () => {
    try {
      const flightResults = await fetch(FLIGHTS_URL);
      const flights = await flightResults.json();
      /**
       * Results come back as an array of [outbound, return] flights and
       * we just need the outbound flights for the purpose of this challenge
       */

      let dupChecker = {}; // track encountered flight numbers
      const outboundSegmentFlights = flights.reduce((acc, flight) => {
        flight = flight[0];
        let key = flight.segmentsArray[0].flights[0].flightNumber;
        
        // only show flights of the same flight number once
        if (!dupChecker[key]) {
          acc.push(flight);
          dupChecker[key] = key;
        }
        return acc;
     }, []);

      console.log(outboundSegmentFlights)
      setFlights(outboundSegmentFlights);
    } catch (error) {
      setError(error);
    }
  };

  React.useEffect(() => {
    fetchFlights();
  }, []);

  return {
    error,
    flights,
  };
};

export default useFetchFlightResults;
