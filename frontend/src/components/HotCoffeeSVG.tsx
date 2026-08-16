export default function HotCoffeeSVG() {
  return (
    <div className="w-fit h-fit relative place-self-center mt-5">
      <div className="z-5 w-full h-25 absolute bg-linear-to-b from-white to-transparent via-white/80"/>
      <svg xmlns="http://w3.org" viewBox="0 0 50 60" width="160px">
        <path d="M8.8,35 v5 c0 12,5 18,16 18 c11 0,16 -6,16 -18 v-5 m0,0 a60,60 0,0 1,-32 0 m0,0 a60,60 0,0 1,32 0 m0,2 c10 -2,10 10,-2.5 15" fill="none" stroke="#d1d5dc" strokeWidth="4" strokeLinecap="round"/>
      </svg>
      <svg className="absolute top-0" xmlns="http://w3.org" viewBox="0 0 50 36" width="160px">
        <g className="coffee-smoke">
          <path d="M19,132 c-7 -18,8 -5,-2 -25 c-10 -20,20 -5,10 -31 c-3 -5,-3 -10,3 -20 c8 -20,-10 -5,0 -30 c4 -10,4 -20,-3 -30 c-4 -10,15 0,4 -25 c-7 -12,-6 -28,-5 -32 h-7.3 c27 80,-20 30,3 76 c8 15,-8 5,-1 20 c12 27,-10 10,4 38 c7 13,10 20,3 24 c-20 8,3 23,-2.2 35" fill="#d1d5dc"/>
        </g>
      </svg>
      <svg className="absolute top-0" xmlns="http://w3.org" viewBox="0 0 50 36" width="160px">
        <g className="coffee-smoke">
          <path d="M19,324 c-7 -18,8 -5,-2 -25 c-10 -20,20 -5,10 -31 c-3 -5,-3 -10,3 -20 c8 -20,-10 -5,0 -30 c4 -10,4 -20,-3 -30 c-4 -10,15 0,4 -25 c-7 -12,-6 -28,-5 -32 h-7.3 c27 80,-20 30,3 76 c8 15,-8 5,-1 20 c12 27,-10 10,4 38 c7 13,10 20,3 24 c-20 8,3 23,-2.2 35" fill="#d1d5dc"/>
        </g>
      </svg>
    </div>
  )
}