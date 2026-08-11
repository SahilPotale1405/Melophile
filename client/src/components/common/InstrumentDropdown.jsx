import { useState } from "react";

function InstrumentDropdown({ instruments, value, onChange }) {
    const [open, setOpen] = useState(false);

    const selectedInstrument = instruments.find(
        (instrument) => instrument._id === value
    );

    return (
        <div className="relative mb-4">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white text-left flex justify-between items-center"
            >
                <span>
                    {selectedInstrument
                        ? selectedInstrument.name
                        : "Select Instrument"}
                </span>

                <span>{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {instruments.map((instrument) => (
                        <button
                            key={instrument._id}
                            type="button"
                            onClick={() => {
                                onChange(instrument._id);
                                setOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-purple-50 hover:text-purple-700 transition"
                        >
                            {instrument.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default InstrumentDropdown;