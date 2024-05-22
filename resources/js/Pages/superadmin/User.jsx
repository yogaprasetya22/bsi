import Layout from "@/Layouts/Layout";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
import Create from "@/Components/modal/User/Create";
import Update from "@/Components/modal/User/Update";
import Delete from "@/Components/modal/User/Delete";
moment.locale("id");

export default function User({ title, auth, data }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
    const [dataModal, setDataModal] = useState([]);

    useEffect(() => {
        setLoading(true);
        const endOffset = parseInt(itemOffset) + parseInt(page);
        const sortData = data
            .sort((a, b) => {
                return a.id - b.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(data.length / page));
        setLoading(false);
    }, [itemOffset, data, page]);

    const handlePageClick = (event) => {
        window.scrollTo({
            top: 60,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % data.length;

        setItemOffset(newOffset);
    };

    return (
        <Layout title={title} user={auth?.user}>
            <Create />
            <Update data={dataModal} />
            <Delete uuid={dataModal.uuid} />
            <div className="flex justify-between items-center px-5 py-1">
                <h1 className="text-2xl font-semibold">User</h1>
                <button
                    onClick={() => {
                        window.my_modal_1.show();
                    }}
                    className="bg-teal-600 btn rounded-md"
                >
                    <i className="text-white fas fa-plus"></i>
                </button>
            </div>
            <div className="flex flex-col gap-5 rounded-xl ">
                <div className="overflow-x-auto bg-white p-2 rounded-md">
                    <table className="table shadow-sh-box border-2">
                        <thead className="bg-teal-600">
                            <tr className="font-bold  text-lg text-white">
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    Id
                                </th>
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    Nama
                                </th>
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    Email
                                </th>
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {currentItems?.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td className="border-x text-md font-medium text-gray-500 tracking-wider text-center max-w-[4rem] truncate">
                                        {item.uuid}
                                    </td>
                                    <td className="border-x text-md font-medium text-gray-500 tracking-wider text-center">
                                        {item.name}
                                    </td>
                                    <td className="border-x text-md font-medium text-gray-500 tracking-wider text-center">
                                        {item.email}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        {/* edit and delete */}
                                        <button
                                            onClick={() => {
                                                setDataModal(item);
                                                window.my_modal_2.show();
                                            }}
                                            className="bg-yellow-500 btn rounded-md"
                                        >
                                            <i className="text-white fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="bg-red-600 btn rounded-md"
                                            onClick={() => {
                                                setDataModal(item);
                                                window.my_modal_3.show();
                                            }}
                                        >
                                            <i className="text-white fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <div className="flex justify-center items-center py-5">
                        <ReactPaginate
                            className="flex flex-row gap-1 w-full justify-center items-center select-none pr-10"
                            nextLabel="Next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="Previous"
                            pageClassName=" text-sm border  p-2 rounded-md "
                            pageLinkClassName=" rounded-md  px-2 py-2 font-semibold font-roboto"
                            previousClassName=" p-2 rounded-md shadow-sh-box-sm bg-teal-600 text-white hover:scale-105 hover:scale text-xs"
                            previousLinkClassName="text-xs p-2  font-semibold font-roboto"
                            nextClassName=" p-2 rounded-md shadow-sh-box-sm bg-teal-600 text-white hover:scale-105 hover:scale text-xs"
                            nextLinkClassName="text-xs p-2  font-semibold font-roboto "
                            breakLabel="..."
                            breakClassName=" p-2 rounded-md text-teal-600"
                            breakLinkClassName="text-sm font-semibold font-roboto "
                            containerClassName="pagination"
                            activeClassName=" bg-transparan border border-yellow-600 text-yellow-600"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
