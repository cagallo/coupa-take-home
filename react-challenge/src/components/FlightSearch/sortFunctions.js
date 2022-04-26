import moment from 'moment'

export const sortFuncs = {

  //SORT BY BEST

  sortByBest(flightData)  {
    if(!flightData.length) {
      return `We are sorry, there are no available flights at this time, please try again later`
    }

    return flightData.sort((a, b) => a.score - b.score)
  },

//SORT BY PRICE

  sortByPrice(flightData) {
    if(!flightData.length) {
      return `We are sorry, there are no available flights at this time, please try again later`
    }

    return flightData.sort((a, b) => a.price - b.price)
  },
//SORT BY TIME OF DAY

  sortByTime(flightData) {
    if(!flightData.length) {
      return `We are sorry, there are no available flights at this time, please try again later`
    }

    return flightData.sort((a, b) => {
      // sort the data by date using moment.js
      // get date/time values from segmentsArray

      let currFlightDeparture = a.segmentsArray[0].departsAt;
      let nextFlightDeparture = b.segmentsArray[0].departsAt;

      // get difference in milliseconds between the two times
      return moment.utc(currFlightDeparture).diff(moment.utc(nextFlightDeparture))
    })
   } 
}

