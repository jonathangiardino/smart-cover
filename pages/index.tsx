import { FC, useCallback, useMemo, useState } from 'react'
import type { NextPage } from 'next'
import { Inter } from '@next/font/google'
import NextImage from 'next/image'
import Head from 'next/head'
import { useDropzone } from 'react-dropzone'
import clsx from 'clsx'
import * as Tooltip from '@radix-ui/react-tooltip'
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
      bg: 'bg-white',
    },
    {
      name: 'gray',
      tooltip: '#F7F7F7',
      bg: 'bg-[#F7F7F7]',
    },
    {
      name: 'black',
      tooltip: '#000000',
      bg: 'bg-black',
    },
    {
      name: 'red',
      tooltip: '#FF7272',
      bg: 'bg-[#FF7272]',
    },
    {
      name: 'green',
      tooltip: '#71FF87',
      bg: 'bg-[#71FF87]',
    },
    {
      name: 'blue',
      tooltip: '#7098FF',
      bg: 'bg-[#7098FF]',
    },
    {
      name: 'multi',
      tooltip: 'Choose a custom color',
      bg: 'bg-indigo-500',
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
  onClick,
  additionalClasses,
}) => {
  switch (true) {
    case name === 'multi':
      return (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className={clsx(
                "h-8 w-8 flex justify-center items-center bg-[url('/wheel.svg')] bg-white hover:bg-[#F2F2F2] rounded",
                additionalClasses,
              )}
              onClick={onClick}
            />
          </Tooltip.Trigger>
          <Tooltip.Content className="bg-white rounded-md shadow-md px-[10px] py-[6px] text-[10px] leading-4 text-neutral-500 mb-4">
            {tooltip}
          </Tooltip.Content>
        </Tooltip.Root>
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
                className={clsx(
                  'h-5 w-5 rounded-full',
                  bg,
                  bg === 'bg-black' && 'border border-[#333333]'
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
  const [displayToolbar, setDisplayToolbar] = useState<boolean>(true)
  const [backgroundColor, setBackgroundColor] = useState<string>('bg-[#F7F7F7]')
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
            className={clsx(
              'relative w-full md:w-[654px] h-[400px] md:h-[520px] rounded-[28px] flex flex-col items-center justify-center border-[1px] border-[rgba(0,0,0,0.06)]',
              `bg-${backgroundColor}`,
            )}
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
            'h-[50px] w-full md:w-[416px] m-2 p-2 border-[1px] border-[rgba(0,0,0,0.06)] rounded-lg shadow-lg transition-opacity',
            screenshot && displayToolbar
              ? 'flex justify-start items-start opacity-100'
              : 'hidden opacity-0',
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
                      backgroundColor === color.bg
                        ? 'bg-black hover:bg-black'
                        : ''
                    }
                    onClick={() => {
                      color.name === 'multi'
                        ? alert('Coming soon')
                        : setBackgroundColor(color.bg)
                    }}
                    state={backgroundColor}
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
