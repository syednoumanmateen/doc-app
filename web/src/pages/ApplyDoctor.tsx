import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../store/reducers/default';
import { message } from 'antd';
import helper from "../config/helper"
import Header from '../components/Header';
import { TimePicker } from 'antd';
import moment from 'moment';

interface FieldType {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    website?: string;
    address: string;
    specialization: string;
    experience: number;
    feesPerConsaltation: number;
    timings: any
};

const ApplyDoctor = () => {
    const { register, handleSubmit, control } = useForm<FieldType>()//react-hook-form declaration

    // redux
    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    const onFinish = (data: any) => {
        try {
            dispatch(showLoading())
            const payload = {
                ...data, userId: user._id
            }
        } catch (e) {
            dispatch(hideLoading())
            message.error("Something Wrong")
        }
    }

    return (
        <>
            <Header title="Apply Doctor" tag="h2" />
            <hr />
            <form onSubmit={handleSubmit(onFinish, helper.errorHandle)}>
                <div className='row p-0'>
                    <Header title="Personal Details:" tag="h5" position='0' />
                    <div className="col-4 mb-3">
                        <label className="form-label">First Name</label><span style={{ color: "red" }}>*</span>
                        <input type="text" {...register("firstName", { required: "First Name required" })} className="form-control" placeholder="your first name" />
                    </div>

                    <div className="col-4 mb-3">
                        <label className="form-label">Last Name</label><span style={{ color: "red" }}>*</span>
                        <input type="text" {...register("lastName", { required: "Last Name required" })} className="form-control" placeholder="your last name" />
                    </div>


                    <div className="col-4 mb-3">
                        <label className="form-label">Email</label><span style={{ color: "red" }}>*</span>
                        <input type="email" {...register("email", { required: "Email required" })} className="form-control" placeholder="your email" />
                    </div>

                    <div className="col-4 mb-3">
                        <label className="form-label">Phone</label><span style={{ color: "red" }}>*</span>
                        <input type="phone" {...register("phone", { required: "Phone Number required" })} className="form-control" placeholder="your phone number" />
                    </div>

                    <div className="col-4 mb-3">
                        <label className="form-label">Website</label>
                        <input type="text" {...register("website", {})} className="form-control" placeholder="your website link" />
                    </div>

                    <div className="col-4 mb-3">
                        <label className="form-label">Address</label><span style={{ color: "red" }}>*</span>
                        <input type="text" {...register("email", { required: "Address required" })} className="form-control" placeholder="your address" />
                    </div>

                    <span className="px-3">
                        <hr />
                    </span>

                    <Header title="Professional Details:" tag="h5" position='0' />

                    <div className="col-4 mb-3">
                        <label className="form-label">Specialization</label><span style={{ color: "red" }}>*</span>
                        <input type="text" {...register("specialization", { required: "Specialization required" })} className="form-control" placeholder="your specialization" />
                    </div>

                    <div className="col-4 mb-3">
                        <label className="form-label">Experience</label><span style={{ color: "red" }}>*</span>
                        <input type="number" {...register("experience", { required: "Experience required" })} className="form-control" placeholder="your experieence" />
                    </div>

                    <div className="col-4 mb-3">
                        <label className="form-label">Fees Per Consaltation</label><span style={{ color: "red" }}>*</span>
                        <input type="number" {...register("feesPerConsaltation", { required: "Fees Per Consaltation required" })} className="form-control" placeholder="Fees Per Consaltation" />
                    </div>

                    <div className="col-4 mb-3">
                        <label className="form-label">Timings</label><span style={{ color: "red" }}>*</span>

                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>

            </form>
        </>
    )
}

export default ApplyDoctor
