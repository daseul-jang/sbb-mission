type Props = {
  sectionType?: string;
  children: React.ReactNode;
};

export default function DetailSection({ sectionType, children }: Props) {
  return (
    <div
      className={`w-full flex flex-col ${
        sectionType ? 'min-h-[400px]' : 'h-fit'
      }`}
    >
      {children}
    </div>
  );
}
