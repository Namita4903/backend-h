const User = require("../../models/user.model");

const getUsersByDoctor = async (req, res) => {
  try {
    const doctorEmail = req.query.doctorEmail;

    const users = await User.aggregate([
      {
        $match: {
          allowedDoctors: {
            $elemMatch: { email: doctorEmail }
          }
        }
      },
      {
        $project: {
          username: 1,
          email: 1,
          allowedDoctors: {
            $filter: {
              input: "$allowedDoctors",
              as: "doctor",
              cond: { $eq: ["$$doctor.email", doctorEmail] }
            }
          }
        }
      }
    ]);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = getUsersByDoctor;
