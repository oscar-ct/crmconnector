import mongoose from "mongoose";

const Credentials = mongoose.Schema(
    {
        goHighLevelCode: String,
        goHighLevelAuthToken: String,
        goHighLevelRefreshToken: String
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Credentials || mongoose.model("Credentials", Credentials);