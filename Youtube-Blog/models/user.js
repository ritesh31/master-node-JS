const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Executed before user save
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  // Convert user normal password to hash-password
  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found !");

  const salt = user.salt;
  const hashPassword = user.password;

  const userProvidedHashPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashPassword !== userProvidedHashPassword)
    throw new Error("Incorrect email or password");

  const token = createTokenForUser(user);
  return token;
});

const User = model("user", userSchema);

module.exports = User;
