import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedRegion, setSelectedRegion] = useState("");
    const serviceCenters = useLoaderData();


    const regions = [...new Set(serviceCenters.map((s) => s.region))];
    const districts = serviceCenters.filter((s) => s.region === selectedRegion).map((s) => s.district);

    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            name: user?.displayName || "",
            email: user?.email || "",
            status: "pending",
            created_at: new Date().toISOString(),
        };

        console.log('riderData', riderData);

        axiosSecure.post('/riders', riderData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Application Submited",
                        text: "Your application is pending approval."
                    });
                }
            })
            reset();
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Become a Rider</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block font-medium">Age</label>
                    <input
                        type="number"
                        {...register("age", { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Your Age"
                    />
                </div>
                <div>
                    <label className="block font-medium">Region</label>
                    <select
                        {...register("region", { required: true })}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        defaultValue=""
                    >
                        <option value="" disabled>Select Region</option>
                        {regions.map((region, i) => (
                            <option key={i} value={region}>{region}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-medium">District</label>
                    <select
                        {...register("district", { required: true })}
                        disabled={!selectedRegion}
                        className="w-full border px-3 py-2 rounded"
                        defaultValue=""
                    >
                        <option value="" disabled>Select District</option>
                        {districts.map((district, i) => (
                            <option key={i} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-medium">National ID Number</label>
                    <input
                        type="text"
                        {...register("nid", { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Your NID number"
                    />
                </div>
                <div>
                    <label className="block font-medium">Bike Brand</label>
                    <input
                        type="text"
                        {...register("bikeBrand", { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="e.g., Honda, Yamaha"
                    />
                </div>
                <div>
                    <label className="block font-medium">Bike Registration Number</label>
                    <input
                        type="text"
                        {...register("bikeRegNumber", { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="e.g., ABC-1234"
                    />
                </div>
                <div>
                    <label className="block font-medium">Any Other Info</label>
                    <textarea
                        {...register("extraInfo")}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Optional notes or details"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default BeARider;
