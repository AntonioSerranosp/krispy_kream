import React, { useState } from "react";
import {
  Modal,
  Button,
  Card,
  Input,
  Space,
  Col,
  Checkbox,
  Select,
  message,
} from "antd";
import { OrderDetail } from "./OrderDetail";
const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;
export const Order = () => {
  const [getSucessfully, setGetSucessfully] = useState(false);
  const [order, setOrder] = useState(null);
  const findProductByTerm = async (term) => {
    const response = await fetch(`http://localhost:3000/orders/${term}`);

    return response.json();
  };

  const onSearch = async (value) => {
    const order = await findProductByTerm(value).then((data) => {
      return data;
    });

    if (order.message) {
      message.error(order.message);
      return;
    }
    setGetSucessfully(true);
    setOrder(order);
  };
  return (
    <>
      <Search
        placeholder="Buscar producto"
        onSearch={onSearch}
        enterButton
        style={{ width: "40%" }}
      />
      {getSucessfully && <OrderDetail orderData={order} />}
    </>
  );
};
