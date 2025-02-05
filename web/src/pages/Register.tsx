import { message } from 'antd';
import axios from 'axios';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../store/reducers/default';
import helper from "../config/helper"

interface FieldType {
    name?: string;
    password?: string;
    email?: string;
};

const Register: FC = () => {
    const appName = import.meta.env.VITE_APP_NAME ?? 'Application'; // Fallback in case it's undefined
    const navigate = useNavigate()//navigation
    const { register, handleSubmit } = useForm<FieldType>()//react-hook-form declaration

    // redux
    const dispatch = useDispatch()

    const onFinish = async (values: FieldType) => {
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/user/register", values)
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.msg)
                navigate("/auth/login")
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
                    <label className="form-label">Name</label>
                    <input type="text" {...register("name", { required: "Name required" })} className="form-control" placeholder="please enter name" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" {...register("email", { required: "Email required" })} className="form-control" placeholder="please enter email" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" {...register("password", { required: "Password required" })} className="form-control" placeholder="please enter password" />
                </div>

                <div className='mb-3'>
                    <span className='text-secondary'>Old to {appName}? </span><Link className="text-decoration-none" to="/auth/login">Login</Link>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </div>

        </form>
    )
};

export default Register;