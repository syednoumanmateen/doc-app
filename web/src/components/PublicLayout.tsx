import { Outlet } from 'react-router-dom'

const PublicLayout = () => {

    const pathSegments = window.location.pathname.split("/");
    const name = pathSegments.filter(segment => segment).pop()?.replace(/^\w/, (c) => c.toUpperCase());


    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="border rounded p-5">
                    <h5 className="mb-5 text-center">
                        {name} Page
                    </h5>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default PublicLayout
