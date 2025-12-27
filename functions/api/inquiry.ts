export const onRequestPost: PagesFunction = async (ctx) => {
  const form = await ctx.request.formData();
  const name = String(form.get("name") ?? "").slice(0, 200);
  const contact = String(form.get("contact") ?? "").slice(0, 200);
  const parable = String(form.get("parable") ?? "").slice(0, 20);
  const message = String(form.get("message") ?? "").slice(0, 5000);

  if (!contact || !parable || !message) {
    return new Response("Missing required fields.", { status: 400 });
  }

  // Minimal stub: acknowledge receipt only.
  const payload = { name, contact, parable, message, received_at: new Date().toISOString() };

  return new Response(
    "Received. If a reply is appropriate, we will respond.\n\n" +
      "NOTE: This endpoint currently does not store messages.\n" +
      JSON.stringify(payload, null, 2),
    { status: 200, headers: { "content-type": "text/plain; charset=utf-8" } }
  );
};
