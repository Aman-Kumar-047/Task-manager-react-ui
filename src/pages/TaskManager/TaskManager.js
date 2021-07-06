import React, { useReducer, useEffect } from "react";

import { useHistory } from "react-router-dom";

import classes from "./TaskManager.module.css";

/* Import Components */
import Card from "../../components/Card/Card";
import CreateModal from "./CreateModal/CreateModal";
import TaskDetailModal from "./ViewTaskModal/TaskDetailModal";


const TasksInitialState = {
  tasksList: [],
  isCreateModalVisible: false,
  isTaskDetailModalVisible: false,
  selectedTaskTitle: "NA",
  selectedTaskId: null
};

const TasksManagerReducer = (initialState, action) => {
  switch (action.type) {
    case "TOGGLE_CREATE_MODEL":
      return { ...initialState, isCreateModalVisible: !initialState.isCreateModalVisible };
      case "TOGGLE_VIEW_TASK_DETAIL_MODEL":
      return { ...initialState, isTaskDetailModalVisible: !initialState.isTaskDetailModalVisible,selectedTaskTitle: action.taskTitle, selectedTaskId:action.taskId };
    case "SET_TASKS_LIST":
      return {...initialState, tasksList: action.taskArray};
    default:
      return initialState;
  }
};

const TaskManager = (props) => {
  let history = useHistory();

  const [TasksManagerState, TasksManagerHandler] = useReducer(
    TasksManagerReducer,
    TasksInitialState
  );

  useEffect(() => {
    let token = "";
    if (typeof Storage !== "undefined") {
      token = localStorage.getItem("token");
    }
    fetch("https://test-new-047.herokuapp.com/tasks", {
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
         console.log("userId",data);
         if(data.length > 0){
          TasksManagerHandler({
            type: "SET_TASKS_LIST",
            taskArray: data
          });
         }
    }
     )
    .catch(function (error) {
      console.log('Request failed', error);
    });
  },[]);

  let toDoTasks = [];
  let doingtasks = [];
  let donetasks = [];
  (() => {
    let tasksListArray = TasksManagerState.tasksList;
    if(tasksListArray.length > 0){
      let userId = "";
      if (typeof Storage !== "undefined") {
        userId = localStorage.getItem("userId");
      }
      tasksListArray.forEach((task, index) => {
        let isTaskAssignedToUser = userId==task.assignee;
        if (
          task.status != undefined &&
          task.status != null &&
          task.status.length > 0
        ) {
          switch (task.status) {
            case "TO DO":
              toDoTasks.push(
                <Card
                  keyName={`task-${index}`}
                  // width={80}
                  isRoundedBorder={true}
                  // boxShadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}
                  body={
                    <div className={classes.taskcard} onClick={() => {
                      TasksManagerHandler({
                        type: "TOGGLE_VIEW_TASK_DETAIL_MODEL",
                        taskTitle: task.title,
                        taskId: task.id
                      });
                    }}>
                      {task.title ? task.title : "NA"}
                      {isTaskAssignedToUser ? <span className={classes.assignedTask}></span> : null}
                    </div>
                  }
                  cardColor={"#add8e6"}
                ></Card>
              );
              break;
            case "DOING":
              doingtasks.push(
                <Card
                  keyName={`task-${index}`}
                  // width={80}
                  isRoundedBorder={true}
                  // boxShadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}
                  body={
                    <div className={classes.taskcard} onClick={() => {
                      TasksManagerHandler({
                        type: "TOGGLE_VIEW_TASK_DETAIL_MODEL",
                        taskTitle: task.title,
                        taskId: task.id
                      });
                    }}>
                      {task.title ? task.title : "NA"}
                      {isTaskAssignedToUser ? <span className={classes.assignedTask}></span> : null}
                    </div>
                  }
                  cardColor={"#add8e6"}
                ></Card>
              );
              break;
            case "DONE":
              donetasks.push(
                <Card
                  keyName={`task-${index}`}
                  // width={80}
                  isRoundedBorder={true}
                  // boxShadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}
                  body={
                    <div className={classes.taskcard} onClick={() => {
                      TasksManagerHandler({
                        type: "TOGGLE_VIEW_TASK_DETAIL_MODEL",
                        taskTitle: task.title,
                        taskId: task.id
                      });
                    }}>
                      {task.title ? task.title : "NA"}
                      {isTaskAssignedToUser ? <span className={classes.assignedTask}></span> : null}
                    </div>
                  }
                  cardColor={"#add8e6"}
                ></Card>
              );
              break;
            default:
              toDoTasks.push(
                <Card
                  keyName={`task-${index}`}
                  // width={80}
                  isRoundedBorder={true}
                  boxShadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}
                  body={
                    <div className={classes.taskcard} onClick={() => {
                      TasksManagerHandler({
                        type: "TOGGLE_VIEW_TASK_DETAIL_MODEL",
                        taskTitle: task.title,
                        taskId: task.id
                      });
                    }}>
                      {task.title ? task.title : "NA"}
                      <span className={classes.assignedTask}></span>
                    </div>
                  }
                  cardColor={"#add8e6"}
                ></Card>
              );
          }
        }
      });
    }
  })();

  return (
    <div className={classes.taskPageContainer}>
      <TaskDetailModal isModalVisible={TasksManagerState.isTaskDetailModalVisible} toggleModal={() => {
                        TasksManagerHandler({
                          type: "TOGGLE_VIEW_TASK_DETAIL_MODEL",
                        });
                      }}
                      taskTitle={TasksManagerState.selectedTaskTitle}
                      taskId = {TasksManagerState.selectedTaskId}
                      />
      <CreateModal isModalVisible={TasksManagerState.isCreateModalVisible} toggleModal={() => {
        TasksManagerHandler({
          type: "TOGGLE_CREATE_MODEL",
        });
      }}></CreateModal>
      <div className={classes.pageHeaderContainer}>
        <h2>Task management</h2>
        <div>
        <button
          className={classes.createTaskBtn}
          type="button"
          value="Create"
          onClick={() => {
            TasksManagerHandler({
              type: "TOGGLE_CREATE_MODEL",
            });
          }}
        >
          Create
        </button>
        <button
          className={classes.logoutButton}
          type="button"
          onClick={() => {
            if (typeof Storage !== "undefined") {
              localStorage.removeItem("token");
            }
            props.loggedOut();
            history.push("/");
          }}
        >
          <img src="https://img.icons8.com/flat-round/64/000000/shutdown.png" alt="alternate" />
        </button>
        </div>
      </div>
      <div className={classes.kanbanContainer}>
        <div className={classes.toDoContainer}>
          <p>TO DO</p>
          {toDoTasks.length>0 ? toDoTasks : <p>No task to do</p>}
        </div>
        <div className={classes.doingContainer}>
          <p>DOING</p>
          {doingtasks.length>0 ? doingtasks : <p>You are not doing any task</p>}
        </div>
        <div className={classes.doneContainer}>
          <p>DONE</p>
          {donetasks.length>0 ? donetasks : <p>Not a single tasks is done</p>}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
