import clsx from 'clsx';

interface Props {
  text: string;
  color?: 'green' | 'red' | 'yellow' | 'blue' | 'gray';
}

export default function Badge({ text, color = 'green' }: Props) {
  const styles = {
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    blue: 'bg-blue-100 text-blue-700',
    gray: 'bg-slate-100 text-slate-700',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        styles[color]
      )}
    >
      {text}
    </span>
  );
}