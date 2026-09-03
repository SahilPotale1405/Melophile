import { useEffect, useState } from "react";

function StudentFees() {
    const [student, setStudent] = useState(null);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const studentId = localStorage.getItem("studentId");

    const fetchData = async () => {
        try {
            if (!studentId) {
                setError("Student not logged in.");
                setLoading(false);
                return;
            }

            const [studentResponse, paymentsResponse] =
                await Promise.all([
                    fetch(
                        `${import.meta.env.VITE_API_URL}/api/students/${studentId}`
                    ),
                    fetch(
                        `${import.meta.env.VITE_API_URL}/api/payments/student/${studentId}`
                    ),
                ]);

            const studentData = await studentResponse.json();
            const paymentsData = await paymentsResponse.json();

            if (!studentResponse.ok) {
                throw new Error(
                    studentData.message || "Failed to fetch student details"
                );
            }

            if (!paymentsResponse.ok) {
                throw new Error(
                    paymentsData.message || "Failed to fetch payment history"
                );
            }

            setStudent(studentData);
            setPayments(paymentsData);
        } catch (error) {
            console.error("Failed to fetch fees:", error);
            setError(error.message || "Failed to load fees.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Loading fees...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                    {error}
                </div>
            </div>
        );
    }

    if (!student) {
        return null;
    }

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div>
                <p className="text-sm font-medium text-purple-600 mb-2">
                    MELOPHILE FINANCE
                </p>

                <h1 className="text-3xl font-bold text-gray-900">
                    My Fees
                </h1>

                <p className="text-gray-500 mt-1">
                    View your fee details and payment history.
                </p>
            </div>

            {/* FEE SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* FEE AMOUNT */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-500">
                        Fee Amount
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-2">
                        ₹{Number(student.feeAmount || 0).toLocaleString("en-IN")}
                    </h2>
                </div>

                {/* STATUS */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-500">
                        Payment Status
                    </p>

                    <div className="mt-3">
                        <span
                            className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                                student.fees === "Paid"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            {student.fees}
                        </span>
                    </div>
                </div>

                {/* PAY NOW */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-500">
                        Payment
                    </p>

                    {student.fees === "Pending" ? (
                        <button
                            className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Pay Now
                        </button>
                    ) : (
                        <p className="mt-3 text-green-600 font-semibold">
                            Fee Paid ✓
                        </p>
                    )}
                </div>

            </div>

            {/* PAYMENT HISTORY */}
            <div>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Payment History
                    </h2>

                    <p className="text-gray-500 mt-1">
                        View your previous payments.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {payments.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No payment records found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">

                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Date
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Amount
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Method
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Status
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Transaction ID
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {payments.map((payment) => (
                                        <tr
                                            key={payment._id}
                                            className="border-t border-gray-100"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {new Date(
                                                    payment.paymentDate
                                                ).toLocaleDateString("en-IN")}
                                            </td>

                                            <td className="px-6 py-4 font-semibold text-gray-900">
                                                ₹
                                                {Number(
                                                    payment.amount || 0
                                                ).toLocaleString("en-IN")}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {payment.paymentMethod}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        payment.status === "Paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                    {payment.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {payment.transactionId || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}

export default StudentFees;