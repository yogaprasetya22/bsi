import React from "react";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import { StatusVerifikasi } from "../StatusVerifikasi";

export default function FeedbackModal({ data: data_feedback }) {
    console.log(data_feedback);
    return (
        <dialog id="my_modal_1" className="modal backdrop-blur-sm">
            <div className="modal-box w-11/12 max-w-3xl overflow">
                <div className=" absolute top-0 right-0">
                    <button
                        onClick={() => window.my_modal_1.close()}
                        className="btn-close text-2xl btn bg-transparent border-none"
                        aria-label="close modal"
                    >
                        X
                    </button>
                </div>
                <div className=" w-full flex flex-col gap-5">
                    <h1 className="text-2xl font-semibold text-teal-500">
                        Detail Status
                    </h1>
                    <div className="w-full flex justify-between">
                        <table className="w-full mt-4">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 text-teal-500">
                                        No Surat
                                    </td>
                                    <td className="pr-2">:</td>
                                    <td className="py-2">
                                        {data_feedback?.pengajuan.no_surat}
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 text-teal-500">
                                        Keterangan
                                    </td>
                                    <td className="pr-2">:</td>
                                    <td className="py-2">
                                        {data_feedback?.pengajuan.keterangan}
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 text-teal-500">
                                        Tanggal Surat
                                    </td>
                                    <td className="pr-2">:</td>
                                    <td className="py-2">
                                        {moment(
                                            data_feedback?.pengajuan
                                                .tanggal_surat
                                        ).format("DD MMMM YYYY")}
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 w-[8rem] text-teal-500">
                                        Tanggal Terima
                                    </td>
                                    <td className="pr-2">:</td>
                                    <td className="py-2">
                                        {moment(
                                            data_feedback?.pengajuan
                                                .tanggal_terima
                                        ).format("DD MMMM YYYY")}
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 w-[8rem] text-teal-500">
                                        File
                                    </td>
                                    <td className="pr-2">:</td>
                                    <td className="py-2">
                                        {data_feedback?.file ? (
                                            <button
                                                className="hover:text-teal-500 p-2 hover:border-b-2 border-teal-500"
                                                onClick={() =>
                                                    window.open(
                                                        `${window.location.origin}/uploads/feedback/${data_feedback?.pengajuan.no_surat}/${data_feedback?.file}`,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                <i className="bi bi-file-earmark-text"></i>
                                            </button>
                                        ) : (
                                            <p className="text-red-500">
                                                Belum ada file
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <StatusVerifikasi
                        data_status={data_feedback?.pengajuan.status.id}
                    />
                </div>
            </div>
        </dialog>
    );
}
