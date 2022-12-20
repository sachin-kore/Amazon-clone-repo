import React from 'react'
import './Checkout.css'
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'
import { CheckOutProduct } from './CheckOutProduct'



export const Checkout = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    return (
        <div className='checlout'>
            <div className='checlout__left'>
                <img
                    className='checkout__ad'
                    src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg' />
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h1 className='checkout__title'>Your shopping Basket</h1>
                </div>
                {basket.map((item) => (
                    <CheckOutProduct
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        rating={item.rating} />
                ))}
            </div>
            <div className='checkout__right'>
                <Subtotal />
            </div>
        </div>
    )
}
