# PHRONTISTERION starter (Cloudflare Pages)

This repo is a minimal static site for Cloudflare Pages.

## Deploy (no framework)
1. Push this repo to GitHub
2. Cloudflare Dashboard → Pages → Create a project → Connect to GitHub repo
3. Framework preset: None
4. Build command: (blank)
5. Build output directory: public

## Optional: inquiry endpoint
If you want the form on /parables/ to work, add a Pages Function at:
functions/api/inquiry.ts

The included function is a stub (it does not store inquiries).
