import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { isPending, data: riders = [], refetch } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending');
            return res.data;
        }
    });

    if (isPending) {
        return <div className="p-6 text-center text-lg font-medium">Loading...</div>;
    }

    const handleApprove = async (id, email) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You are about to approve this rider application.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, approve it!",
            cancelButtonText: "Cancel",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/riders/approve/${id}`, {email});
                setModalOpen(false);
                refetch();
                Swal.fire("Approved!", "The rider has been approved.", "success");
            } catch (err) {
                console.error("Approval failed:", err);
                Swal.fire("Error", "Something went wrong during approval.", "error");
            }
        }
    };

    const handleReject = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You are about to reject this rider application.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject it!",
            cancelButtonText: "Cancel",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/riders/reject/${id}`);
                setModalOpen(false);
                refetch();
                Swal.fire("Rejected!", "The rider has been rejected.", "success");
            } catch (err) {
                console.error("Rejection failed:", err);
                Swal.fire("Error", "Something went wrong during rejection.", "error");
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Age</th>
                            <th className="p-3">Region</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider) => (
                            <tr key={rider._id} className="border-t">
                                <td className="p-3">{rider.name}</td>
                                <td className="p-3">{rider.email}</td>
                                <td className="p-3">{rider.age}</td>
                                <td className="p-3">{rider.region}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => {
                                            setSelectedRider(rider);
                                            setModalOpen(true);
                                        }}
                                        className="text-blue-500 hover:underline"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {riders.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-3 text-center text-gray-500">
                                    No pending riders
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && selectedRider && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500"
                            onClick={() => setModalOpen(false)}
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-semibold mb-4">Rider Details</h3>
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p><strong>National ID:</strong> {selectedRider.nid}</p>
                            <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
                            <p><strong>Bike Reg. Number:</strong> {selectedRider.bikeRegNo}</p>
                            <p><strong>Status:</strong> {selectedRider.status}</p>
                        </div>
                        <div className="flex justify-end mt-6 space-x-3">
                            <button
                                onClick={() => handleReject(selectedRider._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleApprove(selectedRider._id, selectedRider.email)}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRiders;
