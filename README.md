# Adrich

The website for [Adrich](https://www.adrich.com.bd), an advertising agency in Dhaka that's been making TV commercials, corporate films and campaigns since 1997.

Next.js 16, React 19 and Tailwind CSS 4. The page transitions and scroll reveals are Framer Motion, and the smooth scrolling is Lenis.

## Where things are

Almost all the copy lives in `data/site.ts`: services, case studies, client logos, the founder's story. If you're changing words on the site, that's usually the only file you need to touch.

Each case study under `app/work/[slug]` is rendered from that same data.

The contact form and the "Request Proposal" modal both go through one server action, `app/actions/inquiry.ts`. It checks the fields, quietly drops anything that fills in the hidden honeypot field, escapes the input and sends the email through [Resend](https://resend.com).

## Running it

```bash
bun install
cp .env.example .env.local
bun dev
```

Put a `RESEND_API_KEY` in `.env.local` if you want the forms to send. Without one the site runs fine, but a submission shows an error asking people to email instead.

On the host, set the same variables. To send from an adrich.com.bd address, verify the domain in Resend and set `RESEND_FROM_EMAIL` (for example `Adrich Website <website@adrich.com.bd>`). `CONTACT_TO_EMAIL` changes who gets the submissions.
