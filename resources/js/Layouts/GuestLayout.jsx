export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex justify-center items-center w-full pb-4">
                    <h1 className="text-2xl font-semibold text-teal-600">
                        Regist Pengajuan
                    </h1>
                </div>
                {children}
            </div>
        </div>
    );
}
