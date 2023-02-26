import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/feature/slice/authSlice";
function AdminOnlyRoute({ children }) {
    const userEmail = useSelector(selectEmail);
    if (userEmail === "abc@hotmail.com") {
        return children;
    }
    return (
        <section className="container p-4">
            <h1 className="text-6xl font-bold text-red-600">Permission Dennied</h1>
            <p className="py-3 text-xl">This page can only views by admin account</p>
            <Link to="/">
                <button className="px-3 py-2 my-3 bg-blue-500 rounded-md text-white">&larr; Back to menu</button>
            </Link>
        </section>
    );
}

export function AdminOnlyLink({ children }) {
    const userEmail = useSelector(selectEmail);
    if (userEmail === "abc@hotmail.com") {
        return children;
    }
    return null;
}

export default AdminOnlyRoute;
