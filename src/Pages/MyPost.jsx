import React, { useState, useEffect, useContext } from "react"
import { MyContext } from "../context/MyContext"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import "../App.css"

function MyPosts() {
  const { user, logout } = useContext(MyContext)
  const [userPosts, setUserPosts] = useState([])
  const user_id = user.user_id
  
  const fetchUserPosts = async () => {
    console.log("user id ",user_id)
    try {

      const response = await axios.get(`https://petshop-hy6s.onrender.com/user-posts/${user_id}`)
      
      if (response.status === 200) {
        setUserPosts(response.data)
      } else {
        console.error("Error al obtener las publicaciones del usuario.")
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error)
    }
  }

  useEffect(() => {
    fetchUserPosts()
  }, [])

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <h1 className="profile-title">
          <Link to="/profile" className="profile-link">
            Mi Perfil
          </Link>
        </h1>
        <ul className="profile-links">
          <li>
            <Link to="/mi-perfil" className="profile-link">
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link to="/modificar-perfil" className="profile-link">
              Modificar Perfil
            </Link>
          </li>
          <li>
            <Link to="/mis-favoritos" className="profile-link active">
              Mis Favoritos
            </Link>
          </li>
          <li>
            <Link to="/crear-publicación" className="profile-link">
              Crear Publicación
            </Link>
          </li>
          <li>
            <Link to="/mis-publicaciones" className="profile-link">
              Mis Publicaciones
            </Link>
          </li>
        </ul>
        <button onClick={logout} className="dark-button">
          Cerrar Sesión
        </button>
      </div>

      <div className="profile-content">
        <h1 className="profile-content-title">Mis Publicaciones</h1>
        {userPosts.length === 0 ? (
          <p>No tienes publicaciones aún.</p>
        ) : (
          <ul>
            {userPosts.map((post) => (
              <li key={post.id}>
                <h2>{post.name}</h2>
                <p>{post.description}</p>
                <p>{post.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default MyPosts
