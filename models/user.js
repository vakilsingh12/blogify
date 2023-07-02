const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createToken } = require("../services/authentication");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      requierd: true,
      unique: true,
    },
    salt: {
      type: String,
      requierd: true,
    },
    password: {
      type: String,
      requierd: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/user.webp",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});
userSchema.static("matchPassword",async function(email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error("user not found!");
    const salt=user.salt; 
    const hashedPassword=user.password;
    const userProvidedpassword=createHmac("sha256",salt).update(password).digest("hex");
    if(hashedPassword!==userProvidedpassword){
        throw new Error('Incorrect Password!')
    }
    return createToken(user);
})
const User = model("user", userSchema);
module.exports = User;
