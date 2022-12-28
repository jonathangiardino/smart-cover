import { useCallback, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { Inter } from '@next/font/google'
import Head from 'next/head'
import { useDropzone } from 'react-dropzone'
import { useDebounce } from 'use-debounce'
import clsx from 'clsx'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useIdleTimer } from 'react-idle-timer'
import { Icon } from '../components/shared/icon'
import toolbarOptions from '../lib/options'
import {
  ToolbarColorOption,
  ToolbarOption,
} from '../components/toolbar-options'
import Dropzone from '../components/dropzone'
import Screenshot from '../components/screenshot'
import { isIphoneAspectRatio } from '../utils'

// App font
const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  const [screenshot, setScreenshot] = useState<HTMLImageElement | null>(null)
  const [displayToolbar, setDisplayToolbar] = useState<boolean>(false)
  const [backgroundColor, setBackgroundColor] = useState<string>('#F7F7F7')
  const [customColorActive, setCustomColorActive] = useState<boolean>(false)
  const [frameOption, setFrameOption] = useState<string>('no-frame')
  const [framingAllowed, setFramingAllowed] = useState<boolean>(false)

  const [bgValue] = useDebounce(backgroundColor, 150)
  const [customColorActiveValue] = useDebounce(customColorActive, 150)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleNewUpload = () => inputRef.current?.click()
  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length === 0) return
    if (screenshot) reset()

    let img = new Image()
    img.src = window.URL.createObjectURL(acceptedFiles[0])
    img.onload = () => {
      console.log(isIphoneAspectRatio(img))
      if (isIphoneAspectRatio(img)) {
        setFramingAllowed(true)
        setFrameOption('iphone-frame')
      }
      setScreenshot(img)
    }
  },[screenshot])

  // Dropzone handlers
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  // Idle detector
  const onIdle = () => {
    setDisplayToolbar(false)
  }
  useIdleTimer({ onIdle, timeout: 3000 })

  function reset() {
    setFramingAllowed(false)
    setFrameOption('no-frame')
  }

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
          <Dropzone
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isFocused={isFocused}
            isDragActive={isDragActive}
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
          />
        ) : (
          <Screenshot
            screenshot={screenshot}
            bgValue={bgValue}
            setDisplayToolbar={setDisplayToolbar}
            onDrop={onDrop}
            inputRef={inputRef}
            frameOption={frameOption}
          />
        )}
        <div
          className={clsx(
            'h-[50px] w-full md:w-[416px] m-2 p-2 border-[1px] border-[rgba(0,0,0,0.06)] rounded-lg shadow-lg transition-opacity duration-500 ease-in-out',
            !screenshot ? 'hidden' : 'flex',
            displayToolbar
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none',
          )}
        >
          <div className="flex justify-center items-center gap-3">
            <Tooltip.Provider>
              {/* UPLOAD */}
              <ToolbarOption
                type={toolbarOptions.uploader.type}
                icon={toolbarOptions.uploader.type}
                tooltip={toolbarOptions.uploader.tooltip}
                onClick={handleNewUpload}
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
                  framingAllowed={framingAllowed}
                  frameOption={frameOption}
                  onClick={() => {
                    setFrameOption(frame.type)
                  }}
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
