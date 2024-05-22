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
                <div className="w-full h-full  flex flex-row">
                    <Sidebar isSidebarOpen={isSidebarOpen} user={user} />
                    <div className="w-full">
                        <Header
                            user={user}
                            toggleSidebar={toggleSidebar}
                            isSidebarOpen={isSidebarOpen}
                        />
                        <main
                            className={`  h-full pb-20 overflow-auto bg-blue-gray-50 w-full p-4 md:py-7  ${
                                isSidebarOpen ? "blur-sm  brightness-50 " : ""
                            }`}
                        >
                            {children}
                        </main>
                    </div>
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
