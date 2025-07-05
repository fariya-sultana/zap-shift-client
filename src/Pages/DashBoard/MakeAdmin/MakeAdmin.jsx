import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['search-users', search],
        queryFn: async () => {
            if (!search) return [];
            const res = await axiosSecure.get(`/users/search?email=${search}`);
            return res.data;
        },
        enabled: !!search,
    });

    const { mutate: updateRole } = useMutation({
        mutationFn: async ({ id, role }) => {
            const res = await axiosSecure.patch(`/users/${id}/role`, { role });
            return res.data;
        },
        onSuccess: (_, variables) => {
            Swal.fire("Success", `Role changed to ${variables.role}`, "success");
            queryClient.invalidateQueries(['search-users', search]);
        },
        onError: () => {
            Swal.fire("Error", "Could not update role", "error");
        }
    });

    const handleRoleChange = (user, newRole) => {
        if (user.role === newRole) return;

        Swal.fire({
            title: `Change role to ${newRole}?`,
            text: `User: ${user.email}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        }).then(result => {
            if (result.isConfirmed) {
                updateRole({ id: user._id, role: newRole });
            }
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Admin Access</h2>
            <input
                type="text"
                placeholder="Search by email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded w-full mb-4"
            />
            {isLoading ? (
                <p>Loading...</p>
            ) : users.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded shadow">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Email</th>
                                <th className="p-3">Created At</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="border-t">
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">
                                        {user.created_at
                                            ? new Date(user.created_at).toLocaleString()
                                            : "N/A"}
                                    </td>
                                    <td className="p-3 capitalize">{user.role || "user"}</td>
                                    <td className="p-3 space-x-2">
                                        {user.role !== "admin" && (
                                            <button
                                                onClick={() => handleRoleChange(user, "admin")}
                                                className="bg-green-500 text-white px-3 py-1 rounded"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {user.role === "admin" && (
                                            <button
                                                onClick={() => handleRoleChange(user, "user")}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Remove Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MakeAdmin;
