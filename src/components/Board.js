import React, { useState, useEffect } from "react";
import { fetchTickets } from "./apifetch";
import Column from "./Column";
import { Button, Dropdown, Menu } from "antd";
import "antd/dist/reset.css";
import "./Board.css";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem("groupingOption") || "status"
  );
  const [sortedBy, setSortedBy] = useState(
    localStorage.getItem("sortedBy") || "priority"
  );

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTickets();
      setTickets(data.tickets);
      setUsers(data.users); // Save user data
    }
    fetchData();
  }, []);


  useEffect(() => {
    localStorage.setItem("groupingOption", groupingOption);
  }, [groupingOption]);

  useEffect(() => {
    localStorage.setItem("sortedBy", sortedBy);
  }, [sortedBy]);

  const priorityLevels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No Priority",
};

const groupTicketsByOption = (tickets, option) => {
  const groupedTickets = {};

  tickets.forEach((ticket) => {
    let key;
    if (option === "status") {
      key = ["Todo", "In progress", "Backlog", "Done", "Cancelled"].includes(
        ticket.status
      )
        ? ticket.status
        : "Unassigned";
    } else if (option === "user") {
      // Match user ID with user name
      const user = users.find((user) => user.id === ticket.userId);
      key = user ? user.name : "Unassigned";
    } else {
      key = priorityLevels[ticket.priority];
    }

    if (!groupedTickets[key]) {
      groupedTickets[key] = [];
    }
    groupedTickets[key].push(ticket);
  });

  if (option === "status") {
    ["Done", "Cancelled"].forEach((status) => {
      if (!groupedTickets[status]) groupedTickets[status] = [];
    });
  }

  return groupedTickets;
};




  const sortTicketsByOption = (groupedTickets, option) => {
    const sortedTickets = {};

    Object.keys(groupedTickets).forEach((groupTitle) => {
      const group = groupedTickets[groupTitle];
      sortedTickets[groupTitle] =
        option === "priority"
          ? group.sort((a, b) => b.priority - a.priority)
          : group.sort((a, b) => a.title.localeCompare(b.title));
    });

    return sortedTickets;
  };

  const groupedTickets = groupTicketsByOption(tickets, groupingOption);
  const sortedTickets = sortTicketsByOption(groupedTickets, sortedBy);

  // Dropdown menus
  const groupingMenu = (
    <Menu
      onClick={(e) => setGroupingOption(e.key)}
      items={[
        { label: "Group by Status", key: "status" },
        { label: "Group by User", key: "user" },
        { label: "Group by Priority", key: "priority" },
      ]}
    />
  );

  const sortingMenu = (
    <Menu
      onClick={(e) => setSortedBy(e.key)}
      items={[
        { label: "Sort by Priority", key: "priority" },
        { label: "Sort by Title", key: "title" },
      ]}
    />
  );

  return (
    <div className="kanban-board">
      <div className="options">
        <Dropdown overlay={groupingMenu} trigger={["click"]}>
          <Button>
            Grouping:{" "}
            {groupingOption.charAt(0).toUpperCase() + groupingOption.slice(1)}
          </Button>
        </Dropdown>
        <Dropdown overlay={sortingMenu} trigger={["click"]}>
          <Button>
            Sorting: {sortedBy.charAt(0).toUpperCase() + sortedBy.slice(1)}
          </Button>
        </Dropdown>
      </div>
      <div className="board-columns">
        {Object.keys(sortedTickets).map((groupTitle) => (
          <Column
            key={groupTitle}
            title={groupTitle}
            tickets={sortedTickets[groupTitle]}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
