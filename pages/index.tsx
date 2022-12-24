import { useCallback, useMemo } from 'react'

import type { NextPage } from 'next'
import { Inter } from '@next/font/google'
import Head from 'next/head'

import { useDropzone } from 'react-dropzone'
import clsx from 'clsx'

import { acceptStyle, rejectStyle } from '../styles/utils'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles)
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
          'flex w-full flex-1 flex-col items-center justify-center px-8 text-center',
        )}
      >
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
              <button className="flex gap-2 items-center bg-black py-2 px-[10px] text-white text-sm font-semibold rounded-md mt-4 hover:bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 transition-all duration-300 ease-out bg-size-300 bg-pos-0 hover:bg-pos-100 ">
                Upload Screenshot
              </button>
              <span className="text-[#959595] text-xs font-normal mt-4">
                Or drag it into this canvas
              </span>
            </>
          )}
          {isDragReject && (
            <span className="text-black text-xs font-semibold mt-4">
              🫠 Bummer! This file is not accepted
            </span>
          )}
          {isDragAccept && (
            <span className="text-black text-xs font-semibold mt-4">
              ⚡ Almost there! Drop this file to upload
            </span>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
