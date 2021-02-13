import { format, formatISO } from 'date-fns';

type Props = {
  date: Date;
};

export const TextDate = ({ date }: Props) => {
  return (
    <time dateTime={formatISO(date)}>
      <span>{format(date, 'yyyy-MM-dd (LLL)')}</span>
    </time>
  );
};

export default TextDate;
