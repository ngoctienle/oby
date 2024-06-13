import { OBYSvg } from 'oby'

type AGRSvg = OBYSvg & {
  stroke?: string
}

export const AGRCategoryIcon: React.FunctionComponent<AGRSvg> = ({ stroke, width, height, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 25 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.5759 9.75H15.5759M21.5759 4.5H3.57593M21.5759 15.25H15.5759M21.5759 20.5H3.57593M5.17593 16.5H9.97593C10.536 16.5 10.816 16.5 11.0299 16.391C11.2181 16.2951 11.3711 16.1422 11.4669 15.954C11.5759 15.7401 11.5759 15.4601 11.5759 14.9V10.1C11.5759 9.53995 11.5759 9.25992 11.4669 9.04601C11.3711 8.85785 11.2181 8.70487 11.0299 8.60899C10.816 8.5 10.536 8.5 9.97593 8.5H5.17593C4.61588 8.5 4.33585 8.5 4.12194 8.60899C3.93378 8.70487 3.78079 8.85785 3.68492 9.04601C3.57593 9.25992 3.57593 9.53995 3.57593 10.1V14.9C3.57593 15.4601 3.57593 15.7401 3.68492 15.954C3.78079 16.1422 3.93378 16.2951 4.12194 16.391C4.33585 16.5 4.61588 16.5 5.17593 16.5Z'
        stroke={stroke}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export const AGRMagnifyingGlassIcon: React.FunctionComponent<AGRSvg> = ({ width, height, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21 21.5L16.65 17.15M11 6.5C13.7614 6.5 16 8.73858 16 11.5M19 11.5C19 15.9183 15.4183 19.5 11 19.5C6.58172 19.5 3 15.9183 3 11.5C3 7.08172 6.58172 3.5 11 3.5C15.4183 3.5 19 7.08172 19 11.5Z'
        stroke='#474747'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export const AGRShoppingBagIcon: React.FunctionComponent<AGRSvg> = ({ width, height, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.283 24.5C18.0937 24.5 18.9991 24.5 19.6674 24.1382C20.2546 23.8204 20.7189 23.3157 20.9869 22.7042C21.2919 22.0082 21.2167 21.1059 21.0664 19.3014L20.3664 10.9014C20.237 9.34875 20.1723 8.57243 19.8285 7.98486C19.5257 7.46744 19.0748 7.0526 18.5341 6.79385C17.92 6.5 17.141 6.5 15.583 6.5L8.41623 6.5C6.85821 6.5 6.07921 6.5 5.4651 6.79384C4.92433 7.0526 4.47349 7.46744 4.17071 7.98486C3.82689 8.57243 3.76219 9.34875 3.63281 10.9014L2.93281 19.3014C2.78243 21.1059 2.70724 22.0082 3.01227 22.7042C3.28027 23.3157 3.74462 23.8204 4.33177 24.1382C5.00006 24.5 5.90545 24.5 7.71623 24.5H16.283Z'
        stroke='#474747'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M15.9995 11.5C15.9995 12.5609 15.5781 13.5783 14.8279 14.3284C14.0778 15.0786 13.0604 15.5 11.9995 15.5C10.9386 15.5 9.92123 15.0786 9.17108 14.3284C8.42094 13.5783 7.99951 12.5609 7.99951 11.5'
        stroke='#8F8F8F'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      {/* <circle cx='25' cy='8' r='8' fill='url(#paint0_linear_4111_5859)' /> */}
      <path
        d='M24.9989 11.1278C24.5103 11.1259 24.0898 11.0057 23.7376 10.767C23.3872 10.5284 23.1173 10.1828 22.9279 9.73011C22.7404 9.27746 22.6476 8.73295 22.6495 8.09659C22.6495 7.46212 22.7433 6.9214 22.9308 6.47443C23.1201 6.02746 23.39 5.6875 23.7404 5.45455C24.0927 5.2197 24.5122 5.10227 24.9989 5.10227C25.4857 5.10227 25.9042 5.2197 26.2546 5.45455C26.6069 5.68939 26.8777 6.0303 27.0671 6.47727C27.2565 6.92235 27.3503 7.46212 27.3484 8.09659C27.3484 8.73485 27.2537 9.2803 27.0643 9.73295C26.8768 10.1856 26.6078 10.5312 26.2575 10.7699C25.9071 11.0085 25.4876 11.1278 24.9989 11.1278ZM24.9989 10.108C25.3323 10.108 25.5984 9.94034 25.7972 9.60511C25.9961 9.26989 26.0946 8.76705 26.0927 8.09659C26.0927 7.6553 26.0472 7.28788 25.9563 6.99432C25.8673 6.70076 25.7404 6.48011 25.5756 6.33239C25.4128 6.18466 25.2205 6.1108 24.9989 6.1108C24.6675 6.1108 24.4023 6.27652 24.2035 6.60795C24.0046 6.93939 23.9042 7.43561 23.9023 8.09659C23.9023 8.54356 23.9469 8.91667 24.0359 9.21591C24.1268 9.51326 24.2546 9.73674 24.4194 9.88636C24.5842 10.0341 24.7773 10.108 24.9989 10.108Z'
        fill='white'
      />
      <defs>
        <linearGradient
          id='paint0_linear_4111_5859'
          x1='17.0938'
          y1='15.691'
          x2='33.3619'
          y2='15.2897'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#E54807' />
          <stop offset='0.357545' stop-color='#E54807' />
          <stop offset='1' stop-color='#FFBE00' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const AGRPresentIcon: React.FunctionComponent<AGRSvg> = ({ width, height, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 21 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M11.375 10V19' stroke='#8F8F8F' stroke-width='1.5' stroke-linecap='round' />
      <path
        d='M1 7C1 5.89543 1.89543 5 3 5H17.4C18.5046 5 19.4 5.89543 19.4 7V8C19.4 9.10457 18.5046 10 17.4 10H3C1.89543 10 1 9.10457 1 8V7Z'
        stroke='#474747'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <path
        d='M2 10L1.59223 13.6699C1.38725 15.5147 1.28477 16.4371 1.5814 17.151C1.84191 17.7781 2.30743 18.2982 2.90185 18.6263C3.57868 19 4.50674 19 6.36287 19H14.0371C15.8933 19 16.8213 19 17.4981 18.6263C18.0926 18.2982 18.5581 17.7781 18.8186 17.151C19.1152 16.4371 19.0127 15.5147 18.8078 13.6699L18.4 10'
        stroke='#474747'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <path
        d='M11 4V5H7C5.89543 5 5 4.10457 5 3C5 1.89543 5.89543 1 7 1H8C9.65685 1 11 2.34315 11 4Z'
        stroke='#474747'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <path
        d='M11 4V5H13.5C14.3284 5 15 4.32843 15 3.5C15 2.67157 14.3284 2 13.5 2H13C11.8954 2 11 2.89543 11 4Z'
        stroke='#474747'
        stroke-width='1.5'
        stroke-linecap='round'
      />
    </svg>
  )
}

export const AGRPlusIcon: React.FunctionComponent<AGRSvg> = ({ width, height, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 16 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='8' cy='8.5' r='8' fill='url(#paint0_linear_4167_1441)' />
      <path
        d='M7.33008 11.8537V5.1321H8.66744V11.8537H7.33008ZM4.64045 9.15909V7.82173H11.362V9.15909H4.64045Z'
        fill='white'
      />
      <defs>
        <linearGradient
          id='paint0_linear_4167_1441'
          x1='0.0938023'
          y1='16.191'
          x2='16.3619'
          y2='15.7897'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#E54807' />
          <stop offset='0.357545' stop-color='#E54807' />
          <stop offset='1' stop-color='#FFBE00' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const AGRGradientRightArrowIcon: React.FunctionComponent<AGRSvg> = ({ width, height, className }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 33 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='16.5'
        cy='16.4829'
        r='15.5'
        transform='rotate(90 16.5 16.4829)'
        stroke='url(#paint0_linear_4008_97295)'
      />
      <path
        d='M20 13.9089L22.5 16.4089M22.5 16.4089L20 18.9089M22.5 16.4089L10.5 16.4089'
        stroke='#E54807'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_4008_97295'
          x1='-0.366667'
          y1='85.4407'
          x2='37.6393'
          y2='84.2344'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#FFBE00' />
          <stop offset='0.243975' stop-color='#E54807' />
          <stop offset='0.717949' stop-color='#E54807' />
          <stop offset='1' stop-color='#FFBE00' />
        </linearGradient>
      </defs>
    </svg>
  )
}
