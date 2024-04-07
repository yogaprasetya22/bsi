import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Layout({ user, children, title }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
            {title && <Head title={title} />}
            <div className="h-screen w-full overflow-hidden">
                <Header
                    user={user}
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />
                <div className="w-full h-full pb-20 flex">
                    <Sidebar isSidebarOpen={isSidebarOpen} user={user} />
                    <main
                        className={`  h-full pb-20 overflow-auto bg-blue-gray-50 w-full p-4 md:py-7  ${
                            isSidebarOpen ? "blur-sm  brightness-50 " : ""
                        }`}
                    >
                        {children}
                    </main>
                    {/* <footer className="w-full h-7 bg-white pl-52 flex justify-center items-center  absolute bottom-0">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} - BEASISWA
                        </p>
                    </footer> */}
                </div>
            </div>
        </>
    );
}
