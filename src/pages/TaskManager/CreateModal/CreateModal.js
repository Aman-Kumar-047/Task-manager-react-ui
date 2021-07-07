import React, { useState, useMemo, useEffect } from "react";

import classes from "./CreateModal.module.css";

import ModalContainer from "../../../components/ModalContainer/ModalContainer";
import Input from "../../../components/Input/Input";
import SearchDropdown from "../../../components/DropdownSelect/DropdownSelect";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";

const CreateModal = (props) => {
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descTextareaValue, setDescTextareaValue] = useState("");
  const [authorizationToken, setAuthorizationToken] = useState("");
  const [searchedUsersArray, setSearchedUsersArray] = useState([]);
  const [selectedAssigneeObject, setSelectedAssigneeObject] = useState("");
  const [uploadedImagesUrlArray, setUploadedImagesUrlArray] = useState("");
console.log("uploadedImagesUrlArray",uploadedImagesUrlArray);
  useEffect(
    () => {
      if (typeof Storage !== "undefined") {
        setAuthorizationToken(localStorage.getItem("token"));
      }
    }, []
  );

  useMemo(() => {
    if (props.isModalVisible === false) {
      setTitleInputValue("");
      setDescTextareaValue("");
      // setUploadImageUrlArray([]);
      // setUploadImageFileArray([]);
    }
  }, [props.isModalVisible]);


  const onClickOfCreateTask = () => {
    console.log("selectedAssigneeObject",selectedAssigneeObject);
    // for (let i = 0; i < uploadImageFileArray.length; i++) {
    //   let file = uploadImageFileArray[i];
    //   console.log("file", file);
    //   formData.append("images", file);
    // }
    // formData.append("title", titleInputValue);
    // formData.append("desc", descTextareaValue);
    let createTaskJson = {};
    createTaskJson["title"] = titleInputValue;
    createTaskJson["data"] = {"desc":descTextareaValue};
    createTaskJson["assignee"] = selectedAssigneeObject.userName;
    fetch("https://test-new-047.herokuapp.com/task/create", {
      mode: "cors",
      method: "post",
      headers: {
        Authorization: authorizationToken,
      },
      body: JSON.stringify(createTaskJson),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("created task", data);
        props.toggleModal();
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  const onSearchOfAssignee = (event) => {
    let searchedValue = event.target.value
    if(searchedValue.length > 0){
      fetch(`https://test-new-047.herokuapp.com/users?userName=${searchedValue}`, {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: authorizationToken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
         if(data.length > 0){
          setSearchedUsersArray(data);
         }
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
    }
  }

  return (
    <ModalContainer
      isModalVisible={props.isModalVisible}
      toggleModal={props.toggleModal}
      modalHeader={"Create Task"}
    >
      <div className={classes.ModalBody}>
        <Input
          type={"text"}
          name={"title"}
          value={titleInputValue}
          placeholder={"Summary"}
          handleChange={(event) => {
            setTitleInputValue(event.target.value);
          }}
          isInputMutedText={false}
          autoComplete={"off"}
        />
        <textarea
          id="desc"
          name="descTask"
          className={classes.taskDesc}
          placeholder={"Description"}
          value={descTextareaValue}
          onChange={(event) => {
            setDescTextareaValue(event.target.value);
          }}
        ></textarea>
        <ImageUploader 
          imagesUrlArray = {(arr) => {setUploadedImagesUrlArray(arr)}}
        />
        <SearchDropdown
          disabled={false}
          width={100}
          lengthOfSearch={2}
          searchObj={searchedUsersArray}
          dropdownContent={() => {
            let contentArr = searchedUsersArray.map((userObj) => {
              // if(userObj.userId){
                return userObj.userName
              // }             
            });
            return contentArr
          }}
          contentIdKey={"userId"}
          id={"assignee"}
          placeHolder={"Assignee"}
          onClickMethod={(selectedObj) => {
            if(selectedObj){
              setSelectedAssigneeObject(selectedObj);
            }
          }}
          onChangeMethod={(event) => {onSearchOfAssignee(event)}}
          value={selectedAssigneeObject.userName}
          onKeyDown={(e) => {
            if (e.keyCode === 8) {
              console.log("Clear selected object state");
            }
          }}
        ></SearchDropdown>

        <div className={classes.createTaskFooter}>
          <button
            className={classes.createTaskBtn}
            type="button"
            value="Create"
            onClick={onClickOfCreateTask}
          >
            Create
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CreateModal;
