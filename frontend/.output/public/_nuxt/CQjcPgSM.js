import{At as e,B as t,I as n,O as r,R as i,X as a,f as o,h as s,l as c,r as l,u,z as d}from"./Ca5TY7vb.js";import{t as f}from"./CRHlWn3X.js";import{Dt as p,jt as m,o as h}from"#entry";import{t as g}from"./BnSyHpKn.js";import{t as _}from"./BJOLUJb4.js";import v from"./COt-g7RG.js";var y=h.extend({name:`selectbutton`,style:`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`,classes:{root:function(e){var t=e.props;return[`p-selectbutton p-component`,{"p-invalid":e.instance.$invalid,"p-selectbutton-fluid":t.fluid}]}}}),b={name:`BaseSelectButton`,extends:_,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,multiple:Boolean,allowEmpty:{type:Boolean,default:!0},dataKey:null,ariaLabelledby:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:y,provide:function(){return{$pcSelectButton:this,$parentInstance:this}}};function x(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=w(e))||t){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function S(e){return E(e)||T(e)||w(e)||C()}function C(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function w(e,t){if(e){if(typeof e==`string`)return D(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}function T(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function E(e){if(Array.isArray(e))return D(e)}function D(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var O={name:`SelectButton`,extends:b,inheritAttrs:!1,emits:[`change`],methods:{getOptionLabel:function(e){return this.optionLabel?m(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?m(e,this.optionValue):e},getOptionRenderKey:function(e){return this.dataKey?m(e,this.dataKey):this.getOptionLabel(e)},isOptionDisabled:function(e){return this.optionDisabled?m(e,this.optionDisabled):!1},isOptionReadonly:function(e){if(this.allowEmpty)return!1;var t=this.isSelected(e);return this.multiple?t&&this.d_value.length===1:t},onOptionSelect:function(e,t,n){var r=this;if(!(this.disabled||this.isOptionDisabled(t)||this.isOptionReadonly(t))){var i=this.isSelected(t),a=this.getOptionValue(t),o;if(this.multiple){if(i){if(o=this.d_value.filter(function(e){return!p(e,a,r.equalityKey)}),!this.allowEmpty&&o.length===0)return}else o=this.d_value?[].concat(S(this.d_value),[a]):[a]}else{if(i&&!this.allowEmpty)return;o=i?null:a}this.writeValue(o,e),this.$emit(`change`,{originalEvent:e,value:o})}},isSelected:function(e){var t=!1,n=this.getOptionValue(e);if(this.multiple){if(this.d_value){var r=x(this.d_value),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;if(p(a,n,this.equalityKey)){t=!0;break}}}catch(e){r.e(e)}finally{r.f()}}}else t=p(this.d_value,n,this.equalityKey);return t}},computed:{equalityKey:function(){return this.optionValue?null:this.dataKey},dataP:function(){return f({invalid:this.$invalid})}},directives:{ripple:g},components:{ToggleButton:v}},k=[`aria-labelledby`,`data-p`];function A(f,p,m,h,g,_){var v=t(`ToggleButton`);return n(),o(`div`,r({class:f.cx(`root`),role:`group`,"aria-labelledby":f.ariaLabelledby},f.ptmi(`root`),{"data-p":_.dataP}),[(n(!0),o(l,null,i(f.options,function(t,i){return n(),u(v,{key:_.getOptionRenderKey(t),modelValue:_.isSelected(t),onLabel:_.getOptionLabel(t),offLabel:_.getOptionLabel(t),disabled:f.disabled||_.isOptionDisabled(t),unstyled:f.unstyled,size:f.size,readonly:_.isOptionReadonly(t),onChange:function(e){return _.onOptionSelect(e,t,i)},pt:f.ptm(`pcToggleButton`)},s({_:2},[f.$slots.option?{name:`default`,fn:a(function(){return[d(f.$slots,`option`,{option:t,index:i},function(){return[c(`span`,r({ref_for:!0},f.ptm(`pcToggleButton`).label),e(_.getOptionLabel(t)),17)]})]}),key:`0`}:void 0]),1032,[`modelValue`,`onLabel`,`offLabel`,`disabled`,`unstyled`,`size`,`readonly`,`onChange`,`pt`])}),128))],16,k)}O.render=A;export{O as default};