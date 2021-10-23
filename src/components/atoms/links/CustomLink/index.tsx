/* eslint-disable camelcase */
import {
  FC,
  ReactElement,
  ReactNode,
  memo,
  useEffect,
  useCallback,
} from 'react';
import useSafeState from '@/hooks/useSafeState';
import {
  Image,
  Flex,
  Box,
  Text,
  LinkBox,
  LinkOverlay,
  Skeleton,
} from '@chakra-ui/react';
import styles from '@styles/components/ArticleDetail.module.scss';
import LazyLoad from 'react-lazyload';
import Link, { LinkProps } from 'next/link';

type Props = LinkProps & {
  href: string;
};

type State = {
  title: string;
  description: string;
  image: string;
  getable: boolean;
};

const defaultProps = {};

// eslint-disable-next-line react/prop-types
export const CustomLink: FC<Props> = ({ href: _href }) => {
  const [loaded, setLoaded] = useSafeState(false);
  const [data, setData] = useSafeState<State>({
    title: '',
    description: '',
    image: '',
    getable: false,
  });
  const href = _href as string;
  const { host } = new URL(href);
  const favicon = `https://www.google.com/s2/favicons?sz=32&domain=${host}`;
  const external = !String(href).startsWith('/');

  const getMeta = useCallback(async () => {
    const res = await fetch(`/api/meta?url=${href}`);
    const result = await res.json();
    const { title, description, image, getable } = result;

    setData({
      title,
      description,
      image,
      getable,
    });
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href]);

  useEffect(() => {
    getMeta();
  }, [getMeta]);

  return (
    <div className={styles.customLink}>
      <LinkBox
        borderWidth="1px"
        borderColor="rgba(92, 147, 187, 0.2)"
        borderRadius="lg"
        overflow="hidden"
        className={styles.inner}
      >
        <Flex align="center" height="inherit">
          <Box flex={1} p="3">
            {loaded ? (
              <>
                <SwitchedLink href={href} external={external}>
                  <Text
                    as="h5"
                    size="xs"
                    noOfLines={2}
                    className={styles.title}
                    mb="2"
                  >
                    {data.title}
                  </Text>
                </SwitchedLink>
                {data.description ? (
                  <Text
                    className={styles.desc}
                    fontSize="xs"
                    color="gray.500"
                    noOfLines={1}
                  >
                    {data.description}
                  </Text>
                ) : null}
                <Flex className={styles.domain} align="center" mt="2">
                  {favicon && (
                    <Image
                      className={styles.icon}
                      shrink={0}
                      width="12px"
                      height="12px"
                      mr="2"
                      src={favicon}
                    />
                  )}
                  <Text
                    flex="1"
                    fontSize="xs"
                    className={styles.url}
                    display={host ? 'block' : 'none'}
                  >
                    {host}
                  </Text>
                </Flex>
              </>
            ) : (
              <>
                <Skeleton height="30px" mb="3" />
                <Skeleton height="20px" mb="2" />
                <Skeleton height="20px" />
              </>
            )}
          </Box>
          {loaded ? (
            data.getable &&
            data.image && (
              <Box className={styles.img_wrap}>
                <Image className={styles.img} shrink={0} src={data.image} />
              </Box>
            )
          ) : (
            <Box className={styles.img_wrap}>
              <Skeleton height="120px" />
            </Box>
          )}
        </Flex>
      </LinkBox>
    </div>
  );
};

CustomLink.defaultProps = defaultProps;

type SwitchedLinkProps = {
  href: string;
  external: boolean;
  children: ReactNode;
};

export const SwitchedLink: FC<SwitchedLinkProps> = ({
  href: _href,
  external,
  children,
}: SwitchedLinkProps) => {
  const href = _href as string;

  return external ? (
    <LinkOverlay href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </LinkOverlay>
  ) : (
    <Link href={href}>{children}</Link>
  );
};

type CustomLinkWrapProps = {
  href: string;
  data_origin: boolean | undefined;
  data_inline: boolean | undefined;
  data_block: boolean | undefined;
  target: string | undefined;
};

const CustomLinkWrap: FC<CustomLinkWrapProps> = ({
  href,
  data_origin,
  data_inline,
  target,
  ...rest
}) => {
  if (data_origin) {
    const linkNode: ReactElement = (
      <a href={href} target={target} rel="noreferrer">
        {rest?.children}
      </a>
    );
    return data_inline ? (
      linkNode
    ) : (
      <div style={{ margin: '16px 0px' }}>
        {linkNode}
        <br />
      </div>
    );
  }

  return (
    <LazyLoad height={120} style={{ margin: '16px auto' }} once>
      <CustomLink href={href} {...rest} />
    </LazyLoad>
  );
};

CustomLinkWrap.displayName = 'CustomLinkWrap';

export default memo(CustomLinkWrap);
