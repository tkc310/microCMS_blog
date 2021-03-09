import { memo, useEffect, useState } from 'react';

type Props = {
  name: string;
};

export const Copyright = ({ name }: Props) => {
  const [year, setYear] = useState(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, [year]);

  return (
    <>
      <p className="l-footer_copyright">
        Copyright {year} {name}
      </p>
    </>
  );
};

export default memo(Copyright);
