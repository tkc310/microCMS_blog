import LinkGithub from '@/components/atoms/links/LinkGithub';
// import LinkTwitter from '@/components/atoms/links/LinkTwitter';

type Props = {
  githubAccountName: string;
  // twitterAccountName: string;
};

export const SocialList = ({
  githubAccountName,
}: // twitterAccountName,
Props) => {
  return (
    <>
      <LinkGithub accountName={githubAccountName} />
      {/* <LinkTwitter accountName={twitterAccountName} /> */}
    </>
  );
};

export default SocialList;
