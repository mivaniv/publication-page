import React from 'react';
import classes from './Header.module.css';

const Header = () => {
    return (<header className={classes.header}>
            <div className={classes.titleText}>
                <h1>Inforce</h1>
            </div>

        </header>
    );
};

export default Header;