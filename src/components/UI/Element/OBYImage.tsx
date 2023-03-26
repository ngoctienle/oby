import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { OBYImage as OBYImageType } from 'oby'

type OBYImage = OBYImageType & ImageProps

export const OBYImage: React.FunctionComponent<OBYImage> = ({
  src,
  alt,
  width,
  height,
  display = 'intrinsic',
  ...props
}) => {
  if (display === 'responsive') {
    return (
      <Image
        {...props}
        fill
        src={src}
        alt={alt}
        title={alt}
        loading='lazy'
        placeholder='blur'
        blurDataURL={props.blurDataURL ?? '/blur.svg'}
      />
    )
  }
  /*   if (Number(width) < 40 && Number(height) < 40) {
    return <Image src={src} alt={alt} width={width} height={height} {...props} />
  } */
  return (
    <Image
      src={src}
      alt={alt}
      title={alt}
      width={width}
      height={height}
      loading='lazy'
      placeholder='blur'
      blurDataURL={props.blurDataURL ?? '/blur.svg'}
      {...props}
    />
  )
}
