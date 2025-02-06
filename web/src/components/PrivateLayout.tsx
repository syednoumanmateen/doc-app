import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { hideLoading, showLoading } from "../store/reducers/default"
import axios from "axios"
import helper from "../config/helper"
import {  logout } from "../store/reducers/auth"
import { lazy, memo, useEffect } from "react"
import "../styles/PrivateLayout.scss"

const Sidebar = lazy(() => import("./Sidebar"))
const Navbar = lazy(() => import("./Navbar"))

const PrivateLayout = () => {
  // get token from localStorage
  const token = helper.getToken()
  // navigate object
  const navigate = useNavigate()

  // redux
  const { isAuthenticated, user } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()

  const getLoggedInUserDetails = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.get("/api/user/", {
        headers: { Authorization: `${token}` }
      })
      dispatch(hideLoading())
      if (!res.data.success) {
        dispatch(logout())
        navigate("/auth/login")
      }
    } catch (e) {
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    if (!user) {
      getLoggedInUserDetails()
    }
  }, [user])

  useEffect(() => {
    setInterval(() => {
      dispatch(logout())
    }, 8640000)
  }, [])

  return (
    <>
      {!isAuthenticated ? <Navigate to="/auth/login" /> :
        <>
          <div className="container-fluid pt-3">
            <div className="d-flex layout overflow-auto">
              <div className="c1 p-3 bg-dark rounded me-3">
                <Sidebar />
              </div>
              <div className="c2">
                <div className="mb-3 px-3 bg-white rounded">
                  <Navbar />
                </div>
                <div className="content p-3 overflow-auto bg-white rounded">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default memo(PrivateLayout)
