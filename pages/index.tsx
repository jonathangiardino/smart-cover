import { useCallback, useMemo, useState } from 'react'
import type { NextPage } from 'next'
import { Inter } from '@next/font/google'
import NextImage from 'next/image'
import Head from 'next/head'
import { useDropzone } from 'react-dropzone'
import clsx from 'clsx'
import { acceptStyle, rejectStyle } from '../styles/utils'

// App font
const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  const [screenshot, setScreenshot] = useState<HTMLImageElement | null>(null)
  const [displayToolbar, setDisplayToolbar] = useState<boolean>(true)
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
          <div className="relative w-full md:w-[654px] h-[400px] md:h-[520px] bg-[#f7f7f7] rounded-[28px] flex flex-col items-center justify-center border-[1px] border-[rgba(0,0,0,0.06)]">
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
            'h-[50px] w-full md:w-[416px] m-2 border-[1px] border-[rgba(0,0,0,0.06)] rounded-lg shadow-lg transition-opacity',
            screenshot && displayToolbar ? 'opacity-100' : 'opacity-0',
          )}
        ></div>
      </main>
    </div>
  )
}

export default Home
