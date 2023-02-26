import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { selectProducts } from "../../../redux/feature/slice/productSlice";
import Loader from "../../loader/Loader";
import styles from "./AddProduct.module.scss";
const categories = [
    {
        id: 1,
        name: "Laptop",
    },
    {
        id: 2,
        name: "Electronic",
    },
    {
        id: 3,
        name: "Fashion",
    },
    {
        id: 4,
        name: "Phone",
    },
];
const initialState = {
    name: "",
    imageUrl: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
};
const AddProduct = () => {
    const { id } = useParams();
    const products = useSelector(selectProducts);
    const productEdit = products.find((item) => item.id === id);
    const [product, setProduct] = useState(() => {
        const newState = detectForm(id, { ...initialState }, productEdit);
        return newState;
    });
    const [uploadProcess, setUploadProcess] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const nagivate = useNavigate();
    function detectForm(id, f1, f2) {
        if (id === "ADD") return f1;
        else return f2;
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };
    const handleImageChange = (e) => {
        // get info image upload
        const file = e.target.files[0];

        // upload image file
        const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // firebase process checking
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProcess(progress);
            },
            (error) => {
                toast.error(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProduct({ ...product, imageUrl: downloadURL });
                });
            }
        );
    };
    const addProduct = (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const docRef = addDoc(collection(db, "products"), {
                name: product.name,
                imageUrl: product.imageUrl,
                price: Number(product.price),
                category: product.category,
                brand: product.brand,
                desc: product.desc,
                createdAt: Timestamp.now().toDate(),
            });
            setIsLoading(false);
            setUploadProcess(0);
            setProduct({
                ...initialState,
            });
            toast.success("Product upload successfully");
            nagivate("/admin/all-product");
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    const editProduct = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (product.imageUrl !== productEdit.imageUrl) {
            const storageRef = ref(storage, productEdit.imageUrl);
            deleteObject(storageRef);
        }

        try {
            setDoc(doc(db, "products", id), {
                name: product.name,
                imageUrl: product.imageUrl,
                price: Number(product.price),
                category: product.category,
                brand: product.brand,
                desc: product.desc,
                createdAt: productEdit.createdAt,
                editedAt: Timestamp.now().toDate(),
            });
            setIsLoading(false);
            toast.success("Edit success");
            nagivate("/admin/all-product");
        } catch (error) {
            setIsLoading(false);
            console.error(error.message);
        }
    };
    return (
        <>
            {isLoading && <Loader />}
            <section className="flex flex-col">
                <h2 className="text-3xl font-semibold">{detectForm(id, "Add New Product", "Edit Product")}</h2>
                <form onSubmit={detectForm(id, addProduct, editProduct)}>
                    <label htmlFor="">Product Name: </label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Product Name"
                        required
                        name="name"
                        value={product.name}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label>Product Images:</label>
                    <div className="p-1 border border-solid border-zinc-400">
                        {uploadProcess === 0 ? null : (
                            <div className="bg-slate-400 border border-solid border-zinc-400 rounded-[10px]">
                                <div
                                    className="bg-blue-500 border border-solid border-transparent rounded-[10px] text-white text-xl font-medium px-0 py-4"
                                    style={{ width: `${uploadProcess}%` }}
                                >
                                    {uploadProcess < 100 ? `${uploadProcess}%` : "Upload Success"}
                                </div>
                            </div>
                        )}
                        <input
                            className={styles.input}
                            type="file"
                            accept="image/*"
                            placeholder="Product Image"
                            name="image"
                            onChange={(e) => handleImageChange(e)}
                        />
                        {product.imageUrl !== "" && (
                            <input
                                className={styles.input}
                                type="text"
                                required
                                name="imageUrl"
                                disabled
                                placeholder="Image url"
                                value={product.imageUrl}
                            />
                        )}
                    </div>
                    <label htmlFor="">Product price: </label>
                    <input
                        className={styles.input}
                        type="number"
                        placeholder="Product price"
                        required
                        name="price"
                        value={product.price}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor="">Product Categories: </label>
                    <select
                        className={styles.select}
                        required
                        name="category"
                        value={product.category}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="" disabled>
                            Choose Product Category
                        </option>
                        {categories.map((cat) => {
                            return (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            );
                        })}
                    </select>
                    <label htmlFor="">Product Company/Brand</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Product brand"
                        required
                        name="brand"
                        value={product.brand}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor="">Product Description</label>
                    <textarea
                        name="desc"
                        value={product.desc}
                        onChange={(e) => handleInputChange(e)}
                        required
                        cols="30"
                        rows="10"
                    ></textarea>
                    <button className="px-3 py-2 mt-3 text-white bg-blue-700 rounded-md">
                        {detectForm(id, "Save Product", "Edit Product")}
                    </button>
                </form>
            </section>
        </>
    );
};

export default AddProduct;
