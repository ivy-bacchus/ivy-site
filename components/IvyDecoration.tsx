/** 装飾用SVGコンポーネント — アイビー（ツタ）とチョコレートの装飾 */

export function IvyVineTopLeft() {
  return (
    <svg
      className="fixed top-0 left-0 w-52 md:w-72 pointer-events-none select-none z-0"
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main stem */}
      <path d="M10 10 C30 60 10 120 40 180 C60 230 30 280 55 315"
        stroke="#002c06" strokeWidth="2" strokeOpacity="0.18" fill="none" strokeLinecap="round"/>
      {/* Branch right */}
      <path d="M28 80 C60 70 85 50 90 30"
        stroke="#002c06" strokeWidth="1.5" strokeOpacity="0.14" fill="none" strokeLinecap="round"/>
      {/* Branch left */}
      <path d="M38 160 C5 155 -5 130 2 110"
        stroke="#002c06" strokeWidth="1.5" strokeOpacity="0.14" fill="none" strokeLinecap="round"/>

      {/* Ivy leaf 1 */}
      <path d="M90 30 C85 15 70 10 65 22 C60 34 75 42 90 30Z"
        fill="#002c06" fillOpacity="0.12"/>
      <path d="M90 30 C100 20 110 25 105 38 C100 50 88 44 90 30Z"
        fill="#002c06" fillOpacity="0.10"/>

      {/* Ivy leaf 2 */}
      <path d="M6 110 C-8 100 -12 82 0 78 C12 74 16 90 6 110Z"
        fill="#002c06" fillOpacity="0.12"/>
      <path d="M6 110 C0 95 8 82 18 88 C28 94 20 108 6 110Z"
        fill="#002c06" fillOpacity="0.10"/>

      {/* Ivy leaf 3 */}
      <path d="M55 315 C42 300 40 278 55 275 C70 272 72 292 55 315Z"
        fill="#002c06" fillOpacity="0.12"/>
      <path d="M55 315 C68 305 78 310 75 325 C72 340 58 332 55 315Z"
        fill="#002c06" fillOpacity="0.10"/>

      {/* Small curling tendrils */}
      <path d="M30 130 C38 125 42 115 38 108" stroke="#002c06" strokeWidth="1"
        strokeOpacity="0.12" fill="none" strokeLinecap="round"/>
      <path d="M20 200 C12 195 8 182 15 177" stroke="#002c06" strokeWidth="1"
        strokeOpacity="0.12" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function IvyVineBottomRight() {
  return (
    <svg
      className="fixed bottom-0 right-0 w-52 md:w-72 pointer-events-none select-none z-0 rotate-180"
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 10 C30 60 10 120 40 180 C60 230 30 280 55 315"
        stroke="#002c06" strokeWidth="2" strokeOpacity="0.15" fill="none" strokeLinecap="round"/>
      <path d="M28 80 C60 70 85 50 90 30"
        stroke="#002c06" strokeWidth="1.5" strokeOpacity="0.12" fill="none" strokeLinecap="round"/>
      <path d="M90 30 C85 15 70 10 65 22 C60 34 75 42 90 30Z"
        fill="#002c06" fillOpacity="0.10"/>
      <path d="M90 30 C100 20 110 25 105 38 C100 50 88 44 90 30Z"
        fill="#002c06" fillOpacity="0.08"/>
      <path d="M38 160 C5 155 -5 130 2 110"
        stroke="#002c06" strokeWidth="1.5" strokeOpacity="0.12" fill="none" strokeLinecap="round"/>
      <path d="M6 110 C-8 100 -12 82 0 78 C12 74 16 90 6 110Z"
        fill="#002c06" fillOpacity="0.10"/>
      <path d="M6 110 C0 95 8 82 18 88 C28 94 20 108 6 110Z"
        fill="#002c06" fillOpacity="0.08"/>
    </svg>
  );
}

export function ChocolateDrop({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      style={style}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2 C6 8 2 14 2 20 C2 26.6 6.5 30 12 30 C17.5 30 22 26.6 22 20 C22 14 18 8 12 2Z"
        fill="#361f1a"
        fillOpacity="0.15"
      />
      <path
        d="M9 16 C9 14 10.5 13 12 14 C13 14.5 13.5 16 12.5 17"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
