import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <nav className="bg-blue-500 w-64 p-4 text-white flex flex-col space-y-4">
                <h1 className="font-bold text-2xl">Admin Panel</h1>
                <Link to="/" className="hover:bg-blue-600 px-4 py-2 rounded">
                    Home
                </Link>
                <Link to="/add-product" className="hover:bg-blue-600 px-4 py-2 rounded">
                    Add Product
                </Link>
                <Link to="/add-reviews" className="hover:bg-blue-600 px-4 py-2 rounded">
                    Add Reviews
                </Link>

            </nav>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
                <p className="mt-4 text-gray-600">
                    Welcome to the admin panel. Use the sidebar to navigate through the
                    sections.
                </p>
                {/* Add your admin panel content here */}
            </main>
        </div>
    );
};

export default Admin;