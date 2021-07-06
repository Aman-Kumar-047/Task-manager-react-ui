import React, { useReducer } from "react";

import classes from "./DropdownSelect.module.css";

// import { useDispatch } from "react-redux";

//Import icons
// import { CreateButtonIcon } from "../../../ProjectIcons";



const initialState = { isVisible: false };

function dropdownSelectorReducer(state, action) {
  switch (action.type) {
    case "HIDE_DROPDOWN_VISIBILITY":
      return { isVisible: false };
    case "SHOW_DROPDOWN_VISIBILITY":
      return { isVisible: true };
    default:
      return state;
  }
}

const DropdownSelect = (props) => {
  const [state, dispatch] = useReducer(dropdownSelectorReducer, initialState);

  let dropdownContentClass = "";
  if (state.isVisible) {
    dropdownContentClass = [classes.dropdownContent, classes.show].join(" ");
  } else {
    dropdownContentClass = classes.dropdownContent;
  }

  let searchDataArray = props.searchObj;
  // console.log(searchDataArray);
  let dropdownOptions = null;
  let dropdownContentList = props.dropdownContent();
  if (
    searchDataArray !== undefined &&
    searchDataArray !== null &&
    searchDataArray.length > 0
  ) {
    dropdownOptions = searchDataArray.map((searchObj,index) => {
      // console.log(`From Dropdown component>>${props.dropdownContent()}`)
      return (
        <li
          key={`prartnerType_${searchObj[props.contentIdKey]}`}
          onClick={() => {
            props.onClickMethod(searchObj);
            dispatch({ type: "HIDE_DROPDOWN_VISIBILITY" });
          }}
        >
          {dropdownContentList[index]}
        </li>
      );
    });
  }

  const inputOnChange = (e) => {
    props.onChangeMethod(e);
    if (e.target.value.length < props.lengthOfSearch) {
      dispatch({ type: "HIDE_DROPDOWN_VISIBILITY" });
    } else {
      dispatch({ type: "SHOW_DROPDOWN_VISIBILITY" });
    }
  };

  //Function to return wrapped button component if passed as prop
  // const createButtonElement = () => {
  //   let button = props.createButton;
  //   if(button){
  //     let buttonElem = (
  //       <div className={classes.buttonInList}>
  //         {/* <CreateButtonIcon /> */}
  //         {button}
  //       </div>
  //     );
  //     return buttonElem;
  //   }
  // };

  const onRemovingFocus = () => {
    dispatch({ type: "HIDE_DROPDOWN_VISIBILITY" });
  };

  const onFocusToInput = () => {
    dispatch({type: "SHOW_DROPDOWN_VISIBILITY"});
  };

  return (
    <div style={{width: `${props.width}%`}}>
      <div className={classes.dropdown}>
        <input
          type="text"
          autoComplete="off"
          id={props.id}
          disabled={props.disabled}
          value={props.value}
          placeholder={props.placeHolder}
          onChange={inputOnChange}
          className={classes.searchInput}
          // onBlur={onRemovingFocus}
          onFocus={onFocusToInput}
          onKeyDown={props.onKeyDown}
        />
        <div
          id={`${props.id}_dropdown`}
          className={dropdownContentClass}
          onMouseLeave={onRemovingFocus}
        >
          {/* {createButtonElement()} */}
          {dropdownOptions}
        </div>
      </div>
    </div>
  );
};

export default DropdownSelect;
