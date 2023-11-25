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
      className={`btn btn-ghost btn-circle ${
        type === 'avatar' && 'avatar mx-3'
      }`}
      onClick={handleToggleDropdown}
    >
      {children}
    </button>
  );
}