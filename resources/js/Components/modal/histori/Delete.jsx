import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function Delete({ id }) {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        id: "",
    });
    useEffect(() => {
        setData({
            id: id,
        });
    }, [id]);

    const handleDelete = (e) => {
        e.preventDefault();

        destroy(route("admin.barang-masuk.destroy"), {
            preserveScroll: true,
            onSuccess: () => {
                window.my_modal_3.close();
                window.location.reload();
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <dialog
            id="my_modal_3"
            className="modal backdrop-blur-sm backdrop-brightness-75"
        >
            <div className="modal-box w-full max-w-1xl overflow">
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
                    <div className="w-full flex flex-row justify-center items-center">
                        <h1 className="text-2xl font-bold text-gray-500">
                            Delete Histori
                        </h1>
                    </div>
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleDelete}
                    >
                        <div className="flex w-full justify-center">
                            <p className="text-xl font-extrabold text-indigo-600/90">
                                Anda yakin ingin menghapus owner ini?
                            </p>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <button
                                type="submit"
                                className="btn bg-red-500 text-white"
                                disabled={processing}
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
