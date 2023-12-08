type Props = {
  children: React.ReactNode;
  type?: string;
  handleToggleDropdown?: () => void;
};

export default function NavbarButton({
  children,
  type,
  handleToggleDropdown,
}: Props) {
  return (
    <button
      tabIndex={0}
      className={`btn btn-ghost btn-circle hover:bg-amber-500 hover:text-white ${
        type === 'avatar' && 'avatar ml-1 mr-2'
      }`}
      onClick={handleToggleDropdown}
    >
      {children}
    </button>
  );
}
