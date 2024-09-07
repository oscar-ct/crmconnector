"use client"

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import { GiCheckMark } from "react-icons/gi";

const fetchGoHighLevelConnection = async (token) => {
  const url = `https://services.leadconnectorhq.com/conversations/search?locationId=${process.env.NEXT_PUBLIC_GO_HIGHLEVEL_LOCATION_ID}&limit=1`;
  const options = {
    method: 'GET',
    headers: {Authorization: `Bearer ${token}`, Version: '2021-04-15', Accept: 'application/json'}
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const resObj = await res.json();
      if (resObj.message === "Invalid JWT" && resObj.error === "Unauthorized" && resObj.statusCode === 401) {
        return "requires refresh";
      }
      return null;
    }
    return res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}


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

const fetchGoHighLevelRefresh = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/gohighlevel/token/refresh`);
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



const fetchServiceFusionConnection = async (token) => {
  const url = `https://api.servicefusion.com/v1/customers?per-page=1&access_token=${token}`;
  const options = {
    method: 'GET',
    headers: {Accept: 'application/json'}
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const resObj = await res.json();
      if (resObj.message === "Invalid JWT" && resObj.error === "Unauthorized" && resObj.statusCode === 401) {
        return "requires refresh";
      }
      return null;
    }
    return res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

const fetchServiceFusionToken = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/servicefusion/token`);
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

const fetchServiceFusionRefresh = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/servicefusion/token/refresh`);
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


export default function Home() {

  const [goHighLevelLoading, setGoHighLevelLoading] = useState(true);
  const [serviceFusionLoading, setServiceFusionLoading] = useState(true);

  useEffect(() => {
    const fetchGHLConnection = async () => {
      try {
        const auth = await fetchGoHighLevelToken();
        if (auth) {
          const data = await fetchGoHighLevelConnection(auth.goHighLevelAuthToken);
          if (typeof data === 'string' && data === "requires refresh") {
            const refresh = await fetchGoHighLevelRefresh();
            const newData = await fetchGoHighLevelConnection(refresh.access_token);
            if (typeof newData !== 'string' && newData !== null) setGoHighLevelLoading(false);
          }
          if (typeof data !== 'string' && data !== null) setGoHighLevelLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (goHighLevelLoading === true) fetchGHLConnection();
  }, [goHighLevelLoading]);

  useEffect(() => {
    const fetchGHLConnection2 = async () => {
      try {
        const auth = await fetchServiceFusionToken();
        if (auth) {
          const data = await fetchServiceFusionConnection(auth.serviceFusionAuthToken);
          console.log(data)
          if (typeof data === 'string' && data === "requires refresh") {
            const refresh = await fetchServiceFusionRefresh();
            const newData = await fetchServiceFusionConnection(refresh.access_token);
            if (typeof newData !== 'string' && newData !== null) setGoHighLevelLoading(false);
          }
          if (typeof data !== 'string' && data !== null) setGoHighLevelLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (serviceFusionLoading === true) fetchGHLConnection2();
  }, [serviceFusionLoading]);


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/images/susyQCleaningServices.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <div className="flex flex-col items-center sm:w-80">
            <div className={"flex items center gap-4 h-8"}>
              <span>{goHighLevelLoading ? "Connecting" : "Connected"} to{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                gohighlevel.com
              </code>
            </span>
              {
                goHighLevelLoading ? <span className="loading loading-spinner"></span> : (
                    <GiCheckMark size={20} fill={"limegreen"}/>
                )
              }
            </div>
            <div className={"flex items center gap-4 h-8"}>
              <span>{serviceFusionLoading ? "Connecting" : "Connected"} to{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                servicefusion.com
              </code>
            </span>
              {
                serviceFusionLoading ? <span className="loading loading-spinner"></span> : (
                    <GiCheckMark size={20} fill={"limegreen"}/>
                )
              }
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
              className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] h-10 sm:h-12 w-40"
          >
            {
              goHighLevelLoading || serviceFusionLoading ? (
                  <div
                      className={"rounded-full h-full px-4 sm:px-5 flex items-center justify-center text-sm sm:text-base"}>
                    <span className="loading loading-spinner"></span>
                  </div>
              ) : (
                  <Link className={"rounded-full h-full px-4 sm:px-5 flex items-center justify-center text-sm sm:text-base"} href={"/messages"}>
                    View Messages
                  </Link>
              )
            }
          </button>
        </div>
      </main>
    </div>
  );
}
