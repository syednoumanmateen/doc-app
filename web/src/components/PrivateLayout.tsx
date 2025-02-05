import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { hideLoading, showLoading } from "../store/reducers/default"
import axios from "axios"
import helper from "../config/helper"
import { login, logout } from "../store/reducers/auth"
import { useEffect } from "react"

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
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-3">
                sidebar
              </div>
              <div className="col-9">
                <div className="mb-3">
                  navbar
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default PrivateLayout
