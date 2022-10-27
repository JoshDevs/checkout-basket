import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ApiStatus } from "../../../enums/ApiStatus";
import ProductItem from "../productItem/ProductItem";
import styles from "./ProductList.module.css";
import { fetchProducts } from "./productSlice";

const ProductList: React.FC = () => {
    const productListStatus = useAppSelector(state => state.productList.status);
    const productList = useAppSelector(state => state.productList.products);
    const dispatch = useAppDispatch();

    useMemo(() => {
        if (productListStatus === ApiStatus.IDLE) {
            dispatch(fetchProducts());
        }
    }, [productListStatus, dispatch]);

    return (
        <div className={styles["product-list-container"]}>
          {productListStatus === ApiStatus.LOADING ? <div>Loading...</div> : productList.map(product => <ProductItem product={product} key={product.sku} />)}
        </div>
    )
}

export default ProductList;
