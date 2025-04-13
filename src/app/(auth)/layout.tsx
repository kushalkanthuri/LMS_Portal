export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="size-full flex flex-col items-center justify-center">
      {children}
    </main>
  );
}
