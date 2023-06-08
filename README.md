## Calendar App

Create a simple next.js or remix website where you can create a calendar that shows
public holidays based on a location. The user should be able to manually input their
location if access to their location isn’t granted via the browser. The user should
then be able to select any year (past or present) and the site should generate a
calendar where the user can easily see the public holidays


## Requirements

 - Should use either Remix or Next.js for serving the frontend
 - Should have at least one unit test
 - Users should be able to select a country and a year and a full calendar as seen above should be displayed.
 - Holidays should be highlighted on the calendar.

## NTH

- Frontend written in Typescript
- Using Tailwind CSS + SASS for styling

## Resources

 - https://date.nager.at/api/v2/publicholidays/2022/US
 - https://gist.github.com/anubhavshrimal/75f6183458db8c453306f93521e93d37

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
