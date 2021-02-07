type Props = {
  name: string;
};

export const Copyright = ({ name }: Props) => {
  const year = new Date().getFullYear();

  return (
    <>
      <p>
        Copyright {year} {name}
      </p>
    </>
  );
};

export default Copyright;
