import React, { useState } from "react";
import "./style.css";
import Footer from "./Footer/Footer";
import { getDay } from "../utils/type";

const TodoPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [dataArray, setDataArray] = useState([
    {
      id: 1,
      name: "Alice",
      date_start: `${getDay()}`,
      active: true,
    },
  ]);
  const [filter, setFilter] = useState<
    "All" | "Active" | "Completed" | "Center"
  >("All");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        const json = {
          id: dataArray.length + 1,
          name: inputValue.trim(),
          date_start: `${getDay()}`,
          active: true,
        };
        setDataArray([...dataArray, json]);
        setInputValue("");
      }
    }
  };

  const handleClickBox = (index: number) => {
    const newDataArray = dataArray.map((item, idx) =>
      idx === index ? { ...item, active: !item.active } : item
    );
    setDataArray(newDataArray);
  };

  const clearCompleted = () => {
    const newDataArray = dataArray.filter((item) => item.active);
    setDataArray(newDataArray);
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
  console.log(activeCount)
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
                    {item.name}
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
