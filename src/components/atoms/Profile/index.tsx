type Props = {
  name: string;
};

export const Profile = ({ name }: Props) => {
  return (
    <>
      <span>{name}</span>
    </>
  );
};

export default Profile;
