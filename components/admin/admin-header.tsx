import Link from "next/link";
import { Button } from "../ui/button";

const AdminHeader = () => {
    return (
        <div className="flex items-center justify-between h-[8dvh] px-[2rem] border-b shadow">
            {/* left  */}
            <section>
                <p className="text-lg font-semibold">Admin Panel</p>
            </section>
            <section className="flex items-center gap-4">
                <Link href="/home">
                    <Button variant={"outline"}>View Site</Button>
                </Link>
                <Button variant={"outline"}>Logout</Button>
            </section>
        </div>
    );
};

export default AdminHeader;
