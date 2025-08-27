# Artist Portfolio of Daniel Herr

A minimalistic artist portfolio built with Next.js, Contentful CMS, and Netlify Forms.

## Features

- **Contentful CMS**: Managed portfolio content through Contentful
- **Netlify Forms**: Simple contact form that sends emails without additional setup
- **Responsive**: Works on all devices
- **Fast**: Built with Next.js for optimal performance

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up Contentful:**
   - Create a Contentful account and space
   - Add environment variables to `.env`:
     ```
     CONTENTFUL_SPACE_ID=your_space_id_here
     CONTENTFUL_ACCESS_TOKEN=your_access_token_here
     ```

3. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Build command: `pnpm build`
   - Publish directory: `.next`

## Customization

- Update the title and description in `src/app/layout.tsx`
- Modify the hero text in `src/app/page.tsx`
- Customize styling in `src/app/globals.css`

## Netlify Forms

The contact form uses Netlify Forms and will automatically send emails to your Netlify account email. You can configure email notifications in your Netlify dashboard.

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
