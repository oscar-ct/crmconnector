import connectDB from "@/lib/connectDB";
import Credentials from "@/models/credentials";

export async function GET (req) {
    await connectDB();
    const credentials = await Credentials.findById("66dad17f465d12d0ab01513d");
    const res = await fetch("https://api.servicefusion.com/oauth/access_token", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "grant_type": "refresh_token",
            "refresh_token": credentials.serviceFusionRefreshToken
        }),
    });
    const data = await res.json();
    credentials.serviceFusionAuthToken = data.access_token
    credentials.serviceFusionRefreshToken = data.refresh_token
    const updatedCredentials = await credentials.save();
    return Response.json(updatedCredentials);

}