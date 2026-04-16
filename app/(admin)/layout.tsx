import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <AdminHeader />
            <div className="flex mt-[2rem]">
                <AdminSidebar />
                <main className="flex-1 pr-[2rem]">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
