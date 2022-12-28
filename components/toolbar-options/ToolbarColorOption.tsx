import * as Popover from "@radix-ui/react-popover"
import * as Tooltip from "@radix-ui/react-tooltip"
import clsx from "clsx"
import { FC } from "react"
import { HexColorInput, HexColorPicker } from "react-colorful"

interface ToolbarColorOptionProps {
  name: string
  bg: string
  tooltip: string
  additionalClasses?: string
  state?: string
  customColorActive?: boolean
  onChange?: (color: string) => void
  onClick?: () => void
}

const ToolbarColorOption: FC<ToolbarColorOptionProps> = ({
  name,
  tooltip,
  bg,
  additionalClasses,
  state,
  customColorActive,
  onClick,
  onChange,
}) => {
  switch (true) {
    case name === 'multi':
      return (
        <Popover.Root>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Popover.Trigger asChild>
                <button
                  className={clsx(
                    "h-8 w-8 flex justify-center items-center bg-[url('/wheel.svg')] rounded",
                    customColorActive
                      ? 'bg-black hover:bg-black'
                      : 'bg-white hover:bg-[#F2F2F2] ',
                    additionalClasses,
                  )}
                />
              </Popover.Trigger>
            </Tooltip.Trigger>
            <Tooltip.Content className="bg-white rounded-md shadow-md px-[10px] py-[6px] text-[10px] leading-4 text-neutral-500 mb-4">
              {!customColorActive ? tooltip : state}
            </Tooltip.Content>
          </Tooltip.Root>
          <Popover.Portal>
            <Popover.Content
              className="mr-4 p-2 bg-white rounded-[8px] w-[176px] min-h-[244px] shadow-lg"
              align="center"
              sideOffset={14}
            >
              <HexColorPicker
                className="max-w-full"
                color={state}
                onChange={onChange}
              />
              <HexColorInput
                className="w-full p-2 bg-[#F7F7F7] mt-3 text-xs"
                color={state}
                onChange={onChange}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )

    case name !== 'multi':
      return (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className={clsx(
                'h-8 w-8 flex justify-center items-center bg-white hover:bg-[#F2F2F2] rounded',
                additionalClasses,
              )}
              onClick={onClick}
            >
              <span
                style={{ backgroundColor: bg }}
                className={clsx(
                  'h-5 w-5 rounded-full',
                  bg === '#000'
                    ? 'border border-[#606060]'
                    : 'border border-[rgba(0,0,0,0.06)]',
                )}
              />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content className="bg-white rounded-md shadow-md px-[10px] py-[6px] text-[10px] leading-4 text-neutral-500 mb-4">
            {tooltip}
          </Tooltip.Content>
        </Tooltip.Root>
      )

    default:
      return null
  }
}

export default ToolbarColorOption;