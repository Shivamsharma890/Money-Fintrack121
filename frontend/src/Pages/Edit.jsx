import React, { useState } from "react";
import axios from "axios";

const Edit = () => {
    const [step, setStep] = useState("auth");
    const [userid, setUserid] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        age: "",
        work_email: "",
    });

    // --------------------------User-Authenticate-----------------------------
    const handleAuth = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                userid,
                password,
            });

            if (res.data?.user) {
                setForm({
                    first_name: res.data.user.first_name,
                    last_name: res.data.user.last_name,
                    phone: res.data.user.phone,
                    address: res.data.user.address,
                    age: res.data.user.age,
                    work_email: res.data.user.work_email,
                });

                setStep("edit");
            } else {
                alert("❌ User not found!");
            }
        } catch (err) {
            alert("❌ Authentication failed!");
            console.log(err);
        }
    };

    // ----------------------Save-Updated-Details------------------------------
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/Editdetail`, {
                userid,
                password,
                ...form,
            });

            alert(res.data.message);
            setStep("success");
        } catch (err) {
            alert("❌ Update failed!");
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleContactChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setContact(value);


            setForm({ ...form, phone: value });
        }
    };

    // -------------------------UserID-Password-Authentication------------------------------
    if (step === "auth") {
        return (
            <div className="flex items-center justify-center py-10 bg-gray-50">
                <div className="bg-blue-50 p-8 rounded-xl shadow-lg w-full max-w-4xl border border-blue-300">
                    <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
                        🔐 Authenticate to Edit Account
                    </h2>

                    <form onSubmit={handleAuth} className="space-y-5">
                        <input
                            type="text"
                            placeholder="Enter User ID"
                            className="p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
                            value={userid}
                            onChange={(e) => setUserid(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">Authenticate</button>
                    </form>
                </div>
            </div>
        );
    }

    // -------------------------Edit-Details----------------------------
    if (step === "edit") {
        return (
            <div className="flex items-center justify-center py-10 bg-gray-100">

                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
                    <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">✏️ Update Account Details</h2>
                    <form
                        onSubmit={handleUpdate}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                        <input
                            name="first_name"
                            className="p-3 border rounded-md"
                            placeholder="First Name"
                            value={form.first_name}
                            onChange={handleChange}
                        />

                        <input
                            name="last_name"
                            className="p-3 border rounded-md"
                            placeholder="Last Name"
                            value={form.last_name}
                            onChange={handleChange}
                        />

                        <input
                            name="phone"
                            className="p-3 border rounded-md"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleContactChange}
                            inputMode='numeric'
                            maxLength="10"
                        />

                        <input
                            name="address"
                            className="p-3 border rounded-md"
                            placeholder="Address"
                            value={form.address}
                            onChange={handleChange}
                        />

                        <input
                            name="age"
                            type="number"
                            className="p-3 border rounded-md"
                            placeholder="Age"
                            value={form.age}
                            onChange={handleChange}
                        />

                        <input
                            name="work_email"
                            type="email"
                            className="p-3 border rounded-md"
                            placeholder="Work Email"
                            value={form.work_email}
                            onChange={handleChange}
                        />

                        <button type="submit" className="col-span-1 md:col-span-2 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">Save Changes</button>
                    </form>
                </div>
            </div>
        );
    }

    // -----------------Updated-Details----------------------
    if (step === "success") {
        return (
            <div className="flex items-center justify-center py-10 bg-gray-100">
                <div className="bg-green-50 p-8 rounded-xl shadow-lg w-full max-w-3xl border border-green-300 text-center">
                    <h1 className="text-3xl font-bold text-green-700 mb-4">✅ Account Updated Successfully</h1>
                    <button onClick={() => setStep("auth")} className="py-3 px-6 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">Edit Another Account</button>
                </div>
            </div>
        );
    }

    return null;
};

export default Edit;