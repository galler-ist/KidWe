import DateNavigator from '@/components/organisms/Navigation/DateNavigator';
import WriteButton from '@/components/atoms/Button/WriteButton';
import FoodInfomationItem from '@/components/organisms/Food/FoodInfomationItem';
import FoodDateNavigator from '@/components/organisms/Food/FoodDateNavigator';
import Header from '@/components/organisms/Navigation/Header';
import NavigationBar from '@/components/organisms/Navigation/NavigationBar';
import {useNavigate} from 'react-router-dom';
import {containerNavigatorClass} from '@/styles/styles';
import NoResult from '@/components/atoms/NoResult';
import {useEffect, useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import {useGetDailyFood} from '@/hooks/food/useGetDailyFood';
import Spinner from '@/components/atoms/Loader/Spinner';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

dayjs.extend(weekOfYear);

const kindergartenId = 1;

function getWeekOfMonth(date: Dayjs) {
  const startOfMonth = date.startOf('month');
  const startWeekCount = startOfMonth.week();
  const currentWeekCount = date.week();
  return currentWeekCount - startWeekCount + 1;
}

const FoodInfo = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(dayjs());

  const {
    data: food,
    isLoading,
    isError,
  } = useGetDailyFood(kindergartenId, date);

  const handleLeftClick = () => {
    setDate(date.subtract(1, 'week'));
  };

  const handleRightClick = () => {
    setDate(date.add(1, 'week'));
  };

  const handleDateChange = (value: Dayjs) => {
    setDate(value);
  };

  const moveToWrite = () => {
    navigate('write', {
      state: {date: date.format('YYYY-MM-DD')},
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error('오류 발생');
    }
  }, [isError]);

  return (
    <>
      {isLoading && <Spinner />}
      <div
        className={`${containerNavigatorClass} flex flex-col items-center justify-center box-border h-full px-5 overflow-y-auto`}
      >
        <Header title="급식 정보" buttonType="back" />
        <DateNavigator
          title={`${date.format('M월')} ${getWeekOfMonth(date)}주차`}
          onClickLeft={handleLeftClick}
          onClickRight={handleRightClick}
        />

        <div className="flex justify-center gap-2 mb-16">
          <FoodDateNavigator date={date} onClick={handleDateChange} />
        </div>
        <div className="flex flex-col items-center justify-center flex-grow mb-20 space-y-6">
          {food ? (
            <>
              <FoodInfomationItem
                variant="lunch"
                menu={food.lunch}
                allergies={food.lunchAllergies}
                onClick={moveToWrite}
              />
              <FoodInfomationItem
                variant="snack"
                menu={food.snack}
                allergies={food.snackAllergies}
                onClick={moveToWrite}
              />
              <FoodInfomationItem
                variant="dinner"
                menu={food.dinner}
                allergies={food.dinnerAllergies}
                onClick={moveToWrite}
              />
            </>
          ) : (
            <NoResult text="등록된 식단이 없습니다" />
          )}
        </div>
        <NavigationBar />
      </div>
      <WriteButton onClick={() => moveToWrite()} />
      <ToastContainer
        position="top-center" // 알람 위치 지정
        autoClose={300} // 자동 off 시간
        hideProgressBar // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        theme="light"
        limit={1}
      />
    </>
  );
};

export default FoodInfo;
