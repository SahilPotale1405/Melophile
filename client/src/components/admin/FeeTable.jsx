function FeeTable({ payments, onDelete }) {
    return (
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
                                            {payment.student?.name ||
                                                "Unknown"}
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            {payment.student?.email || ""}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 border-b font-semibold">
                                        ₹
                                        {Number(
                                            payment.amount || 0
                                        ).toLocaleString("en-IN")}
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
                                                onDelete(payment._id)
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
    );
}

export default FeeTable;