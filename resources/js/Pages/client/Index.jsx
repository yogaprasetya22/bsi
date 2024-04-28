import { Charts } from "@/Components/Charts";
import Layout from "@/Layouts/Layout";
import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");

export default function Index({ title, auth, data }) {
    const [bulan, setBulan] = useState(moment().format("MMMM").toLowerCase());
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        setCurrentData(
            data.filter((item) => {
                return moment(item.created_at).format("MMMM").toLowerCase() ===
                    bulan
                    ? item
                    : null;
            })
        );
    }, [bulan, data]);

    return (
        <Layout title={title} user={auth?.user}>
            <div className="flex flex-row gap-2">
                <div className="w-[46%] flex flex-row flex-wrap gap-2 ">
                    <div className="w-full bg-teal-500 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2 gap-4">
                        <div
                            className="bg-white p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-xs font-semibold text-gray-400">
                                Panding
                            </p>
                            {/* icon panding */}
                            <i className="fas fa-exclamation-triangle text-2xl p-2 text-yellow-500"></i>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                bulan ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    currentData.filter(
                                        (item) => item.status_id === 1
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                Keseluruhan
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    data.filter((item) => item.status_id === 1)
                                        .length
                                }
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-teal-400/90 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2">
                        <div
                            className="bg-white p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-xs font-semibold text-gray-400">
                                Approve
                            </p>
                            {/* icon Aproval */}
                            <i className="fas fa-clipboard-list text-2xl p-2 text-orange-500"></i>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                bulan ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    currentData.filter(
                                        (item) => item.status_id === 2
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                Keseluruhan
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    data.filter((item) => item.status_id === 2)
                                        .length
                                }
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-teal-400/90 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2">
                        <div
                            className="bg-white p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-xs font-semibold text-gray-400">
                                Progress
                            </p>
                            {/* icon Progress */}
                            <i className="fas fa-tasks text-2xl p-2 text-blue-500"></i>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                bulan ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    currentData.filter(
                                        (item) => item.status_id === 3
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                Keseluruhan
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    data.filter((item) => item.status_id === 3)
                                        .length
                                }
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-teal-300 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2">
                        <div
                            className="bg-white p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-xs font-semibold text-gray-400">
                                Done
                            </p>
                            {/* icon panding */}
                            <i className="fas fa-check-circle text-2xl p-2 text-green-500"></i>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                bulan ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    currentData.filter(
                                        (item) => item.status_id === 4
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                Keseluruhan
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    data.filter((item) => item.status_id === 4)
                                        .length
                                }
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-teal-300/70 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2">
                        <div
                            className="bg-white p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-xs font-semibold text-gray-400">
                                Reject
                            </p>
                            {/* icon panding */}
                            <i className="fas fa-times text-2xl p-2 text-red-600"></i>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                bulan ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    currentData.filter(
                                        (item) => item.status_id === 5
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                Keseluruhan
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    data.filter((item) => item.status_id === 5)
                                        .length
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-[60%] flex flex-col gap-3">
                    <div className="h-[70vh] flex justify-center items-start  p-5 relative pt-10">
                        <h1 className="text-2xl text-gray-700 font-semibold absolute top-0 w-full text-center">
                            Analisis Pengajuan
                        </h1>
                        <Charts data={data} />
                    </div>
                    <div className="w-full h-full  rounded-md p-5 shadow-md flex flex-col">
                        {/* keterangan tentang aplikasi pengajuan berkas */}
                        <div className="flex w-full justify-between">
                            <h1 className="text-2xl font-semibold text-gray-700">
                                Keterangan
                            </h1>
                            {/* select bulan */}
                            <select
                                name="bulan"
                                id="bulan"
                                className="border border-gray-300 rounded-md p-2"
                                value={bulan}
                                onChange={(e) => setBulan(e.target.value)}
                            >
                                <option value="januari">Januari</option>
                                <option value="februari">Februari</option>
                                <option value="maret">Maret</option>
                                <option value="april">April</option>
                                <option value="mei">Mei</option>
                                <option value="juni">Juni</option>
                                <option value="juli">Juli</option>
                                <option value="agustus">Agustus</option>
                                <option value="september">September</option>
                                <option value="oktober">Oktober</option>
                                <option value="november">November</option>
                                <option value="desember">Desember</option>
                            </select>
                        </div>
                        <p className="text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
