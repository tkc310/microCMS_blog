import { TProfile } from '@/types';
import { SocialList } from '@components/molecules/SocialList';

type Props = {
  profile: TProfile;
};

export const Profile = ({ profile }: Props) => {
  const {
    name,
    description,
    githubAccountName,
    // twitterAccountName,
  } = profile;

  return (
    <div>
      <div className="l-footer_profile">
        <div className="l-footer_icon">
          <img src="/neko_3.png" width="90" alt="プロフィール画像" />
        </div>
        <div className="l-footer_text">
          <div className="l-footer_name">{name}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: `${description}`,
            }}
          />
        </div>
      </div>
      <div className="l-footer_sns">
        <SocialList
          githubAccountName={githubAccountName}
          // twitterAccountName={twitterAccountName}
        />
      </div>
    </div>
  );
};

export default Profile;
