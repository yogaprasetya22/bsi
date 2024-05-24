import InputError from "@/Components/ui/InputError";
import InputLabel from "@/Components/ui/InputLabel";
import TextInput from "@/Components/ui/TextInput";
import React from "react";
import { useForm } from "@inertiajs/react";
import moment from "moment/moment";
import 'moment/locale/id';
moment.locale('id');

export default function Add() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        keterangan: "",
        file: null, // file should be initialized as null
        tanggal_surat: moment().format("YYYY-MM-DD"),
        no_surat: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        setData("file", e.target.files[0]); // save the selected file to the state
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("keterangan", data.keterangan);
        formData.append("file", data.file);
        formData.append("tanggal_surat", data.tanggal_surat);
        formData.append("no_surat", data.no_surat);

        post(route("admin.document.store"), {
            data: formData, // pass formData here
            preserveScroll: true,
            onSuccess: () => {
                window.my_modal_1.close();
                reset();
            },
        });
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth();
        let day = today.getDate();

        // Pad single digit month and day with leading zero if needed
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }

        return `${year}-${month}-${day}`;
    };
    return (
        <dialog
            id="my_modal_1"
            className="modal backdrop-blur-sm backdrop-brightness-75"
        >
            <div className="modal-box w-full max-w-2xl overflow bg-white">
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
                    <div className="w-full flex flex-row justify-center items-center">
                        <h1 className="text-2xl font-bold text-gray-500">
                            Add Document
                        </h1>
                    </div>
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleAddAdmin}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-5 w-full">
                                <div className="flex flex-col gap-2 w-full">
                                    <InputLabel htmlFor="title" value="title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <InputLabel
                                        htmlFor="keterangan"
                                        value="keterangan"
                                    />
                                    <TextInput
                                        id="keterangan"
                                        type="text"
                                        name="keterangan"
                                        value={data.keterangan}
                                        className="mt-1 block w-full"
                                        autoComplete="keterangan"
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.keterangan}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="flex flex-col gap-2 w-full">
                                    <InputLabel
                                        htmlFor="tanggal_surat"
                                        value="tanggal surat"
                                    />
                                    <TextInput
                                        id="tanggal_surat"
                                        type="date"
                                        name="tanggal_surat"
                                        value={
                                            moment(data.tanggal_surat).format(
                                                "YYYY-MM-DD"
                                            ) || getTodayDate()
                                        }
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        autoComplete="tanggal_surat"
                                        isFocused={true}
                                    />
                                    <InputError
                                        message={errors.tanggal_surat}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <InputLabel
                                        htmlFor="no_surat"
                                        value="no surat"
                                    />
                                    <TextInput
                                        id="no_surat"
                                        type="text"
                                        name="no_surat"
                                        value={data.no_surat}
                                        className="mt-1 block w-full"
                                        autoComplete="no_surat"
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.no_surat}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <InputLabel htmlFor="file" value="file" />
                                <TextInput
                                    id="file"
                                    type="file"
                                    name="file"
                                    className="file-input file-input-ghost w-full"
                                    autoComplete="file"
                                    onChange={handleFileChange}
                                />
                                <InputError
                                    message={errors.file}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="btn bg-indigo-600/90 text-white"
                            >
                                {processing ? "Loading..." : "Add"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
