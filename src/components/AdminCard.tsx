import React from "react";
import Layout from "@/styles/Layout.module.css";
import { AdminCardInterface } from "@/interfaces/adminPageInterface";

const AdminCard = (props: AdminCardInterface) => {
  const { header, data, logo, logoClass } = props;
  return (
    <div className={`${Layout.adminCard} group`}>
      <div className={Layout.header}>
        <div>
          <h3>{header}</h3>
          <h1>{data}</h1>
        </div>
        <div className={`text-white h-fit aspect-square p-2 rounded-full scale-150 -z-10 absolute top-1/2 -translate-y-1/2 -right-3 group-hover:scale-[8.5] duration-500 transition-transform ${logoClass}`}>
          {logo}
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
