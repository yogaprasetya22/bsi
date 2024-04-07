import Layout from "@/Layouts/Layout";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
import FeedbackModal from "@/Components/modal/FeedbackModal";
moment.locale("id");

export default function Feedback({ title, auth, data }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
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
            <div className="flex flex-col gap-5 rounded-xl">
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
                                        {item.pengajuan.no_surat}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500  tracking-wider text-center">
                                        {item.pengajuan.keterangan}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        {moment(
                                            item.pengajuan.tanggal_surat
                                        ).format("DD MMMM YYYY")}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        {moment(
                                            item.pengajuan.tanggal_terima
                                        ).format("DD MMMM YYYY")}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        <button
                                            className=""
                                            onClick={() =>
                                                window.open(
                                                    `${window.location.origin}/uploads/feedback/${item.pengajuan.no_surat}/${item.file}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <i className="bi bi-file-earmark-text"></i>
                                        </button>
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 flex justify-center ">
                                        <button
                                            onClick={() => {
                                                window.my_modal_1.show();
                                            }}
                                            className="btn "
                                        >
                                            <i className="bi bi-eye"></i>
                                        </button>
                                        <FeedbackModal data={item} />
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
                            previousClassName=" p-2 rounded-md bg-teal-600 text-white hover:scale-105 hover:scale text-xs"
                            previousLinkClassName="text-xs p-2  font-semibold font-roboto"
                            nextClassName=" p-2 rounded-md bg-teal-600 text-white hover:scale-105 hover:scale text-xs"
                            nextLinkClassName="text-xs p-2  font-semibold font-roboto "
                            breakLabel="..."
                            breakClassName=" p-2 rounded-md text-teal-600"
                            breakLinkClassName="text-sm font-semibold font-roboto "
                            containerClassName="pagination"
                            activeClassName="bg-transparan border border-yellow-600 text-yellow-600"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
