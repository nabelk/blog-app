const prisma = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await prisma.findAdmin(email);

  if (!admin) return res.status(400).json({ msg: "Invalid email." });

  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) return res.status(400).json({ msg: "Invalid password." });

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1hr",
    }
  );

  res.json({ token });
};

module.exports = {
  login,
};
