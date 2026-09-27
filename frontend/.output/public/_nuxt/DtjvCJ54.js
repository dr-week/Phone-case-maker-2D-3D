import{I as e,O as t,f as n,z as r}from"./Ca5TY7vb.js";import{t as i}from"./cO8iUN-n.js";import{B as a,R as o,o as s,y as c}from"#entry";import{t as l}from"./BAPwTHkl.js";import{n as u,t as d}from"./BaSZILn4.js";var f=s.extend({name:`blockui`,style:`
    .p-blockui {
        position: relative;
    }

    .p-blockui-mask {
        border-radius: dt('blockui.border.radius');
    }

    .p-blockui-mask.p-overlay-mask {
        position: absolute;
    }

    .p-blockui-mask-document.p-overlay-mask {
        position: fixed;
    }
`,classes:{root:`p-blockui`}}),p={name:`BlockUI`,extends:{name:`BaseBlockUI`,extends:l,props:{blocked:{type:Boolean,default:!1},fullScreen:{type:Boolean,default:!1},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0}},style:f,provide:function(){return{$pcBlockUI:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`block`,`unblock`],mask:null,data:function(){return{isBlocked:!1}},watch:{blocked:function(e){e===!0?this.block():this.unblock()}},mounted:function(){this.blocked&&this.block()},methods:{block:function(){var e=`p-blockui-mask p-overlay-mask p-overlay-mask-enter-active`;this.fullScreen?(e+=` p-blockui-mask-document`,this.mask=o(`div`,{style:{position:`fixed`,top:`0`,left:`0`,width:`100%`,height:`100%`},class:!this.isUnstyled&&e,"p-bind":this.ptm(`mask`)}),document.body.appendChild(this.mask),d(),document.activeElement.blur()):(this.mask=o(`div`,{style:{position:`absolute`,top:`0`,left:`0`,width:`100%`,height:`100%`},class:!this.isUnstyled&&e,"p-bind":this.ptm(`mask`)}),this.$refs.container.appendChild(this.mask)),this.autoZIndex&&i.set(`modal`,this.mask,this.baseZIndex+this.$primevue.config.zIndex.modal),this.isBlocked=!0,this.$emit(`block`)},unblock:function(){var e=this;if(this.mask){!this.isUnstyled&&a(this.mask,`p-overlay-mask-leave-active`);var t=function(){clearTimeout(n),e.mask.removeEventListener(`animationend`,t),e.mask.removeEventListener(`webkitAnimationEnd`,t)},n=setTimeout(function(){e.removeMask()},300);c(this.mask)>0&&(this.mask.addEventListener(`animationend`,t),this.mask.addEventListener(`webkitAnimationEnd`,t))}else this.removeMask()},removeMask:function(){if(i.clear(this.mask),this.fullScreen)document.body.removeChild(this.mask),u();else{var e;(e=this.$refs.container)==null||e.removeChild(this.mask)}this.isBlocked=!1,this.$emit(`unblock`)}}},m=[`aria-busy`];function h(i,a,o,s,c,l){return e(),n(`div`,t({ref:`container`,class:i.cx(`root`),"aria-busy":c.isBlocked},i.ptmi(`root`)),[r(i.$slots,`default`)],16,m)}p.render=h;export{p as default};