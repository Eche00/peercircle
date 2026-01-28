import React from 'react'

function EthChart() {
    return (
        <svg width="155" height="82" viewBox="0 0 155 82" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_5_698)">
                <path d="M20.8193 50.1871L34.8193 30.1871L48.3193 50.1871L66.3193 14.1871L80.3193 40.6871L89.8193 28.6871L105.319 52.1871L114.819 40.6871L126.319 50.1871L133.319 31.6871" stroke="#D2D3D7" stroke-width="2" />
            </g>
            <defs>
                <filter id="filter0_d_5_698" x="0" y="0" width="154.255" height="81.8666" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="8" />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.576471 0 0 0 0 0.101961 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5_698" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5_698" result="shape" />
                </filter>
            </defs>
        </svg>

    )
}

export default EthChart