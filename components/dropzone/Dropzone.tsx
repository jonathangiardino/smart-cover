import React, { useMemo } from 'react'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'
import { acceptStyle, rejectStyle } from '../../styles/utils'

interface DropzoneProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
  isDragActive: boolean
  isDragReject: boolean
  isDragAccept: boolean
  isFocused: boolean
}

const Dropzone = ({
  getRootProps,
  getInputProps,
  isDragActive,
  isDragReject,
  isDragAccept,
  isFocused,
}: DropzoneProps) => {
  const dropzoneStyle = useMemo(
    () => ({
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  )
  return (
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
          <button className="flex gap-2 items-center bg-black py-2 px-[10px] text-white text-sm font-semibold rounded-md mt-4 hover:bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 transition-all ease-out bg-size-300 bg-pos-0 hover:bg-pos-100 hover:shadow-lg hover:animate-wiggle">
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
  )
}

export default Dropzone
