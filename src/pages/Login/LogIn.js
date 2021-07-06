import React, { useReducer, useMemo } from "react";
import { useHistory } from "react-router-dom";

import classes from "./LogIn.module.css";

/* Import Components */
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";

//import icons
import loginCreativeImage from '../../assets/static/loginCreative.jpg';

const LoginInitialState = {
  username: "",
  password: "",
  isLoginButtonDisabled: true
};

const LoginContainerReducer = (initialState, action) => {
  switch (action.type) {
    case "ON_CHANGE_OF_FORM_INPUT":
      return { ...initialState, [action.name]: action.data };
      case "ENABLE_LOGIN_BUTTON":
        return { ...initialState, isLoginButtonDisabled: false };
        case "DISABLE_LOGIN_BUTTON":
          return { ...initialState, isLoginButtonDisabled: true };
    default:
      return initialState;
  }
};

const LogIn = (props) => { 
  let history = useHistory();

  const [LoginState, LoginHandler] = useReducer(
    LoginContainerReducer,
    LoginInitialState
  );

  useMemo(
    () => {
        if(LoginState.username.length > 0 && LoginState.password.length > 0){
          LoginHandler({
            type: "ENABLE_LOGIN_BUTTON",
          });      
        }else{
          LoginHandler({
            type: "DISABLE_LOGIN_BUTTON",
          }); 
        }
        },
    [LoginState.username,LoginState.password]
);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    console.log("FormContainerState", LoginState);
    let loginPayloadObj = {};
    loginPayloadObj["userName"] = LoginState.username;
    loginPayloadObj["password"] = LoginState.password;

    fetch("https://test-new-047.herokuapp.com/login", {
      mode: 'cors',
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: JSON.stringify(loginPayloadObj)
    })
     .then(response => {
        return response.json()
     }).then(
       data => {
       if (typeof Storage !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.userId);
      }
      props.loggedIn();
      history.push("/task-manager");
    }
     )
    .catch(function (error) {
      console.log('Request failed', error);
      fetch("https://test-new-047.herokuapp.com/signUp", {
        mode: 'cors',
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(loginPayloadObj)
      })
       .then(response => {
          return response.json()
       }).then(
         data => {
         if (typeof Storage !== "undefined") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.userId);
        }
        props.loggedIn();
        history.push("/task-manager");
      }
       )
      .catch(function (error) {
        console.log('Request failed', error);
        
      });
    });

  };


  //onChangeHandlers for Components
  const handleInputOnChange = (event) => {
    LoginHandler({
        type: "ON_CHANGE_OF_FORM_INPUT",
        data: event.target.value,
        name: event.target.name,
      });
  };

  return (
    <div className={classes.bgContainer}>
      <Card
        width={80}
        isRoundedBorder={false}
        // borderRadiusSize={"10px"}
        boxShadow={"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}
        body={
          <div className={classes.loginContainer}>
            <div className={classes.loginForm}>
            <h2>
              <strong>Login</strong>
            </h2>
            <p>Enter to manage your tasks</p>
            <form autoComplete={"off"} onSubmit={handleFormSubmit}>            
            <Input
              type={"text"}
              name={"username"}
              value={LoginState.username}
              placeholder={"Username"}
              handleChange={handleInputOnChange}
              isInputMutedText={false}
              autoComplete={"off"}
              width={50}
            />
            <Input
              type={"password"}
              name={"password"}
              value={LoginState.password}
              placeholder={"password"}
              handleChange={handleInputOnChange}
              isInputMutedText={false}
              autoComplete={"off"}
              width={50}
            />
            <button className={classes.loginButton} type="submit" value="Submit" disabled={LoginState.isLoginButtonDisabled} >Enter</button>
            </form>
            </div >

            <div className={classes.loginCreative}>
              <p>The only task tool you need for task management and lists</p>
              <img src={loginCreativeImage} alt="Girl in a jacket" width="100%" height="60%" />
            </div>
          </div>
        }
        cardColor={"#FFFFFF"}
      ></Card>
    </div>
  );
};

export default LogIn;
