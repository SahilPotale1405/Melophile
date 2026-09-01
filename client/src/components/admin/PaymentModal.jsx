function PaymentModal({
    show,
    onClose,
    form,
    students,
    onChange,
    onSubmit,
    saving,
}) {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">

                {/* HEADER */}
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
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-900 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={onSubmit}
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
                            onChange={onChange}
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

                    {/* FEE MONTH */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fee Month
                            </label>

                            <input
                                type="month"
                                name="feeMonth"
                                value={form.feeMonth}
                                onChange={onChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                            />
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
                            onChange={onChange}
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
                            onChange={onChange}
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
                            onChange={onChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="Cash">
                                Cash
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Bank Transfer">
                                Bank Transfer
                            </option>

                            <option value="Other">
                                Other
                            </option>
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
                            onChange={onChange}
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
                            onChange={onChange}
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
                            onChange={onChange}
                            placeholder="Optional notes"
                            rows="3"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
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
    );
}

export default PaymentModal;