import Profile from '@components/atoms/Profile';
import Copyright from '@components/atoms/Copyright';
import { SocialList } from '@components/molecules/SocialList';
import { TProfile } from '@/types';

type Props = {
  profile: TProfile;
};

export const Footer = ({ profile }: Props) => {
  const { name, githubAccountName, twitterAccountName } = profile;

  return (
    <footer>
      <div>
        <Profile name={name} />
      </div>
      <div className="social-list">
        <SocialList
          githubAccountName={githubAccountName}
          twitterAccountName={twitterAccountName}
        />
      </div>
      <Copyright name={name} />
    </footer>
  );
};

export default Footer;
