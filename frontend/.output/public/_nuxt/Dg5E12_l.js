import{B as e,Dt as t,H as n,I as r,O as i,X as a,d as o,u as s,z as c}from"./Ca5TY7vb.js";import{t as l}from"./cO8iUN-n.js";import{Rt as u,o as d,p as f}from"#entry";import{t as p}from"./BAPwTHkl.js";import{n as m}from"./Bg9ykqvC.js";import{t as h}from"./_IRxQUT4.js";var g=d.extend({name:`scrolltop`,style:`
    .p-scrolltop.p-button {
        position: fixed !important;
        inset-block-end: 20px;
        inset-inline-end: 20px;
    }

    .p-scrolltop-sticky.p-button {
        position: sticky !important;
        display: flex;
        margin-inline-start: auto;
    }

    .p-scrolltop-enter-from {
        opacity: 0;
    }

    .p-scrolltop-enter-active {
        transition: opacity 300ms;
    }

    .p-scrolltop-leave-to {
        opacity: 0;
    }

    .p-scrolltop-leave-active {
        transition: opacity 300ms;
    }
`,classes:{root:function(e){return[`p-scrolltop`,{"p-scrolltop-sticky":e.props.target!==`window`}]},icon:`p-scrolltop-icon`}}),_={name:`ScrollTop`,extends:{name:`BaseScrollTop`,extends:p,props:{target:{type:String,default:`window`},threshold:{type:Number,default:400},icon:{type:String,default:void 0},behavior:{type:String,default:`smooth`},buttonProps:{type:Object,default:function(){return{rounded:!0}}}},style:g,provide:function(){return{$pcScrollTop:this,$parentInstance:this}}},inheritAttrs:!1,scrollListener:null,container:null,data:function(){return{visible:!1}},mounted:function(){this.target===`window`?this.bindDocumentScrollListener():this.target===`parent`&&this.bindParentScrollListener()},beforeUnmount:function(){this.target===`window`?this.unbindDocumentScrollListener():this.target===`parent`&&this.unbindParentScrollListener(),this.container&&(l.clear(this.container),this.overlay=null)},methods:{onClick:function(){(this.target===`window`?window:this.$el.parentElement).scroll({top:0,behavior:this.behavior})},checkVisibility:function(e){this.visible=e>this.threshold},bindParentScrollListener:function(){var e=this;this.scrollListener=function(){e.checkVisibility(e.$el.parentElement.scrollTop)},this.$el.parentElement.addEventListener(`scroll`,this.scrollListener)},bindDocumentScrollListener:function(){var e=this;this.scrollListener=function(){e.checkVisibility(f())},window.addEventListener(`scroll`,this.scrollListener)},unbindParentScrollListener:function(){this.scrollListener&&=(this.$el.parentElement.removeEventListener(`scroll`,this.scrollListener),null)},unbindDocumentScrollListener:function(){this.scrollListener&&=(window.removeEventListener(`scroll`,this.scrollListener),null)},onEnter:function(e){l.set(`overlay`,e,this.$primevue.config.zIndex.overlay)},onAfterLeave:function(e){l.clear(e)},containerRef:function(e){this.container=e?e.$el:void 0}},computed:{scrollTopAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.scrollTop:void 0}},components:{ChevronUpIcon:h,Button:m}};function v(l,d,f,p,m,h){var g=e(`Button`);return r(),s(u,i({name:`p-scrolltop`,appear:``,onEnter:h.onEnter,onAfterLeave:h.onAfterLeave},l.ptm(`transition`)),{default:a(function(){return[m.visible?(r(),s(g,i({key:0,ref:h.containerRef,class:l.cx(`root`),onClick:h.onClick,"aria-label":h.scrollTopAriaLabel,unstyled:l.unstyled},l.buttonProps,{pt:l.ptm(`root`)}),{icon:a(function(e){return[c(l.$slots,`icon`,{class:t(l.cx(`icon`))},function(){return[(r(),s(n(l.icon?`span`:`ChevronUpIcon`),i({class:[l.cx(`icon`),l.icon,e.class]},l.ptm(`root`).icon,{"data-pc-section":`icon`}),null,16,[`class`]))]})]}),_:3},16,[`class`,`onClick`,`aria-label`,`unstyled`,`pt`])):o(``,!0)]}),_:3},16,[`onEnter`,`onAfterLeave`])}_.render=v;export{_ as default};