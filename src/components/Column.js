import React from "react";
import Ticket from "./Ticket";
import "./Column.css";

const Column = ({ title, tickets }) => {
  return (
    <div className="boardColumn">
      <h2 className="column-header">
        {/* First SVG (Title-specific icon) and Title on the Left */}
        <div className="column-header-left">
          <img
            src={`/icons_FEtask/${title.toLowerCase()}.svg`}
            alt={`${title} icon`}
            className="svg-icon"
          />
          <span className="column-title">
            {title} {tickets.length}
          </span>
        </div>

        {/* Add SVG on the Right */}
        <div className="column-header-right">
                  <img src="/icons_FEtask/add.svg" alt="Add" className="svg-icon" />
                  <img src="/icons_FEtask/3 dot menu.svg" alt="Add" className="svg-icon" />
        </div>
        
      </h2>
      {tickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default Column;
