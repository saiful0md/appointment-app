import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../redux/Featurse/LoadingSlice";
import { setUser } from "../redux/Featurse/UserSlice";

const ProtectorRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const token = localStorage.getItem("token");

  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/getUserData", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(hideLoading());

      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.removeItem("token");
      toast.error(error.message || "Something went wrong");
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token && !user) {
      getUser();
    }
  }, [token, user, getUser]);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectorRoute;