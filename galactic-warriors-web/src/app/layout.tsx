import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/contexts/WalletContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Galactic Warriors Packs - NFT Collection',
  description: 'Discover, collect, and trade unique galactic warrior NFTs on the Aptos blockchain',
  icons: {
    icon: '/spacedev-logo.png',
    shortcut: '/spacedev-logo.png',
    apple: '/spacedev-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  )
}
