import { useEffect, useState } from "react";

import FeeCard from "../../components/admin/FeeCard";
import FeeTable from "../../components/admin/FeeTable";
import PaymentModal from "../../components/admin/PaymentModal";

function Fees() {
    const [payments, setPayments] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        studentId: "",
        feeMonth: "",
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

            console.log("STUDENTS RESPONSE:", studentsResponse.status);
            console.log("STUDENTS DATA:", studentsData);

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
                        feeMonth: form.feeMonth,
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
                feeMonth: "",
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

            <FeeCard
                title="Total Collected"
                amount={totalCollected}
                type="green"
            />

            <FeeCard
                title="Pending Amount"
                amount={pendingAmount}
                type="red"
            />

            <FeeCard
                title="Paid Payments"
                value={paidPayments}
                type="purple"
            />

            <FeeCard
                title="Pending Payments"
                value={pendingPayments}
                type="yellow"
            />

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

            <FeeTable
                payments={payments}
                onDelete={handleDelete}
            />

        </div>


        {/* =========================
            RECORD PAYMENT MODAL
        ========================= */}

        <PaymentModal
            show={showModal}
            onClose={() => setShowModal(false)}
            form={form}
            students={students}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saving={saving}
        />

    </div>
);
}                           
export default Fees;