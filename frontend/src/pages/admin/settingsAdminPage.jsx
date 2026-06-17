import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadFile from "../../utils/mediaUpload";
import { FaUserEdit } from "react-icons/fa";
import Loader from "../../components/loader";

export default function SettingsAdminPage({ setAdminUser }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get(import.meta.env.VITE_API_URL + "/api/users/", {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setUser(res.data);
            setFirstName(res.data.firstName || "");
            setLastName(res.data.lastName || "");
            setPhone(res.data.phone || "");
            setPreviewUrl(res.data.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png");
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            toast.error("Failed to load profile data");
            setLoading(false);
        });
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const token = localStorage.getItem("token");

        try {
            let imageUrl = previewUrl;
            
            // Upload new image if selected
            if (imageFile) {
                toast.loading("Uploading image...", { id: "upload" });
                imageUrl = await uploadFile(imageFile);
                toast.dismiss("upload");
            }

            const data = {
                firstName,
                lastName,
                phone,
                image: imageUrl
            };

            const response = await axios.put(import.meta.env.VITE_API_URL + "/api/users/profile", data, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update local storage with new token
            localStorage.setItem("token", response.data.token);
            toast.success("Profile updated successfully!");
            
            // Update the parent AdminPage profile view
            if (setAdminUser) {
                setAdminUser(response.data.user);
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Failed to update profile");
            toast.dismiss("upload");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="w-full h-full p-8 overflow-y-auto">
            <h1 className="text-3xl font-bold text-pink-900 mb-8 flex items-center gap-3">
                <FaUserEdit /> Profile Settings
            </h1>

            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-8 max-w-2xl">
                <form onSubmit={handleSave} className="flex flex-col gap-6">
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative group cursor-pointer">
                            <img 
                                src={previewUrl} 
                                alt="Profile Preview" 
                                className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-md transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-sm font-semibold">Change</span>
                            </div>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Click the image to upload a new one</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">First Name</label>
                            <input 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full h-12 px-4 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Last Name</label>
                            <input 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full h-12 px-4 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                        <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-12 px-4 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Email (Cannot be changed)</label>
                        <input 
                            type="email" 
                            value={user?.email || ""}
                            className="w-full h-12 px-4 border border-gray-200 bg-gray-50 text-gray-500 rounded-xl cursor-not-allowed"
                            disabled
                        />
                    </div>

                    <div className="mt-4">
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="w-full md:w-auto px-8 h-12 bg-pink-600 text-white font-bold rounded-xl shadow-md hover:bg-pink-700 hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center cursor-pointer"
                        >
                            {saving ? "Saving Changes..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
