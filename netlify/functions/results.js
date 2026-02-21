export default async (req, context) => {
  const loc = (req.queryStringParameters?.loc || "practice").toLowerCase().trim();

  const APPS_SCRIPT =
    "https://script.google.com/macros/s/AKfycbxaqG_jSHbLx9R3oaOsTxl5qYIF7ZEVmY9JC-HX-Nl7wVfyubvPzZG7ozuhkegfSsak/exec";

  const url = `${APPS_SCRIPT}?loc=${encodeURIComponent(loc)}`;

  try {
    const r = await fetch(url, { redirect: "follow" });
    const text = await r.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: String(err) }),
    };
  }
};