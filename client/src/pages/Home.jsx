
const Home = () => {
    // Login User data 
    // const getUserData = async () => {
    //     try {
    //         await axios.post('/api/v1/user/getUserData', {}, {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem("token")
    //             }
    //         })
    //     } catch (error) {
    //         toast.error(error)
    //     }
    // }

    // useEffect(() => {
    //     getUserData()
    // }, []);

    return (
        <>
            <h2 className="text-4xl">Home</h2>
        </>
    );
};

export default Home;