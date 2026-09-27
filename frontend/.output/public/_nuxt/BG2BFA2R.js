import{I as e,O as t,f as n,z as r}from"./Ca5TY7vb.js";import{Ht as i,o as a}from"#entry";import{t as o}from"./BAPwTHkl.js";var s=a.extend({name:`inplace`,style:`
    .p-inplace-display {
        display: inline-block;
        cursor: pointer;
        border: 1px solid transparent;
        padding: dt('inplace.padding');
        border-radius: dt('inplace.border.radius');
        transition:
            background dt('inplace.transition.duration'),
            color dt('inplace.transition.duration'),
            outline-color dt('inplace.transition.duration'),
            box-shadow dt('inplace.transition.duration');
        outline-color: transparent;
    }

    .p-inplace-display:not(.p-disabled):hover {
        background: dt('inplace.display.hover.background');
        color: dt('inplace.display.hover.color');
    }

    .p-inplace-display:focus-visible {
        box-shadow: dt('inplace.focus.ring.shadow');
        outline: dt('inplace.focus.ring.width') dt('inplace.focus.ring.style') dt('inplace.focus.ring.color');
        outline-offset: dt('inplace.focus.ring.offset');
    }

    .p-inplace-content {
        display: block;
    }
`,classes:{root:`p-inplace p-component`,display:function(e){return[`p-inplace-display`,{"p-disabled":e.props.disabled}]},content:`p-inplace-content`}}),c={name:`Inplace`,extends:{name:`BaseInplace`,extends:o,props:{active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},displayProps:{type:null,default:null}},style:s,provide:function(){return{$pcInplace:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`open`,`close`,`update:active`],data:function(){return{d_active:this.active}},watch:{active:function(e){this.d_active=e}},methods:{open:function(e){this.disabled||(this.d_active=!0,this.$emit(`open`,e),this.$emit(`update:active`,!0))},close:function(e){var t=this;this.d_active=!1,this.$emit(`close`,e),this.$emit(`update:active`,!1),setTimeout(function(){t.$refs.display.focus()},0)}}};function l(e){"@babel/helpers - typeof";return l=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},l(e)}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?u(Object(n),!0).forEach(function(t){f(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function f(e,t,n){return(t=p(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e){var t=m(e,`string`);return l(t)==`symbol`?t:t+``}function m(e,t){if(l(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(l(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var h=[`tabindex`,`data-p-disabled`];function g(a,o,s,c,l,u){return e(),n(`div`,t({class:a.cx(`root`),"aria-live":`polite`},a.ptmi(`root`)),[l.d_active?(e(),n(`div`,t({key:1,class:a.cx(`content`)},a.ptm(`content`)),[r(a.$slots,`content`,{closeCallback:u.close})],16)):(e(),n(`div`,t({key:0,ref:`display`,class:a.cx(`display`),tabindex:a.$attrs.tabindex||`0`,role:`button`,onClick:o[0]||=function(){return u.open&&u.open.apply(u,arguments)},onKeydown:o[1]||=i(function(){return u.open&&u.open.apply(u,arguments)},[`enter`]),"data-p-disabled":a.disabled},d(d({},a.displayProps),a.ptm(`display`))),[r(a.$slots,`display`)],16,h))],16)}c.render=g;export{c as default};