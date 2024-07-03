import React, { useEffect, useState } from "react";
import "./style.css";
import Footer from "./Footer/Footer";
import { getDay } from "../utils/type";
import axios from "axios";

interface ITodos {
  id: number;
  username: string;
  date: string;
  active: boolean;
}

const TodoPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [dataArray, setDataArray] = useState<ITodos[]>([]);
  const [filter, setFilter] = useState<
    "All" | "Active" | "Completed" | "Center"
  >("All");

  useEffect(() => {
    fetchUsers();
  }, []);

  //GET
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setDataArray(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  //POST 
  const addTodo = async () => {
    try {
      await axios.post('http://localhost:5000/todos', {username: inputValue, date: getDay(), active: true});
      setInputValue('');
      fetchUsers();
    }catch(error){
      console.error('Add data error', error);
    }
  }

  //DELETE
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // if (inputValue.trim()) {
        addTodo();
      // }
    }
  };

  const handleClickBox = (index: number) => {
    const newDataArray = dataArray.map((item, idx) =>
      idx === index ? { ...item, active: !item.active } : item
    );
    setDataArray(newDataArray);
  };

  const clearCompleted = () => {
    dataArray.forEach((item) => {
      if(item.active === false) {
        deleteTodo(item.id);
      };
    });
  };

  const getFilteredData = () => {
    if (filter === "Active") return dataArray.filter((item) => item.active);
    if (filter === "Completed") return dataArray.filter((item) => !item.active);
    return dataArray;
  };
  const handleClickItem = (item: any) => {
    setFilter(item);
  };

  const filteredData = getFilteredData();
  const activeCount = dataArray.filter((item) => item.active).length;

  console.log('check data',dataArray)

  return (
    <div className="container">
      <div className="todo-container">
        <div className="title">todos</div>
        <div className="body-container">
          <div>
            <div className="task">
              <div className="task-search">▽</div>
              <form className="task-form">
                <input
                  className="task-input"
                  type="text"
                  placeholder="What needs to be done?"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
              </form>
            </div>
            <div className="list-task">
              {filteredData.map((item, index) => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={!item.active}
                    onChange={() => handleClickBox(index)}
                  />
                  <span className="custom-checkbox"></span>
                  <div className={`text ${!item.active ? "completed" : ""}`}>
                    {item.username}
                  </div>
                </label>
              ))}
            </div>
          </div>
          <Footer
            activeCount={activeCount}
            filter={filter}
            handleClickItem={handleClickItem}
            clearCompleted={clearCompleted}
          />
        </div>
        <div className="body-container-z2"></div>
        <div className="body-container-z3"></div>
      </div>
    </div>
  );
};

export default TodoPage;
