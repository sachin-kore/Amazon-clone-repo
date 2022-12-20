import React, { useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import './Header.css'
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './Firebase';


export const Header = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const handleAuthenticaton = () => {
        if (user) {
            auth.signOut();
        }
    }
    return (
        <div className='header'>
            <Link to='/'>
                <img
                    className='header__logo'
                    src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
                />
            </Link>
            <div className='header__search'>
                <input className='header__searchInput'
                    type='text'
                />
                <SearchIcon className='header__searchIcon' />

            </div>
            <div className='header__nav'>
                <Link to={!user && '/login'}>
                    <div className='header__option' onClick={handleAuthenticaton}>
                        <span className='header__optionLineone'>{user ? user?.email : "Guest"}</span>
                        <span className='header__optionLineTwo'>{user ? 'Signout' : "Sign In"}</span>
                    </div>
                </Link>
                <div className='header__option'>
                    <span className='header__optionLineone'>Returns</span>
                    <span className='header__optionLineTwo'>&Orders</span>
                </div>
                <div className='header__option'>
                    <span className='header__optionLineone'>Your</span>
                    <span className='header__optionLineTwo'>Prime</span>
                </div>

                <Link to='/checkout'>
                    <div className='header__optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header__optionLineTwo header__basketCount'>{basket.length}</span>
                    </div>
                </Link>

            </div>
        </div>
    )
}

