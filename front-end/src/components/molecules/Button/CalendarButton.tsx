import React, {useEffect, useRef, useState} from 'react';
import CustomCalendar from '@/components/molecules/Calendar/CustomCalendar';
import dayjs, {Dayjs} from 'dayjs';

interface CalendarButtonProps {
  render: () => React.ReactNode;
  onClick?: (value: Dayjs) => void;
  left?: boolean;
  right?: boolean;
  defaultDate?: Dayjs;
  showNavigation?: boolean;
  showNeighboringMonth?: boolean;
}

const CalendarButton = ({
  render,
  onClick,
  left,
  right,
  defaultDate,
  showNavigation,
  showNeighboringMonth,
}: CalendarButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleOutside);

    return () => window.removeEventListener('click', handleOutside);
  }, [selectRef]);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (value: Date) => {
    onClick?.(dayjs(value));
  };

  const leftClass = left ? '-right-3' : '';
  const rightClass = right ? '-left-3' : '';

  return (
    <div ref={selectRef} className="relative w-fit" onClick={handleOnClick}>
      {render()}
      {isOpen && (
        <>
          <div className="absolute w-0 h-0 border-b-8 border-l-8 border-r-8 border-white shadow-lg top-10 border-r-transparent border-l-transparent"></div>
          <div
            className={`absolute px-2 py-2 bg-white rounded-lg ${leftClass} ${rightClass} top-[36px] w-72 shadow-lg`}
          >
            <CustomCalendar
              onChange={handleChange}
              defaultDate={defaultDate?.toDate()}
              showNavigation={showNavigation}
              showNeighboringMonth={showNeighboringMonth}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarButton;
