import React from 'react'

const defaultValue = {
  onEdit: null,
  onDelete:null,
  onSave:null
}
export const MainContext = React.createContext(defaultValue)