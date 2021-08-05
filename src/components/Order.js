import React, { useState } from "react";
import { Card, Input, Spin, Select, message } from "antd";
import { OrderDetail } from "./OrderDetail";
const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;
export const Order = () => {
  const [getSucessfully, setGetSucessfully] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const findProductByTerm = async (term) => {
    const response = await fetch(`http://localhost:3000/orders/${term}`);

    return response.json();
  };

  const onSearch = async (value) => {
    setLoading(true);
    const order = await findProductByTerm(value).then((data) => {
      return data;
    });

    if (order.message) {
      message.error(order.message);
      setOrder(null);
      setLoading(false);
      return;
    }
    setGetSucessfully(true);
    setOrder(order);
    setLoading(false);
  };
  return (
    <>
      <Search
        placeholder="Buscar producto por ID"
        onSearch={onSearch}
        enterButton
        style={{ width: "40%" }}
      />
      {loading ? <Spin size="large" /> : null}
      {getSucessfully && <OrderDetail orderData={order} refresh={onSearch} />}
    </>
  );
};
