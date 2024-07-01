import React, { useState } from "react";
import "./style.css";

interface IProps {
  id?: number;
  name?: string;
  date_start: string;
  active: boolean;
}

const TodoPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [dataArray, setDataArray] = useState([
    {
      id: 1,
      name: "Alice",
      date_start: "28/6/2024",
      active: true,
    },
  ]);
  const [filter, setFilter] = useState<"All" | "Active" | "Completed" | "Center">("All");

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
          date_start: "4/5",
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

  const filteredData = getFilteredData();
  const activeCount = dataArray.filter((item) => item.active).length;

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
                  <div className={`text ${!item.active ? "completed" : ""}`}>{item.name}</div>
                </label>
              ))}
            </div>
          </div>
          <div className="footer">
            <div className="footer-left">{activeCount} item(s) left</div>
            <div className="footer-center">
              <div className={filter == "All" ? "footer-center-fc" : "footer-center-all"} onClick={() => setFilter("All")}>All</div>
              <div className={filter == "Active" ? "footer-center-fc" : "footer-center-active"} onClick={() => setFilter("Active")}>Active</div>
              <div className={filter == "Completed" ? "footer-center-fc" : "footer-center-completed"} onClick={() => setFilter("Completed")}>Completed</div>
            </div>
            <div className="footer-right" onClick={clearCompleted}>Clear completed</div>
          </div>
        </div>
        <div className="body-container-z2"></div>
        <div className="body-container-z3"></div>
      </div>
    </div>
  );
};

export default TodoPage;