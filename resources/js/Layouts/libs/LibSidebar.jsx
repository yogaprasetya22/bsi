import { validateRole } from "@/Components/Example";

export const MenuDashboardValidate = (user) => {
    const MenuSuperAdminDashboard = [
        {
            name: "Dashboard",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-home",
        },
        {
            name: "Kelola User",
            url: `/${validateRole(user?.role_id)}/user`,
            icon: "fas fa-users",
        },
        {
            name: "Kelola Admin",
            url: `/${validateRole(user?.role_id)}/admin`,
            icon: "fas fa-user-tie",
        },
    ];
    const MenuAdminDashboard = [
        {
            name: "Dashboard",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-home",
        },
        {
            name: "Regist",
            url: `/${validateRole(user?.role_id)}/regist`,
            icon: "fas fa-tasks",
        },
        {
            name:"Document",
            url:`/${validateRole(user?.role_id)}/document`,
            icon:"fas fa-file-alt"
        }
    ];

    const MenuClientDashboard = [
        {
            name: "Dashboard",
            url: "/",
            icon: "fas fa-home",
        },
        {
            name: "Pengajuan",
            url: "/pengajuan",
            icon: "fas fa-share-square",
        },
        {
            name: "History",
            url: "/history",
            icon: "fas fa-history",
        },
        {
            name: "Feedback",
            url: "/feedback",
            icon: "fas fa-exchange-alt",
        },
    ];

    switch (user?.role_id) {
        case 1:
            return MenuAdminDashboard;
        case 2:
            return MenuClientDashboard;
        case 3:
            return MenuSuperAdminDashboard;
    }
};
