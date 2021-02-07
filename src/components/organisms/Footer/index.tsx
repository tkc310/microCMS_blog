import Profile from '@components/atoms/Profile';
import Copyright from '@components/atoms/Copyright';
import { TProfile } from '@/types';

type Props = {
  profile: TProfile;
};

export const Footer = ({ profile }: Props) => {
  return (
    <footer className="l-footer">
      <Profile profile={profile} />
      <Copyright name={profile.name} />
    </footer>
  );
};

export default Footer;
