import { useEffect, useState } from "react";

function Fees() {
    const [payments, setPayments] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        studentId: "",
        amount: "",
        paymentDate: "",
        paymentMethod: "Cash",
        status: "Paid",
        transactionId: "",
        notes: "",
    });

    const [saving, setSaving] = useState(false);

    // =========================
    // FETCH PAYMENTS & STUDENTS
    // =========================

    const fetchData = async () => {
        try {
            const [paymentsResponse, studentsResponse] =
                await Promise.all([
                    fetch(
                        `${import.meta.env.VITE_API_URL}/api/payments`
                    ),
                    fetch(
                        `${import.meta.env.VITE_API_URL}/api/students`
                    ),
                ]);

            const paymentsData = await paymentsResponse.json();
            const studentsData = await studentsResponse.json();

            setPayments(paymentsData);
            setStudents(studentsData);
            setLoading(false);

        } catch (error) {
            console.error("Failed to fetch fees data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // =========================
    // FORM CHANGE
    // =========================

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // =========================
    // RECORD PAYMENT
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/payments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        studentId: form.studentId,
                        amount: Number(form.amount),
                        paymentDate:
                            form.paymentDate || undefined,
                        paymentMethod: form.paymentMethod,
                        status: form.status,
                        transactionId: form.transactionId,
                        notes: form.notes,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to record payment");
                return;
            }

            alert("Payment recorded successfully!");

            setShowModal(false);

            setForm({
                studentId: "",
                amount: "",
                paymentDate: "",
                paymentMethod: "Cash",
                status: "Paid",
                transactionId: "",
                notes: "",
            });

            await fetchData();

        } catch (error) {
            console.error("Payment error:", error);
            alert("Failed to record payment");

        } finally {
            setSaving(false);
        }
    };

    // =========================
    // DELETE PAYMENT
    // =========================

    const handleDelete = async (paymentId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this payment?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/payments/${paymentId}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to delete payment");
                return;
            }

            alert("Payment deleted successfully!");

            await fetchData();

        } catch (error) {
            console.error("Delete payment error:", error);
            alert("Failed to delete payment");
        }
    };

    // =========================
    // STATISTICS
    // =========================

    const totalCollected = payments
        .filter((payment) => payment.status === "Paid")
        .reduce(
            (total, payment) => total + Number(payment.amount || 0),
            0
        );

    const pendingAmount = payments
        .filter((payment) => payment.status === "Pending")
        .reduce(
            (total, payment) => total + Number(payment.amount || 0),
            0
        );

    const paidPayments = payments.filter(
        (payment) => payment.status === "Paid"
    ).length;

    const pendingPayments = payments.filter(
        (payment) => payment.status === "Pending"
    ).length;

    if (loading) {
        return (
            <p className="text-gray-500">
                Loading fees...
            </p>
        );
    }

    return (
        <div className="space-y-8">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <p className="text-sm font-medium text-purple-600 mb-2">
                        MELOPHILE FINANCE
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Fees
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage student fees and payment records.
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg font-semibold transition"
                >
                    + Record Payment
                </button>

            </div>

            {/* =========================
                STATISTICS
            ========================= */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-gray-500 text-sm">
                        Total Collected
                    </p>

                    <p className="text-3xl font-bold text-green-600 mt-2">
                        ₹{totalCollected.toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-gray-500 text-sm">
                        Pending Amount
                    </p>

                    <p className="text-3xl font-bold text-red-600 mt-2">
                        ₹{pendingAmount.toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-gray-500 text-sm">
                        Paid Payments
                    </p>

                    <p className="text-3xl font-bold text-purple-600 mt-2">
                        {paidPayments}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-gray-500 text-sm">
                        Pending Payments
                    </p>

                    <p className="text-3xl font-bold text-yellow-600 mt-2">
                        {pendingPayments}
                    </p>
                </div>

            </div>

            {/* =========================
                PAYMENT HISTORY
            ========================= */}

            <div>

                <div className="mb-4">
                    <h2 className="text-2xl font-bold">
                        Payment History
                    </h2>

                    <p className="text-gray-500 mt-1">
                        View all student payment records.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[950px]">

                            <thead>
                                <tr>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Student
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Amount
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Date
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Method
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                                        Action
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {payments.length > 0 ? (

                                    payments.map((payment) => (

                                        <tr
                                            key={payment._id}
                                            className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition"
                                        >

                                            <td className="px-6 py-4 border-b">

                                                <div className="font-medium">
                                                    {payment.student?.name || "Unknown"}
                                                </div>

                                                <div className="text-sm text-gray-500">
                                                    {payment.student?.email || ""}
                                                </div>

                                            </td>

                                            <td className="px-6 py-4 border-b font-semibold">
                                                ₹{Number(payment.amount).toLocaleString("en-IN")}
                                            </td>

                                            <td className="px-6 py-4 border-b">

                                                {new Date(
                                                    payment.paymentDate
                                                ).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}

                                            </td>

                                            <td className="px-6 py-4 border-b">

                                                <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                                                    {payment.paymentMethod}
                                                </span>

                                            </td>

                                            <td className="px-6 py-4 border-b">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        payment.status === "Paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                    {payment.status}
                                                </span>

                                            </td>

                                            <td className="px-6 py-4 border-b">

                                                <button
                                                    onClick={() =>
                                                        handleDelete(payment._id)
                                                    }
                                                    className="px-3 py-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                                                    title="Delete Payment"
                                                >
                                                    🗑️
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            No payment records yet.
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* =========================
                RECORD PAYMENT MODAL
            ========================= */}

            {showModal && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between mb-6">

                            <div>
                                <h2 className="text-2xl font-bold">
                                    Record Payment
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Add a student payment record.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-900 text-2xl"
                            >
                                ×
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >

                            {/* STUDENT */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Student
                                </label>

                                <select
                                    name="studentId"
                                    value={form.studentId}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">
                                        Select Student
                                    </option>

                                    {students.map((student) => (
                                        <option
                                            key={student._id}
                                            value={student._id}
                                        >
                                            {student.name} — {student.email}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            {/* AMOUNT */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    min="0"
                                    value={form.amount}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter amount"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* PAYMENT DATE */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Payment Date
                                </label>

                                <input
                                    type="date"
                                    name="paymentDate"
                                    value={form.paymentDate}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* PAYMENT METHOD */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Payment Method
                                </label>

                                <select
                                    name="paymentMethod"
                                    value={form.paymentMethod}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="Cash">Cash</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Bank Transfer">
                                        Bank Transfer
                                    </option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* STATUS */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="Paid">
                                        Paid
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>
                                </select>
                            </div>

                            {/* TRANSACTION ID */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Transaction ID
                                </label>

                                <input
                                    type="text"
                                    name="transactionId"
                                    value={form.transactionId}
                                    onChange={handleChange}
                                    placeholder="Optional"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* NOTES */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Notes
                                </label>

                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                    placeholder="Optional notes"
                                    rows="3"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* BUTTONS */}

                            <div className="flex justify-end gap-3 pt-4">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold"
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Record Payment"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Fees;