import { deleteDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import styles from "./ViewProducts.module.scss";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCT } from "../../../redux/feature/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
const ViewProducts = () => {
    const { data, isLoading } = useFetchCollection("products");
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    useEffect(() => {
        dispatch(
            STORE_PRODUCT({
                products: data,
            })
        );
    }, [data, dispatch]);
    const comfirmDelete = (id, imageUrl) => {
        Notiflix.Confirm.show(
            "Delete Products",
            "Are you sure about want to delete this product ?",
            "Yes",
            "No",
            function okCb() {
                deleteProduct(id, imageUrl);
            },
            function cancelCb() {},
            {
                width: "320px",
                borderRadius: "8px",
                cssAnimationStyle: "zoom",
            }
        );
    };
    const deleteProduct = async (id, imageUrl) => {
        try {
            await deleteDoc(doc(db, "products", id));
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);
            toast.success("Delete Successfully");
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.table}>
                <h2 className="text-2xl font-semibold">All Product</h2>

                {products.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => {
                                const { id, name, price, imageUrl, category } = product;
                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={imageUrl} alt={name} style={{ width: "100px" }} />
                                        </td>
                                        <td>{name}</td>
                                        <td>{category}</td>
                                        <td>{`$${price}`}</td>
                                        <td className={styles.icons}>
                                            <Link to={`/admin/add-product/${id}`}>
                                                <FaEdit size={20} color="green" />
                                            </Link>
                                            &nbsp;
                                            <FaTrashAlt
                                                size={18}
                                                color="red"
                                                onClick={() => comfirmDelete(id, imageUrl)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default ViewProducts;
