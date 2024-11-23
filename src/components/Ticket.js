import React from "react";
import "./Ticket.css";

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket">
      <div className="ticket-header">
        <span className="card-id">{ticket.id}</span>
        <div
          className="profile-pic"
          style={{ backgroundImage: `url(${ticket.profilePictureUrl || ""})` }}
        ></div>
      </div>
      <p>{ticket.title}</p>
      {/* Feature Request with 2 SVGs */}
      <a href="#" className="feature-link">
        {/* First SVG */}
        <img
          src="/icons_FEtask/3 dot menu.svg"
          alt="Add"
          className="svg-icon"
        />
        Feature Request
      </a>
    </div>
  );
};

export default Ticket;
