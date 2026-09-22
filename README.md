# Assignment With Me — Website

A premium Instagram-inspired website for Assignment With Me.

## What is included

- Responsive premium/creative landing page
- Instagram-inspired profile hero
- Service catalogue
- Portfolio-style work section
- Order/brief form
- SEO metadata + JSON-LD
- Instagram + WhatsApp links
- WhatsApp-first project enquiry flow
- Quote-before-payment customer journey
- Reference-file picker with WhatsApp follow-up
- Mobile-friendly design

## Run locally

1. Install Node.js 18+.
2. Open this folder in a terminal.
3. Run:

```bash
npm install
```

4. Copy `.env.example` to `.env`.
5. Add your Razorpay test/live keys and WhatsApp number.
6. Run:

```bash
npm start
```

7. Open `http://localhost:3000`.

## Payment setup

The current customer journey is intentionally **quote first, payment second**. This avoids asking customers to guess a price before you have reviewed their brief. Razorpay can be connected after the quote/approval workflow is finalized.

## Important production improvements

Before going live, add:
- a database or order-management system
- email/WhatsApp order notifications
- an admin dashboard
- file upload storage (S3/Cloudinary/etc.)
- a proper quote/approval workflow
- rate limiting and server-side validation
- HTTPS and a real domain
- refund/cancellation and privacy policies
- Terms of Service
- final payment/fulfilment workflow appropriate to your business

## SEO

The site is already structured with relevant titles, descriptions, keywords, semantic headings, canonical metadata and JSON-LD. Search ranking cannot be guaranteed. To build organic visibility, connect the real domain to Google Search Console, create a sitemap/robots.txt, publish useful service pages, and consistently earn relevant links and mentions.

## Academic-use note

The service copy is intentionally framed around custom project and academic support. Make your customer terms clear about originality, permitted use, citations, and each institution's academic-integrity rules.


## Phase 2 changes

- Homepage now leads with the actual service proposition and clear order/WhatsApp actions.
- Service list expanded for school, college/university, business/corporate, creative and campaign work.
- Order form now captures audience, service, pages/slides, deadline, budget preference, references and detailed requirements.
- Form opens a pre-filled WhatsApp enquiry; reference files can be selected and then attached in WhatsApp.
- Removed the misleading 'pay immediately' flow from the enquiry stage.

## Current branding

- Brand: Assignment With Me ✨
- Instagram: https://www.instagram.com/assignmentwithmee/
- WhatsApp: +91 8103900543
- Bio: Assignments • Projects • PPTs • Creative Models / School | College | University | Business / Graphic Design • Notes • Presentations / Pan-India delivery
- Logo asset: `public/awm-logo.png`


## Visual redesign
The black theme has been removed. The UI now follows the AWM logo palette: soft pink, blush, cream and white, with rounded cards and an Instagram-friendly premium feel.
