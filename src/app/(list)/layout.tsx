export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
  params: { page: string };
}) {
  return (
    <>
      <h1 className="text-center text-5xl font-extrabold text-white sm:text-[5rem]">
        Hacker<b className="text-sky-400">News</b>
      </h1>
      {children}
    </>
  );
}
