import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");

    const { data: riders = [], isLoading, refetch } = useQuery({
        queryKey: ['active-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/active");
            return res.data;
        },
    });

    const filteredRiders = riders.filter(rider =>
        rider.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeactivate = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will deactivate the rider.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, deactivate",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/riders/deactivate/${id}`);
                Swal.fire("Deactivated", "The rider has been deactivated.", "success");
                refetch();
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Something went wrong.", "error");
            }
        }
    };

    if (isLoading) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

            <input
                type="text"
                placeholder="Search by name..."
                className="mb-4 px-4 py-2 border rounded w-full max-w-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Age</th>
                            <th className="p-3">Region</th>
                            <th className="p-3">Bike</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRiders.map(rider => (
                            <tr key={rider._id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{rider.name}</td>
                                <td className="p-3">{rider.email}</td>
                                <td className="p-3">{rider.age}</td>
                                <td className="p-3">{rider.region}</td>
                                <td className="p-3">{rider.bikeBrand}</td>
                                <td className="p-3">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                                        {rider.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleDeactivate(rider._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Deactivate
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredRiders.length === 0 && (
                            <tr>
                                <td colSpan="7" className="p-4 text-center text-gray-500">
                                    No active riders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiveRiders;
