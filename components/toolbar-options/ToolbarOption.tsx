import React, { FC } from 'react'
import clsx from 'clsx'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Icon } from '../shared/icon'

interface ToolbarOptionProps {
  type: string
  icon: string
  tooltip: string
  additionalClasses?: string
  onClick?: () => void
}

const ToolbarOption: FC<ToolbarOptionProps> = ({
  type,
  icon,
  tooltip,
  additionalClasses,
  onClick,
}) => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          aria-details={type}
          className={clsx(
            "h-8 w-8 flex justify-center items-center hover:bg-[#F2F2F2] rounded",
            additionalClasses
          )}
          onClick={onClick}
        >
          <Icon type={icon} />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content className="text-left bg-white rounded-md shadow-md px-[10px] py-[6px] text-[10px] leading-4 text-neutral-500 mb-4 max-w-[140px]">
        {tooltip}
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export default ToolbarOption