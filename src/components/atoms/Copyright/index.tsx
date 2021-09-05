import { memo, useEffect } from 'react';
import useSafeState from '@/hooks/useSafeState';

type Props = {
  name: string;
};

export const Copyright = ({ name }: Props) => {
  const [year, setYear] = useSafeState(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, [year, setYear]);

  return (
    <>
      <p className="l-footer_copyright">
        Copyright {year} {name}
      </p>
    </>
  );
};

export default memo(Copyright);
