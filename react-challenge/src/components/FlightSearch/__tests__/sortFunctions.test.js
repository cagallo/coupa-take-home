import { sortFuncs } from '../sortFunctions'
import { render } from '@testing-library/react'
import React from 'react'
import FlightSearch from '../index'
import moment from 'moment'

describe('Flight sorting functionality', () => {

  //doesn't work 
  jest.mock('moment', () => {
    const moment = jest.requireActual('moment');
  
    return {default: moment };
  });


  let flights = [
    {
      Flight: 'United 320',
      score: 2000,
      price: 302.21,
      segmentsArray: [
        {
          departsAt: "2018-10-08T12:00:00.000Z",
          airline: 'United'
        }
      ]
    },
    {
      Flight: 'United 200',
      score: 4729,
      price: 403.02,
      segmentsArray: [
        {
          departsAt: "2018-10-08T02:23:00.000Z",
          airline: 'United'
        }
      ]
    },
    {
      Flight: 'United 100',
      score: 1029,
      price: 574.89,
      segmentsArray: [
        {
          departsAt: "2018-10-08T22:00:00.000Z",
          airline: 'United'
        }
      ]
    },
    {
      Flight: 'United 392',
      score: 920,
      price: 98.12,
      segmentsArray: [
        {
          departsAt: "2018-10-08T13:50:00.000Z",
          airline: 'United'
        }
      ]
    },
    {
      Flight: 'United 201',
      score: 3020,
      price: 192.02,
      segmentsArray: [
        {
          departsAt: "2018-10-08T09:00:00.000Z",
          airline: 'United'
        }
      ]
    }
  ]

  test('should be able to sort flights by best(i.e. best score)', () => {
    const expectedData =  [  
      {
        Flight: 'United 392',
        score: 920,
        price: 98.12,
        segmentsArray: [
          {
            departsAt: "2018-10-08T13:50:00.000Z",
            airline: 'United'
          }
        ]
      },
      {
        Flight: 'United 100',
        score: 1029,
        price: 574.89,
        segmentsArray: [
          {
            departsAt: "2018-10-08T22:00:00.000Z",
            airline: 'United'
          }
        ]
      },
      {
        Flight: 'United 320',
        score: 2000,
        price: 302.21,
        segmentsArray: [
          {
            departsAt: "2018-10-08T12:00:00.000Z",
            airline: 'United'
          }
        ]
      },
      {
        Flight: 'United 201',
        score: 3020,
        price: 192.02,
        segmentsArray: [
          {
            departsAt: "2018-10-08T09:00:00.000Z",
            airline: 'United'
          }
        ]
      },
      {
        Flight: 'United 200',
        score: 4729,
        price: 403.02,
        segmentsArray: [
          {
            departsAt: "2018-10-08T02:23:00.000Z",
            airline: 'United'
          }
        ]
      }
    ]

    const sortedData = sortFuncs.sortByBest(flights)
    expect(sortedData).toEqual(expectedData);
  });  
   
  test('should be able to sort flights by price (low to high)', () => {
    const expectedData =  [
      {
        Flight: 'United 392',
        score: 920,
        price: 98.12,
        segmentsArray: [
          {
            departsAt: "2018-10-08T13:50:00.000Z",
            airline: 'United'
          }
        ]
      },
      { 
        Flight: 'United 201',
        score: 3020,
        price: 192.02,
        segmentsArray: [
          {
            departsAt: "2018-10-08T09:00:00.000Z",
            airline: 'United'
          }
        ]
      },
      {
        Flight: 'United 320',
        score: 2000,
        price: 302.21,
        segmentsArray: [
          {
            departsAt: "2018-10-08T12:00:00.000Z",
            airline: 'United'
          }
        ]
      },
      {
        Flight: 'United 200',
        score: 4729,
        price: 403.02,
        segmentsArray: [
          {
            departsAt: "2018-10-08T02:23:00.000Z",
            airline: 'United'
          }
        ]
      },
      {
        Flight: 'United 100',
        score: 1029,
        price: 574.89,
        segmentsArray: [
          {
            departsAt: "2018-10-08T22:00:00.000Z",
            airline: 'United'
          }
        ]
      }
    ]

    const sortedData = sortFuncs.sortByPrice(flights) 
    expect(sortedData).toEqual(expectedData)
  })

  test('should be able to sort flights by time of day(early to late)', () => {
    const expectedData =  [
      {
        Flight: 'United 200',
        score: 4729,
        price: 403.02,
        segmentsArray: [
          {
            departsAt: "2018-10-08T02:23:00.000Z",
            airline: 'United'
          }
        ]
      },
      { 
        Flight: 'United 201',
        score: 3020,
        price: 192.02,
        segmentsArray: [
          {
            departsAt: "2018-10-08T09:00:00.000Z",
            airline: 'United'
          }
        ]
      },
      {
        Flight: 'United 320',
        score: 2000,
        price: 302.21,
        segmentsArray: [
          {
            departsAt: "2018-10-08T12:00:00.000Z",
            airline: 'United'
          }
        ]
      },
      {
        Flight: 'United 392',
        score: 920,
        price: 98.12,
        segmentsArray: [
          {
            departsAt: "2018-10-08T13:50:00.000Z",
            airline: 'United'
          }
        ]
      },
      {
        Flight: 'United 100',
        score: 1029,
        price: 574.89,
        segmentsArray: [
          {
            departsAt: "2018-10-08T22:00:00.000Z",
            airline: 'United'
          }
        ]
      }
    ]

      const sortedData = sortFuncs.sortByTime(flights) 
      expect(sortedData).toEqual(expectedData)
  })
  
  test('should return an error message if there is no flight data from the fetch call', () => { 
    let flights = []

    sortFuncs.sortByBest(flights)
    const { getByTestId } = render(<FlightSearch />)
    
    expect(getByTestId('pane-content')).toHaveTextContent('We are sorry, there are no available flights at this time, please try again later')

  })

})


