import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [selectedParcel, setSelectedParcel] = useState(null);
    const [selectedRiderId, setSelectedRiderId] = useState("");

    // Load parcels to assign
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["assignable-parcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/parcels?payment_status=paid&delivery_status=not_collected"
            );
            return res.data;
        },
    });

    // Load riders based on selectedParcel district
    const { data: riders = [], refetch: refetchRiders } = useQuery({
        queryKey: ["filtered-riders", selectedParcel?.receiverServiceCenter],
        queryFn: async () => {
            if (!selectedParcel?.receiverServiceCenter) return [];
            const res = await axiosSecure.get(
                `/riders/available?district=${selectedParcel.receiverServiceCenter}`
            );
            return res.data;
        },
        enabled: !!selectedParcel?.receiverServiceCenter,
    });

    const assignMutation = useMutation({
        mutationFn: async ({ parcelId, riderId }) => {
            return axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, { riderId });
        },
        onSuccess: () => {
            Swal.fire("Success", "Rider assigned successfully", "success");
            queryClient.invalidateQueries(["assignable-parcels"]);
            setSelectedParcel(null);
            setSelectedRiderId("");
        },
        onError: () => {
            Swal.fire("Error", "Failed to assign rider", "error");
        },
    });

    const handleAssign = () => {
        if (!selectedRiderId) {
            return Swal.fire("Error", "Please select a rider", "warning");
        }
        assignMutation.mutate({
            parcelId: selectedParcel._id,
            riderId: selectedRiderId,
        });
    };

    if (isLoading) return <p>Loading parcels...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>
            <div className="overflow-x-auto bg-white shadow rounded">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Tracking ID</th>
                            <th className="p-3">From</th>
                            <th className="p-3">To</th>
                            <th className="p-3">Receiver</th>
                            <th className="p-3">Cost</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr key={parcel._id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{parcel.trackingId}</td>
                                <td className="p-3">{parcel.senderServiceCenter}</td>
                                <td className="p-3">{parcel.receiverServiceCenter}</td>
                                <td className="p-3">{parcel.receiverName}</td>
                                <td className="p-3 text-green-700 font-bold">৳ {parcel.cost}</td>
                                <td className="p-3">
                                    {parcel.creation_date}
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => {
                                            setSelectedParcel(parcel);
                                            refetchRiders();
                                        }}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                    >
                                        Assign Rider
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="7" className="p-4 text-center text-gray-500">
                                    No parcels available for assignment.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Assign Modal */}
            {selectedParcel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                        <h3 className="text-xl font-semibold mb-4">Assign Rider</h3>
                        <p className="mb-2"><strong>Tracking ID:</strong> {selectedParcel.trackingId}</p>
                        <p className="mb-2"><strong>Receiver District:</strong> {selectedParcel.receiverServiceCenter}</p>

                        <select
                            value={selectedRiderId}
                            onChange={(e) => setSelectedRiderId(e.target.value)}
                            className="w-full border p-2 rounded mb-4"
                        >
                            <option value="">Select Rider</option>
                            {riders.map((rider) => (
                                <option key={rider._id} value={rider._id}>
                                    {rider.name} ({rider.email})
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setSelectedParcel(null)}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAssign}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRider;
