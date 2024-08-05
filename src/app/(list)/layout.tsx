export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
  params: { page: string };
}) {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          HackerNews
        </h1>
        {children}
      </div>
    </main>
  );
}
