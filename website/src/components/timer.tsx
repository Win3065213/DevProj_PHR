import React, { useEffect, useState } from "react"
import { getFormattedTimeRemaining, updateExpiryTime } from "../utils/mockData/mockInfo"

export default function Timer() {
    const [timeRemaining, setTimeRemaining] = useState("00:00:00")
    const [customHours, setCustomHours] = useState(24)
    const [isTimerUpdating, setIsTimerUpdating] = useState(false)
    const updateTimer = () => {
        setTimeRemaining(getFormattedTimeRemaining())
    }

    useEffect(() => {
        updateTimer()
        const interval = setInterval(updateTimer, 1000) // update every second

        return () => clearInterval(interval)
    }, [])

    const handleSetCustomTime = () => {
        document.getElementById("timer")?.focus();
        setIsTimerUpdating(true)
        setTimeout(() => {
            updateExpiryTime(customHours)
            setIsTimerUpdating(false)
        }, 1000)
    }

    return (
        <div className="dropdown dropdown-top dropdown-end bg-white
                        fixed bottom-4 right-4">
            <button tabIndex={0} id="timer" role="button" className="px-4 py-2.5 rounded-md border border-slate-200 shadow-lg shadow-gray-500">
                Data expires in: {timeRemaining}
            </button>

            <div
                tabIndex={0}
                className=" card dropdown-content bg-white
                            w-80 px-4 py-2.5 mb-2
                            border border-slate-200 shadow-lg shadow-gray-500"
            >
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h1 className="font-bold">Set custom expiry duration</h1>
                        <p className="text-sm text-muted-foreground">
                            Mock data will be automatically deleted after this period.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-2">
                        <label className="text-right">
                            Hours:
                        </label>
                        <input
                            id="hours"
                            type="number"
                            min="1"
                            max="168"
                            value={customHours}
                            onChange={(e) => setCustomHours(Number.parseInt(e.target.value) || 24)}
                            className="col-span-2 ps-1.5 py-0.5 border border-gray-400 rounded-sm"
                        />
                    </div>
                    <button
                        className=" btn border-0
                                    bg-[var(--phr)] bg-disabled"
                        onClick={handleSetCustomTime}
                        disabled={isTimerUpdating}
                    >
                        {isTimerUpdating ? (
                            <>
                                Updating Timer<span className="loading loading-dots loading-xs"></span>
                            </>
                            ) : (
                            "Update Timer"
                            )}
                    </button>
                </div>
            </div>
        </div>
    )
}