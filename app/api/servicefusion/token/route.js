import connectDB from "@/lib/connectDB";
import Credentials from "@/models/credentials";

export async function GET (req, res) {
    await connectDB();
    const credentials = await Credentials.findById("66dad17f465d12d0ab01513d");
    return Response.json(credentials)
    // return Response.json({
    //     serviceFusionAuthToken: credentials.serviceFusionAuthToken,
    //     serviceFusionRefreshToken: credentials.serviceFusionRefreshToken,
    // });
}