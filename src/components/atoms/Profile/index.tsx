import { TProfile } from '@/types';
import image from '@assets/neko_3.png';
import { SocialList } from '@components/molecules/SocialList';
import Image from 'next/image';
import { memo } from 'react';

type Props = {
  profile: TProfile;
};

export const Profile = ({ profile }: Props) => {
  const {
    name,
    description,
    githubAccountName,
    zennAccountName,
    qiitaAccountName,
    laprasAccountName,
    // twitterAccountName,
  } = profile;

  return (
    <div>
      <div className="l-footer_profile">
        <div className="l-footer_icon">
          <Image src={image} width="90" height="90" alt="プロフィール画像" />
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
          zennAccountName={zennAccountName}
          qiitaAccountName={qiitaAccountName}
          laprasAccountName={laprasAccountName}
          // twitterAccountName={twitterAccountName}
        />
      </div>
    </div>
  );
};

export default memo(Profile);
