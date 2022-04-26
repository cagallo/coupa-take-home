import moment from 'moment'

export const getFlightNumbers = flights => {
  return flights
    .map(flight => {
      return `${flight.marketingAirlineCode} ${flight.marketingFlightNumber}`;
    })
    .join(', ');
};

export const getFlightDays = (startDateMoment, endDateMoment) => {
  const format = 'ddd M/D';
  return endDateMoment.isSame(startDateMoment, 'day')
    ? endDateMoment.format(format)
    : `${startDateMoment.format(format)} - ${endDateMoment.format(format)}`;
};

export const timesOfDay = {
  'Red-Eye': [0, 6],
  'Morning': [6, 12],
  'Afternoon': [12, 18],
  'Evening': [18, 24]
}

// const timesOfDay = {
//   'Red-Eye': ["2018-10-08T00:00:00.000Z", "2018-10-08T05:59:00.000Z"],
//   'Morning': ["2018-10-08T06:00:00.000Z", "2018-10-08T11:59:00.000Z"],
//   'Afternoon': ["2018-10-08T12:00:00.000Z", "2018-10-08T17:59:00.000Z"],
//   'Evening': ["2018-10-08T18:00:00.000Z", "2018-10-08T23:59:00.000Z"]
// }

// .format() becomes a string, cannot perform moment operations on that after vs a moment obj

export const filterByTime = (timeOfDay, flights) => {
  let filteredFlights = []
  console.log(flights)
  const format = 'h:mma'
   flights.forEach((flight) => {
    let singleFlight =  flight.segmentsArray[0].departsAt;
    let flightHour = getHours(moment(singleFlight).format(format))
    
    if (timesOfDay[timeOfDay]) {
      let start = timesOfDay[timeOfDay][0]
      let end = timesOfDay[timeOfDay][1]
      if (isBetween(flightHour, start, end)) {
        console.log('pushing into flight')
        filteredFlights.push(flight)
      }
    }

  })

  console.log(filteredFlights)
 return filteredFlights.sort((a, b) => {

    // get date/time values from segmentsArray
    let currFlightDeparture = a.segmentsArray[0].departsAt;
    let nextFlightDeparture = b.segmentsArray[0].departsAt;
    
    // get difference in milliseconds between the two times
    return moment.utc(currFlightDeparture).diff(moment.utc(nextFlightDeparture))
  });

}

const getHours = (time) => {
  const start = time.indexOf('T') + 1
  const end = start + 2
  return parseInt(time.slice(start, end))

}

const isBetween = (time, start, end) => {
  time = time + 5
  if (time >= start && time < end) {
    return true;
  }

  return false
}
