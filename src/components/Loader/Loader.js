import React from 'react';
import classes from './Loader.module.css';

//import of images
import jumkeyLoaderImgUrl from '../../assets/Loader/__Iphone-spinner.gif';
const loader = () => {
    return(
        <div className={classes.Container}>
            <img src={jumkeyLoaderImgUrl} alt={"jumkey loader"}  />
        </div>
    )
};

export default loader
