type Props = {
  src: string;
  alt: string;
};

export const Image = ({ alt, ...rest }: Props) => (
  <img decoding="async" loading="lazy" alt={alt} {...rest} />
);

export default Image;
