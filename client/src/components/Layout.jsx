import { FaBell } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminMenu, userMenu } from "./Data/Data";

const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()

    // handleLogout
    const handleLogout = () => {
        localStorage.removeItem('token')
        toast.success('Logout Successfully')
        navigate('/login')
    }
    // render menu list
    const sideBarMenu = user?.isAdmin ? adminMenu : userMenu

    return (
        <>
            <div className="mt-10">
                <div className="flex gap-6 max-w-6xl mx-auto">
                    {/* sidebar */}
                    <div className="bg-blue-700 p-4 flex flex-col gap-3 min-h-screen">
                        <NavLink to='/' className="px-3 text-3xl text-center text-white font-bold">
                            DOC APP
                        </NavLink>
                        <hr className="text-amber-50" />
                        <ul className="menu gap-4 w-56">
                            {sideBarMenu.map((menu, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={menu.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-3 py-2 rounded ${isActive ? "bg-amber-600 text-white font-semibold" : "text-gray-200 hover:bg-amber-600"
                                            }`
                                        }
                                    >
                                        <menu.icon /> {menu.name}
                                    </NavLink>
                                </li>
                            ))}

                            <li onClick={handleLogout}>
                                <div className='flex items-center gap-2 px-3 py-2 rounded text-white font-semibold hover:text-gray-200 hover:bg-amber-600'>
                                    <FiLogOut /> Logout
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* content */}
                    <div className="flex-1 w-full">
                        <div className="mb-4 flex items-center gap-2 justify-end">
                            <Link to={'/notification'} className="btn rounded-full">
                                <FaBell className="cursor-pointer" />
                                <div className="badge badge-sm badge-secondary">{user && user?.notification.length}</div>
                            </Link>
                            <Link to={'/profile'} className="text-black text-md font-semibold uppercase">{user?.name}</Link>
                        </div>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
