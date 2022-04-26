import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import FlightSearchPagination from '../FlightSearchFooter'

describe ('Test pagination functionality', () => {

  let currentPage, maxPage;

  const handleNextPage = () => {
    if (currentPage >= maxPage) {
      return maxPage;
    }
    let nextPage = currentPage + 1
    console.log('num', typeof nextPage)
    return nextPage
    // setCurrentPage(nextPage)
    // setOffset(offset + flightsPerPage)
  }

  const handlePreviousPage = () => {
    if (currentPage <= 1) {
      return currentPage;
    }
    let prevPage = currentPage - 1
    return prevPage
    // setCurrentPage(prevPage)
    // setOffset(offset - flightsPerPage)
  }


  test('should display page count at bottom of flight search', () => {

    const { getByTestId } = render(<FlightSearchPagination currentPage={1} maxPage={15} />)
    expect(getByTestId('page-details')).toHaveTextContent('Page 1 of 15')

  })

  test('should allow user to navigate to next page of search results', () => {

    currentPage = 1;

    let result = handleNextPage()
    console.log(result)
    const { getByTestId } = render(<FlightSearchPagination handleNextPage={handleNextPage} currentPage={2} maxPage={15} />)
    
    expect(result).toEqual(2) 
    expect(getByTestId('page-details')).toHaveTextContent('Page 2 of 15')
  })

  test('should allow user to navigate to previous page of search results', () => {
    currentPage = 4;

    let result = handlePreviousPage()
    console.log(result)
    const { getByTestId } = render(<FlightSearchPagination handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} currentPage={3} maxPage={15} />)
    
    expect(result).toEqual(3) 
    expect(getByTestId('page-details')).toHaveTextContent('Page 3 of 15')
  })

  test('should not allow user to navigate to previous page if they are on the first page of search results', () => {
    currentPage = 1;

    let result = handlePreviousPage()

    expect(result).toEqual(1)

  })

  test('should not allow user to navigate to next page if they are on the last page of search results', () => {
    currentPage = 15;
    maxPage = 15

    let result = handleNextPage()

    expect(result).toEqual(15)
    
  })

})




