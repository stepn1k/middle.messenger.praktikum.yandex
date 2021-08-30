export default `
<div class="error">
    <div class="error__image">
        <svg height="70pt" viewBox="0 -19 512 512" width="70pt" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="512" y1="237.402" y2="237.402">
            <stop offset="0" stop-color="#87f1fc"/>
            <stop offset=".2557" stop-color="#7fd4fb"/>
            <stop offset=".5295" stop-color="#78bcfb"/>
            <stop offset=".7844" stop-color="#74aefa"/>
            <stop offset="1" stop-color="#73a9fa"/>
         </linearGradient>
    <path d="m256.011719 395.804688c-11.046875 0-20.007813-8.953126-20.007813-20 0-11.046876 8.949219-20 19.996094-20h.011719c11.042969 0 20 8.953124 20 20 0 11.046874-8.957031 20-20 20zm19.988281-90v-124c0-11.046876-8.953125-20-20-20s-20 8.953124-20 20v124c0 11.046874 8.953125 20 20 20s20-8.953126 20-20zm236 140.449218v-2.949218c0-4.785157-1.214844-9.53125-3.515625-13.726563l-34.761719-63.390625c-5.3125-9.683594-17.46875-13.230469-27.15625-7.917969-9.683594 5.308594-13.230468 17.46875-7.917968 27.152344l27.082031 49.382813h-419.460938l209.730469-382.441407 137.132812 250.058594c5.308594 9.683594 17.46875 13.230469 27.152344 7.917969s13.230469-17.46875 7.917969-27.152344l-147.171875-268.367188c-5.011719-9.140624-14.605469-14.820312-25.03125-14.820312s-20.019531 5.679688-25.03125 14.820312l-227.453125 414.757813c-2.300781 4.195313-3.515625 8.941406-3.515625 13.726563v2.949218c0 15.742188 12.808594 28.550782 28.550781 28.550782h454.898438c15.742187 0 28.550781-12.808594 28.550781-28.550782zm0 0" fill="url(#a)"/>
</svg>
    </div>
    <h2 class="error__title">
        {{ title }}
    </h2>
    <h3 class="error__subtitle">
        {{ subtitle }}
    </h3>
        {{ button }}
</div>`;
