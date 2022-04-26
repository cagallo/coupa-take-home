import FlightSearchFilter from "../FlightSearchFilter"
import React, { useState } from 'react'
import Select from 'react-select'
import { options } from './enums'

export const FilterBy = ({ value, onChange }) => {
  
  return (
      <FlightSearchFilter>
        <label htmlFor="filterBy">Filter by Time</label>
        <Select
          name="filterBy"
          onChange={onChange}
          options={options}
          value={value}
          styles={{ input: () => ({ width: 150 }) }}
        />
      </FlightSearchFilter>
    )
}

export default FilterBy;