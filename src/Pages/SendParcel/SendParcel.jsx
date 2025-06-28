
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const generateTrackingId = () => {
    const now = new Date();
    return `PRCL${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${Math.floor(
            Math.random() * 10000
        )}`;
};



export default function SendParcel() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const serviceCenters = useLoaderData();
    const regions = [...new Set(serviceCenters.map(center => center.region))];

    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");
    const watchType = watch("type");

    const getDistrictsByRegion = region =>
        [...new Set(serviceCenters.filter(center => center.region === region).map(center => center.district))];

    const senderDistricts = senderRegion ? getDistrictsByRegion(senderRegion) : [];
    const receiverDistricts = receiverRegion ? getDistrictsByRegion(receiverRegion) : [];

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const calculateCost = ({ type, weight, senderServiceCenter, receiverServiceCenter }) => {
        const isSameDistrict = senderServiceCenter === receiverServiceCenter;
        const parsedWeight = parseFloat(weight || 0);

        if (type === "document") {
            return isSameDistrict ? 60 : 80;
        }

        if (type === "non-document") {
            const base = isSameDistrict ? 110 : 150;
            return parsedWeight <= 3 ? base : base + (parsedWeight - 3) * 40;
        }

        return 0;
    };

    const onSubmit = async data => {
        const cost = calculateCost(data);
        const parsedWeight = parseFloat(data.weight || 0);
        const isSameDistrict = data.senderServiceCenter === data.receiverServiceCenter;

        let breakdownHTML = `
      <div style="text-align:left;font-size:16px;line-height:1.5;color:#333">
        <p><strong>Sender:</strong> ${data.senderName}</p>
        <p><strong>Receiver:</strong> ${data.receiverName}</p>
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>From:</strong> ${data.senderServiceCenter} (${data.senderRegion})</p>
        <p><strong>To:</strong> ${data.receiverServiceCenter} (${data.receiverRegion})</p>
        <hr>
    `;

        if (data.type === "document") {
            breakdownHTML += `<p>Base Charge (${isSameDistrict ? "Same" : "Different"} District): ৳${isSameDistrict ? 60 : 80}</p>`;
        } else {
            const base = isSameDistrict ? 110 : 150;
            if (parsedWeight <= 3) {
                breakdownHTML += `<p>Base Charge (${isSameDistrict ? "Same" : "Different"} District, ≤ 3KG): ৳${base}</p>`;
            } else {
                const extraWeight = parsedWeight - 3;
                const extraCost = extraWeight * 40;
                breakdownHTML += `
          <p>Base Charge (First 3KG): ৳${base}</p>
          <p>Extra Weight: ${extraWeight.toFixed(2)} KG × ৳40 = ৳${extraCost.toFixed(2)}</p>
        `;
            }
        }
        const totalCost = parseInt(`${cost.toFixed(2)}`)
        breakdownHTML += `<hr style="margin: 8px 0;"><h3 style="font-size:18px;color:#000;"><strong>Total Cost: ৳${cost.toFixed(2)}</strong></h3></div>`;

        const result = await Swal.fire({
            title: "Confirm Booking",
            html: breakdownHTML,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Confirm & Save",
            cancelButtonText: "Edit Details",
            customClass: {
                popup: "rounded-lg px-6 pt-5 pb-6",
                confirmButton: "bg-green-600 text-white px-4 py-2 rounded-md",
                cancelButton: "bg-gray-400 text-white px-4 py-2 rounded-md ml-2"
            }
        });

        if (result.isConfirmed) {
            const parcelData = {
                ...data,
                creation_date: new Date().toISOString(),
                cost: totalCost,
                created_by: user?.email,
                status: "pending",
                delivery_status: "not-collected",
                payment_status: "unpaid",
                trackingId: generateTrackingId()
            };
            console.log("Parcel Data:", parcelData);
            try {
                await axiosSecure.post("/parcels", parcelData).then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Success!",
                            text: "Parcel information saved successfully!",
                            icon: "success",
                            confirmButtonText: "Great!"
                        });
                    }
                })
            } catch (error) {
                console.error("Error saving parcel info:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to save parcel info. Try again.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        }
    };


    return (
        <div className="max-w-6xl mx-auto p-6 rounded-lg shadow-2xl my-6 md:my-10">
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-4 md:mb-8">Add Parcel</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <p className="mb-4 font-bold text-2xl">Enter your parcel details</p>

                {/* Parcel Type */}
                <div className="flex gap-4">
                    {["document", "non-document"].map((type) => (
                        <label key={type} className="label cursor-pointer">
                            <input
                                type="radio"
                                value={type}
                                {...register("type", { required: "Parcel type is required" })}
                                className="radio checked:bg-primary"
                            />
                            <span className="text-black font-medium ml-2 capitalize">{type}</span>
                        </label>
                    ))}
                </div>
                {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

                {/* Title and Weight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="label">Parcel Name</label>
                        <input
                            {...register("title", { required: "Parcel name is required" })}
                            placeholder="Parcel Name"
                            className="input input-bordered w-full"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label className="label">Parcel Weight (KG)</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("weight", {
                                required: watchType === "non-document" ? "Weight is required for non-documents" : false,
                            })}
                            placeholder="Parcel Weight (KG)"
                            className="input input-bordered w-full"
                            disabled={watchType === "document"}
                        />
                        {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
                    </div>
                </div>

                {/* Sender Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="font-semibold text-xl mb-4">Sender Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="label">Sender Name</label>
                                <input
                                    {...register("senderName", { required: "Sender name is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.senderName && <p className="text-red-500 text-sm">{errors.senderName.message}</p>}
                            </div>
                            <div>
                                <label className="label">Sender Contact No</label>
                                <input
                                    {...register("senderContact", { required: "Sender contact is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.senderContact && <p className="text-red-500 text-sm">{errors.senderContact.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="label">Your Region</label>
                                <select
                                    {...register("senderRegion", { required: "Sender region is required" })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select your region</option>
                                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                                {errors.senderRegion && <p className="text-red-500 text-sm">{errors.senderRegion.message}</p>}
                            </div>
                            <div>
                                <label className="label">Pickup Warehouse</label>
                                <select
                                    {...register("senderServiceCenter", { required: "Sender warehouse is required" })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Warehouse</option>
                                    {senderDistricts.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                                {errors.senderServiceCenter && <p className="text-red-500 text-sm">{errors.senderServiceCenter.message}</p>}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="label">Address</label>
                            <textarea
                                {...register("senderAddress", { required: "Sender address is required" })}
                                className="textarea textarea-bordered w-full"
                            />
                            {errors.senderAddress && <p className="text-red-500 text-sm">{errors.senderAddress.message}</p>}
                        </div>

                        <div className="mt-4">
                            <label className="label">Pickup Instruction</label>
                            <textarea
                                {...register("pickupInstruction", { required: "Pickup instruction is required" })}
                                className="textarea textarea-bordered w-full"
                            />
                            {errors.pickupInstruction && <p className="text-red-500 text-sm">{errors.pickupInstruction.message}</p>}
                        </div>
                    </div>

                    {/* Receiver Info */}
                    <div>
                        <h2 className="font-semibold text-xl mb-4">Receiver Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="label">Receiver Name</label>
                                <input
                                    {...register("receiverName", { required: "Receiver name is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.receiverName && <p className="text-red-500 text-sm">{errors.receiverName.message}</p>}
                            </div>
                            <div>
                                <label className="label">Receiver Contact No</label>
                                <input
                                    {...register("receiverContact", { required: "Receiver contact is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.receiverContact && <p className="text-red-500 text-sm">{errors.receiverContact.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="label">Receiver Region</label>
                                <select
                                    {...register("receiverRegion", { required: "Receiver region is required" })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select region</option>
                                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                                {errors.receiverRegion && <p className="text-red-500 text-sm">{errors.receiverRegion.message}</p>}
                            </div>
                            <div>
                                <label className="label">Delivery Warehouse</label>
                                <select
                                    {...register("receiverServiceCenter", { required: "Receiver warehouse is required" })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Warehouse</option>
                                    {receiverDistricts.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                                {errors.receiverServiceCenter && <p className="text-red-500 text-sm">{errors.receiverServiceCenter.message}</p>}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="label">Receiver Address</label>
                            <textarea
                                {...register("receiverAddress", { required: "Receiver address is required" })}
                                className="textarea textarea-bordered w-full"
                            />
                            {errors.receiverAddress && <p className="text-red-500 text-sm">{errors.receiverAddress.message}</p>}
                        </div>

                        <div className="mt-4">
                            <label className="label">Delivery Instruction</label>
                            <textarea
                                {...register("deliveryInstruction", { required: "Delivery instruction is required" })}
                                className="textarea textarea-bordered w-full"
                            />
                            {errors.deliveryInstruction && <p className="text-red-500 text-sm">{errors.deliveryInstruction.message}</p>}
                        </div>
                    </div>
                </div>

                <p className="text-sm text-gray-600 italic">* Pickup Time: 4pm–7pm Approx</p>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary text-black mt-4">Proceed to Confirm Booking</button>
                </div>

            </form>
        </div>
    );
}
