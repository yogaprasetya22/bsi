import Layout from "@/Layouts/Layout";
import React from "react";

export default function Admin({ title, auth, data }) {
    return (
        <Layout title={title} user={auth?.user}>
            <h1 className="text-2xl font-semibold">Admin</h1>
        </Layout>
    );
}
