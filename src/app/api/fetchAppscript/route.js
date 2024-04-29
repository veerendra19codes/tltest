import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const {url} = await req.json();
        // console.log("url in route.js:", url);

        const response = await fetch(url);
        const data = await response.json();
        // console.log("data in route.js:", data);
        return NextResponse.json(data, {status: 201});
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Error fetching data" }, {status: 500});
    }
}
