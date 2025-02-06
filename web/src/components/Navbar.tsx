import { useDispatch, useSelector } from 'react-redux'
import helper from "../config/helper"
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { logout } from '../store/reducers/auth'

const Navbar = () => {
    // navigator obj
    const navigate = useNavigate()

    // redux
    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        helper.setToken("")
        dispatch(logout())
        navigate("/auth/login")
    }

    return (
        <div className='d-flex align-items-center'>
            <h1>Doctor Appointment</h1>
            <div className="ms-auto">
                {user.name} -  <button className='ms-1 btn btn-outline-secondary' type="submit" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default memo(Navbar)
