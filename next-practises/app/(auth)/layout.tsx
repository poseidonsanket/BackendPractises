export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="p-4 border-b-4">20% off</div>
      {children}
    </div>
  );
}
