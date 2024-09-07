"use client"

import {useEffect, useState} from "react";
import MessageItem from "@/components/MessageItem";

const fetchGoHighLevelToken = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/gohighlevel/token`);
        if (!res.ok) {
            const message = await res.text();
            console.log(message);
            return null;
        }
        return res.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}

const fetchMessages = async (token) => {
    const url = `https://services.leadconnectorhq.com/conversations/search?locationId=${process.env.NEXT_PUBLIC_GO_HIGHLEVEL_LOCATION_ID}`;
    const options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`, Version: '2021-04-15', Accept: 'application/json'}
    };
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            const message = await res.text();
            console.log(message);
            return null;
        }
        return res.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}

const MessagesPage = () => {

    const [messages, setMessages] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessagesData = async () => {
            try {
                const auth = await fetchGoHighLevelToken();
                if (auth) {
                    const data = await fetchMessages(auth.goHighLevelAuthToken);
                    setMessages(data.conversations);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        if (messages === null) fetchMessagesData();
    }, [messages]);


    if (!loading) return (
        <div className="overflow-x-auto pt-8">
            <table className="table">
                <thead>
                    <tr>
                        <th>Lead</th>
                        <th>Recent Conversation</th>
                        <th className={"text-center"}>Status/Action</th>
                    </tr>
                </thead>
                <tbody>

                {
                    messages?.length > 0 ? (
                        messages.map((data, index) => {
                            return <MessageItem data={data} key={index}/>
                        })
                    ) : (
                        <tr><td>No Data</td></tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default MessagesPage;