export const animation = [
    { name: 'roll-in-left', value: `@keyframes roll-in-left{0%{transform:translateX(-800px) rotate(-540deg);opacity:0}100%{transform:translateX(0) rotate(0deg);opacity:1}} div {animation:roll-in-left .6s ease-out }` },
    { name: 'rotate-in-center', value: `@keyframes rotate-in-center{0%{transform:rotate(-360deg);opacity:0}100%{transform:rotate(0);opacity:1}} div {animation:rotate-in-center .6s cubic-bezier(.25,.46,.45,.94) }` },
    { name: 'keyframes rotate-in-2-cw', value: `@keyframes rotate-in-2-cw{0%{transform:rotate(-45deg);opacity:0}100%{transform:rotate(0);opacity:1}} div{animation:rotate-in-2-cw .5s cubic-bezier(.25,.46,.45,.94) }` },
    { name: 'slide-in-left-bottom', value: `@keyframes slide-in-left-bottom{0%{transform:translateX(-1400px) translateY(800px);opacity:0}100%{transform:translateX(0) translateY(0);opacity:1}} div {animation:slide-in-left-bottom .7s cubic-bezier(.25,.46,.45,.94) }` },
    { name: 'animation:shake-horizontal', value: `@keyframes shake-horizontal{0%,100%{transform:translateX(0)}10%,30%,50%,70%{transform:translateX(-10px)}20%,40%,60%{transform:translateX(10px)}80%{transform:translateX(8px)}90%{transform:translateX(-8px)}} div {animation:shake-horizontal .8s cubic-bezier(.455,.03,.515,.955)}` },
    { name: 'bounce-top', value: `@keyframes bounce-top{0%{transform:translateY(-45px);animation-timing-function:ease-in;opacity:1}24%{opacity:1}40%{transform:translateY(-24px);animation-timing-function:ease-in}65%{transform:translateY(-12px);animation-timing-function:ease-in}82%{transform:translateY(-6px);animation-timing-function:ease-in}93%{transform:translateY(-4px);animation-timing-function:ease-in}25%,55%,75%,87%{transform:translateY(0);animation-timing-function:ease-out}100%{transform:translateY(0);animation-timing-function:ease-out;opacity:1}} div {animation:bounce-top .9s}` },
    { name: 'slide-in-bck-center', value: `@keyframes slide-in-bck-center{0%{transform:translateZ(600px);opacity:0}100%{transform:translateZ(0);opacity:1}} div {animation:slide-in-bck-center .7s cubic-bezier(.25,.46,.45,.94)}` },
    { name: 'blinking', value: `@keyframes blinking {50% {opacity:0}} div {animation:blinking 1s linear infinite; }` },
    // {name:'aa', value:`aa div bb`},
    // {name:'aa', value:`aa div bb`},

    // {name:'aa', value:`aa div bb`},
    //

]


