import React, { useEffect } from "react";
export const StatusVerifikasi = ({ data_status }) => {
    const [ceklis, setCeklis] = React.useState([]);
    useEffect(() => {
        switch (data_status) {
            case 1:
                setCeklis([
                    {
                        id: 1,
                        status: true,
                        title: "panding",
                    },
                    {
                        id: 2,
                        status: false,
                        title: "approve",
                    },
                    {
                        id: 3,
                        status: false,
                        title: "on progress",
                    },
                    {
                        id: 4,
                        status: false,
                        title: "success",
                    },
                ]);
                break;
            case 2:
                setCeklis([
                    {
                        id: 1,
                        status: true,
                        title: "panding",
                    },
                    {
                        id: 2,
                        status: true,
                        title: "approve",
                    },
                    {
                        id: 3,
                        status: false,
                        title: "on progress",
                    },
                    {
                        id: 4,
                        status: false,
                        title: "success",
                    },
                ]);
                break;
            case 3:
                setCeklis([
                    {
                        id: 1,
                        status: true,
                        title: "panding",
                    },
                    {
                        id: 2,
                        status: true,
                        title: "approve",
                    },
                    {
                        id: 3,
                        status: true,
                        title: "on progress",
                    },
                    {
                        id: 4,
                        status: false,
                        title: "success",
                    },
                ]);
                break;
            case 4:
                setCeklis([
                    {
                        id: 1,
                        status: true,
                        title: "panding",
                    },
                    {
                        id: 2,
                        status: true,
                        title: "approve",
                    },
                    {
                        id: 3,
                        status: true,
                        title: "on progress",
                    },
                    {
                        id: 4,
                        status: true,
                        title: "success",
                    },
                ]);
                break;
            case 5:
                setCeklis([
                    {
                        id: 1,
                        status: true,
                        title: "reject",
                    },
                ]);
                break;
            default:
                setCeklis([
                    {
                        id: 1,
                        status: true,
                        title: "panding",
                    },
                    {
                        id: 2,
                        status: false,
                        title: "approve",
                    },
                    {
                        id: 3,
                        status: false,
                        title: "on progress",
                    },
                    {
                        id: 4,
                        status: false,
                        title: "success",
                    },
                ]);
                break;
        }
    }, [data_status]);

    return (
        <div className="bg-gray-100 flex flex-col gap-10 rounded-xl px-5 py-10">
            {
                <ul className="steps">
                    {data_status !== 5
                        ? ceklis.map((item, index) => {
                              return (
                                  <li
                                      key={index}
                                      className={`step text-teal-500  text-md font-semibold ${
                                          item.status ? "step-warning" : ""
                                      }`}
                                  >
                                      {item.title}
                                  </li>
                              );
                          })
                        : ceklis.map((item, index) => {
                              return (
                                  <li
                                      key={index}
                                      className={`step text-red-500  text-md font-semibold ${
                                          item.status ? "step-error" : ""
                                      }`}
                                      data-content="?"
                                  >
                                      {item.title}
                                  </li>
                              );
                          })}
                </ul>
            }
        </div>
    );
};
