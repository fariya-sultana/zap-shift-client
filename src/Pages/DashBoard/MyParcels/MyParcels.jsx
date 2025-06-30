import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    console.log(parcels)


    const handleView = parcel => {
        console.log("View details for", parcel);
        // Optionally open a modal here
    };

    const handlePay = id => {
        console.log("Trigger payment for",id);
        navigate(`/dashboard/payment/${id}`)
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#6b7280"
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${id}`);

                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Parcel has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }

                refetch();
            } catch (error) {
                Swal.fire("Error", error.response?.data?.message || error.message || "Failed to delete parcel", "error");
            }
        }
    };


    const formatDate = isoString => {
        const date = new Date(isoString);
        return date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0];
    };


    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">My Parcels</h1>
            <div className="overflow-x-auto mt-6">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Created At</th>
                            <th>Cost</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels?.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-6">
                                    No parcels found.
                                </td>
                            </tr>
                        )}
                        {parcels?.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                <td className='max-w-[180px] truncate'>{parcel.title} </td>
                                <td className="capitalize">{parcel.type}</td>
                                <td>{formatDate(parcel.creation_date)}</td>
                                <td>৳{parcel.cost}</td>
                                <td>
                                    <span
                                        className={`badge ${parcel.payment_status === "paid" ? "badge-success" : "badge-error"
                                            }`}
                                    >
                                        {parcel.payment_status}
                                    </span>
                                </td>
                                <td className="flex flex-wrap gap-2">
                                    <button
                                        className="btn btn-sm btn-outline btn-info"
                                        onClick={() => handleView(parcel)}
                                    >
                                        View
                                    </button>
                                    {parcel.payment_status === "unpaid" && (
                                        <button
                                            className="btn btn-sm btn-outline btn-success"
                                            onClick={() => handlePay(parcel._id)}
                                        >
                                            Pay
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-sm btn-outline btn-error"
                                        onClick={() => handleDelete(parcel._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;