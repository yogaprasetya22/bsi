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
    const [tahun, setTahun] = useState(moment().format("YYYY"));
    const [search, setSearch] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(12);
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

    useEffect(() => {
        setData(data_document);
    }, [data_document]);

    useEffect(() => {
        if (search === "") {
            setData(data_document);
        } else {
            const filteredData = data_document.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
            setData(filteredData);
        }
    }, [search]);

    // useEffect(() => {
    //     if (tahun === "") {
    //         setData(data_document);
    //     } else {
    //         const filteredData = data_document.filter((item) =>
    //             moment(item.tanggal_surat).format("YYYY") === tahun
    //         );
    //         setData(filteredData);
    //     }
    // }, [tahun]);

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
                <div className="fixed bottom-10 right-10 z-20">
                    <button
                        onClick={() => window.my_modal_1.show()}
                        className="flex justify-center items-center gap-3 rounded-md text-md bg-gray-300/80 backdrop-blur-sm shadow-md p-2 font-extrabold"
                    >
                        <i className="fas fa-plus"></i>
                        Tambah
                    </button>
                </div>
                {currentItems.map((item, index) => (
                    <div
                        className="card w-[15rem] bg-teal-500 relative shadow-sh-box"
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
                            <div className="card-actions justify-between items-center">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-white">
                                        Tanggal Surat
                                    </span>
                                    <span className="text-xs text-white">
                                        {moment(item.tanggal_surat).format(
                                            "LL"
                                        )}
                                    </span>
                                </div>
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
        </Layout>
    );
}
