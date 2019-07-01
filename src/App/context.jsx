import React from 'react'

const defaultValue = {
  peopleCount: 0,
  onPeopleCountChange:null,
  test:33333
}
export const AppContext = React.createContext(defaultValue)