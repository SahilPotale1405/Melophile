function FeeCard({ title, amount, value, type = "default" }) {
    const typeStyles = {
        green: "text-green-600",
        red: "text-red-600",
        purple: "text-purple-600",
        yellow: "text-yellow-600",
        default: "text-gray-900",
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 text-sm">
                {title}
            </p>

            <p
                className={`text-3xl font-bold mt-2 ${
                    typeStyles[type] || typeStyles.default
                }`}
            >
                {amount !== undefined
                    ? `₹${Number(amount).toLocaleString("en-IN")}`
                    : value}
            </p>
        </div>
    );
}

export default FeeCard;