import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://www.example.com';
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    `Sitemap: ${baseUrl.replace(/\/$/, '')}/sitemap.xml`,
    '',
  ];
  res.setHeader('Content-Type', 'text/plain');
  res.write(lines.join('\n'));
  res.end();
  return { props: {} };
};

export default function RobotsTxt() { return null; }

