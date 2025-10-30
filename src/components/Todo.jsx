import React, { useEffect, useRef, useState } from "react";
import "./Todo.css";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleTodo = () => {
    if (!todo.trim()) {
      setTodo("");
      return;
    }
    if (editId === "") {
      setTodos([...todos, { list: todo, status: false }]);
    } else {
      setTodos(
        todos.map((item, index) =>
          index === editId ? { ...item, list: todo } : item
        )
      );
      setEditId("");
    }

    setTodo("");
  };

  const inputRef = useRef("");
  useEffect(() => inputRef.current.focus());

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setTodos(todos.filter((_, index) => index !== deleteId));
    setShowConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo, index) =>
        index === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const handleClick = (id) => {
    const editTodo = todos.find((_, index) => index === id);
    setEditId(id);
    setTodo(editTodo.list);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleTodo}>{editId !== "" ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="list-items">
              <div
                className="list-item-list"
                id={todo.status ? "list-item" : ""}
              >
                {todo.list}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => handleComplete(index)}
                />
                <FiEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => handleClick(index)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => handleDelete(index)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this todo?</p>
              <p className="todo-preview">"{todos[deleteId]?.list}"</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-delete" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
