import moongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new moongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return;
    this.password=await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = function (candidate){
    return bcrypt.compare(candidate, this.password);
}

const User = moongoose.model("User", userSchema);

export default User;