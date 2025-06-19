import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

const Home = () => {
    // Login User data 
    const getUserData = async () => {
        try {
            await axios.post('/api/v1/user/getUserData', {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        getUserData()
    }, []);

    return (
        <Layout>
            <h2 className="text-4xl">Home</h2>
        </Layout>
    );
};

export default Home;