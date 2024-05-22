import TextInput from "@/Components/ui/TextInput";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { StatusVerifikasi } from "../StatusVerifikasi";

export default function AproveModal({ data: data_regist }) {
    const [changeFile, setChangeFile] = React.useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        uuid: "",
        status: "",
        file: "",
        feedback: "",
        pic: "",
    });

    useEffect(() => {
        setData({
            uuid: data_regist?.uuid,
            status: data_regist?.status?.id,
            feedback: data_regist?.feedback?.feedback || "",
            pic: data_regist?.feedback?.pic || "",
        });
    }, [data_regist]);

    useEffect(() => {
        if (data_regist?.feedback) {
            setChangeFile(true);
        }
    }, [data_regist?.file]);

    const { status } = usePage().props;

    const handleUpdateStatus = () => {
        const formData = new FormData();
        formData.append("file", data.file);
        setData({ ...data, file: formData });
        post(route("admin.pengajuan_status"), {
            onSuccess: () => {
                window.my_modal_3.close();
                reset();
            },
            onError: (error) => console.log(error),
        });
    };
    return (
        <dialog id="my_modal_3" className="modal backdrop-blur-sm">
            <div className="modal-box w-11/12 max-w-3xl overflow bg-white">
                <div className=" absolute top-0 right-0">
                    <button
                        onClick={() => window.my_modal_3.close()}
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
                                        {data_regist?.no_surat}
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 text-teal-500">
                                        Keterangan
                                    </td>
                                    <td className="pr-2">:</td>
                                    <td className="py-2">
                                        {data_regist?.keterangan}
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 text-teal-500">
                                        Tanggal Surat
                                    </td>
                                    <td className="pr-2">:</td>
                                    <td className="py-2">
                                        {moment(
                                            data_regist?.tanggal_surat
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
                                            data_regist?.tanggal_terima
                                        ).format("DD MMMM YYYY")}
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 w-[8rem] text-teal-500">
                                        Status
                                    </td>
                                    <td className="pr-2">:</td>
                                    <td className="py-2">
                                        {data_regist?.status?.name_status}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md"
                            name="status"
                            id="status"
                            onChange={(e) => {
                                setData("status", e.target.value);
                            }}
                            value={data.status}
                        >
                            <option value="">Pilih Status</option>
                            {status.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name_status}
                                </option>
                            ))}
                        </select>
                        <div className="flex flex-col gap-2 w-full">
                            {changeFile ? (
                                <div className="w-full max-w-xs border border-yellow-500 h-[3rem] rounded-md flex flex-row justify-between">
                                    <div className="w-[31%] bg-yellow-500 h-[3rem] rounded-s-md flex justify-center items-center">
                                        <p className="text-lg text-black ">
                                            File
                                        </p>
                                    </div>
                                    <div className="max-w-[50%] px-1 flex justify-center items-center truncate">
                                        <p className="text-md text-gray-600 ">
                                            {data_regist?.feedback.file}
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-center px-2">
                                        <button
                                            onClick={() => setChangeFile(false)}
                                            className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300/60"
                                        >
                                            x
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <TextInput
                                    type="file"
                                    name="file"
                                    className="file-input file-input-bordered file-input-warning w-full max-w-xs"
                                    id="file"
                                    onChange={(e) => {
                                        setData("file", e.target.files[0]);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-full flex flex-row gap-5">
                        <div className="w-full">
                            <textarea
                                name="feedback"
                                id="feedback"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Feedback"
                                value={data.feedback}
                                onChange={(e) => {
                                    setData("feedback", e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <div className="w-full">
                            <textarea
                                name="pic"
                                id="pic"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Pic"
                                value={data.pic}
                                onChange={(e) => {
                                    setData("pic", e.target.value);
                                }}
                            ></textarea>
                        </div>
                    </div>
                    {data_regist?.status?.id && (
                        <StatusVerifikasi data_status={data_regist.status.id} />
                    )}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleUpdateStatus}
                            className="btn bg-teal-500 text-white"
                        >
                            {processing ? "Loading" : "Simpan"}
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
