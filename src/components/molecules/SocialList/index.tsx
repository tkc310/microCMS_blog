import LinkGithub from '@/components/atoms/links/LinkGithub';
import LinkLapras from '@/components/atoms/links/LinkLapras';
import LinkQiita from '@/components/atoms/links/LinkQiita';
import LinkZenn from '@/components/atoms/links/LinkZenn';
// import LinkTwitter from '@/components/atoms/links/LinkTwitter';

type Props = {
  githubAccountName: string;
  zennAccountName: string;
  qiitaAccountName: string;
  laprasAccountName: string;
  // twitterAccountName: string;
};

export const SocialList = ({
  githubAccountName,
  zennAccountName,
  qiitaAccountName,
  laprasAccountName,
}: // twitterAccountName,
Props) => (
  <>
    <LinkGithub accountName={githubAccountName} />
    <LinkZenn accountName={zennAccountName} />
    <LinkQiita accountName={qiitaAccountName} />
    <LinkLapras accountName={laprasAccountName} />
    {/* <LinkTwitter accountName={twitterAccountName} /> */}
  </>
);

export default SocialList;
