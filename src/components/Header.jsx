import {Badge, Button, Container, Dropdown, FormControl, Nav, Navbar} from "react-bootstrap";
import {FaShoppingCart} from "react-icons/fa";
import {Link} from "react-router-dom";
import {CartState} from "../contexts/CartContext.jsx";
import styles from './Header.module.css'
import {AiFillDelete} from "react-icons/ai";

export const Header = () => {
    const {
        state: {cart},
        dispatch,
        productDispatch,
    } = CartState()
    return (
        <Navbar bg="dark" variant="dark" className={styles.header} style={{height: 80}}>
            <Container>
                <Navbar.Brand className="text-white">
                    <Link to="/">Shopping Cart</Link>
                </Navbar.Brand>
                <Navbar.Text className="search">
                    <FormControl
                        style={{width: 500}}
                        placeholder="Search a product"
                        className="m-auto"
                        onChange={(e) =>
                            productDispatch({
                                type: "FILTER_BY_SEARCH",
                                payload: e.target.value,
                            })
                        }
                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="success">
                            <FaShoppingCart color="white" fontSize="25px"/>
                            <Badge bg="danger">{cart.length}</Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{minWidth: 370}}>
                            {cart.length > 0 ? (
                                <>
                                    {cart.map((prod) => (
                                        <span className={styles.cartItem} key={prod.id}>
                                            <img
                                                className={styles.cartItemImg}
                                                src={prod.image}
                                                alt={prod.name}
                                            />
                                            <div className={styles.cartItemDetail}>
                                                <span>{prod.name}</span>
                                                <span>R$ {prod.price.split('.')[0]}</span>
                                            </div>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    dispatch({
                                                        type: 'REMOVE_FROM_CART',
                                                        payload: prod,
                                                    })
                                                }}
                                            />
                                        </span>
                                    ))}
                                    <Link to="/cart">
                                        <Button style={{
                                            width: '95%',
                                            margin: '0 10px'
                                        }}>Go to Cart</Button>
                                    </Link>

                                </>
                            ) : (
                                <span style={{padding: 10}}>Cart is empty</span>
                            )}

                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};
