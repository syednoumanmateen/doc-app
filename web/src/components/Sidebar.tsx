import { useDispatch, useSelector } from "react-redux";
import "../styles/Sidebar.scss"
import { memo } from "react";
import { userMenu, adminMenu } from "../Data/data"
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/reducers/auth";

const Sidebar = () => {
    // navigate object
    const navigate = useNavigate()

    // redux
    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    // menu on role
    let menus = user?.isAdmin ? adminMenu : userMenu

    const handleLogout = () => {
        dispatch(logout())
        navigate("auth/login")
    }

    return (
        <>
            <div className="text-white">
                <div className="mb-3 text-center">
                    <img className="rounded-circle mb-3" width={150} height={150} src="https://imgs.search.brave.com/lOGaHfKgKJbFqDbbmzldTLgShuZVF4FaqEHXkr96P3I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzk2LzQ4LzEy/LzM2MF9GXzk2NDgx/MjM3X3RRZkFJcTBs/WnpIcXprS2N6Tk92/TU1XS3diU091aThk/LmpwZw" alt="Doc-App" />
                    <h4> Doc-App</h4>
                    <hr />
                </div>
                <div className="mx-3">
                    {menus.map((itm: any, ind: number) => (
                        <Link key={ind} className="text-decoration-none fs-5 text-white align-items-center" to={itm.path}>
                            <div className="row g-1 mb-3">
                                <div className="col-2"><i className={itm.icon}></i></div>
                                <div className="col-10">{itm.name}</div>
                            </div>
                        </Link>
                    ))}

                    <div className="text-decoration-none fs-5 text-white align-items-center" onClick={handleLogout}>
                        <div className="row g-1 mb-3">
                            <div className="col-2"><i className="fa-solid fa-right-from-bracket"></i></div>
                            <div className="col-10">Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Sidebar);
