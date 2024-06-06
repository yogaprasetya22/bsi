import Update from "@/Components/modal/histori/Update";
import Layout from "@/Layouts/Layout";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
import Delete from "@/Components/modal/histori/Delete";
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

    const [search, setSearch] = useState("");

    const handleSearch = () => {
        if (search === "") {
            setCurrentItems(data);
        } else {
            const filteredData = data.filter(
                (item) =>
                    item.no_surat
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.keterangan
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item?.tanggal_surat
                        .toLowerCase()
                        .includes(search.toLowerCase())
            );
            setCurrentItems(filteredData);
        }
    };

    return (
        <Layout title={title} user={auth?.user}>
            <Update data={dataModal} />
            <Delete uuid={dataModal.uuid} /> {/* search */}
            <div className="w-full flex flex-row gap-5">
                <div className="w-1/2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari histori"
                        className="w-full border-2 border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="w-1/2">
                    <button
                        className="btn bg-teal-500 text-white rounded-md"
                        onClick={handleSearch}
                    >
                        Cari
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-5 rounded-xl ">
                <div className="overflow-x-auto bg-white p-2 rounded-md">
                    <table className="table shadow-sh-box border-2">
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
                                        {item.tanggal_terima
                                            ? moment(
                                                  item.tanggal_terima
                                              ).format("DD MMMM YYYY")
                                            : "-"}
                                    </td>
                                    <td className="border-x text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        <button
                                            className=""
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
