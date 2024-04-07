import Update from "@/Components/modal/histori/Update";
import Layout from "@/Layouts/Layout";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");

export default function History({ title, auth, data }) {
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
            <Update data={dataModal} />
            <div className="flex flex-col gap-5 rounded-xl ">
                {/* head */}
                <div className="flex justify-between items-center px-5 py-1">
                    <h1 className="text-2xl font-semibold">Regist Pengajuan</h1>
                </div>
                <div className="overflow-x-auto bg-white p-2 shadow rounded-md">
                    <table className="table border">
                        <thead className="bg-teal-600">
                            <tr className="font-bold  text-lg text-white">
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    No Surat
                                </th>
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    Keterangan
                                </th>
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    Tanggal Surat
                                </th>
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    Tanggal Terima
                                </th>
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    File
                                </th>
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {currentItems?.map((item, index) => (
                            <tbody key={index} className="">
                                <tr>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        {item.no_surat}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500  tracking-wider text-center">
                                        {item.keterangan}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        {moment(item.tanggal_surat).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        {moment(item.tanggal_terima).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        <button
                                            className=""
                                            onClick={() =>
                                                window.open(
                                                    `${window.location.origin}/uploads/pengajuan/${item.no_surat}/${item.file}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <i className="bi bi-file-earmark-text"></i>
                                        </button>
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
                                        <button className="bg-red-600 btn rounded-md">
                                            <i className="text-white fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <div className="flex justify-normal items-center py-5">
                        <ReactPaginate
                            className="flex flex-row gap-1 w-full justify-end items-center select-none pr-10"
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="<"
                            pageClassName=" text-sm border  p-2 rounded-md "
                            pageLinkClassName=" rounded-md  px-2 py-2 font-semibold font-roboto"
                            previousClassName=" p-2 rounded-md text-teal-600 hover:scale-125 hover:scale text-xl"
                            previousLinkClassName="text-xl p-2  font-semibold font-roboto"
                            nextClassName=" p-2 rounded-md text-teal-600 hover:scale-125 hover:scale text-xl"
                            nextLinkClassName="text-xl p-2  font-semibold font-roboto "
                            breakLabel="..."
                            breakClassName=" p-2 rounded-md text-teal-600"
                            breakLinkClassName="text-sm font-semibold font-roboto "
                            containerClassName="pagination"
                            activeClassName="bg-transparan border border-teal-600 text-teal-600"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
