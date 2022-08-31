import React from "react";
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AmazonLogo from '../../images/amazon_logo.png'

function Header() {
    return (
        <div className="header">
          
            <img
              className="header__logo"
              src={AmazonLogo}
              alt="header logo"
            />
          
    
            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>
        
            <div className="header__nav">
                
                <div className="header__option">
                    <span className="header__optionLineOne">Hello, sign in</span>
                    <span className="header__optionLineTwo">Account & Lists</span>
                </div>         
        
                
                <div className="header__option">
                    <span className="header__optionLineOne">Returns</span>
                    <span className="header__optionLineTwo">& Orders</span>
                </div>
                    
                
                <div className="header__optionBasket">
                    <ShoppingCartIcon />
                    <span className="header__optionLineTwo header__basketCount">
                    0
                    </span>
                </div>
                
            </div>
        </div>
    );
}

export default Header;
