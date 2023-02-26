import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/feature/slice/authSlice";
const NavBar = () => {
    const userName = useSelector(selectUserName);
    return (
        <div className="min-h-screen border-r-2 border-solid border-r-slate-50">
            <div className="flex flex-col items-center justify-center p-16 bg-blue-500">
                <FaUserCircle size={40} color="white" />
                <p className="text-white">{userName}</p>
            </div>
            <nav className="mt-3">
                <ul>
                    <li className="border border-solid border-zinc-200">
                        <NavLink
                            to="/admin/home"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex text-md transition delay-150 border-r-8 border-solid border-orange-600  py-3 p-2"
                                    : "flex text-md transition delay-150 py-3 p-2 "
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="border border-solid border-zinc-200">
                        <NavLink
                            to="/admin/all-product"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex text-md transition delay-150 border-r-8 border-solid border-orange-600  py-3 p-2"
                                    : "flex text-md transition delay-150 py-3 p-2 "
                            }
                        >
                            All Products
                        </NavLink>
                    </li>
                    <li className="border border-solid border-zinc-200">
                        <NavLink
                            to="/admin/add-product/ADD"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex text-md transition delay-150 border-r-8 border-solid border-orange-600  py-3 p-2"
                                    : "flex text-md transition delay-150 py-3 p-2 "
                            }
                        >
                            Add Product
                        </NavLink>
                    </li>
                    <li className="border border-solid border-zinc-200">
                        <NavLink
                            to="/admin/orders"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex text-md transition delay-150 border-r-8 border-solid border-orange-600  py-3 p-2"
                                    : "flex text-md transition delay-150 py-3 p-2 "
                            }
                        >
                            Orders
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
