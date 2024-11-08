import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              disabled
              className="input-field"
            />
          </div>
          <form onSubmit={handleSave}>
            {/* Input fields for firstName, lastName, phone, and address */}
            <button type="submit" className="btn-save">
              Save
            </button>
            {message && <p>{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Account;
