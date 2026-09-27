import{I as e,O as t,f as n}from"./Ca5TY7vb.js";import{t as r}from"./CRHlWn3X.js";import{o as i}from"#entry";import{t as a}from"./BAPwTHkl.js";var o=i.extend({name:`skeleton`,style:`
    .p-skeleton {
        display: block;
        overflow: hidden;
        background: dt('skeleton.background');
        border-radius: dt('skeleton.border.radius');
    }

    .p-skeleton::after {
        content: '';
        animation: p-skeleton-animation 1.2s infinite;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), dt('skeleton.animation.background'), rgba(255, 255, 255, 0));
    }

    [dir='rtl'] .p-skeleton::after {
        animation-name: p-skeleton-animation-rtl;
    }

    .p-skeleton-circle {
        border-radius: 50%;
    }

    .p-skeleton-animation-none::after {
        animation: none;
    }

    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes p-skeleton-animation-rtl {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }
`,classes:{root:function(e){var t=e.props;return[`p-skeleton p-component`,{"p-skeleton-circle":t.shape===`circle`,"p-skeleton-animation-none":t.animation===`none`}]}},inlineStyles:{root:{position:`relative`}}}),s={name:`BaseSkeleton`,extends:a,props:{shape:{type:String,default:`rectangle`},size:{type:String,default:null},width:{type:String,default:`100%`},height:{type:String,default:`1rem`},borderRadius:{type:String,default:null},animation:{type:String,default:`wave`}},style:o,provide:function(){return{$pcSkeleton:this,$parentInstance:this}}};function c(e){"@babel/helpers - typeof";return c=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},c(e)}function l(e,t,n){return(t=u(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){var t=d(e,`string`);return c(t)==`symbol`?t:t+``}function d(e,t){if(c(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(c(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var f={name:`Skeleton`,extends:s,inheritAttrs:!1,computed:{containerStyle:function(){return this.size?{width:this.size,height:this.size,borderRadius:this.borderRadius}:{width:this.width,height:this.height,borderRadius:this.borderRadius}},dataP:function(){return r(l({},this.shape,this.shape))}}},p=[`data-p`];function m(r,i,a,o,s,c){return e(),n(`div`,t({class:r.cx(`root`),style:[r.sx(`root`),c.containerStyle],"aria-hidden":`true`},r.ptmi(`root`),{"data-p":c.dataP}),null,16,p)}f.render=m;export{f as default};