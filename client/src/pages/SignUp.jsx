import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useHelmet from '../hooks/useHelmet';
import { hideLoading, showLoading } from "../redux/Featurse/LoadingSlice";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (userData) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/register", userData);
      dispatch(hideLoading())
      if (res.data) {
        toast("Sign Up Successfully")
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response?.data?.message || error.message || "Login failed");
    }
  };

  // Helmet
  useHelmet({
    title: 'Appointment App - Sign Up',
    description: 'Sign up'
  });

  return (
    <div className="flex flex-col mx-auto max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        <p className="text-sm dark:text-gray-600">Create a new account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
        {/* Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Your Name"
            className="input input-bordered"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="input input-bordered"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              },
              maxLength: {
                value: 20,
                message: "Password must not exceed 20 characters"
              },
              pattern: {
                value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                message:
                  "Password must contain uppercase, lowercase, number and special character"
              }
            })}
            placeholder="Password"
            className="input input-bordered"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <div className="form-control mt-6">
          <input
            className="btn w-full bg-[#D1A054] text-white"
            type="submit"
            value="Sign Up"
          />
        </div>

        <p className="text-[#D1A054] text-center font-medium mt-4">
          Already registered? <Link to="/login" className="underline">Go to log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
