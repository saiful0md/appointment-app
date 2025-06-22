import axios from 'axios';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useHelmet from '../hooks/useHelmet';
import { hideLoading, showLoading } from '../redux/Featurse/LoadingSlice';
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (userData) => {
        try {
            // loading
            dispatch(showLoading());
            const res = await axios.post("http://localhost:8080/api/v1/user/login", userData);
            // hideloading
            dispatch(hideLoading())
            if (res.data?.token) {
                localStorage.setItem('token', res.data.token)
                toast.success("Login Successfully")
                navigate("/dashboard");
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.response?.data?.message || error.message || "Login failed");
        }
    }

    // custom Title
    useHelmet({
        title: 'Appointment App - Login',
        description: 'Welcome to the home page of my awesome site built with React 19.',
    })

    return (
        <div className="flex flex-col mx-auto max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Log In</h1>
                <p className="text-sm dark:text-gray-600">Login to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        placeholder="email"
                        className="input input-bordered"
                    />
                    {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        placeholder="password"
                        className="input input-bordered"
                    />
                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                </div>

                <div className="form-control mt-6">
                    <input className="btn w-full bg-[#D1A054] text-white" type="submit" value="Login" />
                </div>

                <p className="text-[#D1A054] text-center font-medium mt-4">
                    Not a user? <Link to="/signUp" className="underline">Sign Up here</Link>
                </p>
            </form>

        </div>
    );
};

export default Login;