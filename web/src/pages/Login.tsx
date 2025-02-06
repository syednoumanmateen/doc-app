import { FC } from 'react';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../store/reducers/default';
import { login } from '../store/reducers/auth';
import helper from "../config/helper"

interface FieldType {
    email: string;
    password: string;
}

// form validation using yup
// const schema = yup.object().shape({
//     email: yup.string().email("Invalid email").required("Email is required"),
//     password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
// });
// const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

const Login: FC = () => {
    const appName = import.meta.env.VITE_APP_NAME ?? 'Application'; // Fallback in case it's undefined
    const navigate = useNavigate()//navigation
    
    const { register, handleSubmit } = useForm<FieldType>()//react-hook-form declaration

    // redux
    const dispatch = useDispatch()

    const onFinish = async (values: FieldType) => {
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/user/login", values)
            dispatch(hideLoading())
            if (res.data.success) {
                helper.setUserData(res?.data.data)
                dispatch(login(res?.data.data))
                message.success(res.data.msg)
                navigate("/")
            } else {
                message.error(res.data.msg)
            }
        } catch (e) {
            dispatch(hideLoading())
            message.error("Something Wrong")
        }
    };

    return (
        <form onSubmit={handleSubmit(onFinish, helper.errorHandle)}>
            <div>
                <div className="mb-3">
                    <label className="form-label">Email</label><span style={{ color: "red" }}>*</span>
                    <input type="email" {...register("email", { required: "Email required" })} className="form-control" placeholder="please enter email" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label><span style={{ color: "red" }}>*</span>
                    <input type="password" {...register("password", { required: "Password required" })} className="form-control" placeholder="please enter password" />
                </div>

                <div className='mb-3'>
                    <span className='text-secondary'>New to {appName}? </span><Link className="text-decoration-none" to="/auth/register">Register</Link>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </div>

        </form>
    );
};

export default Login;
