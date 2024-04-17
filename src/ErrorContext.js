import React, { createContext, useContext, useState } from 'react'

const ErrorAndLoadingContext = createContext()

export const useError = () => useContext(ErrorAndLoadingContext)

export const ErrorAndLoadingProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <ErrorAndLoadingContext.Provider
      value={{ error, setError, loading, setLoading }}
    >
      {children}
    </ErrorAndLoadingContext.Provider>
  )
} // эта штука позволяет использовать его в любых компонентах, где вам необходимо обрабатывать ошибки. Например, если во время поиска города возникает ошибка о том, что город не найден, то вы можете передать эту ошибку через ErrorContext в карточке и обработать её в другом компоненте, например, в инпуте. Чтобы это работало нужно импортировать ErrorProvider в основной компонент и обернуть его JSX-разметку в этот ErrorProvider. Такой подход делает управление ошибками более гибким и удобным, поскольку вы можете передавать информацию об ошибках через контекст и обрабатывать их в нужных местах приложения, не передавая ошибки через пропсы через множество уровней компонентов.
