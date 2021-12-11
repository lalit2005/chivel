import * as RadixTooltip from '@radix-ui/react-tooltip';
import { useState, Fragment } from 'react';
import { Transition } from '@headlessui/react';

const Tooltip: React.FC<{
  text: string;
  showArrow?: boolean;
  side?: 'left' | 'top' | 'bottom' | 'right';
}> = ({ text, showArrow = true, side = 'top', ...props }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <RadixTooltip.Root
        delayDuration={0.5}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
        }}
        open={isOpen}>
        <RadixTooltip.Trigger>
          <div>{props.children}</div>
        </RadixTooltip.Trigger>
        <Transition
          as={Fragment}
          show={isOpen}
          enter='transition ease-out duration-500'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-500'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'>
          <RadixTooltip.Content
            className='px-2 py-1 text-gray-100 bg-gray-900 rounded shadow-lg'
            side={side}
            sideOffset={5}>
            {showArrow && <RadixTooltip.Arrow className='shadow-lg' />}
            <p>{text}</p>
          </RadixTooltip.Content>
        </Transition>
      </RadixTooltip.Root>
    </div>
  );
};

export default Tooltip;
