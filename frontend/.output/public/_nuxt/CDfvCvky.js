import{t as e}from"./DK3Fl9T5.js";import{At as t,H as n,I as r,O as i,d as a,f as o,l as s,u as c,z as l}from"./Ca5TY7vb.js";import{t as u}from"./CRHlWn3X.js";import{o as d}from"#entry";import{t as f}from"./BAPwTHkl.js";var p=d.extend({name:`tag`,style:`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`,classes:{root:function(e){var t=e.props;return[`p-tag p-component`,{"p-tag-info":t.severity===`info`,"p-tag-success":t.severity===`success`,"p-tag-warn":t.severity===`warn`,"p-tag-danger":t.severity===`danger`,"p-tag-secondary":t.severity===`secondary`,"p-tag-contrast":t.severity===`contrast`,"p-tag-rounded":t.rounded}]},icon:`p-tag-icon`,label:`p-tag-label`}}),m=e({default:()=>b}),h={name:`BaseTag`,extends:f,props:{value:null,severity:null,rounded:Boolean,icon:String},style:p,provide:function(){return{$pcTag:this,$parentInstance:this}}};function g(e){"@babel/helpers - typeof";return g=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},g(e)}function _(e,t,n){return(t=v(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e){var t=y(e,`string`);return g(t)==`symbol`?t:t+``}function y(e,t){if(g(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(g(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var b={name:`Tag`,extends:h,inheritAttrs:!1,computed:{dataP:function(){return u(_({rounded:this.rounded},this.severity,this.severity))}}},x=[`data-p`];function S(e,u,d,f,p,m){return r(),o(`span`,i({class:e.cx(`root`),"data-p":m.dataP},e.ptmi(`root`)),[e.$slots.icon?(r(),c(n(e.$slots.icon),i({key:0,class:e.cx(`icon`)},e.ptm(`icon`)),null,16,[`class`])):e.icon?(r(),o(`span`,i({key:1,class:[e.cx(`icon`),e.icon]},e.ptm(`icon`)),null,16)):a(``,!0),e.value!=null||e.$slots.default?l(e.$slots,`default`,{key:2},function(){return[s(`span`,i({class:e.cx(`label`)},e.ptm(`label`)),t(e.value),17)]}):a(``,!0)],16,x)}b.render=S;export{m as n,b as t};