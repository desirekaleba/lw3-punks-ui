import { DetailedHTMLProps, ImgHTMLAttributes, useState } from "react";

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
  