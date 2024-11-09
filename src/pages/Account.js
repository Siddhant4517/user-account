import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode correctly

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).userId : null;

  useEffect(() => {
    if (!userId) {
      setMessage("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for ID:", userId);
        const response = await axios.get(
          `http://localhost:5000/api/account/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { firstName, lastName, username, email, phone, address } =
          response.data;
        setFirstName(firstName || "");
        setLastName(lastName || "");
        setUsername(username || "");
        setEmail(email || "");
        setPhone(phone || "");
        setAddress(address || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/account/${userId}`,
        { firstName, lastName, phone, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message || "Account updated successfully!");
    } catch (error) {
      console.error("Error updating account:", error);
      setMessage("Failed to update account.");
    }
  };

  if (!userId) return <p>{message}</p>;

  return (
    <div className="flex flex-col items-center py-12 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Account Settings
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-200 border rounded-lg w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="bg-gray-200 border rounded-lg w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border rounded-lg w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border rounded-lg w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded-lg w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border rounded-lg w-full p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Save
            </button>
            {message && (
              <p className="mt-4 text-center text-green-500">{message}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Account;
