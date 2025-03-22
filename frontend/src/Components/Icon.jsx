import React from "react";

const ThumbsUp = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z"></path>
  </svg>
);
const ThumbsDown = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z"></path>
  </svg>
);
const RateReview = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M0 0h24v24H0zm15.35 6.41-1.77-1.77c-.2-.2-.51-.2-.71 0L6 11.53V14h2.47l6.88-6.88c.2-.19.2-.51 0-.71z"
      fill="none"
    />
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 14v-2.47l6.88-6.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14H6zm12 0h-7.5l2-2H18v2z" />
  </svg>
);
const Crown = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 576 512"
    {...props}
  >
    <path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z" />
  </svg>
);
const RocketLaunch = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83L11.17 17zm6.48-2.19c-2.29 2.04-5.58 3.44-5.89 3.57L13.31 22l4.05-4.05c.47-.47.68-1.15.55-1.81l-.26-1.33zM9 18c0 .83-.34 1.58-.88 2.12C6.94 21.3 2 22 2 22s.7-4.94 1.88-6.12A2.996 2.996 0 0 1 9 18zm4-9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
  </svg>
);

const Skull = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M416 400V464C416 490.5 394.5 512 368 512H320V464C320 455.2 312.8 448 304 448C295.2 448 288 455.2 288 464V512H224V464C224 455.2 216.8 448 208 448C199.2 448 192 455.2 192 464V512H144C117.5 512 96 490.5 96 464V400C96 399.6 96 399.3 96.01 398.9C37.48 357.8 0 294.7 0 224C0 100.3 114.6 0 256 0C397.4 0 512 100.3 512 224C512 294.7 474.5 357.8 415.1 398.9C415.1 399.3 416 399.6 416 400V400zM160 192C124.7 192 96 220.7 96 256C96 291.3 124.7 320 160 320C195.3 320 224 291.3 224 256C224 220.7 195.3 192 160 192zM352 320C387.3 320 416 291.3 416 256C416 220.7 387.3 192 352 192C316.7 192 288 220.7 288 256C288 291.3 316.7 320 352 320z" />
  </svg>
);
const Twitter = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 448 512"
    {...props}
  >
    <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"></path>
  </svg>
);
const Discord = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 640 512"
    {...props}
  >
    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
  </svg>
);
const Telegram = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 496 512"
    {...props}
  >
    <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"></path>
  </svg>
);
const YouTube = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 576 512"
    {...props}
  >
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
  </svg>
);
const Verified = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path>
  </svg>
);
const Check = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 64 64"
    {...props}
  >
    <path
      d="M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50
	l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z"
    />
  </svg>
);
const Error = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
  </svg>
);

const AccountBox = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"></path>
  </svg>
);

const AddKOL = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z"></path>
  </svg>
);
const X = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 300 300"
    {...props}
  >
    <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
  </svg>
);
const KOLlogo = ({ color, width, height }) => <svg />;
const Copy = ({ color, width, height, style, ...props }) => (
  <svg
    style={{
      color,
      fill: color,
      maxWidth: width,
      height,
      cursor: "pointer",
      ...style,
    }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
  </svg>
);
const FolderUpload = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zM9.41 14.42 11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01l1.41 1.41z"></path>
  </svg>
);
const VideoCamera = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zM10 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8H6v-.57c0-.81.48-1.53 1.22-1.85a6.95 6.95 0 0 1 5.56 0A2.01 2.01 0 0 1 14 15.43V16z"></path>
  </svg>
);
const Sort = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
  </svg>
);
const Mail = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path>
  </svg>
);
const Login = ({ color, width, height, style, ...props }) => (
  <svg
    style={{ color, fill: color, maxWidth: width, height, ...style }}
    viewBox="0 0 499.1 499.1"
    xmlSpace="preserve"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g>
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M0,249.6c0,9.5,7.7,17.2,17.2,17.2h327.6l-63.9,63.8c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5 l93.1-93.1c6.7-6.7,6.7-17.6,0-24.3l-93.1-93.1c-6.7-6.7-17.6-6.7-24.3,0c-6.7,6.7-6.7,17.6,0,24.3l63.8,63.8H17.2 C7.7,232.5,0,240.1,0,249.6z"></path>{" "}
            <path d="M396.4,494.2c56.7,0,102.7-46.1,102.7-102.8V107.7C499.1,51,453,4.9,396.4,4.9H112.7C56,4.9,10,51,10,107.7V166 c0,9.5,7.7,17.1,17.1,17.1c9.5,0,17.2-7.7,17.2-17.1v-58.3c0-37.7,30.7-68.5,68.4-68.5h283.7c37.7,0,68.4,30.7,68.4,68.5v283.7 c0,37.7-30.7,68.5-68.4,68.5H112.7c-37.7,0-68.4-30.7-68.4-68.5v-57.6c0-9.5-7.7-17.2-17.2-17.2S10,324.3,10,333.8v57.6 c0,56.7,46.1,102.8,102.7,102.8H396.4L396.4,494.2z"></path>{" "}
          </g>{" "}
        </g>{" "}
        <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
        <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
      </g>{" "}
    </g>
  </svg>
);
const Icon = ({ name, color, width, height, ...props }) => {
  switch (name) {
    case "ThumbsUp":
      return (
        <ThumbsUp color={color} width={width} height={height} {...props} />
      );
    case "ThumbsDown":
      return (
        <ThumbsDown color={color} width={width} height={height} {...props} />
      );
    case "RateReview":
      return (
        <RateReview color={color} width={width} height={height} {...props} />
      );
    case "Crown":
      return <Crown color={color} width={width} height={height} {...props} />;
    case "RocketLaunch":
      return (
        <RocketLaunch color={color} width={width} height={height} {...props} />
      );
    case "Skull":
      return <Skull color={color} width={width} height={height} {...props} />;
    case "Twitter":
      return <Twitter color={color} width={width} height={height} {...props} />;
    case "Discord":
      return <Discord color={color} width={width} height={height} {...props} />;
    case "Telegram":
      return (
        <Telegram color={color} width={width} height={height} {...props} />
      );
    case "YouTube":
      return <YouTube color={color} width={width} height={height} {...props} />;
    case "FolderUpload":
      return (
        <FolderUpload color={color} width={width} height={height} {...props} />
      );
    case "Verified":
      return (
        <Verified color={color} width={width} height={height} {...props} />
      );
    case "Check":
      return <Check color={color} width={width} height={height} {...props} />;
    case "Error":
      return <Error color={color} width={width} height={height} {...props} />;
    case "AccountBox":
      return (
        <AccountBox color={color} width={width} height={height} {...props} />
      );
    case "AddKOL":
      return <AddKOL color={color} width={width} height={height} {...props} />;
    case "X":
      return <X color={color} width={width} height={height} {...props} />;
    case "KOLlogo":
      return <KOLlogo color={color} width={width} height={height} {...props} />;
    case "VideoCamera":
      return (
        <VideoCamera color={color} width={width} height={height} {...props} />
      );
    case "Copy":
      return <Copy color={color} width={width} height={height} {...props} />;
    case "Sort":
      return <Sort color={color} width={width} height={height} {...props} />;
    case "Login":
      return <Login color={color} width={width} height={height} {...props} />;
    case "Mail":
      return <Mail color={color} width={width} height={height} {...props} />;
    default:
      return null;
  }
};

export default Icon;
