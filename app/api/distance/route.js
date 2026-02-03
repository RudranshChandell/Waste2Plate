// app/api/distance/route.js
export async function POST(req) {
	const body = await req.json();
	const { origin, destination } = body;

	const apiKey = process.env.GOOGLE_MAPS_API_KEY;

	if (!apiKey) {
		return new Response(JSON.stringify({ error: "Configuration Error: Google Maps API Key missing" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
	}

	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data?.rows?.[0]?.elements?.[0]?.status === "OK") {
			return new Response(
				JSON.stringify({
					distance: data.rows[0].elements[0].distance.text,
				}),
				{ status: 200 }
			);
		} else {
			// Log the actual error from Google for debugging
			console.error("Google Maps API Error:", JSON.stringify(data));
			return new Response(JSON.stringify({ error: "Failed to calculate distance", details: data }), { status: 500, headers: { 'Content-Type': 'application/json' } });
		}
	} catch (error) {
		console.error("Server error:", error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
	}
}
