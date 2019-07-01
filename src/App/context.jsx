import React from "react";

const defaultValue = {
  peopleCount: 0,
  onPeopleCountChange: null,
  loading: true
};
export const AppContext = React.createContext(defaultValue);
