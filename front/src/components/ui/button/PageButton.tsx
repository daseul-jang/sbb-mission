type BtnType = 'start' | 'end' | 'next' | 'prev';

type Props = {
  btnType?: BtnType | undefined;
  cond: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

export default function PageButton({
  btnType,
  cond,
  children,
  onClick,
}: Props) {
  return (
    <button
      className={getStyle(btnType, cond)}
      onClick={onClick}
      {...(cond && { disabled: true })}
    >
      {children}
    </button>
  );
}

const getStyle = (btnType: BtnType | undefined, cond: boolean): string => {
  const base = `w-full text-base text-gray-600 border hover:bg-gray-100`;
  const typeStyle =
    btnType === 'start' || btnType === 'end'
      ? 'p-2 lg:p-3'
      : 'px-3 py-1 lg:px-3 lg:py-2';
  const condStyle = cond ? 'bg-gray-100' : 'bg-white';

  switch (btnType) {
    case 'start':
      return `${base} ${typeStyle} ${condStyle} rounded-l-xl`;
    case 'end':
      return `${base} ${typeStyle} ${condStyle} rounded-r-xl`;
    default:
      return `${base} ${typeStyle} ${condStyle}`;
  }
};
