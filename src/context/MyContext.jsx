import React, { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const MyContext = createContext()

const MyContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([])
  const [countProducts, setCountProducts] = useState(0)
  const [total, setTotal] = useState(0)

  const updateCart = (updatedProducts) => {
    setAllProducts(updatedProducts)
    setCountProducts()
    setTotal()
  }

  const [user, setUser] = useState({ email: null, user_id: null })
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (userData) => {
    setUser({ email: userData.email, user_id: userData.user_id })
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser({ email: null, user_id: null })
    setIsAuthenticated(false)
    navigate("/login")
  }

  const navigate = useNavigate()

  return (
    <MyContext.Provider
      value={{
        allProducts,
        setAllProducts,
        countProducts,
        setCountProducts,
        total,
        setTotal,
        updateCart,
        user,
        setUser,
        login,
        logout,
        isAuthenticated,
        navigate,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export { MyContext, MyContextProvider }
