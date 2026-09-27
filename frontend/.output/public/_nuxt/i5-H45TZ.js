import{t as e}from"./DK3Fl9T5.js";import{B as t,Dt as n,I as r,O as i,d as a,f as o,l as s,u as c,z as l}from"./Ca5TY7vb.js";import{t as u}from"./CRHlWn3X.js";import{Dt as d,Mt as f,o as p}from"#entry";import{t as m}from"./DA01FRxN.js";import{t as h}from"./CESKisby.js";import{t as g}from"./P6At4ZqW.js";var _=p.extend({name:`checkbox`,style:`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-checkbox p-component`,{"p-checkbox-checked":t.checked,"p-disabled":n.disabled,"p-invalid":t.$pcCheckboxGroup?t.$pcCheckboxGroup.$invalid:t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-checkbox-sm p-inputfield-sm":n.size===`small`,"p-checkbox-lg p-inputfield-lg":n.size===`large`}]},box:`p-checkbox-box`,input:`p-checkbox-input`,icon:`p-checkbox-icon`}}),v=e({default:()=>A}),y={name:`BaseCheckbox`,extends:m,props:{value:null,binary:Boolean,indeterminate:{type:Boolean,default:!1},trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:_,provide:function(){return{$pcCheckbox:this,$parentInstance:this}}};function b(e){"@babel/helpers - typeof";return b=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},b(e)}function x(e,t,n){return(t=S(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function S(e){var t=C(e,`string`);return b(t)==`symbol`?t:t+``}function C(e,t){if(b(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(b(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function w(e){return O(e)||D(e)||E(e)||T()}function T(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function E(e,t){if(e){if(typeof e==`string`)return k(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?k(e,t):void 0}}function D(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function O(e){if(Array.isArray(e))return k(e)}function k(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var A={name:`Checkbox`,extends:y,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`update:indeterminate`],inject:{$pcCheckboxGroup:{default:void 0}},data:function(){return{d_indeterminate:this.indeterminate}},watch:{indeterminate:function(e){this.d_indeterminate=e,this.updateIndeterminate()}},mounted:function(){this.updateIndeterminate()},updated:function(){this.updateIndeterminate()},methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{checked:this.checked,indeterminate:this.d_indeterminate,disabled:this.disabled}})},onChange:function(e){var t=this;if(!this.disabled&&!this.readonly){var n=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value,r=this.binary?this.d_indeterminate?this.trueValue:this.checked?this.falseValue:this.trueValue:this.checked||this.d_indeterminate?n.filter(function(e){return!d(e,t.value)}):n?[].concat(w(n),[this.value]):[this.value];this.d_indeterminate&&(this.d_indeterminate=!1,this.$emit(`update:indeterminate`,this.d_indeterminate)),this.$pcCheckboxGroup?this.$pcCheckboxGroup.writeValue(r,e):this.writeValue(r,e),this.$emit(`change`,e)}},onFocus:function(e){this.$emit(`focus`,e)},onBlur:function(e){var t,n;this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n,e)},updateIndeterminate:function(){this.$refs.input&&(this.$refs.input.indeterminate=this.d_indeterminate)}},computed:{groupName:function(){return this.$pcCheckboxGroup?this.$pcCheckboxGroup.groupName:this.$formName},checked:function(){var e=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value;return this.d_indeterminate?!1:this.binary?e===this.trueValue:f(this.value,e)},dataP:function(){return u(x({invalid:this.$invalid,checked:this.checked,disabled:this.disabled,filled:this.$variant===`filled`},this.size,this.size))}},components:{CheckIcon:h,MinusIcon:g}},j=[`data-p-checked`,`data-p-indeterminate`,`data-p-disabled`,`data-p`],M=[`id`,`value`,`name`,`checked`,`tabindex`,`disabled`,`readonly`,`required`,`aria-labelledby`,`aria-label`,`aria-invalid`],N=[`data-p`];function P(e,u,d,f,p,m){var h=t(`CheckIcon`),g=t(`MinusIcon`);return r(),o(`div`,i({class:e.cx(`root`)},m.getPTOptions(`root`),{"data-p-checked":m.checked,"data-p-indeterminate":p.d_indeterminate||void 0,"data-p-disabled":e.disabled,"data-p":m.dataP}),[s(`input`,i({ref:`input`,id:e.inputId,type:`checkbox`,class:[e.cx(`input`),e.inputClass],style:e.inputStyle,value:e.value,name:m.groupName,checked:m.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,required:e.required,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-invalid":e.invalid||void 0,onFocus:u[0]||=function(){return m.onFocus&&m.onFocus.apply(m,arguments)},onBlur:u[1]||=function(){return m.onBlur&&m.onBlur.apply(m,arguments)},onChange:u[2]||=function(){return m.onChange&&m.onChange.apply(m,arguments)}},m.getPTOptions(`input`)),null,16,M),s(`div`,i({class:e.cx(`box`)},m.getPTOptions(`box`),{"data-p":m.dataP}),[l(e.$slots,`icon`,{checked:m.checked,indeterminate:p.d_indeterminate,class:n(e.cx(`icon`)),dataP:m.dataP},function(){return[m.checked?(r(),c(h,i({key:0,class:e.cx(`icon`)},m.getPTOptions(`icon`),{"data-p":m.dataP}),null,16,[`class`,`data-p`])):p.d_indeterminate?(r(),c(g,i({key:1,class:e.cx(`icon`)},m.getPTOptions(`icon`),{"data-p":m.dataP}),null,16,[`class`,`data-p`])):a(``,!0)]})],16,N)],16,j)}A.render=P;export{A as n,v as t};