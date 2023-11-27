export default function TextCenterArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex justify-center items-center h-[698px]'>{children}</div>
  );
}
