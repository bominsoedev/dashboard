import React from 'react';

interface IconProps {
    width?: number;
    height?: number;
    fill?: string;
    className?: string;
}

const IconArrowUp: React.FC<IconProps> = ({
                                              width = 32,
                                              height = 32,
                                              fill = 'currentColor',
                                              className = 'icon-2xl',
                                          }) => (
    <span className={'rounded-full bg-gray-500 mr-1'}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        viewBox="0 0 32 32"
        className={className}
    >
        <path
            fill={fill}
            fillRule="evenodd"
            d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
            clipRule="evenodd"
        />
    </svg>
</span>
);

export default IconArrowUp;