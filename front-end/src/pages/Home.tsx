import {useNavigate} from 'react-router-dom';
import NotificationButton from '@/components/atoms/Button/NotificationButton';
import KindergartenCard from '@/components/atoms/KindergartenCard';
import UserCardItem from '@/components/molecules/Item/UserCardItem';
import HomeMenu from '@/components/organisms/Content/HomeMenu';
import MemoShortcut from '@/components/organisms/Content/MemoShortcut';
import NavigationBar from '@/components/organisms/Navigation/NavigationBar';
import {useGetUserInfo} from '@/hooks/my-page/useGetUserInfo';
import {getMemberId} from '@/utils/userData';
import noProfile from '@/assets/no-profile.png';
import {ROLE_NAMES} from '@/constants/roleNames';
import {RoleItem} from '@/enum/roleItem';
import {getFullImageSource} from '@/utils/getFullImageSource';

const Home = () => {
  const {data: userInfo} = useGetUserInfo(getMemberId()!);
  const userImage = getFullImageSource(userInfo?.picture);

  const navigate = useNavigate();
  const handleUserCardItemClick = () => {
    navigate('/my-page');
  };

  return (
    <>
      <div className="min-h-screen px-5 space-y-3 border-t pb-[8rem] bg-secondary">
        <div className="flex justify-between pt-7">
          {/* 서비스명 & 로고 */}
          <div></div>
          <NotificationButton />
        </div>
        <div className="">
          <KindergartenCard
            kindergartenName={userInfo?.kindergartenName ?? ''}
          />
        </div>
        <div onClick={handleUserCardItemClick}>
          <UserCardItem
            profile={userImage ?? noProfile}
            userName={`${userInfo?.name ?? ''} ${ROLE_NAMES[userInfo?.role as RoleItem] ?? ''}`}
            cardType="arrow"
          />
        </div>
        <HomeMenu />
        <MemoShortcut />
      </div>
      <NavigationBar />
    </>
  );
};

export default Home;