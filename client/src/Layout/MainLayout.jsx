// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
