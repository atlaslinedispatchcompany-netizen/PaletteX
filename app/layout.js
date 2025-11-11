import '../styles/globals.css';
export const metadata = {
  title: 'PaletteX – Where Artists and Collectors Connect',
  description: 'An online art marketplace for creative minds.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}