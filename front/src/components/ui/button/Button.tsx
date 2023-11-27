type Props = {
  style?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Button({ style, onClick, children }: Props) {
  return (
    <button className={`btn ${style}`} {...(onClick && { onClick: onClick })}>
      {children}
    </button>
  );
}
