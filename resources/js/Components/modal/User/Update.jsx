import InputError from "@/Components/ui/InputError";
import InputLabel from "@/Components/ui/InputLabel";
import TextInput from "@/Components/ui/TextInput";
import React from "react";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Update({ data: data_user }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        uuid: data_user.uuid,
        name: "",
        email: "",
        no_telp: "",
        alamat: "",
        password: "",
    });
    useEffect(() => {
        setData({
            uuid: data_user.uuid,
            name: data_user.name,
            email: data_user.email,
            no_telp: data_user.no_telp,
            alamat: data_user.alamat,
        });
    }, [data_user]);

    const handleUpdateUser = (e) => {
        e.preventDefault();
        put(route("superadmin.admin.update"), {
            preserveScroll: true,
            onSuccess: () => {
                window.my_modal_2.close();
                reset();
            },
        });
    };

    return (
        <dialog
            id="my_modal_2"
            className="modal backdrop-blur-sm backdrop-brightness-75"
        >
            <div className="modal-box w-full max-w-2xl overflow">
                <div className=" absolute top-0 right-0">
                    <button
                        onClick={() => window.my_modal_2.close()}
                        className="btn-close text-2xl btn bg-transparent border-none"
                        aria-label="close modal"
                    >
                        X
                    </button>
                </div>
                <div className=" w-full flex flex-col gap-5">
                    <div className="w-full flex flex-row justify-center items-center">
                        <h1 className="text-2xl font-bold text-gray-500">
                            Update User
                        </h1>
                    </div>
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleUpdateUser}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-5 w-full">
                                <div className="flex flex-col gap-2 w-full">
                                    <InputLabel
                                        htmlFor="update_name"
                                        value="Name"
                                    />
                                    <TextInput
                                        id="update_name"
                                        type="text"
                                        name="update_name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <InputLabel
                                        htmlFor="update_email"
                                        value="Email"
                                    />
                                    <TextInput
                                        id="update_email"
                                        type="email"
                                        name="update_email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-5 w-full">
                                <div className="flex flex-col gap-2 w-full">
                                    <InputLabel
                                        htmlFor="update_no_telp"
                                        value="No Telp"
                                    />
                                    <TextInput
                                        id="update_no_telp"
                                        type="text"
                                        name="update_no_telp"
                                        value={data.no_telp}
                                        className="mt-1 block w-full"
                                        autoComplete="no_telp"
                                        onChange={(e) =>
                                            setData("no_telp", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.no_telp}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <InputLabel
                                        htmlFor="update_alamat"
                                        value="Alamat"
                                    />
                                    <TextInput
                                        id="update_alamat"
                                        type="text"
                                        name="update_alamat"
                                        value={data.alamat}
                                        className="mt-1 block w-full"
                                        autoComplete="alamat"
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.alamat}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <InputLabel
                                    htmlFor="update_password"
                                    value="Password"
                                />
                                <TextInput
                                    id="update_password"
                                    type="password"
                                    name="update_password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="btn bg-indigo-600/90 text-white"
                            >
                                {processing ? "Loading..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
