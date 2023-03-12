import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { OBYImage } from 'oby'

type UnstyledImage = OBYImage & ImageProps

export const CustomImage: React.FunctionComponent<UnstyledImage> = ({
  src,
  alt,
  width = 144,
  height = 144,
  display = 'intrinsic',
  ...props
}) => {
  if (display === 'responsive') {
    return (
      <Image
        fill
        src={src}
        alt={alt}
        title={alt}
        loading='lazy'
        placeholder='blur'
        blurDataURL={props.blurDataURL ?? '/blur.svg'}
        {...props}
      />
    )
  }
  if (Number(width) < 40 && Number(height) < 40) {
    return <Image src={src} alt={alt} width={width} height={height} {...props} />
  }
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
