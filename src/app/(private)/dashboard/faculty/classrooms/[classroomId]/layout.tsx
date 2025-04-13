import DetailsSidebar from "./_components/details-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-full flex">
      <DetailsSidebar />
      {children}
    </div>
  );
}
