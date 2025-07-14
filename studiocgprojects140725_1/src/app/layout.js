export const metadata = {
  title: 'R3 Controller App',
  description: 'Control R³ Space Engine scenes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
