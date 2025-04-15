"use client"
import { useEffect, useRef, useState } from "react";
import { getUserData, updateUserData } from "../../utils/mockData/mockInfo";
import Timer from "@/components/timer";

export default function Info() {
  const [isInfoUpdating, setIsInfoUpdating] = useState(false)
  const infoUpdatedRef = useRef<HTMLDialogElement>(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    nhsNumber: "",
    dateOfBirth: "",
  })

  useEffect(() => {
    const data = getUserData()
    if (data) {
      setUserData(data)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsInfoUpdating(true);

    setTimeout(() => {
      updateUserData(userData)
      setIsInfoUpdating(false)

      if (infoUpdatedRef.current) {
        infoUpdatedRef.current.showModal();
      }
    }, 1000);
  }

  return (
    <main className="w-full p-5 space-y-5">
      <dialog ref={infoUpdatedRef} className="modal">
        <div className="modal-box bg-white">
          <p className="text-lg font-bold">Personal Information updated successfully!</p>
          <p className="py-4 text-sm text-gray-500">Press ESC key or click the button below to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <section className="card border-2 border-slate-200
                          mx-auto max-w-2xl p-5 space-y-4">
        <h1 className="text-3xl font-bold">
          Personal Information
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <p className="font-medium">{userData.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">NHS Number</label>
            <p className="font-medium">{userData.nhsNumber}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Date of Birth</label>
            <p className="font-medium">{userData.dateOfBirth}</p>
          </div>
        </div>
      </section>

      <section className="card border-2 border-slate-200
                          mx-auto max-w-2xl p-5 space-y-4">
        <h2 className="text-2xl font-bold">
          Contact Information
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                type="email"
                aria-label="email field"
                className=" input border-gray-500 focus:outline-gray-400
                            bg-inherit w-full"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Phone Number</label>
              <input
                type="tel"
                aria-label="phone number field"
                className=" input border-gray-500 focus:outline-gray-400
                            bg-inherit w-full"
                name="phone"
                pattern="^(0|\+44)\d{10}$"
                value={userData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Address</label>
              <input
                type="text"
                aria-label="address field"
                className=" input border-gray-500 focus:outline-gray-400
                            bg-inherit w-full"
                name="address"
                value={userData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className=" btn border-0
                        mt-6 w-full
                        bg-[var(--phr)] bg-disabled"
            disabled={isInfoUpdating}
          >
            {isInfoUpdating ? (
              <>
                Updating Information<span className="loading loading-dots loading-xs"></span>
              </>
            ) : (
              "Update Information"
            )}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Notice!</h2>
        <p className="text-gray-700 mb-4">
          The mock personal information is stored as cookie on your device. This data will be automatically
          deleted after the time period you select using the timer in the bottom right corner of the page.
        </p>
        <p className="text-gray-700">
          If you clear your browser cookies, this information will be lost.
        </p>
      </section>
      <Timer />
    </main>
  );
}