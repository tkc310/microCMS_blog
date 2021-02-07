import { format, formatISO } from 'date-fns';

type Props = {
  date: Date;
};

export const TextDate = ({ date }: Props) => {
  return (
    <time dateTime={formatISO(date)}>
      <span>{format(date, 'LLLL d, yyyy')}</span>
    </time>
  );
};

export default TextDate;
