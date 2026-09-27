import{H as e,I as t,O as n,d as r,f as i,u as a,z as o}from"./Ca5TY7vb.js";import{o as s}from"#entry";import{t as c}from"./BAPwTHkl.js";import{t as l}from"./BuNLkdqI.js";import{t as u}from"./CESKisby.js";import{n as d,t as f}from"./BxwZlpR5.js";var p=s.extend({name:`inlinemessage`,style:`
    .p-inlinemessage {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: dt('inlinemessage.padding');
        border-radius: dt('inlinemessage.border.radius');
        gap: dt('inlinemessage.gap');
    }

    .p-inlinemessage-text {
        font-weight: dt('inlinemessage.text.font.weight');
    }

    .p-inlinemessage-icon {
        flex-shrink: 0;
        font-size: dt('inlinemessage.icon.size');
        width: dt('inlinemessage.icon.size');
        height: dt('inlinemessage.icon.size');
    }

    .p-inlinemessage-icon-only .p-inlinemessage-text {
        visibility: hidden;
        width: 0;
    }

    .p-inlinemessage-info {
        background: dt('inlinemessage.info.background');
        border: 1px solid dt('inlinemessage.info.border.color');
        color: dt('inlinemessage.info.color');
        box-shadow: dt('inlinemessage.info.shadow');
    }

    .p-inlinemessage-info .p-inlinemessage-icon {
        color: dt('inlinemessage.info.color');
    }

    .p-inlinemessage-success {
        background: dt('inlinemessage.success.background');
        border: 1px solid dt('inlinemessage.success.border.color');
        color: dt('inlinemessage.success.color');
        box-shadow: dt('inlinemessage.success.shadow');
    }

    .p-inlinemessage-success .p-inlinemessage-icon {
        color: dt('inlinemessage.success.color');
    }

    .p-inlinemessage-warn {
        background: dt('inlinemessage.warn.background');
        border: 1px solid dt('inlinemessage.warn.border.color');
        color: dt('inlinemessage.warn.color');
        box-shadow: dt('inlinemessage.warn.shadow');
    }

    .p-inlinemessage-warn .p-inlinemessage-icon {
        color: dt('inlinemessage.warn.color');
    }

    .p-inlinemessage-error {
        background: dt('inlinemessage.error.background');
        border: 1px solid dt('inlinemessage.error.border.color');
        color: dt('inlinemessage.error.color');
        box-shadow: dt('inlinemessage.error.shadow');
    }

    .p-inlinemessage-error .p-inlinemessage-icon {
        color: dt('inlinemessage.error.color');
    }

    .p-inlinemessage-secondary {
        background: dt('inlinemessage.secondary.background');
        border: 1px solid dt('inlinemessage.secondary.border.color');
        color: dt('inlinemessage.secondary.color');
        box-shadow: dt('inlinemessage.secondary.shadow');
    }

    .p-inlinemessage-secondary .p-inlinemessage-icon {
        color: dt('inlinemessage.secondary.color');
    }

    .p-inlinemessage-contrast {
        background: dt('inlinemessage.contrast.background');
        border: 1px solid dt('inlinemessage.contrast.border.color');
        color: dt('inlinemessage.contrast.color');
        box-shadow: dt('inlinemessage.contrast.shadow');
    }

    .p-inlinemessage-contrast .p-inlinemessage-icon {
        color: dt('inlinemessage.contrast.color');
    }
`,classes:{root:function(e){var t=e.props,n=e.instance;return[`p-inlinemessage p-component p-inlinemessage-`+t.severity,{"p-inlinemessage-icon-only":!n.$slots.default}]},icon:function(e){return[`p-inlinemessage-icon`,e.props.icon]},text:`p-inlinemessage-text`}}),m={name:`InlineMessage`,extends:{name:`BaseInlineMessage`,extends:c,props:{severity:{type:String,default:`error`},icon:{type:String,default:void 0}},style:p,provide:function(){return{$pcInlineMessage:this,$parentInstance:this}}},inheritAttrs:!1,timeout:null,data:function(){return{visible:!0}},mounted:function(){var e=this;this.sticky||setTimeout(function(){e.visible=!1},this.life)},computed:{iconComponent:function(){return{info:f,success:u,warn:d,error:l}[this.severity]}}};function h(s,c,l,u,d,f){return t(),i(`div`,n({role:`alert`,"aria-live":`assertive`,"aria-atomic":`true`,class:s.cx(`root`)},s.ptmi(`root`)),[o(s.$slots,`icon`,{},function(){return[(t(),a(e(s.icon?`span`:f.iconComponent),n({class:s.cx(`icon`)},s.ptm(`icon`)),null,16,[`class`]))]}),s.$slots.default?(t(),i(`div`,n({key:0,class:s.cx(`text`)},s.ptm(`text`)),[o(s.$slots,`default`)],16)):r(``,!0)],16)}m.render=h;export{m as default};