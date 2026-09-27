import{I as e,O as t,f as n,l as r}from"./Ca5TY7vb.js";import{o as i}from"#entry";import{t as a}from"./BAPwTHkl.js";var o=i.extend({name:`progressspinner`,style:`
    .p-progressspinner {
        position: relative;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        display: inline-block;
    }

    .p-progressspinner::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .p-progressspinner-spin {
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        animation: p-progressspinner-rotate 2s linear infinite;
    }

    .p-progressspinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        stroke: dt('progressspinner.colorOne');
        animation:
            p-progressspinner-dash 1.5s ease-in-out infinite,
            p-progressspinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progressspinner-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes p-progressspinner-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progressspinner-color {
        100%,
        0% {
            stroke: dt('progressspinner.color.one');
        }
        40% {
            stroke: dt('progressspinner.color.two');
        }
        66% {
            stroke: dt('progressspinner.color.three');
        }
        80%,
        90% {
            stroke: dt('progressspinner.color.four');
        }
    }
`,classes:{root:`p-progressspinner`,spin:`p-progressspinner-spin`,circle:`p-progressspinner-circle`}}),s={name:`ProgressSpinner`,extends:{name:`BaseProgressSpinner`,extends:a,props:{strokeWidth:{type:String,default:`2`},fill:{type:String,default:`none`},animationDuration:{type:String,default:`2s`}},style:o,provide:function(){return{$pcProgressSpinner:this,$parentInstance:this}}},inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},c=[`fill`,`stroke-width`];function l(i,a,o,s,l,u){return e(),n(`div`,t({class:i.cx(`root`),role:`progressbar`},i.ptmi(`root`)),[(e(),n(`svg`,t({class:i.cx(`spin`),viewBox:`25 25 50 50`,style:u.svgStyle},i.ptm(`spin`)),[r(`circle`,t({class:i.cx(`circle`),cx:`50`,cy:`50`,r:`20`,fill:i.fill,"stroke-width":i.strokeWidth,strokeMiterlimit:`10`},i.ptm(`circle`)),null,16,c)],16))],16)}s.render=l;export{s as default};