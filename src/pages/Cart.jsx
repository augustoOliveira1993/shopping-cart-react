import {CartState} from "../contexts/CartContext.jsx";
import {home, productContainer} from "./Home.module.css";
import {cartItem, cartItemDetail, cartItemImg} from '../components/Header.module.css'
import {Button, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import {AiFillDelete} from "react-icons/ai";
import styles from "./Cart.module.css";
import {useEffect, useState} from "react";
import {Rating} from "../components/Rating.jsx";

export const Cart = () => {
    const {state: {cart}, dispatch} = CartState()

    const [total, setTotal] = useState(0)

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
    }, [cart])
    return (
        <div className={home}>
            <div className={productContainer}>
                <ListGroup>
                    {cart.map((prod) => (
                        <ListGroup.Item key={prod.id}>
                            <Row>
                                <Col md={2}>
                                    <Image
                                        src={prod.image}
                                        alt={prod.name}
                                        fluid
                                        rounded
                                    />
                                </Col>
                                <Col md={2}>
                                    <span>{prod.name}</span>
                                </Col>
                                <Col md={2}>
                                    R$ {prod.price.split('.')[0]}
                                </Col>
                                <Col md={2}>
                                    <Rating
                                        rating={prod.ratings}
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Control
                                        as="select"
                                        value={prod.qty}
                                        onChange={(e) =>
                                            dispatch({
                                                type: 'CHANGE_CART_QTY',
                                                payload: {
                                                    id: prod.id,
                                                    qty: e.target.value,
                                                }
                                            })
                                        }
                                    >
                                        {[...Array(prod.inStock).keys()].map((x) => (
                                            <option key={x + 1}>{x + 1}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() =>
                                            dispatch({
                                                type: 'REMOVE_FROM_CART',
                                                payload: prod
                                            })
                                        }
                                    >
                                        <AiFillDelete fontSize="20px"/>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        ))}
                </ListGroup>
            </div>
            <div className={`${styles.filters} ${styles.summary}`}>
                <span className={styles.title}>
                    Subtotal ({cart.length}) items
                </span>
                <span
                    style={{
                        fontWeight: 700,
                        fontSize: 20,
                    }}
                >
                    Total: R$ {total}
                </span>
                <Button
                    type="button"
                    disabled={cart.length === 0}
                >
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    );
};
