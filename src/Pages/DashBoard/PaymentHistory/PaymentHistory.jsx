import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })
 console.log(payments)
    if (isPending) {
        return '..loading';
    }

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
            <table className="table table-zebra w-full">
                <thead>
                    <tr className="bg-base-200">
                        <th>#</th>
                        <th>Transaction ID</th>
                        <th>Parcel ID</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Date</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={payment.transactionId}>
                            <td>{index + 1}</td>
                            <td className="font-mono text-sm">{payment.transactionId}</td>
                            <td>{payment.parcelId}</td>
                            <td className="text-green-600 font-semibold">৳ {payment.amount}</td>
                            <td>
                                <div className="badge badge-info badge-sm">
                                    {payment.paymentMethod?.[0]}
                                </div>
                            </td>
                            <td>{new Date(payment.paid_At).toISOString().split("T")[0]}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;