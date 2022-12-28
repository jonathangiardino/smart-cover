import React from 'react'
import NextImage from 'next/image'
import clsx from 'clsx'
import { isIphoneAspectRatio } from '../../utils'

interface ScreenshotProps {
  screenshot: HTMLImageElement | null
  bgValue: string
  setDisplayToolbar: (value: boolean) => void
  onDrop: (files: any) => void
  inputRef: React.RefObject<HTMLInputElement>
}

const Screenshot = ({
  screenshot,
  bgValue,
  setDisplayToolbar,
  onDrop,
  inputRef,
}: ScreenshotProps) => {
  const renderScreenshot = () => {
    if (!screenshot) return null

    switch (true) {
      case isIphoneAspectRatio(screenshot):
        return (
          <div className="relative">
            <NextImage
              className="w-[209px] m-8 rounded-xl object-contain object-center animate-fadeIn delay-75"
              src={screenshot.src}
              alt={screenshot.title}
              width={screenshot.width}
              height={screenshot.height}
            />
            <NextImage
              className="object-contain object-center max-h-full absolute top-0 p-2 animate-fadeIn delay-75"
              src={'/iphone-black.png'}
              alt="iPhone frame"
              width={screenshot.width}
              height={screenshot.height}
            />
          </div>
        )

      default:
        return (
          <NextImage
            className="object-contain object-center w-full h-full p-7 animate-fadeIn delay-75"
            src={screenshot.src}
            alt={screenshot.title}
            width={screenshot.width}
            height={screenshot.height}
          />
        )
    }
  }

  return (
    <div
      style={{ backgroundColor: bgValue }}
      className={clsx(
        'relative w-full md:w-[654px] h-[400px] md:h-[520px] rounded-[28px] flex flex-col items-center justify-center border-[1px] border-[rgba(0,0,0,0.06)] transition-colors duration-500 ease-out animate-fadeIn',
      )}
      onMouseMove={() => setDisplayToolbar(true)}
      onTouchStart={() => setDisplayToolbar(true)}
    >
      <input
        className="hidden sr-only"
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => onDrop(e.target.files)}
      />

      {renderScreenshot()}
    </div>
  )
}

export default Screenshot
