import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useState,
  useEffect
} from "react";
import Image, { ImageProps } from "next/image";

type IProps = {
  src: string;
  alt?: string;
  fallback?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  errorWidget?: React.ReactNode;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const ImageFallback = ({
  src,
  alt,
  height,
  width,
  fallback,
  className,
  errorWidget,
}: IProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <>{errorWidget}</>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={(event) => {
        if (fallback) {
          event.currentTarget.src = fallback;
        } else {
          setHasError(true);
        }
      }}
    />
  );
};

type Props = {
  src: string;
  alt: string;
  fallback?: string;
  errorWidget?: React.ReactNode;
} & ImageProps;

export const ImageWithFallback = ({
  src,
  alt,
  fallback,
  errorWidget,
  ...rest
}: Props) => {
  const [source, setSource] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setSource(src);
  }, [src]);

  hasError && <>{errorWidget}</>

  return (
    <Image
      {...rest}
      alt={alt}
      src={source}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          if (fallback) {
            setSource(fallback);
            return;
          }
          setHasError(true);
        }
      }}
      onError={() => {
        if (fallback) {
          setSource(fallback);
          return;
        }
        setHasError(true);
      }}
    />
  );
};
