const User = require("../models/User");

// Fetch user data based on userId from the URL parameter
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user data:", err.message);
    res.status(500).send("Server error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    console.log("Updating user ID:", req.params.userId, "with data:", req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { firstName, lastName, phone, address },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      console.log("User not found with ID:", req.params.userId);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User updated successfully:", updatedUser);
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.error("Error updating user data:", err.message);
    res.status(500).send("Server error");
  }
};
