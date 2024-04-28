const { Feedback } = require("../models/FeedbackModel.js");

exports.addFeedback = async (req, res) => {
  const { user_id, mood, rating, checkbox, message } = req.body;
  if (!user_id || !mood || !rating || !checkbox) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const feedback = await Feedback.create({
      user_id,
      mood, 
      rating,
      checkbox,
      message,
    });
    res.status(200).json({ message: "Feedback added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};
