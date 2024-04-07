import Form from "@/Components/Form/Form";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function Pengajuan({ title, auth, data }) {
    return (
        <Layout title={title} user={auth?.user}>
            <Form />
        </Layout>
    );
}
