type Props = {
  name: string;
};

export const Copyright = ({ name }: Props) => {
  const year = new Date().getFullYear();

  return (
    <>
      <p className="l-footer_copyright">
        Copyright {year} {name}
      </p>
    </>
  );
};

export default Copyright;
