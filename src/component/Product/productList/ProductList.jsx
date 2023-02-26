import { useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../Search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SORT_PRODUCT, FILTER_BY_SEARCH, selectFilterProducts } from "../../../redux/feature/slice/filterSlice";
import Pagination from "../../pagination/Pagination";
const ProductList = ({ products }) => {
    const [grid, setGrid] = useState(true);
    const [sort, setSort] = useState("latest");
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectFilterProducts);

    // page nagivation
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);
    // get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        dispatch(SORT_PRODUCT({ products, sort }));
    }, [dispatch, products, sort]);

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({ products, search }));
    }, [dispatch, products, search]);
    return (
        <div id="product" className={styles["product-list"]}>
            <div className={styles.top}>
                <div className={styles.icons}>
                    <BsFillGridFill size={22} color="orange" onClick={() => setGrid(true)} />
                    <FaListAlt size={24} color="orange" onClick={() => setGrid(false)} />
                    <p>
                        <b>{filteredProducts.length}</b> Products found.
                    </p>
                </div>
                {/* Search icons */}
                <div>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                {/* Sort products */}
                <div className={styles.sort}>
                    <label>Sort by: </label>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="lowest-price">Lowest price</option>
                        <option value="highest-price">Highest price</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                </div>
            </div>
            <div className={grid ? `${styles.grid}` : `${styles.list}`}>
                {products.length === 0 ? (
                    <p className="text-red-600 font-semibold text-2xl">No products found</p>
                ) : (
                    <>
                        {currentProducts.map((product) => {
                            return (
                                <div key={product.id}>
                                    <ProductItem {...product} grid={grid} product={product} />
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                productsPerPage={productsPerPage}
                totalProducts={filteredProducts.length}
            />
        </div>
    );
};

export default ProductList;
