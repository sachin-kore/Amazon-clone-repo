import React from 'react'
import './CheckOutProduct.css';
import { useStateValue } from './StateProvider';

export const CheckOutProduct = ({ id, title, image, price, rating }) => {
    const [action, dispatch] = useStateValue();
    const RemoveProductfrombasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        })
    }
    return (
        <div className='checkoutproduct'>
            <img className='checkoutproduct__img' src={image} />
            <div className='checkoutproduct__info'>
                <p className='checkoutproduct__title'>{title}</p>
                <p className='checkoutproduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutproduct__rating'>
                    {Array(rating).fill().map((_, i) => (
                        <p key={i}>🌟</p>
                    ))}
                </div>
                <button className='chekoutproduct__btn' onClick={RemoveProductfrombasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

