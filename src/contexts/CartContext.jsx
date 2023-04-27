import {createContext, useReducer, useContext} from "react";
import { CartReducer } from "../reducers/CartReducer.jsx";

import {commerce, datatype, random, seed} from 'faker'
import {FiltersReducer} from "../reducers/FiltersReducer.jsx";

export const CartContext = createContext()


export const CartContextProvider = ({ children }) => {
    let products = []
    for (let i = 0; i < 20; i++) {
        const product = {
            id: datatype.uuid(),
            name: commerce.productName(),
            price: commerce.price(),
            image: random.image(),
            inStock: random.arrayElement([0, 3, 5, 6, 7, 8, 9, 10]),
            fastDelivery: datatype.boolean(),
            ratings: random.arrayElement([1, 2, 3, 4, 5]),
        }
        products.push(product)
    }

    const [state, dispatch] = useReducer(CartReducer, {
        products: products,
        cart: [],
    })

    const [productState, productDispatch] = useReducer(FiltersReducer, {
        bySock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: '',
    })
    return <CartContext.Provider
        value={{state, dispatch, productState, productDispatch}}
    >
        {children}
    </CartContext.Provider>

};

export const CartState = () => {
    return useContext(CartContext)
}
