import { format, formatISO } from 'date-fns';

type Props = {
  date: Date;
};

export const TextDate = ({ date }: Props) => {
  return (
    <time dateTime={formatISO(date)}>
      <span
        style={{
          color: 'rgba(117, 117, 117, 1)',
          fontFamily: 'sans-setif',
          fontSize: '.9rem',
        }}
      >
        {format(date, 'yyyy-MM-dd (LLL)')}
      </span>
    </time>
  );
};

export default TextDate;
