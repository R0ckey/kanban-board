// Card.js
import React from "react";
import { Card } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Card.css";

function CardComponent({ title, description, buttonText }) {
  return (
    <Card className="card">
      <div className="card-body">
        <h5 className="card-title">
          <CheckCircleOutlined
            style={{ marginRight: "5px", color: "#52c41a" }}
          />
          {title}
        </h5>
      </div>
    </Card>
  );
}

export default CardComponent;
