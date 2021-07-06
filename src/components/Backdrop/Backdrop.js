import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {

    let backdropClasses = null;

    if (props.isVisible) {
        backdropClasses = [classes.Backdrop, classes.Open].join(" ");
    } else {
        backdropClasses = [classes.Backdrop, classes.Close].join(" ");
    }

    return(
        <div onClick={props.clicked} className={backdropClasses} />
    )
};

export default backdrop;
