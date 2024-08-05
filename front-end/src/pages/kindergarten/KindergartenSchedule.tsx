import DateNavigator from '@/components/organisms/Navigation/DateNavigator';
import ScheduleInfo from '@/components/organisms/Schedule/ScheduleInfo';
import CustomCalendar from '@/components/molecules/Calendar/CustomCalendar';
import Header from '@/components/organisms/Navigation/Header';
import NavigationBar from '@/components/organisms/Navigation/NavigationBar';
import {containerNavigatorClass} from '@/styles/styles';
import ScheduleAdd from '@/components/organisms/Schedule/ScheduleAdd';
import {useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import Select from '@/components/molecules/Select/Select';

const kindergartens = ['전체', '햇살반', '꽃잎반'];

const KindergartenSchedule = () => {
  const [date, setDate] = useState(dayjs());

  const onChangeDate = (value: Dayjs) => {
    setDate(value);
  };

  const handleBeforeMonth = () => {
    setDate(date.subtract(1, 'month'));
  };

  const handleAfterMonth = () => {
    setDate(date.add(1, 'month'));
  };

  return (
    <>
      <Header title="유치원 일정" buttonType="back" />
      <DateNavigator
        title={date.format('YY년 MM월')}
        onClickLeft={handleBeforeMonth}
        onClickRight={handleAfterMonth}
      />
      <div
        className={`${containerNavigatorClass} items-center justify-center w-full px-10 space-y-4 overflow-y-auto`}
      >
        <div className="flex items-center justify-between w-full h-16">
          <Select label="반" size="small">
            {kindergartens &&
              kindergartens.map((data, idx) => (
                <Select.Option key={idx} text={data} />
              ))}
          </Select>
          <ScheduleAdd />
        </div>
        <div className="flex items-center justify-center flex-grow w-full">
          <div className="flex items-start justify-center max-w-full px-1 pt-10 pb-3 border border-gray-200 rounded-lg aspect-square">
            <CustomCalendar
              defaultDate={date}
              showNavigation={false}
              onChange={onChangeDate}
            />
          </div>
        </div>
        <ScheduleInfo date={date} />
      </div>
      <NavigationBar />
    </>
  );
};

export default KindergartenSchedule;
