interface Props {
  type: string;
  title: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInputArea({
  type,
  title,
  name,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <>
      <label className='text-sm font-bold text-gray-700 tracking-wide'>
        {title}
      </label>
      <input
        className='w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-amber-400'
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}
