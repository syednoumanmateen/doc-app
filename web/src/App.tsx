import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'
import CenterScreen from './components/CenterScreen'

// lazy routes import
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const Home = lazy(() => import("./pages/Home"))
const PublicLayout = lazy(() => import("./components/PublicLayout"))
const PrivateLayout = lazy(() => import("./components/PrivateLayout"))
const NotFound = lazy(() => import("./components/NotFound"))

const App = () => {
  const { loading } = useSelector((state: any) => state.loading)
  const loadingUI = <CenterScreen><Spin size='large' /></CenterScreen>

  return (
    <>
      {loading ? loadingUI :
        <BrowserRouter>
          <Suspense fallback={loadingUI}>
            <Routes>
              <Route path="/auth" element={<PublicLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route path="/" element={<PrivateLayout />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>}
    </>
  )
}

export default App
