import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./Routes/Router";
import Spinner from "./components/Spinner";
import { hideLoading, showLoading } from "./redux/Featurse/LoadingSlice";
import { setUser } from "./redux/Featurse/UserSlice";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alerts);
  const { user } = useSelector(state => state.user);
  const token = localStorage.getItem("token");

  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.removeItem("token");
      toast.error(error)
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token && !user) {
      getUser();
    }
  }, [token, user, getUser]);

  return (
    <>
      {loading ? <Spinner /> : <RouterProvider router={router} />}
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;
