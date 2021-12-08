import React from "react";
import PropTypes from "prop-types";
import ToDoItem from "./ToDoItem";

const styles = {
  ul: {
    listStyle: "none",
    margin: "0 auto",
    padding: "0",
  },
};

function ToDoList(props) {
  return (
    <ul style={styles.ul}>
      {props.tasks.map((todo, index) => {
        return (
          <ToDoItem
            todo={todo}
            key={todo.id}
            index={index}
            checkboxClick={props.onToggle}
          />
        );
      })}
    </ul>
  );
}

ToDoList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToDoList;
