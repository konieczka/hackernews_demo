export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
  params: { page: string };
}) {
  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        HackerNews
      </h1>
      {children}
    </>
  );
}
