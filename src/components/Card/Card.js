import React from 'react';
import classes from './Card.module.css';

import PropTypes from 'prop-types';



const Card = (props) => {

    return(
        <div key={props.keyName ? props.keyName : null} style={{width: props.width ? `${props.width}%` : '100%', borderRadius: props.isRoundedBorder===true ? (props.borderRadiusSize ? props.borderRadiusSize : "4px") : null, backgroundColor: props.cardColor ? props.cardColor : '#FFFFFF', boxShadow: props.boxShadow ? props.boxShadow : null}}>
            {props.header ? 
            <div key={props.keyName ? props.keyName : null} className={classes.header} style={{textAlign: props.headerTextAlign ? `${props.headerTextAlign}` : 'center'}}>
                {props.header}
            </div> :
            null}
            {props.body ?
            <div key={props.keyName ? props.keyName : null} className={classes.body}>{props.body}</div> :
            null}
            {props.footer ?
            <div key={props.keyName ? props.keyName : null} className={classes.footer} style={{textAlign: props.footerTextAlign ? `${props.footerTextAlign}` : 'center'}}>{props.footer}</div> :
            null}
        </div>
    )
};

Card.propTypes = {
    header: PropTypes.node,
    headerTextAlign: PropTypes.string,
    footerTextAlign: PropTypes.string,
    width: PropTypes.number,
    boxShadow: PropTypes.string,
    footer: PropTypes.node,
    isRoundedBorder: PropTypes.bool,
    cardColor: function(props, propName, componentName) {
        if (props[propName] !== undefined && !/^#[0-9a-fA-F]{6}$/.test(props[propName])) {
          return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Must be a valid color code.'
          );
        }
      },
      body: PropTypes.node,
};

export default Card;