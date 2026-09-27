import{B as e,L as t,M as n,P as r,R as i,T as a,g as o,j as s,o as c,ot as l}from"#entry";import{t as u}from"./DRg91-rX.js";var d=c.extend({name:`ripple-directive`,style:`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,classes:{root:`p-ink`}}),f=u.extend({style:d});function p(e){"@babel/helpers - typeof";return p=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},p(e)}function m(e){return v(e)||_(e)||g(e)||h()}function h(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function g(e,t){if(e){if(typeof e==`string`)return y(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}function _(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function v(e){if(Array.isArray(e))return y(e)}function y(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function b(e,t,n){return(t=x(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function x(e){var t=S(e,`string`);return p(t)==`symbol`?t:t+``}function S(e,t){if(p(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(p(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var C=f.extend(`ripple`,{watch:{"config.ripple":function(e){e?(this.createRipple(this.$host),this.bindEvents(this.$host),this.$host.setAttribute(`data-pd-ripple`,!0),this.$host.style.overflow=`hidden`,this.$host.style.position=`relative`):(this.remove(this.$host),this.$host.removeAttribute(`data-pd-ripple`))}},unmounted:function(e){this.remove(e)},timeout:void 0,methods:{bindEvents:function(e){e.addEventListener(`mousedown`,this.onMouseDown.bind(this))},unbindEvents:function(e){e.removeEventListener(`mousedown`,this.onMouseDown.bind(this))},createRipple:function(e){var t=this.getInk(e);t||(t=i(`span`,b(b({role:`presentation`,"aria-hidden":!0,"data-p-ink":!0,"data-p-ink-active":!1,class:!this.isUnstyled()&&this.cx(`root`),onAnimationEnd:this.onAnimationEnd.bind(this)},this.$attrSelector,``),`p-bind`,this.ptm(`root`))),e.appendChild(t),this.$el=t)},remove:function(e){var t=this.getInk(e);t&&(this.$host.style.overflow=``,this.$host.style.position=``,this.unbindEvents(e),t.removeEventListener(`animationend`,this.onAnimationEnd),t.remove())},onMouseDown:function(n){var i=this,c=n.currentTarget,u=this.getInk(c);if(u&&getComputedStyle(u,null).display!==`none`){if(!this.isUnstyled()&&s(u,`p-ink-active`),u.setAttribute(`data-p-ink-active`,`false`),!t(u)&&!r(u)){var d=Math.max(l(c),o(c));u.style.height=d+`px`,u.style.width=d+`px`}var f=a(c),p=n.pageX-f.left+document.body.scrollTop-r(u)/2,m=n.pageY-f.top+document.body.scrollLeft-t(u)/2;u.style.top=m+`px`,u.style.left=p+`px`,!this.isUnstyled()&&e(u,`p-ink-active`),u.setAttribute(`data-p-ink-active`,`true`),this.timeout=setTimeout(function(){u&&(!i.isUnstyled()&&s(u,`p-ink-active`),u.setAttribute(`data-p-ink-active`,`false`))},401)}},onAnimationEnd:function(e){this.timeout&&clearTimeout(this.timeout),!this.isUnstyled()&&s(e.currentTarget,`p-ink-active`),e.currentTarget.setAttribute(`data-p-ink-active`,`false`)},getInk:function(e){return e&&e.children?m(e.children).find(function(e){return n(e,`data-pc-name`)===`ripple`}):void 0}}});export{C as t};