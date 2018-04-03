import React from 'react'

const ICONS = {
  vocabulary: _ => (
    <svg width="47px" height="48px" viewBox="0 0 47 38">
      <defs>
        <path
          d="M53.1238448,164.68 L53.1238448,154.215569 L61.68,154.215569 L61.68,164.68 L53.1238448,164.68 Z M54.2155689,152.572216 L54.2155689,145.107784 L61.68,145.107784 L61.68,152.572216 L54.2155689,152.572216 Z M44,143.464431 L44,136 L51.4644311,136 L51.4644311,143.464431 L44,143.464431 Z M53.2155689,134 L60.68,134 L60.68,141.464431 L53.2155689,141.464431 L53.2155689,134 Z M43.8938922,151.786108 L43.8938922,145.893892 L49.7861078,145.893892 L49.7861078,151.786108 L43.8938922,151.786108 Z M32,155.572216 L32,148.107784 L39.4644311,148.107784 L39.4644311,155.572216 L32,155.572216 Z M32,165.68 L32,158.215569 L39.4644311,158.215569 L39.4644311,165.68 L32,165.68 Z M43.1077844,161.68 L43.1077844,154.215569 L50.5722156,154.215569 L50.5722156,161.68 L43.1077844,161.68 Z M30,145.107784 L30,133 L41.1077844,133 L41.1077844,145.107784 L30,145.107784 Z"
          id="path-1"
        />
        <filter x="-47.3%" y="-27.5%" width="194.7%" height="191.8%" filterUnits="objectBoundingBox" id="filter-2">
          <feMorphology radius="0.5" operator="erode" in="SourceAlpha" result="shadowSpreadOuter1" />
          <feOffset dx="0" dy="6" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feGaussianBlur stdDeviation="4.5" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
          <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.103377525   0 0 0 0 0.103377525  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" />
        </filter>
      </defs>
      <g id="Dashboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-36.000000, -143.000000)">
        <g id="Group-2" transform="translate(14.000000, 12.000000)">
          <g id="apps---material">
            <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" />
            <use fill="#F41E1E" fillRule="evenodd" xlinkHref="#path-1" />
          </g>
        </g>
      </g>
    </svg>
  )
}

let Icon = ({ name }) => {
  return ICONS[name]()
}

export default Icon
