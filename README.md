# michael-adeleke.com

Personal academic site — research, publications, teaching portfolio, CV.
Next.js 15 static export, deployed on Vercel.

```bash
npm install
npm run dev      # localhost:3000
npm run build    # static export to ./out
```

See `CLAUDE.md` for architecture notes and `PROJECT_BRIEF.md` for the design
brief.

## Before launch

- [ ] Add a headshot at `public/headshot.jpg` and swap the placeholder in `app/about/page.tsx`
- [ ] Add gallery photos to `public/gallery/` and describe them in `content/gallery.ts`
- [ ] Fill in GitHub, Google Scholar, and ORCID URLs in `lib/site.ts` (empty ones are hidden, not broken)
- [ ] Replace the example teaching entry with real AHE 603 portfolio entries
- [ ] Revise `content/teaching-philosophy.mdx` into your own voice
- [ ] Confirm the contact email in `lib/site.ts` is the one you want public

## Deployment

1. Push the repo to GitHub, then import it into Vercel. Framework preset is
   detected as Next.js; no configuration is needed.
2. In the Vercel project, add both `michael-adeleke.com` and
   `www.michael-adeleke.com`, and set the apex as primary.
3. In GoDaddy DNS, keeping the domain registered there:
   - `A` record, host `@`, pointing to the apex IP Vercel shows when the domain
     is added
   - `CNAME` record, host `www`, pointing to the target Vercel provides
4. Propagation is usually under an hour. Verify both the apex and `www` resolve
   and that `www` redirects to the apex.

Do not transfer the domain; only DNS moves.
