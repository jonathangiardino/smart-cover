import { FC, useCallback, useMemo, useState } from 'react'
import type { NextPage } from 'next'
import { Inter } from '@next/font/google'
import NextImage from 'next/image'
import Head from 'next/head'
import { useDropzone } from 'react-dropzone'
import { useDebounce } from 'use-debounce'
import clsx from 'clsx'
import * as Tooltip from '@radix-ui/react-tooltip'
import * as Popover from '@radix-ui/react-popover'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import { useIdleTimer } from 'react-idle-timer'
import { acceptStyle, rejectStyle } from '../styles/utils'
import { Icon } from '../components/shared/icon'

// App font
const inter = Inter({ subsets: ['latin'] })

//  ToolbarOption interface
interface ToolbarOptionProps {
  type: string
  icon: string
  tooltip: string
  additionalClasses?: string
  onClick?: () => void
}
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

const toolbarOptions = {
  uploader: {
    type: 'upload',
    tooltip: 'Upload a screenshot',
  },
  frames: [
    {
      type: 'iphone-frame',
      tooltip: 'Add an iPhone frame to the screenshot',
    },
    {
      type: 'no-frame',
      tooltip: 'Display your screenshot without a device frame',
    },
  ],
  colors: [
    {
      name: 'white',
      tooltip: '#FFFFFF',
      bg: '#fff',
    },
    {
      name: 'gray',
      tooltip: '#F7F7F7',
      bg: '#F7F7F7',
    },
    {
      name: 'black',
      tooltip: '#000000',
      bg: '#000',
    },
    {
      name: 'red',
      tooltip: '#FF7272',
      bg: '#FF7272',
    },
    {
      name: 'green',
      tooltip: '#71FF87',
      bg: '#71FF87',
    },
    {
      name: 'blue',
      tooltip: '#7098FF',
      bg: '#7098FF',
    },
    {
      name: 'multi',
      tooltip: 'Choose a custom color',
      bg: '',
    },
  ],
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
            'h-8 w-8 flex justify-center items-center hover:bg-[#F2F2F2] rounded',
            additionalClasses,
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
  )
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
      const backgroundValue = bg !== 'bg-[#fff]' ? `bg-[${bg}]` : 'bg-white'
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

const Home: NextPage = () => {
  const [screenshot, setScreenshot] = useState<HTMLImageElement | null>(null)
  const [displayToolbar, setDisplayToolbar] = useState<boolean>(false)
  const [backgroundColor, setBackgroundColor] = useState<string>('#F7F7F7')
  const [customColorActive, setCustomColorActive] = useState<boolean>(false)
  const [bgValue] = useDebounce(backgroundColor, 150)
  const [customColorActiveValue] = useDebounce(customColorActive, 150)

  const onDrop = useCallback((acceptedFiles: any) => {
    let img = new Image()
    img.src = window.URL.createObjectURL(acceptedFiles[0])
    img.onload = () => {
      console.log('Image name', img.title)
      console.log(img.width + ' ' + img.height)
      console.log('Aspect ratio', img.height / img.width)
    }

    setScreenshot(img)
  }, [])

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  const dropzoneStyle = useMemo(
    () => ({
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  )

  const onIdle = () => {
    setDisplayToolbar(false)
  }

  useIdleTimer({ onIdle, timeout: 3000 })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Smart Cover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={clsx(
          inter.className,
          'relative flex w-full flex-1 flex-col items-center justify-center px-8 text-center',
        )}
      >
        {!screenshot ? (
          <div
            className="relative w-full md:w-[654px] h-[400px] md:h-[520px] bg-[#FDFDFD] border-4 border-dashed border-[rgba(0,0,0,0.1)] rounded-[28px] flex flex-col items-center justify-center"
            {...getRootProps({ style: dropzoneStyle })}
          >
            <input {...getInputProps()} />
            {!isDragActive && (
              <>
                <h4 className="text-xl font-semibold max-w-[214px]">
                  Upload a screenshot of your product
                </h4>
                <button className="flex gap-2 items-center bg-black py-2 px-[10px] text-white text-sm font-semibold rounded-md mt-4 hover:bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 transition-all ease-out bg-size-300 bg-pos-0 hover:bg-pos-100 hover:shadow-lg">
                  Upload Screenshot
                </button>
                <span className="text-[#959595] text-xs font-normal mt-4">
                  Or drag it into this canvas
                </span>
              </>
            )}
            {isDragReject && (
              <span className="text-black text-md font-semibold mt-4">
                🫠 Bummer! This file is not accepted
              </span>
            )}
            {isDragAccept && (
              <span className="text-black text-md font-semibold mt-4">
                ⚡ Almost there! Drop this file to upload
              </span>
            )}
          </div>
        ) : (
          <div
            style={{ backgroundColor: bgValue }}
            className={clsx(
              'relative w-full md:w-[654px] h-[400px] md:h-[520px] rounded-[28px] flex flex-col items-center justify-center border-[1px] border-[rgba(0,0,0,0.06)] transition-colors duration-500 ease-out',
            )}
            onMouseOver={() => setDisplayToolbar(true)}
          >
            <NextImage
              className="object-contain object-center w-full h-full p-8"
              src={screenshot.src}
              alt={screenshot.title}
              width={screenshot.width}
              height={screenshot.height}
            />
          </div>
        )}
        <div
          className={clsx(
            'h-[50px] w-full md:w-[416px] m-2 p-2 border-[1px] border-[rgba(0,0,0,0.06)] rounded-lg shadow-lg transition-opacity duration-500 ease-in-out',
            !screenshot  ? 'invisible' : 'visible',
            displayToolbar  ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className="flex justify-center items-center gap-3">
            <Tooltip.Provider delayDuration={300}>
              {/* UPLOAD */}
              <ToolbarOption
                type={toolbarOptions.uploader.type}
                icon={toolbarOptions.uploader.type}
                tooltip={toolbarOptions.uploader.tooltip}
              />

              <span className="flex justify-center items-center hover:bg-[#F2F2F2] rounded">
                <Icon type="divider" />
              </span>

              {/* FRAMES */}
              {toolbarOptions.frames.map((frame) => (
                <ToolbarOption
                  key={frame.type}
                  icon={frame.type}
                  type={frame.type}
                  tooltip={frame.tooltip}
                />
              ))}

              <span className="flex justify-center items-center hover:bg-[#F2F2F2] rounded">
                <Icon type="divider" />
              </span>

              {/* COLORS */}
              <div className="flex gap-[2px]">
                {toolbarOptions.colors.map((color) => (
                  <ToolbarColorOption
                    key={color.bg}
                    name={color.name}
                    bg={color.bg}
                    tooltip={color.tooltip}
                    additionalClasses={
                      bgValue === color.bg ? 'bg-black hover:bg-black' : ''
                    }
                    onClick={() => {
                      if (color.name !== 'multi') {
                        setBackgroundColor(color.bg)
                        setCustomColorActive(false)
                      } else {
                        null
                      }
                    }}
                    customColorActive={customColorActiveValue}
                    state={bgValue}
                    onChange={(color) => {
                      setBackgroundColor(color)
                      setCustomColorActive(true)
                    }}
                  />
                ))}
              </div>
            </Tooltip.Provider>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
