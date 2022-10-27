import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddToBasketButton from "../../basket/addToBasketButton/AddToBasketButton";
import Counter from "../../counter/Counter";
import styles from "./ProductItem.module.css";
import { Product } from "../../../interfaces/Product";

const ProductItem: React.FC<{product: Product}> = ({product}) => {
    const [counterValue, setCounterValue] = useState(1);
    return (
        <div className={styles["product-item-container"]} key={product.sku}>
          <Card sx={{ width: "220px" }} variant="elevation" className="product-card" key={product.sku}>
            <CardContent>
                <Typography>
                    {product.name}
                </Typography>
                <Typography>
                    {product.description}
                </Typography>
                <Typography>
                    £{product.price}
                </Typography>
            </CardContent>
            <CardActions className="card-content" key={product.sku} sx={{ display: "block" }}>
                <Counter counterValue={counterValue} setCounterValue={setCounterValue} basketLimit={product.basketLimit} />
                <AddToBasketButton counterValue={counterValue} product={product} />
            </CardActions>
          </Card>
        </div>
    );
};

export default ProductItem;
