import Icon from '@/assets/icons/more-line.svg';
import Dropdown from '@/components/atoms/Dropdown/Dropdown';
import {OptionProps} from '@/components/atoms/Option/Option';
import {useClickOutside} from '@/hooks/useClickOutside';
import React, {isValidElement, useRef} from 'react';

export interface MoreButtonProps {
  children?: React.ReactNode;
  position?: 'left' | 'right';
  align?: 'vertical' | 'horizontal';
}

function addEventListenerToChild(
  children: React.ReactNode,
  handleItemClick: () => void
) {
  const childrenArray = React.Children.toArray(children);
  return childrenArray
    .filter(child => isValidElement(child))
    .map(child => {
      if (isValidElement<OptionProps>(child)) {
        return React.cloneElement(child, {
          onClick: () => {
            child.props?.onClick?.();
            handleItemClick();
          },
        });
      }
      return child;
    });
}

const MoreButton = ({
  children,
  position = 'left',
  align = 'horizontal',
}: MoreButtonProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useClickOutside(selectRef, false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const positionClass = position === 'left' ? 'right-0' : 'left-0';
  const alignClass = align === 'horizontal' ? '' : 'rotate-90';

  const addedChilds = addEventListenerToChild(children, handleItemClick);

  return (
    <div ref={selectRef} className="relative flex items-center w-fit h-fit">
      <button onClick={handleButtonClick}>
        <img className={`${alignClass}`} src={Icon} alt="icon" />
      </button>
      <div className={`${positionClass} absolute w-full top-10 min-w-fit`}>
        <Dropdown isOpen={isOpen}>{addedChilds}</Dropdown>
      </div>
    </div>
  );
};

export default MoreButton;
