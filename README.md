# DNIC — Dot Net Interview Community

A premium responsive author/community website for **dnic.in**, developed in Next.js, React and CSS. The first development preview uses Hostinger's temporary `hostingersite.com` domain.

## What is included

- DNIC homepage, About DNIC, About Nirbhay, 8 book detail pages, Books, Videos, Community, Reviews, FAQ, Contact.
- Dedicated Meta Ads landing pages for six developer titles and two QA/testing titles.
- Three resume plans: Career Starter ₹1,000; Career Growth ₹2,000; Career Leadership ₹3,000.
- Six-screen resume questionnaire with server-validated pricing and one transaction workflow that emails the candidate and Nirbhay. **No admin dashboard.**
- Draft legal pages, placeholder book cover illustrations, XML sitemap and no-index robots configuration for temporary domain.

## Develop locally

Requires Node.js 22.

```bash
npm install
npm run dev
# visit http://localhost:3000
```

## Deploy through Hostinger

1. Import `avadhbajaj09/dnic-website` as a **Node.js / Next.js web application** (not as a static site).
2. Choose `main`, root directory `./`, Node.js `22`, package manager `npm`, build `npm run build`, start `npm run start`.
3. The file `package.json` must sit at the repository root. Allow Hostinger to auto-detect Next.js.
4. Check **Deployments → Logs**, and only then visit `https://purple-skunk-231017.hostingersite.com`.
5. Keep production indexing disabled until the final domain is connected and content has been approved.

See [Hostinger's official Node.js application guide](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/).

## Enquiry emails

There is **one** POST endpoint: `/api/resume-enquiry`. It validates answers and price and uses Resend's batch send API for two transactional emails on one trigger. No database or customer/admin login.

Configure these in Hostinger's server-side environment variables (not GitHub):

- `RESEND_API_KEY` — Resend API key for a **verified DNIC sending domain**.
- `RESUME_FROM_EMAIL` — verified sender, e.g. `DNIC <hello@dnic.in>` (example only; not a real account).
- `RESUME_NOTIFY_EMAIL` — Nirbhay's recipient mailbox.
- `RESUME_REPLY_TO` — official mailbox for client replies.
- `PAYMENT_QR_URL` — an HTTPS URL for the owner-approved payment QR image.

The endpoint returns 503 rather than pretending success if these are absent. No payment is confirmed automatically. Nirbhay verifies transactions, collects documents, creates and delivers resumes manually.

## Before launch

- Replace all eight **illustrative** covers with approved official cover images and confirm edition-specific Amazon product links. Current fallback links only to Nirbhay's Amazon author store.
- Verify biographical facts and add Nirbhay's real photo.
- Obtain permission and sources for real testimonials; the site deliberately has no invented reviews.
- Approve delivery terms, revisions, refund policy, payment QR and privacy policy.
- Configure sending domain, test delivery and anti-spam protection for paid operation.
- Check mobile layouts, analytics/privacy consent, SEO titles/schema, outlinks and the official YouTube videos.
- Change `NEXT_PUBLIC_SITE_URL` to `https://dnic.in`, enable `NEXT_PUBLIC_INDEX_LIVE=true` only after launch, connect the final domain, and submit the sitemap to Google Search Console.

**Important:** The public preview is a design-and-functionality scaffold. The questionnaire cannot send real mail without the environment variables. Avoid using the QR before verifying the recipient.
