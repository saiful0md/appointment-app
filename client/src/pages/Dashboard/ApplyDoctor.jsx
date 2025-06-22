import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { hideLoading, showLoading } from "../../redux/Featurse/LoadingSlice";

const ApplyDoctor = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user);
    const onSubmit = async (value) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-doctor', { ...value }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                toast.success(`${res.data.message}`);
                 navigate('/')
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error(error)
        }

    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-4xl mx-auto p-6 bg-white rounded shadow"
            >
                <input {...register("userId")} type="hidden" value={user?._id} />

                {/* Personal Details */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Personal Details:</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label>First Name</label>
                            <input
                                {...register("firstName", { required: true })}
                                className="input input-bordered w-full"
                                type="text"
                                placeholder="Enter first name"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">First name is required</p>}
                        </div>

                        <div>
                            <label>Last Name</label>
                            <input
                                {...register("lastName", { required: true })}
                                className="input input-bordered w-full"
                                type="text"
                                placeholder="Enter last name"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm">Last name is required</p>}
                        </div>

                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Enter email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                        </div>

                        <div>
                            <label>Phone</label>
                            <input
                                {...register("phone", { required: true })}
                                className="input input-bordered w-full"
                                type="text"
                                placeholder="Enter phone number"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
                        </div>

                        <div>
                            <label>Website</label>
                            <input
                                {...register("website")}
                                className="input input-bordered w-full"
                                type="text"
                                placeholder="Enter website (optional)"
                            />
                        </div>

                        <div>
                            <label>Address</label>
                            <input
                                {...register("address", { required: true })}
                                className="input input-bordered w-full"
                                type="text"
                                placeholder="Enter address"
                            />
                            {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
                        </div>
                    </div>
                </div>

                {/* Professional Details */}
                <div className="flex flex-col gap-4 mt-6">
                    <h2 className="text-2xl font-semibold">Professional Details:</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label>Specialization</label>
                            <input
                                {...register("specialization", { required: true })}
                                className="input input-bordered w-full"
                                type="text"
                                placeholder="e.g. Cardiologist"
                            />
                            {errors.specialization && <p className="text-red-500 text-sm">Specialization is required</p>}
                        </div>

                        <div>
                            <label>Experience (Years)</label>
                            <input
                                {...register("experience", { required: true })}
                                className="input input-bordered w-full"
                                type="text"
                                placeholder="e.g. 5"
                            />
                            {errors.experience && <p className="text-red-500 text-sm">Experience is required</p>}
                        </div>

                        <div>
                            <label>Fees Per Consultation</label>
                            <input
                                {...register("feesPerConsultation", { required: true })}
                                className="input input-bordered w-full"
                                type="number"
                                placeholder="e.g. 500"
                            />
                            {errors.feesPerConsultation && <p className="text-red-500 text-sm">Fees is required</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Start Time</label>
                            <Controller
                                control={control}
                                name="startTime"
                                rules={{ required: "Start time is required" }}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={field.onChange}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Start"
                                        dateFormat="h:mm aa"
                                        placeholderText="Select start time"
                                        className="input input-bordered w-full"
                                    />
                                )}
                            />
                            {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>End Time</label>
                            <Controller
                                control={control}
                                name="endTime"
                                rules={{ required: "End time is required" }}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={field.onChange}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="End"
                                        dateFormat="h:mm aa"
                                        placeholderText="Select end time"
                                        className="input input-bordered w-full"
                                    />
                                )}
                            />
                            {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn bg-blue-600 hover:bg-blue-700 text-white mt-6"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default ApplyDoctor;