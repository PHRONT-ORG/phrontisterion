interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const form = await context.request.formData();

  // Optional bot honeypot: add a hidden field named "website" to your form.
  const honeypot = String(form.get("website") ?? "");
  if (honeypot) return new Response("OK", { status: 200 });

  const name = String(form.get("name") ?? "").slice(0, 200);
  const contact = String(form.get("contact") ?? "").slice(0, 200);
  const parable = String(form.get("parable") ?? "").slice(0, 20);
  const message = String(form.get("message") ?? "").slice(0, 5000);

  if (!contact || !parable || !message) {
    return new Response("Missing required fields.", { status: 400 });
  }

  await context.env.DB.prepare(
    `INSERT INTO inquiries (name, contact, parable, message, created_at)
     VALUES (?, ?, ?, ?, datetime('now'))`
  )
    .bind(name, contact, parable, message)
    .run();

  // Simple success response (you can change this to a redirect later)
  return new Response("Received. If a reply is appropriate, we will respond.", {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
