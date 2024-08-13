import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import dayjs from 'dayjs';
import {groupByDate} from '@/utils/groupByDate';
import {useLeaveConsentList} from '@/hooks/leave-consent/useLeaveConsentList';
import type {LeaveConsentItem} from '@/types/leave-consent/LeaveConsentItem';
import {RoleItem} from '@/enum/roleItem';
import {containerNavigatorClass} from '@/styles/styles';
import Spinner from '@/components/atoms/Loader/Spinner';
import Header from '@/components/organisms/Navigation/Header';
import DateNavigator from '@/components/organisms/Navigation/DateNavigator';
import NoResult from '@/components/atoms/NoResult';
import MonthDivider from '@/components/atoms/Divider/MonthDivider';
import UserCardItem from '@/components/molecules/Item/UserCardItem';
import WriteButton from '@/components/atoms/Button/WriteButton';
import NavigationBar from '@/components/organisms/Navigation/NavigationBar';
import {getMemberRole, getKidId, getBanId} from '@/utils/userData';

const LeaveConsentListView = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const navigate = useNavigate();

  const memberRole = getMemberRole() as RoleItem;
  let id: number | null = 0;
  if (memberRole === RoleItem.Guardian) {
    id = getKidId();
  } else if (memberRole === RoleItem.Teacher) {
    id = getBanId();
  } else if (memberRole === RoleItem.Director) {
    // 선택한 반 id로 변경
    id = 1;
  }

  const {data, isLoading} = useLeaveConsentList(
    id!,
    currentMonth.year(),
    currentMonth.month() + 1,
    memberRole
  );

  const handleLeftClick = () => {
    setCurrentMonth(prev => prev.subtract(1, 'month').startOf('month'));
  };

  const handleRightClick = () => {
    setCurrentMonth(prev => prev.add(1, 'month').startOf('month'));
  };

  const handleUserItemClick = (
    leaveConsentId: number,
    item: LeaveConsentItem
  ) => {
    navigate(`/leave-consent/${leaveConsentId}`, {
      state: {
        kidName: item.kidName,
        banName: item.banName,
      },
    });
  };

  const handleWriteButtonClick = () => {
    navigate('/leave-consent/write');
  };

  const groupedData = groupByDate(data ?? []);

  return (
    <div className="flex flex-col h-screen">
      {isLoading && <Spinner />}
      <Header title="귀가동의서" buttonType="close" />
      <DateNavigator
        title={currentMonth.format('YY년 M월')}
        onClickLeft={handleLeftClick}
        onClickRight={handleRightClick}
      />
      <div className={`${containerNavigatorClass} pt-[6.5rem]`}>
        {data?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <NoResult text="등록된 동의서가 없어요" />
          </div>
        ) : (
          Object.keys(groupedData).map(date => (
            <div key={date}>
              <MonthDivider text={`${dayjs(date).date()}일`} color="gray" />
              {groupedData[date].map(item => (
                <div
                  key={item.leaveConsentId}
                  onClick={() => handleUserItemClick(item.leaveConsentId, item)}
                >
                  <UserCardItem
                    profile={item.profileImage || ''}
                    userName={item.kidName}
                    banName={item.banName}
                    cardType="basic"
                  />
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <WriteButton onClick={handleWriteButtonClick} />
      <NavigationBar />
    </div>
  );
};

export default LeaveConsentListView;
