import React, { FC } from 'react'
import clsx from 'clsx'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Icon } from '../shared/icon'

interface ToolbarOptionProps {
  type: string
  icon: string
  tooltip: string
  additionalClasses?: string
  framingAllowed?: boolean
  frameOption?: string
  onClick?: () => void
}

const ToolbarOption: FC<ToolbarOptionProps> = ({
  type,
  icon,
  tooltip,
  additionalClasses,
  onClick,
  framingAllowed,
  frameOption,
}) => {
  const fill = frameOption === type ? 'white' : 'black'
  const disabledState =
    !framingAllowed && type === 'iphone-frame' && frameOption === 'no-frame'

  const buttonStyles = clsx(
    'h-8 w-8 flex justify-center items-center hover:bg-[#F2F2F2] rounded',
    frameOption === type ? 'bg-black hover:bg-black' : '',
    !framingAllowed && type === 'iphone-frame'
      ? 'opacity-20 cursor-not-allowed'
      : '',

    additionalClasses,
  )

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          disabled={disabledState}
          aria-details={type}
          className={buttonStyles}
          onClick={onClick}
        >
          <Icon type={icon} fill={fill} />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content className="text-left bg-white rounded-md shadow-md px-[10px] py-[6px] text-[10px] leading-4 text-neutral-500 mb-4 max-w-[140px]">
        {!framingAllowed && type === 'iphone-frame'
          ? 'Your screenshot doesn’t seem to come from a recent iPhone.'
          : tooltip}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export default ToolbarOption
