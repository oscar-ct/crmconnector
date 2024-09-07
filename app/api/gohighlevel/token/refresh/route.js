import axios from "axios";
import qs from "qs";
import connectDB from "@/lib/connectDB";
import Credentials from "@/models/credentials";

export async function GET (req) {
    await connectDB();
    const credentials = await Credentials.findById("66dad17f465d12d0ab01513d");
    const data = qs.stringify({
        'client_id': process.env.GO_HIGHLEVEL_CLIENT_ID,
        'client_secret': process.env.GO_HIGHLEVEL_CLIENT_SECRET,
        'grant_type': 'refresh_token',
        'refresh_token': credentials.goHighLevelRefreshToken,
        'user_type': 'Location',
        'redirect_uri': 'http://localhost:3000/oauth/callback'
    });
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://services.leadconnectorhq.com/oauth/token',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
    const response = await axios.request(config).catch(err => {});
    console.log(response.data)
    credentials.goHighLevelAuthToken = response?.data.access_token
    credentials.goHighLevelRefreshToken = response?.data.refresh_token
    const updatedCredentials = await credentials.save();
    return Response.json(updatedCredentials);
}