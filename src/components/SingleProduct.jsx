import {Button, Card} from "react-bootstrap";
import styles from "./SingleProduct.module.css";
import {Rating} from "./Rating.jsx";
import {CartState} from "../contexts/CartContext.jsx";

export const SingleProduct = ({product}) => {
    const {state: {cart}, dispatch} = CartState()
    return (
        <div className={styles.products}>
            <Card>
                <Card.Img variant="top" src={product.image} alt={product.name}/>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle style={{paddingBottom: 10}}>
                        <span>R$ {product.price.split('.')[0]}</span>
                        {product.fastDelivery ? (
                            <div>Fast Delivery</div>
                        ) : (
                            <div>4 days delivery</div>
                        )}
                        <Rating rating={product.ratings}/>
                    </Card.Subtitle>
                    {cart.some(p => p.id === product.id) ? (
                        <Button
                            variant="danger"
                            onClick={() => dispatch({
                                type: 'REMOVE_FROM_CART',
                                payload: {
                                    id: product.id

                                }
                            })}
                        > Remover from Cart</Button>
                    ) : (
                        <Button
                            onClick={() => dispatch({
                                type: 'ADD_TO_CART',
                                payload: product
                            })}
                            disabled={!product.inStock}
                        >
                            {!product.inStock ? "Out of Stock" : "Add to Cart"}
                        </Button>
                    )}


                </Card.Body>
            </Card>
        </div>
    );
};
