import React, { Component, useEffect } from "react";

const TodoList = (props) => {
  console.log(props);
  let task = React.useRef("");
  let checkbox = React.useRef({});

  return (
    <div id='content'>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.createTask(task.value);
        }}
      >
        <input
          id='newTask'
          ref={(input) => {
            task = input;
          }}
          type='text'
          className='form-control'
          placeholder='Task description...'
          required
        />
        <center>
          <input
            type='submit'
            value='Add Task'
            style={{
              backgroundColor: "#5CA8DE",
              border: "none",
              borderRadius: "5px",
              color: "white",
              padding: "15px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              marginTop: "20px",
            }}
            hidden={false}
          />
        </center>

        {/* marginLeft: "150px", */}
      </form>
      <ul
        id='taskList'
        className='list-unstyled'
        style={{
          backgroundColor: "lightgrey",
          padding: "10px",
          borderRadius: "10px",
          color: "#343A40",
          fontSize: "20px",
        }}
      >
        <center>
          <h4 style={{ color: "#343A40" }}>Tasks</h4>
          <hr></hr>
        </center>
        {props.tasks.map((task, key) => {
          return (
            <div className='taskTemplate checkbox' key={key}>
              <label>
                <input
                  type='checkbox'
                  name={task.id}
                  defaultChecked={task.completed}
                  ref={(input) => {
                    checkbox = input;
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    props.toggleCompleted(task.id);
                  }}
                />{" "}
                &nbsp;
                <span className='content'>{task.content}</span>
              </label>
            </div>
          );
        })}
      </ul>
      <ul id='completedTaskList' className='list-unstyled'></ul>
    </div>
  );
};

export default TodoList;
