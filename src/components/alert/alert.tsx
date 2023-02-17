import React from "react";
import { useAppSelector } from "../../hooks/redux";

import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

import "./alert.scss";

const Alert = () => {
  const { title, text, icon, isOpen } = useAppSelector(
    (state) => state.taskReducer.alert
  );

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.open({
      message: `${title}`,
      description: <p>{text}</p>,
      placement,
      duration: 5,
      className: `alert ${icon}`,
      closeIcon: <span className="icon-cross"></span>,
      icon: (
        <span className={icon}>
          <span className="path1"></span>
          <span className="path2"></span>
        </span>
      ),
    });
  };

  if (isOpen === true) {
    openNotification("bottomRight");
  }

  return <>{contextHolder}</>;
};

export default Alert;
