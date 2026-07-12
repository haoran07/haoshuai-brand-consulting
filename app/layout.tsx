import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: '郝帅｜个人品牌顾问', description: '帮自由职业者和小商家打造专业、清晰、能带来生意的个人品牌。' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
