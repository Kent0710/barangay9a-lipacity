import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <AdminHeader />
            <div className="flex flex-1 overflow-hidden">
                <AdminSidebar />
                <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
