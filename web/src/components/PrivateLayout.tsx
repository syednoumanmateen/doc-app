import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { hideLoading, showLoading } from "../store/reducers/default"
import axios from "axios"
import helper from "../config/helper"
import { login, logout } from "../store/reducers/auth"
import { useEffect } from "react"
import "../styles/privateLayout.scss"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const PrivateLayout = () => {
  // get token from localStorage
  const token = helper.getToken()

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
      if (res.data.success) {
        dispatch(login(res?.data))
      } else {
        dispatch(logout())
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

  return (
    <>
      {!isAuthenticated ? <Navigate to="/auth/login" /> :
        <>
          <div className="container-fluid p-3">
            <div className="row g-3 layout overflow-auto">
              <div className="col-3 p-3 ">
                <Sidebar/>
              </div>
              <div className="col-9">
                <div className="mb-2 p-3">
                  <Navbar/>
                </div>
                <div className="content overflow-auto">
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

export default PrivateLayout
