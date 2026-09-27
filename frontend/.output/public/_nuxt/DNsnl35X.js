import{At as e,B as t,H as n,I as r,O as i,R as a,X as o,_ as s,d as c,f as l,l as u,r as d,u as f,z as p}from"./Ca5TY7vb.js";import{B as m,Ct as h,G as g,H as _,M as v,bt as y,ct as b,j as x,o as S}from"#entry";import{t as C}from"./BAPwTHkl.js";import{t as w}from"./BnSyHpKn.js";import{n as T}from"./Bg9ykqvC.js";import{t as E}from"./CAbdQ6wj.js";import{t as D}from"./_IRxQUT4.js";import{t as O}from"./Cm8kdziv.js";import{t as k}from"./BMSth7wQ.js";var A=S.extend({name:`carousel`,style:`
    .p-carousel {
        display: flex;
        flex-direction: column;
    }

    .p-carousel-content-container {
        display: flex;
        flex-direction: column;
        overflow: auto;
    }

    .p-carousel-content {
        display: flex;
        flex-direction: row;
        gap: dt('carousel.content.gap');
    }

    .p-carousel-content:dir(rtl) {
        flex-direction: row-reverse;
    }

    .p-carousel-viewport {
        overflow: hidden;
        width: 100%;
    }

    .p-carousel-item-list {
        display: flex;
        flex-direction: row;
    }

    .p-carousel-item-list:dir(rtl) {
        flex-direction: row-reverse;
    }

    .p-carousel-prev-button,
    .p-carousel-next-button {
        align-self: center;
        flex-shrink: 0;
    }

    .p-carousel-indicator-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        padding: dt('carousel.indicator.list.padding');
        gap: dt('carousel.indicator.list.gap');
        margin: 0;
        list-style: none;
    }

    .p-carousel-indicator-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('carousel.indicator.background');
        width: dt('carousel.indicator.width');
        height: dt('carousel.indicator.height');
        border: 0 none;
        transition:
            background dt('carousel.transition.duration'),
            color dt('carousel.transition.duration'),
            outline-color dt('carousel.transition.duration'),
            box-shadow dt('carousel.transition.duration');
        outline-color: transparent;
        border-radius: dt('carousel.indicator.border.radius');
        padding: 0;
        margin: 0;
        user-select: none;
        cursor: pointer;
    }

    .p-carousel-indicator-button:focus-visible {
        box-shadow: dt('carousel.indicator.focus.ring.shadow');
        outline: dt('carousel.indicator.focus.ring.width') dt('carousel.indicator.focus.ring.style') dt('carousel.indicator.focus.ring.color');
        outline-offset: dt('carousel.indicator.focus.ring.offset');
    }

    .p-carousel-indicator-button:hover {
        background: dt('carousel.indicator.hover.background');
    }

    .p-carousel-indicator-active .p-carousel-indicator-button {
        background: dt('carousel.indicator.active.background');
    }

    .p-carousel-vertical .p-carousel-content {
        flex-direction: column;
    }

    .p-carousel-vertical .p-carousel-item-list {
        flex-direction: column;
        height: 100%;
    }

    .p-items-hidden .p-carousel-item {
        visibility: hidden;
    }

    .p-items-hidden .p-carousel-item.p-carousel-item-active {
        visibility: visible;
    }
`,classes:{root:function(e){var t=e.instance;return[`p-carousel p-component`,{"p-carousel-vertical":t.isVertical(),"p-carousel-horizontal":!t.isVertical()}]},header:`p-carousel-header`,contentContainer:`p-carousel-content-container`,content:`p-carousel-content`,pcPrevButton:function(e){return[`p-carousel-prev-button`,{"p-disabled":e.instance.backwardIsDisabled}]},viewport:`p-carousel-viewport`,itemList:`p-carousel-item-list`,itemClone:function(e){var t=e.index,n=e.value,r=e.totalShiftedItems,i=e.d_numVisible;return[`p-carousel-item p-carousel-item-clone`,{"p-carousel-item-active":r*-1===n.length+i,"p-carousel-item-start":t===0,"p-carousel-item-end":n.slice(-1*i).length-1===t}]},item:function(e){var t=e.instance,n=e.index;return[`p-carousel-item`,{"p-carousel-item-active":t.firstIndex()<=n&&t.lastIndex()>=n,"p-carousel-item-start":t.firstIndex()===n,"p-carousel-item-end":t.lastIndex()===n}]},pcNextButton:function(e){return[`p-carousel-next-button`,{"p-disabled":e.instance.forwardIsDisabled}]},indicatorList:`p-carousel-indicator-list`,indicator:function(e){var t=e.instance,n=e.index;return[`p-carousel-indicator`,{"p-carousel-indicator-active":t.d_page===n}]},indicatorButton:`p-carousel-indicator-button`,footer:`p-carousel-footer`}}),j={name:`BaseCarousel`,extends:C,props:{value:null,page:{type:Number,default:0},numVisible:{type:Number,default:1},numScroll:{type:Number,default:1},responsiveOptions:Array,orientation:{type:String,default:`horizontal`},verticalViewPortHeight:{type:String,default:`300px`},contentClass:String,containerClass:String,indicatorsContentClass:String,circular:{type:Boolean,default:!1},autoplayInterval:{type:Number,default:0},showNavigators:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},prevButtonProps:{type:Object,default:function(){return{severity:`secondary`,text:!0,rounded:!0}}},nextButtonProps:{type:Object,default:function(){return{severity:`secondary`,text:!0,rounded:!0}}}},style:A,provide:function(){return{$pcCarousel:this,$parentInstance:this}}};function M(e){return I(e)||F(e)||P(e)||N()}function N(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function P(e,t){if(e){if(typeof e==`string`)return L(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?L(e,t):void 0}}function F(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function I(e){if(Array.isArray(e))return L(e)}function L(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var R={name:`Carousel`,extends:j,inheritAttrs:!1,emits:[`update:page`],isRemainingItemsAdded:!1,data:function(){return{remainingItems:0,d_numVisible:this.numVisible,d_numScroll:this.numScroll,d_oldNumScroll:0,d_oldNumVisible:0,d_oldValue:null,d_page:this.page,totalShiftedItems:this.page*this.numScroll*-1,allowAutoplay:!!this.autoplayInterval,d_circular:this.circular||this.allowAutoplay,swipeThreshold:20}},watch:{page:function(e){e>this.d_page?this.navForward({},e):e<this.d_page&&this.navBackward({},e),this.d_page=e},circular:function(e){this.d_circular=e},numVisible:function(e,t){this.d_numVisible=e,this.d_oldNumVisible=t},numScroll:function(e,t){this.d_oldNumScroll=t,this.d_numScroll=e},value:function(e){this.d_oldValue=e}},mounted:function(){var e=!1;if(this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners(),this.isCircular()){var t=this.totalShiftedItems;this.d_page===0?t=-1*this.d_numVisible:t===0&&(t=-1*this.value.length,this.remainingItems>0&&(this.isRemainingItemsAdded=!0)),t!==this.totalShiftedItems&&(this.totalShiftedItems=t,e=!0)}!e&&this.isAutoplay()&&this.startAutoplay()},updated:function(){if(!this.empty){var e=this.isCircular(),t=!1,n=this.totalShiftedItems;if(this.autoplayInterval&&this.stopAutoplay(),this.d_oldNumScroll!==this.d_numScroll||this.d_oldNumVisible!==this.d_numVisible||this.d_oldValue.length!==this.value.length){this.remainingItems=(this.value.length-this.d_numVisible)%this.d_numScroll;var r=this.d_page;this.totalIndicators!==0&&r>=this.totalIndicators&&(r=this.totalIndicators-1,this.$emit(`update:page`,r),this.d_page=r,t=!0),n=r*this.d_numScroll*-1,e&&(n-=this.d_numVisible),r===this.totalIndicators-1&&this.remainingItems>0?(n+=-1*this.remainingItems+this.d_numScroll,this.isRemainingItemsAdded=!0):this.isRemainingItemsAdded=!1,n!==this.totalShiftedItems&&(this.totalShiftedItems=n,t=!0),this.d_oldNumScroll=this.d_numScroll,this.d_oldNumVisible=this.d_numVisible,this.d_oldValue=this.value,this.$refs.itemsContainer.style.transform=this.isVertical()?`translate3d(0, ${n*(100/this.d_numVisible)}%, 0)`:`translate3d(${n*(100/this.d_numVisible)}%, 0, 0)`}e&&(this.d_page===0?n=-1*this.d_numVisible:n===0&&(n=-1*this.value.length,this.remainingItems>0&&(this.isRemainingItemsAdded=!0)),n!==this.totalShiftedItems&&(this.totalShiftedItems=n,t=!0)),!t&&this.isAutoplay()&&this.startAutoplay()}},beforeUnmount:function(){this.responsiveOptions&&this.unbindDocumentListeners(),this.autoplayInterval&&this.stopAutoplay()},methods:{getIndicatorPTOptions:function(e,t){return this.ptm(e,{context:{highlighted:t===this.d_page}})},getItemPTOptions:function(e,t){return this.ptm(e,{context:{index:t,active:this.firstIndex()<=t&&this.lastIndex()>=t,start:this.firstIndex()===t,end:this.lastIndex()===t}})},step:function(e,t){var n=this.totalShiftedItems,r=this.isCircular();if(t!=null)n=this.d_numScroll*t*-1,r&&(n-=this.d_numVisible),this.isRemainingItemsAdded=!1;else{n+=this.d_numScroll*e,this.isRemainingItemsAdded&&=(n+=this.remainingItems-this.d_numScroll*e,!1);var i=r?n+this.d_numVisible:n;t=Math.abs(Math.floor(i/this.d_numScroll))}r&&this.d_page===this.totalIndicators-1&&e===-1?(n=-1*(this.value.length+this.d_numVisible),t=0):r&&this.d_page===0&&e===1?(n=0,t=this.totalIndicators-1):t===this.totalIndicators-1&&this.remainingItems>0&&(n+=this.remainingItems*-1-this.d_numScroll*e,this.isRemainingItemsAdded=!0),this.$refs.itemsContainer&&(!this.isUnstyled&&x(this.$refs.itemsContainer,`p-items-hidden`),this.$refs.itemsContainer.style.transform=this.isVertical()?`translate3d(0, ${n*(100/this.d_numVisible)}%, 0)`:`translate3d(${n*(100/this.d_numVisible)}%, 0, 0)`,this.$refs.itemsContainer.style.transition=`transform 500ms ease 0s`),this.totalShiftedItems=n,this.$emit(`update:page`,t),this.d_page=t},calculatePosition:function(){if(this.$refs.itemsContainer&&this.responsiveOptions){for(var e=window.innerWidth,t={numVisible:this.numVisible,numScroll:this.numScroll},n=0;n<this.responsiveOptions.length;n++){var r=this.responsiveOptions[n];parseInt(r.breakpoint,10)>=e&&(t=r)}if(this.d_numScroll!==t.numScroll){var i=this.d_page;i=parseInt(i*this.d_numScroll/t.numScroll),this.totalShiftedItems=t.numScroll*i*-1,this.isCircular()&&(this.totalShiftedItems-=t.numVisible),this.d_numScroll=t.numScroll,this.$emit(`update:page`,i),this.d_page=i}this.d_numVisible!==t.numVisible&&(this.d_numVisible=t.numVisible)}},navBackward:function(e,t){(this.d_circular||this.d_page!==0)&&this.step(1,t),this.allowAutoplay=!1,e.cancelable&&e.preventDefault()},navForward:function(e,t){(this.d_circular||this.d_page<this.totalIndicators-1)&&this.step(-1,t),this.allowAutoplay=!1,e.cancelable&&e.preventDefault()},onIndicatorClick:function(e,t){var n=this.d_page;t>n?this.navForward(e,t):t<n&&this.navBackward(e,t)},onTransitionEnd:function(){this.$refs.itemsContainer&&(!this.isUnstyled&&m(this.$refs.itemsContainer,`p-items-hidden`),this.$refs.itemsContainer.style.transition=``,(this.d_page===0||this.d_page===this.totalIndicators-1)&&this.isCircular()&&(this.$refs.itemsContainer.style.transform=this.isVertical()?`translate3d(0, ${this.totalShiftedItems*(100/this.d_numVisible)}%, 0)`:`translate3d(${this.totalShiftedItems*(100/this.d_numVisible)}%, 0, 0)`))},onTouchStart:function(e){var t=e.changedTouches[0];this.startPos={x:t.pageX,y:t.pageY}},onTouchMove:function(e){var t=e.changedTouches[0],n=this.isVertical()?t.pageY-this.startPos.y:t.pageX-this.startPos.x;Math.abs(n)>this.swipeThreshold&&e.cancelable&&e.preventDefault()},onTouchEnd:function(e){var t=e.changedTouches[0];this.isVertical()?this.changePageOnTouch(e,t.pageY-this.startPos.y):this.changePageOnTouch(e,t.pageX-this.startPos.x)},changePageOnTouch:function(e,t){Math.abs(t)>this.swipeThreshold&&(t<0?this.navForward(e):this.navBackward(e))},onIndicatorKeydown:function(e){switch(e.code){case`ArrowRight`:this.onRightKey();break;case`ArrowLeft`:this.onLeftKey();break;case`Home`:this.onHomeKey(),e.preventDefault();break;case`End`:this.onEndKey(),e.preventDefault();break;case`ArrowUp`:case`ArrowDown`:case`PageUp`:case`PageDown`:e.preventDefault();break;case`Tab`:this.onTabKey()}},onRightKey:function(){var e=M(_(this.$refs.indicatorContent,`[data-pc-section="indicator"]`)),t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,t+1===e.length?e.length-1:t+1)},onLeftKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,e-1<=0?0:e-1)},onHomeKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,0)},onEndKey:function(){var e=M(_(this.$refs.indicatorContent,`[data-pc-section="indicator"]`)),t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,e.length-1)},onTabKey:function(){var e=M(_(this.$refs.indicatorContent,`[data-pc-section="indicator"]`)),t=e.findIndex(function(e){return v(e,`data-p-active`)===!0}),n=b(this.$refs.indicatorContent,`[data-pc-section="indicator"] > button[tabindex="0"]`),r=e.findIndex(function(e){return e===n.parentElement});e[r].children[0].tabIndex=`-1`,e[t].children[0].tabIndex=`0`},findFocusedIndicatorIndex:function(){var e=M(_(this.$refs.indicatorContent,`[data-pc-section="indicator"]`)),t=b(this.$refs.indicatorContent,`[data-pc-section="indicator"] > button[tabindex="0"]`);return e.findIndex(function(e){return e===t.parentElement})},changedFocusedIndicator:function(e,t){var n=M(_(this.$refs.indicatorContent,`[data-pc-section="indicator"]`));n[e].children[0].tabIndex=`-1`,n[t].children[0].tabIndex=`0`,n[t].children[0].focus()},bindDocumentListeners:function(){var e=this;this.documentResizeListener||(this.documentResizeListener=function(t){e.calculatePosition(t)},window.addEventListener(`resize`,this.documentResizeListener))},unbindDocumentListeners:function(){this.documentResizeListener&&=(window.removeEventListener(`resize`,this.documentResizeListener),null)},startAutoplay:function(){var e=this;this.interval=setInterval(function(){e.d_page===e.totalIndicators-1?e.step(-1,0):e.step(-1,e.d_page+1)},this.autoplayInterval)},stopAutoplay:function(){this.interval&&clearInterval(this.interval)},createStyle:function(){if(!this.carouselStyle){var e;this.carouselStyle=document.createElement(`style`),this.carouselStyle.type=`text/css`,g(this.carouselStyle,`nonce`,(e=this.$primevue)==null||(e=e.config)==null||(e=e.csp)==null?void 0:e.nonce),document.body.appendChild(this.carouselStyle)}var t=`
                .p-carousel[${this.$attrSelector}] .p-carousel-item {
                    flex: 1 0 ${100/this.d_numVisible}%
                }
            `;if(this.responsiveOptions&&!this.isUnstyled){var n=M(this.responsiveOptions),r=y();n.sort(function(e,t){var n=e.breakpoint,i=t.breakpoint;return h(n,i,-1,r)});for(var i=0;i<n.length;i++){var a=n[i];t+=`
                        @media screen and (max-width: ${a.breakpoint}) {
                            .p-carousel[${this.$attrSelector}] .p-carousel-item {
                                flex: 1 0 ${100/a.numVisible}%
                            }
                        }
                    `}}this.carouselStyle.innerHTML=t},isVertical:function(){return this.orientation===`vertical`},hasValidItemCount:function(){return this.value&&this.value.length>this.d_numVisible},isCircular:function(){return this.hasValidItemCount()&&this.d_circular},isAutoplay:function(){return this.hasValidItemCount()&&this.autoplayInterval&&this.allowAutoplay},firstIndex:function(){return this.isCircular()?-1*(this.totalShiftedItems+this.d_numVisible):this.totalShiftedItems*-1},lastIndex:function(){return this.firstIndex()+this.d_numVisible-1},ariaSlideNumber:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g,e):void 0},ariaPageLabel:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,e):void 0}},computed:{totalIndicators:function(){return this.value?Math.max(Math.ceil((this.value.length-this.d_numVisible)/this.d_numScroll)+1,0):0},backwardIsDisabled:function(){return this.value&&(!this.circular||this.value.length<this.d_numVisible)&&this.d_page===0},forwardIsDisabled:function(){return this.value&&(!this.circular||this.value.length<this.d_numVisible)&&(this.d_page===this.totalIndicators-1||this.totalIndicators===0)},ariaSlideLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slide:void 0},ariaPrevButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.prevPageLabel:void 0},ariaNextButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.nextPageLabel:void 0},empty:function(){return!this.value||this.value.length===0},emptyMessageText:function(){var e;return((e=this.$primevue.config)==null||(e=e.locale)==null?void 0:e.emptyMessage)||``}},components:{Button:T,ChevronRightIcon:E,ChevronDownIcon:O,ChevronLeftIcon:k,ChevronUpIcon:D},directives:{ripple:w}},z=[`aria-live`],B=[`data-p-carousel-item-active`,`data-p-carousel-item-start`,`data-p-carousel-item-end`],V=[`aria-hidden`,`aria-label`,`aria-roledescription`,`data-p-carousel-item-active`,`data-p-carousel-item-start`,`data-p-carousel-item-end`],H=[`data-p-active`],U=[`tabindex`,`aria-label`,`aria-current`,`onClick`];function W(m,h,g,_,v,y){var b=t(`Button`);return r(),l(`div`,i({class:m.cx(`root`),role:`region`},m.ptmi(`root`)),[m.$slots.header?(r(),l(`div`,i({key:0,class:m.cx(`header`)},m.ptm(`header`)),[p(m.$slots,`header`)],16)):c(``,!0),y.empty?p(m.$slots,`empty`,{key:2},function(){return[s(e(y.emptyMessageText),1)]}):(r(),l(`div`,i({key:1,class:[m.cx(`contentContainer`),m.containerClass]},m.ptm(`contentContainer`)),[u(`div`,i({class:[m.cx(`content`),m.contentClass],"aria-live":v.allowAutoplay?`polite`:`off`},m.ptm(`content`)),[m.showNavigators?(r(),f(b,i({key:0,class:m.cx(`pcPrevButton`),disabled:y.backwardIsDisabled,"aria-label":y.ariaPrevButtonLabel,unstyled:m.unstyled,onClick:y.navBackward},m.prevButtonProps,{pt:m.ptm(`pcPrevButton`),"data-pc-group-section":`navigator`}),{icon:o(function(e){return[p(m.$slots,`previcon`,{},function(){return[(r(),f(n(y.isVertical()?`ChevronUpIcon`:`ChevronLeftIcon`),i({class:e.icon},m.ptm(`pcPrevButton`).icon),null,16,[`class`]))]})]}),_:3},16,[`class`,`disabled`,`aria-label`,`unstyled`,`onClick`,`pt`])):c(``,!0),u(`div`,i({class:m.cx(`viewport`),style:[{height:y.isVertical()?m.verticalViewPortHeight:`auto`}],onTouchend:h[1]||=function(){return y.onTouchEnd&&y.onTouchEnd.apply(y,arguments)},onTouchstart:h[2]||=function(){return y.onTouchStart&&y.onTouchStart.apply(y,arguments)},onTouchmove:h[3]||=function(){return y.onTouchMove&&y.onTouchMove.apply(y,arguments)}},m.ptm(`viewport`)),[u(`div`,i({ref:`itemsContainer`,class:m.cx(`itemList`),onTransitionend:h[0]||=function(){return y.onTransitionEnd&&y.onTransitionEnd.apply(y,arguments)}},m.ptm(`itemList`)),[y.isCircular()?(r(!0),l(d,{key:0},a(m.value.slice(-1*v.d_numVisible),function(e,t){return r(),l(`div`,i({key:t+`_scloned`,class:m.cx(`itemClone`,{index:t,value:m.value,totalShiftedItems:v.totalShiftedItems,d_numVisible:v.d_numVisible})},{ref_for:!0},m.ptm(`itemClone`),{"data-p-carousel-item-active":v.totalShiftedItems*-1===m.value.length+v.d_numVisible,"data-p-carousel-item-start":t===0,"data-p-carousel-item-end":m.value.slice(-1*v.d_numVisible).length-1===t}),[p(m.$slots,`item`,{data:e,index:t})],16,B)}),128)):c(``,!0),(r(!0),l(d,null,a(m.value,function(e,t){return r(),l(`div`,i({key:t,class:m.cx(`item`,{index:t}),role:`group`,"aria-hidden":y.firstIndex()>t||y.lastIndex()<t||void 0,"aria-label":y.ariaSlideNumber(t),"aria-roledescription":y.ariaSlideLabel},{ref_for:!0},y.getItemPTOptions(`item`,t),{"data-p-carousel-item-active":y.firstIndex()<=t&&y.lastIndex()>=t,"data-p-carousel-item-start":y.firstIndex()===t,"data-p-carousel-item-end":y.lastIndex()===t}),[p(m.$slots,`item`,{data:e,index:t})],16,V)}),128)),y.isCircular()?(r(!0),l(d,{key:1},a(m.value.slice(0,v.d_numVisible),function(e,t){return r(),l(`div`,i({key:t+`_fcloned`,class:m.cx(`itemClone`,{index:t,value:m.value,totalShiftedItems:v.totalShiftedItems,d_numVisible:v.d_numVisible})},{ref_for:!0},m.ptm(`itemClone`)),[p(m.$slots,`item`,{data:e,index:t})],16)}),128)):c(``,!0)],16)],16),m.showNavigators?(r(),f(b,i({key:1,class:m.cx(`pcNextButton`),disabled:y.forwardIsDisabled,"aria-label":y.ariaNextButtonLabel,unstyled:m.unstyled,onClick:y.navForward},m.nextButtonProps,{pt:m.ptm(`pcNextButton`),"data-pc-group-section":`navigator`}),{icon:o(function(e){return[p(m.$slots,`nexticon`,{},function(){return[(r(),f(n(y.isVertical()?`ChevronDownIcon`:`ChevronRightIcon`),i({class:e.class},m.ptm(`pcNextButton`).icon),null,16,[`class`]))]})]}),_:3},16,[`class`,`disabled`,`aria-label`,`unstyled`,`onClick`,`pt`])):c(``,!0)],16,z),y.totalIndicators>=0&&m.showIndicators?(r(),l(`ul`,i({key:0,ref:`indicatorContent`,class:[m.cx(`indicatorList`),m.indicatorsContentClass],onKeydown:h[4]||=function(){return y.onIndicatorKeydown&&y.onIndicatorKeydown.apply(y,arguments)}},m.ptm(`indicatorList`)),[(r(!0),l(d,null,a(y.totalIndicators,function(e,t){return r(),l(`li`,i({key:`p-carousel-indicator-`+t.toString(),class:m.cx(`indicator`,{index:t})},{ref_for:!0},y.getIndicatorPTOptions(`indicator`,t),{"data-p-active":v.d_page===t}),[u(`button`,i({class:m.cx(`indicatorButton`),type:`button`,tabindex:v.d_page===t?`0`:`-1`,"aria-label":y.ariaPageLabel(t+1),"aria-current":v.d_page===t?`page`:void 0,onClick:function(e){return y.onIndicatorClick(e,t)}},{ref_for:!0},y.getIndicatorPTOptions(`indicatorButton`,t)),null,16,U)],16,H)}),128))],16)):c(``,!0)],16)),m.$slots.footer?(r(),l(`div`,i({key:3,class:m.cx(`footer`)},m.ptm(`footer`)),[p(m.$slots,`footer`)],16)):c(``,!0)],16)}R.render=W;export{R as default};