import React from 'react';
import classes from './Input.module.css';

// import PropTypes from 'prop-types';


const Input = (props) => {
    let inputClassName = [classes.GlowOnFocus,classes.InputSection,classes.InputWidth].join(" ");
    if(props.type === "number" && props.isStepRequired === false){
        inputClassName = [classes.GlowOnFocus,classes.InputSection,classes.InputStep,classes.InputWidth].join(" ");
    }else if(props.type === "checkbox" || props.type === "radio"){
      inputClassName = classes.InputSection;
    }else if(props.type === "range"){
      inputClassName = [classes.InputSection,classes.InputWidth].join(" ");
    }

    let labelInputInARow = false;
    labelInputInARow = props.type === "radio" || props.type === "checkbox" ? true : false;
    // console.log("Hello",props.type);
    return(
        <div className={classes.InputContainer} style={{width: `${props.width}%`, display: `${labelInputInARow ? "flex" : null}`, flexFlow: `${props.type==="checkbox" ? "row-reverse nowrap" : null}`, justifyContent: `${props.type==="checkbox" ? "flex-end" : null}`}}>
        {props.title ? <label htmlFor={props.name} className={classes.Label}>{props.title}</label> : null}
        <input
          className={inputClassName}          
          name={props.name}
          id={props.type==="radio" ? null : props.name}
          type={props.type}
          autoComplete={props.autoComplete}
          onChange={props.handleChange}
          onFocus={props.handleFocus}
          onKeyDown={props.handleKeyDown}
          value={props.value}
          placeholder={props.placeholder} 
          required={props.isMandataory}
          disabled={props.isDisabled}
          step={props.step} /*Step will set the stepper count for input type number*/
          checked={props.checked}
          min={props.min}
          max={props.max}
        />
        {props.isInputMutedText ? <small id={`small_${props.name}`} className={[classes.InputTextMuted,classes.FormSmallText].join(" ")}>{props.inputSmallText}</small> : null}
      </div>
    )
};

Input.propTypes = {

};

export default Input;