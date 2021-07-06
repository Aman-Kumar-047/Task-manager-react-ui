import React, { useEffect } from "react";

import classes from "./TaskDetailModal.module.css";

import ModalContainer from "../../../components/ModalContainer/ModalContainer";
// import Input from "../../../components/Input/Input";
// import SearchDropdown from "../../../components/DropdownSelect/DropdownSelect";

const TaskDetailModal = (props) => {
  useEffect(
    () => {
      if(props.isModalVisible === true){
        let token = "";
        if (typeof Storage !== "undefined") {
          token = localStorage.getItem("token");
        }
        fetch(`https://test-new-047.herokuapp.com/task/detail/${props.taskId}`, {
          mode: 'cors',
          method: 'get',
          headers: {
            "Authorization": token,
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
        })
         .then(response => {
            return response.json()
         }).then(
           data => {
             console.log("task detail",data);
             if(data.length > 0){
  
             }
        }
         )
        .catch(function (error) {
          console.log('Request failed', error);
        });
      }
    },[props.isModalVisible]
  );
  return (
    <ModalContainer
      isModalVisible={props.isModalVisible}
      toggleModal={props.toggleModal}
      modalHeader={props.taskTitle}
    >
      <div className={classes.ModalBody}>
       
      </div>
    </ModalContainer>
  );
};

export default TaskDetailModal;
