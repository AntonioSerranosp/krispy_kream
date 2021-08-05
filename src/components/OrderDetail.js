import React, { useState, useEffect } from "react";
import { Descriptions, List, Button, message } from "antd";

export const OrderDetail = ({ orderData, refresh }) => {
  const [order, setOrder] = useState(null);
  const [buttons, setButtons] = useState(false);

  useEffect(() => {
    setOrder(orderData);
    if (orderData) {
      setButtons(true);
    }
  }, [orderData]);

  const updateOrder = async (id, status) => {
    if (status === "processed") {
      const payload = {
        status: "open",
      };
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return response.json();
    } else if (status === "open") {
      const payload = {
        status: "processed",
      };
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return response.json();
    }
  };
  const handleCLick = async () => {
    const modifiedOrder = await updateOrder(order.id, order.status).then(
      (data) => {
        return data;
      }
    );
    if (modifiedOrder.id) {
      message.success("orden correctamente modificada");
      refresh(modifiedOrder.id);
    } else if (modifiedOrder.message) {
      message.error(message);
    }

    console.log(modifiedOrder, "----");
  };

  return (
    <div>
      {order !== null ? (
        <Descriptions title="Order Info">
          <Descriptions.Item label="UserName">
            {order.user.name}
          </Descriptions.Item>
          <Descriptions.Item label="Payment">
            {order.paymentMethod}
          </Descriptions.Item>
          <Descriptions.Item label="Discount">
            {order.discount}
          </Descriptions.Item>
          <Descriptions.Item label="codeDiscount">
            {order.codeDiscount}
          </Descriptions.Item>
          <Descriptions.Item label="Telephone">
            {order.user.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Order number">{order.id}</Descriptions.Item>
          <Descriptions.Item label="status">{order.status}</Descriptions.Item>
          <Descriptions.Item label="total">{order.total}</Descriptions.Item>
          <Descriptions.Item label="subTotal">
            {order.subtotal}
          </Descriptions.Item>
          <Descriptions.Item label="ID repartidor">
            {order.idRepartidor}
          </Descriptions.Item>
          <Descriptions.Item label="Items">
            {order.items.map((item) => {
              return (
                <List>
                  <List.Item key={item.name}>{item.name}</List.Item>
                  <List.Item key={item.price.toString()}>
                    {item.price}
                  </List.Item>
                </List>
              );
            })}
          </Descriptions.Item>
        </Descriptions>
      ) : null}
      {buttons && order !== null && order.status == "open" ? (
        <Button type="primary" onClick={handleCLick}>
          Aceptar Orden
        </Button>
      ) : null}
      {buttons && order !== null && order.status == "processed" ? (
        <Button type="danger" danger onClick={handleCLick}>
          {" "}
          Cancelar Orden
        </Button>
      ) : null}
    </div>
  );
};
