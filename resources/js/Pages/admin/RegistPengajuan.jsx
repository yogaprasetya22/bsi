import AproveModal from "@/Components/modal/AproveModal";
import Layout from "@/Layouts/Layout";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");

export default function RegistPengajuan({ title, auth, data }) {
    const [tahun, setTahun] = useState(moment().format("YYYY"));
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
    const [dataModal, setDataModal] = useState([]);

    useEffect(() => {
        setLoading(true);
        const filterDataTahun = data.filter(
            (item) => moment(item.tanggal_surat).format("YYYY") === tahun
        );

        const endOffset = parseInt(itemOffset) + parseInt(page);
        const sortData = filterDataTahun
            .sort((a, b) => {
                return a.id - b.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(filterDataTahun.length / page));
        setLoading(false);
    }, [itemOffset, data, page, tahun]);

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
            {dataModal && <AproveModal data={dataModal} />}
            <div className="flex flex-col gap-5 rounded-xl ">
                {/* head */}
                <div className="flex justify-between items-center px-5 py-1">
                    <h1 className="text-2xl font-semibold">Regist Pengajuan</h1>
                    {/* select sort tahun */}
                    <div className="w-1/2">
                        <select
                            value={tahun}
                            onChange={(e) => setTahun(e.target.value)}
                            className="w-full border-2 border-gray-300 rounded-md p-2"
                        >
                            <option value={moment().format("YYYY")}>
                                {moment().format("YYYY")}
                            </option>
                            <option
                                value={moment()
                                    .subtract(1, "years")
                                    .format("YYYY")}
                            >
                                {moment().subtract(1, "years").format("YYYY")}
                            </option>
                            <option
                                value={moment()
                                    .subtract(2, "years")
                                    .format("YYYY")}
                            >
                                {moment().subtract(2, "years").format("YYYY")}
                            </option>
                            <option
                                value={moment()
                                    .subtract(3, "years")
                                    .format("YYYY")}
                            >
                                {moment().subtract(3, "years").format("YYYY")}
                            </option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto bg-white p-2 rounded-md ">
                    <table className="table border shadow-sh-box-sm rounded-lg">
                        <thead className="bg-teal-600 ">
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
                                    File
                                </th>
                                <th className="border-x text-xs font-medium uppercase tracking-wider text-center">
                                    Status
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
                                        <button
                                            className="hover:text-teal-500 p-2 hover:border-b-2 border-teal-500"
                                            onClick={() =>
                                                window.open(
                                                    `${window.location.origin}/uploads/pengajuan/${item.file}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <i className="bi bi-file-earmark-text"></i>
                                        </button>
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        {item.status.id == 1 && (
                                            <p className="bg-yellow-500 text-white p-1 rounded-md">
                                                {item.status.name_status}
                                            </p>
                                        )}
                                        {item.status.id == 2 && (
                                            <p className="bg-teal-500 text-white p-1 rounded-md">
                                                {item.status.name_status}
                                            </p>
                                        )}
                                        {item.status.id == 3 && (
                                            <p className="bg-blue-500 text-white p-1 rounded-md">
                                                {item.status.name_status}
                                            </p>
                                        )}
                                        {item.status.id == 4 && (
                                            <p className="bg-green-500 text-white p-1 rounded-md">
                                                {item.status.name_status}
                                            </p>
                                        )}
                                        {item.status.id == 5 && (
                                            <p className="bg-red-500 text-white p-1 rounded-md">
                                                {item.status.name_status}
                                            </p>
                                        )}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 flex justify-center ">
                                        <button
                                            onClick={() => {
                                                setDataModal(item);
                                                window.my_modal_3.show();
                                            }}
                                            className="btn "
                                        >
                                            <i className="bi bi-eye"></i>
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
