import { NextFont } from 'next/dist/compiled/@next/font'

import twclsx from '@/libs/twclsx'

interface FooterProps {
  font: NextFont
}

export default function Footer({ font }: FooterProps) {
  return <footer className={twclsx(`${font.className}`, 'oby-footer h-[600px] bg-oby-E4FBDB')}>ABC</footer>
}
