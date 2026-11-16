# DNIC — Dot Net Interview Community

A premium editorial Next.js website for Dot Net Interview Community (dnic.in) and author Nirbhay Chauhan.

## Implemented pages
- Homepage, About DNIC, About Nirbhay Chauhan
- Book library and eight *provisional* book pages
- Two campaign landing pages (six developer books / two QA & testing books)
- Professional resume service page with ₹1,000 / ₹2,000 / ₹3,000 plans
- Six-step resume assessment, server-side pricing, one email automation
- Videos, community, reviews placeholder, FAQs, contact and legal draft pages
- Sitemap, metadata, preview robots controls, responsive editorial design

## Run locally
```bash
npm install
npm run dev
```
Use Node.js 22 for development and deployment.

## Deploy on Hostinger
This is a **Next.js/Node.js web app**, **not a static HTML deployment**.

1. Hostinger hPanel → Websites → select or create a **Node.js Web App**.
2. Choose GitHub repository `avadhbajaj09/dnic-website` and branch `main`.
3. Set root to the repository root (`./`) and select **Next.js** as the framework.
4. Use Node.js **22**, build command `npm run build`, and start command `npm run start` if prompted.
5. Redeploy. Auto-deployment from GitHub can be left enabled.

If the initial Hostinger website was accidentally deployed as a **static** website before `package.json` existed, reconfigure it as Node.js or create a fresh Node.js Web App pointing to the repository. Don't point the public domain to a broken deployment.

## Resume email configuration
Add these to Hostinger's secure **Environment Variables**, not to GitHub:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Transactional email service API key |
| `RESUME_FROM_EMAIL` | Verified sender e.g. `DNIC <hello@dnic.in>` |
| `RESUME_TO_EMAIL` | Nirbhay ji's inbox for enquiries/replies |
| `PAYMENT_QR_URL` | HTTPS URL of official approved payment QR image |
| `NEXT_PUBLIC_SITE_LIVE` | Keep `false` for preview; set `true` only after launch approval |

The form will intentionally reject enquiries with a configuration message until **all four** private email/payment variables are configured. It does not charge anyone or verify payments.

Submission triggers **one workflow with two email recipients**:
- Candidate: recommended package, amount, payment QR and document checklist.
- Nirbhay ji: candidate details, answers, recommended package and quoted fee.

After the initial email, Nirbhay ji personally verifies payment and manages resume documents, revisions and delivery. No dashboard, account system, database or payment gateway is used.

## Before production launch
- Replace *all* provisional book covers, confirm eight exact Amazon titles, and insert each product's Amazon link.
- Approve founder bio/portrait and source-approved testimonials.
- Approve final service scope, turnaround, refund and privacy policies.
- Add approved QR and official email settings; test end-to-end email delivery.
- Publish and verify selected YouTube videos.
- Review accessibility, privacy, tracking consent, SEO metadata and ad conversions.
- Switch `NEXT_PUBLIC_SITE_LIVE` to `true` when ready for indexing.

All pages currently use original typographic placeholder book artwork to avoid inventing official covers or reviews.
