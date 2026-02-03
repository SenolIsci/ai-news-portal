'use client';

import { useState } from 'react';

interface NewsImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function NewsImage({ src, alt, className }: NewsImageProps) {
    const TRANSPARENT_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    const fallbackImage = '/images/fallback.png';

    const [imgSrc, setImgSrc] = useState((!src || src === TRANSPARENT_GIF) ? fallbackImage : src);

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={() => {
                setImgSrc(fallbackImage);
            }}
        />
    );
}
