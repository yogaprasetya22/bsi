import Layout from "@/Layouts/Layout";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
import Add from "@/Components/modal/dokumen/Add";
import Edit from "@/Components/modal/dokumen/Edit";
import Delete from "@/Components/modal/dokumen/Delete";
moment.locale("id");

export default function Document({ title, auth, data: data_document }) {
    const [data, setData] = useState(data_document);
    const [search, setSearch] = useState("");
    const [dataModal, setDataModal] = useState([]);

    useEffect(() => {
        setData(data_document);
    }, [data_document]);

    const handleSearch = () => {
        if (search === "") {
            setData(data_document);
        } else {
            const filteredData = data_document.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
            setData(filteredData);
        }
    };
    return (
        <Layout title={title} user={auth?.user}>
            <Add />
            <Edit value={dataModal} />
            <Delete id={dataModal.id} />
            <div className="w-full flex flex-wrap flex-row gap-5 relative">
                {/* search */}
                <div className="w-full flex flex-row gap-5">
                    <div className="w-1/2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari dokumen"
                            className="w-full border-2 border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="w-1/2">
                        <button
                            className="btn bg-blue-500 text-white rounded-md"
                            onClick={handleSearch}
                        >
                            Cari
                        </button>
                    </div>
                </div>
                <div className="fixed bottom-10 right-10 z-20">
                    <button
                        onClick={() => window.my_modal_1.show()}
                        className="flex justify-center items-center gap-3 rounded-md text-md bg-gray-300/80 backdrop-blur-sm shadow-md p-2 font-extrabold"
                    >
                        <i className="fas fa-plus"></i>
                        Tambah
                    </button>
                </div>
                {data.map((item, index) => (
                    <div
                        className="card w-[20rem] bg-teal-500 relative shadow-sh-box"
                        key={index}
                    >
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="absolute top-2 right-4 p-1"
                            >
                                <i className="fas fa-ellipsis-v rotate-90 text-black card-actions"></i>
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 mt-7 mr-2"
                            >
                                <li>
                                    <a
                                        onClick={() => {
                                            setDataModal(item);
                                            window.my_modal_2.show();
                                        }}
                                    >
                                        edit
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => {
                                            setDataModal(item);
                                            window.my_modal_3.show();
                                        }}
                                    >
                                        delete
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body">
                            <h2 className="card-title">{item.title}</h2>
                            <p className=" line-clamp-3">{item.keterangan}</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn rounded-md text-xs"
                                    onClick={() =>
                                        window.open(
                                            `${window.location.origin}/uploads/document/${item.file}`,
                                            "_blank"
                                        )
                                    }
                                >
                                    Unduh
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
