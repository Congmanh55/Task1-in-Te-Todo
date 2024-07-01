import React from "react";
import "./style.css";

interface IProps {
  activeCount: number;
  filter: string;
  handleClickItem: (filter: string) => void;
  clearCompleted: () => void;
}

const Footer: React.FC<IProps> = ({
  activeCount,
  filter,
  handleClickItem,
  clearCompleted,
}) => {
  return (
    <div className="footer">
      <div className="footer-left">{activeCount} item(s) left</div>
      <div className="footer-center">
        <div
          className={
            filter === "All" ? "footer-center-fc" : "footer-center-all"
          }
          onClick={() => handleClickItem("All")}
        >
          All
        </div>
        <div
          className={
            filter === "Active" ? "footer-center-fc" : "footer-center-active"
          }
          onClick={() => handleClickItem("Active")}
        >
          Active
        </div>
        <div
          className={
            filter === "Completed"
              ? "footer-center-fc"
              : "footer-center-completed"
          }
          onClick={() => handleClickItem("Completed")}
        >
          Completed
        </div>
      </div>
      <div className="footer-right" onClick={clearCompleted}>
        Clear completed
      </div>
    </div>
  );
};

export default Footer;
