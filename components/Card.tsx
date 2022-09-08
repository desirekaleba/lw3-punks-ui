import React, { CSSProperties, FC } from "react";

type Props = {
    title: string;
    titleClassName?: string;
    className?: string;
    children: React.ReactNode;
    style?: CSSProperties
};

const Card: FC<Props> = ({
    title,
    children,
    className = "",
    titleClassName = "",
    style,
}: Props) => {
    return (
        <div
            className={`border rounded-lg p-4 text-sm tracking-min mb-6 ${className}`}
            style={style}
        >
            <p
            className={`text-secondary font-semibold text-sm mb-3 ${titleClassName}`}
            >
                {title}
            </p>
            {children}
        </div>
    );
};

export default Card;
