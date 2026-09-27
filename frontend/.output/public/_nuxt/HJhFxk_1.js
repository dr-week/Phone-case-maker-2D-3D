import{At as e,B as t,Dt as n,H as r,I as i,O as a,Ot as o,R as s,V as c,X as l,Z as ee,_ as u,d,f,h as p,l as m,r as h,u as g,v as _,z as v}from"./Ca5TY7vb.js";import{t as y}from"./CRHlWn3X.js";import{t as b}from"./cO8iUN-n.js";import{D as x,Dt as S,F as C,J as w,Nt as T,Ot as E,Rt as te,S as D,U as O,_ as k,ct as A,gt as j,ht as M,jt as N,l as P,o as ne,ot as re,q as ie,st as ae}from"#entry";import{t as oe}from"./DNrkBYt1.js";import{t as se}from"./BnSyHpKn.js";import{t as ce}from"./C-0OC8iq.js";import{t as le}from"./Cm8kdziv.js";import{t as ue}from"./CujpVRyB.js";import{n as F}from"./BZh0fBGQ.js";import{t as I}from"./DA01FRxN.js";import{n as L}from"./AQq5B3VT.js";import{t as R}from"./nFz5vn1U.js";import{t as z}from"./Bqeo7u7y.js";import{t as B}from"./zrJUdTnj.js";import{t as V}from"./CESKisby.js";import{n as H}from"./i5-H45TZ.js";import{t as U}from"./D0I2uakG.js";import{n as de}from"./DYaBWo0R.js";import{n as fe}from"./CbGJxfZ6.js";var pe=ne.extend({name:`multiselect`,style:`
    .p-multiselect {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('multiselect.background');
        border: 1px solid dt('multiselect.border.color');
        transition:
            background dt('multiselect.transition.duration'),
            color dt('multiselect.transition.duration'),
            border-color dt('multiselect.transition.duration'),
            outline-color dt('multiselect.transition.duration'),
            box-shadow dt('multiselect.transition.duration');
        border-radius: dt('multiselect.border.radius');
        outline-color: transparent;
        box-shadow: dt('multiselect.shadow');
    }

    .p-multiselect:not(.p-disabled):hover {
        border-color: dt('multiselect.hover.border.color');
    }

    .p-multiselect:not(.p-disabled).p-focus {
        border-color: dt('multiselect.focus.border.color');
        box-shadow: dt('multiselect.focus.ring.shadow');
        outline: dt('multiselect.focus.ring.width') dt('multiselect.focus.ring.style') dt('multiselect.focus.ring.color');
        outline-offset: dt('multiselect.focus.ring.offset');
    }

    .p-multiselect.p-variant-filled {
        background: dt('multiselect.filled.background');
    }

    .p-multiselect.p-variant-filled:not(.p-disabled):hover {
        background: dt('multiselect.filled.hover.background');
    }

    .p-multiselect.p-variant-filled.p-focus {
        background: dt('multiselect.filled.focus.background');
    }

    .p-multiselect.p-invalid {
        border-color: dt('multiselect.invalid.border.color');
    }

    .p-multiselect.p-disabled {
        opacity: 1;
        background: dt('multiselect.disabled.background');
    }

    .p-multiselect-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('multiselect.dropdown.color');
        width: dt('multiselect.dropdown.width');
        border-start-end-radius: dt('multiselect.border.radius');
        border-end-end-radius: dt('multiselect.border.radius');
    }

    .p-multiselect-clear-icon {
        align-self: center;
        color: dt('multiselect.clear.icon.color');
        inset-inline-end: dt('multiselect.dropdown.width');
    }

    .p-multiselect-label-container {
        overflow: hidden;
        flex: 1 1 auto;
        cursor: pointer;
    }

    .p-multiselect-label {
        white-space: nowrap;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: dt('multiselect.padding.y') dt('multiselect.padding.x');
        color: dt('multiselect.color');
    }

    .p-multiselect-display-chip .p-multiselect-label {
        display: flex;
        align-items: center;
        gap: calc(dt('multiselect.padding.y') / 2);
    }

    .p-multiselect-label.p-placeholder {
        color: dt('multiselect.placeholder.color');
    }

    .p-multiselect.p-invalid .p-multiselect-label.p-placeholder {
        color: dt('multiselect.invalid.placeholder.color');
    }

    .p-multiselect.p-disabled .p-multiselect-label {
        color: dt('multiselect.disabled.color');
    }

    .p-multiselect-label-empty {
        overflow: hidden;
        visibility: hidden;
    }

    .p-multiselect-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('multiselect.overlay.background');
        color: dt('multiselect.overlay.color');
        border: 1px solid dt('multiselect.overlay.border.color');
        border-radius: dt('multiselect.overlay.border.radius');
        box-shadow: dt('multiselect.overlay.shadow');
        min-width: 100%;
    }

    .p-multiselect-header {
        display: flex;
        align-items: center;
        padding: dt('multiselect.list.header.padding');
    }

    .p-multiselect-header .p-checkbox {
        margin-inline-end: dt('multiselect.option.gap');
    }

    .p-multiselect-filter-container {
        flex: 1 1 auto;
    }

    .p-multiselect-filter {
        width: 100%;
    }

    .p-multiselect-list-container {
        overflow: auto;
    }

    .p-multiselect-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('multiselect.list.padding');
        display: flex;
        flex-direction: column;
        gap: dt('multiselect.list.gap');
    }

    .p-multiselect-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: dt('multiselect.option.gap');
        padding: dt('multiselect.option.padding');
        border: 0 none;
        color: dt('multiselect.option.color');
        background: transparent;
        transition:
            background dt('multiselect.transition.duration'),
            color dt('multiselect.transition.duration'),
            border-color dt('multiselect.transition.duration'),
            box-shadow dt('multiselect.transition.duration'),
            outline-color dt('multiselect.transition.duration');
        border-radius: dt('multiselect.option.border.radius');
    }

    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled).p-focus {
        background: dt('multiselect.option.focus.background');
        color: dt('multiselect.option.focus.color');
    }

    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled):hover {
        background: dt('multiselect.option.focus.background');
        color: dt('multiselect.option.focus.color');
    }

    .p-multiselect-option.p-multiselect-option-selected {
        background: dt('multiselect.option.selected.background');
        color: dt('multiselect.option.selected.color');
    }

    .p-multiselect-option.p-multiselect-option-selected.p-focus {
        background: dt('multiselect.option.selected.focus.background');
        color: dt('multiselect.option.selected.focus.color');
    }

    .p-multiselect-option-group {
        cursor: auto;
        margin: 0;
        padding: dt('multiselect.option.group.padding');
        background: dt('multiselect.option.group.background');
        color: dt('multiselect.option.group.color');
        font-weight: dt('multiselect.option.group.font.weight');
    }

    .p-multiselect-empty-message {
        padding: dt('multiselect.empty.message.padding');
    }

    .p-multiselect-label .p-chip {
        padding-block-start: calc(dt('multiselect.padding.y') / 2);
        padding-block-end: calc(dt('multiselect.padding.y') / 2);
        border-radius: dt('multiselect.chip.border.radius');
    }

    .p-multiselect-label:has(.p-chip) {
        padding: calc(dt('multiselect.padding.y') / 2) calc(dt('multiselect.padding.x') / 2);
    }

    .p-multiselect-fluid {
        display: flex;
        width: 100%;
    }

    .p-multiselect-sm .p-multiselect-label {
        font-size: dt('multiselect.sm.font.size');
        padding-block: dt('multiselect.sm.padding.y');
        padding-inline: dt('multiselect.sm.padding.x');
    }

    .p-multiselect-sm .p-multiselect-dropdown .p-icon {
        font-size: dt('multiselect.sm.font.size');
        width: dt('multiselect.sm.font.size');
        height: dt('multiselect.sm.font.size');
    }

    .p-multiselect-lg .p-multiselect-label {
        font-size: dt('multiselect.lg.font.size');
        padding-block: dt('multiselect.lg.padding.y');
        padding-inline: dt('multiselect.lg.padding.x');
    }

    .p-multiselect-lg .p-multiselect-dropdown .p-icon {
        font-size: dt('multiselect.lg.font.size');
        width: dt('multiselect.lg.font.size');
        height: dt('multiselect.lg.font.size');
    }

    .p-floatlabel-in .p-multiselect-filter {
        padding-block-start: dt('multiselect.padding.y');
        padding-block-end: dt('multiselect.padding.y');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-multiselect p-component p-inputwrapper`,{"p-multiselect-display-chip":n.display===`chip`,"p-disabled":n.disabled,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-focus":t.focused,"p-inputwrapper-filled":t.$filled,"p-inputwrapper-focus":t.focused||t.overlayVisible,"p-multiselect-open":t.overlayVisible,"p-multiselect-fluid":t.$fluid,"p-multiselect-sm p-inputfield-sm":n.size===`small`,"p-multiselect-lg p-inputfield-lg":n.size===`large`}]},labelContainer:`p-multiselect-label-container`,label:function(e){var t=e.instance,n=e.props;return[`p-multiselect-label`,{"p-placeholder":t.label===n.placeholder,"p-multiselect-label-empty":!n.placeholder&&!t.$filled}]},clearIcon:`p-multiselect-clear-icon`,chipItem:`p-multiselect-chip-item`,pcChip:`p-multiselect-chip`,chipIcon:`p-multiselect-chip-icon`,dropdown:`p-multiselect-dropdown`,loadingIcon:`p-multiselect-loading-icon`,dropdownIcon:`p-multiselect-dropdown-icon`,overlay:`p-multiselect-overlay p-component`,header:`p-multiselect-header`,pcFilterContainer:`p-multiselect-filter-container`,pcFilter:`p-multiselect-filter`,listContainer:`p-multiselect-list-container`,list:`p-multiselect-list`,optionGroup:`p-multiselect-option-group`,option:function(e){var t=e.instance,n=e.option,r=e.index,i=e.getItemOptions,a=e.props;return[`p-multiselect-option`,{"p-multiselect-option-selected":t.isSelected(n)&&a.highlightOnSelect,"p-focus":t.focusedOptionIndex===t.getOptionIndex(r,i),"p-disabled":t.isOptionDisabled(n)}]},emptyMessage:`p-multiselect-empty-message`},inlineStyles:{root:function(e){return{position:e.props.appendTo===`self`?`relative`:void 0}}}}),me={name:`BaseMultiSelect`,extends:I,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,optionGroupLabel:null,optionGroupChildren:null,scrollHeight:{type:String,default:`14rem`},placeholder:String,inputId:{type:String,default:null},panelClass:{type:String,default:null},panelStyle:{type:null,default:null},overlayClass:{type:String,default:null},overlayStyle:{type:null,default:null},dataKey:null,showClear:{type:Boolean,default:!1},clearIcon:{type:String,default:void 0},resetFilterOnClear:{type:Boolean,default:!1},filter:Boolean,filterPlaceholder:String,filterLocale:String,filterMatchMode:{type:String,default:`contains`},filterFields:{type:Array,default:null},appendTo:{type:[String,Object],default:`body`},display:{type:String,default:`comma`},selectedItemsLabel:{type:String,default:null},maxSelectedLabels:{type:Number,default:null},selectionLimit:{type:Number,default:null},showToggleAll:{type:Boolean,default:!0},loading:{type:Boolean,default:!1},checkboxIcon:{type:String,default:void 0},dropdownIcon:{type:String,default:void 0},filterIcon:{type:String,default:void 0},loadingIcon:{type:String,default:void 0},removeTokenIcon:{type:String,default:void 0},chipIcon:{type:String,default:void 0},selectAll:{type:Boolean,default:null},resetFilterOnHide:{type:Boolean,default:!1},virtualScrollerOptions:{type:Object,default:null},autoOptionFocus:{type:Boolean,default:!1},autoFilterFocus:{type:Boolean,default:!1},focusOnHover:{type:Boolean,default:!0},highlightOnSelect:{type:Boolean,default:!1},filterMessage:{type:String,default:null},selectionMessage:{type:String,default:null},emptySelectionMessage:{type:String,default:null},emptyFilterMessage:{type:String,default:null},emptyMessage:{type:String,default:null},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:pe,provide:function(){return{$pcMultiSelect:this,$parentInstance:this}}};function W(e){"@babel/helpers - typeof";return W=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},W(e)}function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function K(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?G(Object(n),!0).forEach(function(t){q(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function q(e,t,n){return(t=he(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function he(e){var t=ge(e,`string`);return W(t)==`symbol`?t:t+``}function ge(e,t){if(W(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(W(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function J(e){return be(e)||ye(e)||ve(e)||_e()}function _e(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ve(e,t){if(e){if(typeof e==`string`)return Y(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Y(e,t):void 0}}function ye(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function be(e){if(Array.isArray(e))return Y(e)}function Y(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var X={name:`MultiSelect`,extends:me,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`before-show`,`before-hide`,`show`,`hide`,`filter`,`selectall-change`],inject:{$pcFluid:{default:null}},outsideClickListener:null,scrollHandler:null,resizeListener:null,overlay:null,list:null,virtualScroller:null,startRangeIndex:-1,searchTimeout:null,searchValue:``,selectOnFocus:!1,data:function(){return{clicked:!1,focused:!1,focusedOptionIndex:-1,filterValue:null,overlayVisible:!1}},watch:{options:function(){this.autoUpdateModel()}},mounted:function(){this.autoUpdateModel()},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.overlay&&=(b.clear(this.overlay),null)},methods:{getOptionIndex:function(e,t){return this.virtualScrollerDisabled?e:t&&t(e).index},getOptionLabel:function(e){return this.optionLabel?N(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?N(e,this.optionValue):e},getOptionRenderKey:function(e,t){return this.dataKey?N(e,this.dataKey):this.getOptionLabel(e)+`_${t}`},getHeaderCheckboxPTOptions:function(e){return this.ptm(e,{context:{selected:this.allSelected}})},getCheckboxPTOptions:function(e,t,n,r){return this.ptm(r,{context:{selected:this.isSelected(e),focused:this.focusedOptionIndex===this.getOptionIndex(n,t),disabled:this.isOptionDisabled(e)}})},isOptionDisabled:function(e){return this.maxSelectionLimitReached&&!this.isSelected(e)?!0:this.optionDisabled?N(e,this.optionDisabled):!1},isOptionGroup:function(e){return!!(this.optionGroupLabel&&e.optionGroup&&e.group)},getOptionGroupLabel:function(e){return N(e,this.optionGroupLabel)},getOptionGroupChildren:function(e){return N(e,this.optionGroupChildren)},getAriaPosInset:function(e){var t=this;return(this.optionGroupLabel?e-this.visibleOptions.slice(0,e).filter(function(e){return t.isOptionGroup(e)}).length:e)+1},show:function(e){this.$emit(`before-show`),this.overlayVisible=!0,this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.findSelectedOptionIndex():this.focusedOptionIndex,e&&w(this.$refs.focusInput)},hide:function(e){var t=this,n=function(){t.$emit(`before-hide`),t.overlayVisible=!1,t.clicked=!1,t.focusedOptionIndex=-1,t.searchValue=``,t.resetFilterOnHide&&(t.filterValue=null),e&&w(t.$refs.focusInput)};setTimeout(function(){n()},0)},onFocus:function(e){this.disabled||(this.focused=!0,this.overlayVisible&&(this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.findSelectedOptionIndex():this.focusedOptionIndex,!this.autoFilterFocus&&this.scrollInView(this.focusedOptionIndex)),this.$emit(`focus`,e))},onBlur:function(e){var t,n;this.clicked=!1,this.focused=!1,this.focusedOptionIndex=-1,this.searchValue=``,this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n)},onKeyDown:function(e){var t=this;if(this.disabled){e.preventDefault();return}var n=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`ShiftLeft`:case`ShiftRight`:this.onShiftKey(e);break;default:if(e.code===`KeyA`&&n){var r=this.visibleOptions.filter(function(e){return t.isValidOption(e)}).map(function(e){return t.getOptionValue(e)});this.updateModel(e,r),e.preventDefault();break}!n&&M(e.key)&&(!this.overlayVisible&&this.show(),this.searchOptions(e),e.preventDefault())}this.clicked=!1},onContainerClick:function(e){this.disabled||this.loading||e.target.tagName===`INPUT`||e.target.getAttribute(`data-pc-section`)===`clearicon`||e.target.closest(`[data-pc-section="clearicon"]`)||((!this.overlay||!this.overlay.contains(e.target))&&(this.overlayVisible?this.hide(!0):this.show(!0)),this.clicked=!0)},onClearClick:function(e){this.updateModel(e,[]),this.resetFilterOnClear&&(this.filterValue=null)},onFirstHiddenFocus:function(e){var t=e.relatedTarget===this.$refs.focusInput?ae(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput;w(t)},onLastHiddenFocus:function(e){var t=e.relatedTarget===this.$refs.focusInput?x(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput;w(t)},onOptionSelect:function(e,t){var n=this,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:-1,i=arguments.length>3&&arguments[3]!==void 0&&arguments[3];if(!(this.disabled||this.isOptionDisabled(t))){var a=this.isSelected(t),o=null;o=a?this.d_value.filter(function(e){return!S(e,n.getOptionValue(t),n.equalityKey)}):[].concat(J(this.d_value||[]),[this.getOptionValue(t)]),this.updateModel(e,o),r!==-1&&(this.focusedOptionIndex=r),i&&w(this.$refs.focusInput)}},onOptionMouseMove:function(e,t){this.focusOnHover&&this.changeFocusedOptionIndex(e,t)},onOptionSelectRange:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:-1,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:-1;if(n===-1&&(n=this.findNearestSelectedOptionIndex(r,!0)),r===-1&&(r=this.findNearestSelectedOptionIndex(n)),n!==-1&&r!==-1){var i=Math.min(n,r),a=Math.max(n,r),o=this.visibleOptions.slice(i,a+1).filter(function(e){return t.isValidOption(e)}).map(function(e){return t.getOptionValue(e)});this.updateModel(e,o)}},onFilterChange:function(e){var t=e.target.value;this.filterValue=t,this.focusedOptionIndex=-1,this.$emit(`filter`,{originalEvent:e,value:t}),!this.virtualScrollerDisabled&&this.virtualScroller.scrollToIndex(0)},onFilterKeyDown:function(e){switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e,!0);break;case`ArrowLeft`:case`ArrowRight`:this.onArrowLeftKey(e,!0);break;case`Home`:this.onHomeKey(e,!0);break;case`End`:this.onEndKey(e,!0);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e,!0)}},onFilterBlur:function(){this.focusedOptionIndex=-1},onFilterUpdated:function(){this.overlayVisible&&this.alignOverlay()},onOverlayClick:function(e){R.emit(`overlay-click`,{originalEvent:e,target:this.$el})},onOverlayKeyDown:function(e){e.code===`Escape`&&this.onEscapeKey(e)},onArrowDownKey:function(e){if(!this.overlayVisible)this.show();else{var t=this.focusedOptionIndex===-1?this.clicked?this.findFirstOptionIndex():this.findFirstFocusedOptionIndex():this.findNextOptionIndex(this.focusedOptionIndex);e.shiftKey&&this.onOptionSelectRange(e,this.startRangeIndex,t),this.changeFocusedOptionIndex(e,t)}e.preventDefault()},onArrowUpKey:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1];if(e.altKey&&!t)this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(),e.preventDefault();else{var n=this.focusedOptionIndex===-1?this.clicked?this.findLastOptionIndex():this.findLastFocusedOptionIndex():this.findPrevOptionIndex(this.focusedOptionIndex);e.shiftKey&&this.onOptionSelectRange(e,n,this.startRangeIndex),this.changeFocusedOptionIndex(e,n),!this.overlayVisible&&this.show(),e.preventDefault()}},onArrowLeftKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]&&(this.focusedOptionIndex=-1)},onHomeKey:function(e){if(arguments.length>1&&arguments[1]!==void 0&&arguments[1]){var t=e.currentTarget;e.shiftKey?t.setSelectionRange(0,e.target.selectionStart):(t.setSelectionRange(0,0),this.focusedOptionIndex=-1)}else{var n=e.metaKey||e.ctrlKey,r=this.findFirstOptionIndex();e.shiftKey&&n&&this.onOptionSelectRange(e,r,this.startRangeIndex),this.changeFocusedOptionIndex(e,r),!this.overlayVisible&&this.show()}e.preventDefault()},onEndKey:function(e){if(arguments.length>1&&arguments[1]!==void 0&&arguments[1]){var t=e.currentTarget;if(e.shiftKey)t.setSelectionRange(e.target.selectionStart,t.value.length);else{var n=t.value.length;t.setSelectionRange(n,n),this.focusedOptionIndex=-1}}else{var r=e.metaKey||e.ctrlKey,i=this.findLastOptionIndex();e.shiftKey&&r&&this.onOptionSelectRange(e,this.startRangeIndex,i),this.changeFocusedOptionIndex(e,i),!this.overlayVisible&&this.show()}e.preventDefault()},onPageUpKey:function(e){this.scrollInView(0),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.visibleOptions.length-1),e.preventDefault()},onEnterKey:function(e){this.overlayVisible?this.focusedOptionIndex!==-1&&(e.shiftKey?this.onOptionSelectRange(e,this.focusedOptionIndex):this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex])):(this.focusedOptionIndex=-1,this.onArrowDownKey(e)),e.preventDefault()},onEscapeKey:function(e){this.overlayVisible&&(this.hide(!0),e.stopPropagation()),e.preventDefault()},onTabKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]||(this.overlayVisible&&this.hasFocusableElements()?(w(e.shiftKey?this.$refs.lastHiddenFocusableElementOnOverlay:this.$refs.firstHiddenFocusableElementOnOverlay),e.preventDefault()):(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(this.filter)))},onShiftKey:function(){this.startRangeIndex=this.focusedOptionIndex},onOverlayEnter:function(e){b.set(`overlay`,e,this.$primevue.config.zIndex.overlay),C(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.scrollInView(),this.autoFilterFocus&&w(this.$refs.filterInput.$el),this.autoUpdateModel(),this.$attrSelector&&e.setAttribute(this.$attrSelector,``)},onOverlayAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit(`show`)},onOverlayLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit(`hide`),this.overlay=null},onOverlayAfterLeave:function(e){b.clear(e)},alignOverlay:function(){this.appendTo===`self`?D(this.overlay,this.$el):(this.overlay.style.minWidth=re(this.$el)+`px`,k(this.overlay,this.$el))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){e.overlayVisible&&e.isOutsideClicked(t)&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new ue(this.$refs.container,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!O()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},isOutsideClicked:function(e){return!(this.$el.isSameNode(e.target)||this.$el.contains(e.target)||this.overlay&&this.overlay.contains(e.target))},getLabelByValue:function(e){var t=this,n=(this.optionGroupLabel?this.flatOptions(this.options):this.options||[]).find(function(n){return!t.isOptionGroup(n)&&S(t.getOptionValue(n),e,t.equalityKey)});return this.getOptionLabel(n)},getSelectedItemsLabel:function(){var e=/{(.*?)}/,t=this.selectedItemsLabel||this.$primevue.config.locale.selectionMessage;return e.test(t)?t.replace(t.match(e)[0],this.d_value.length+``):t},onToggleAll:function(e){var t=this;if(this.selectAll!==null)this.$emit(`selectall-change`,{originalEvent:e,checked:!this.allSelected});else{var n=this.allSelected?[]:this.visibleOptions.filter(function(e){return t.isValidOption(e)}).map(function(e){return t.getOptionValue(e)});this.updateModel(e,n)}},removeOption:function(e,t){var n=this;e.stopPropagation();var r=this.d_value.filter(function(e){return!S(e,t,n.equalityKey)});this.updateModel(e,r)},clearFilter:function(){this.filterValue=null},hasFocusableElements:function(){return ie(this.overlay,`:not([data-p-hidden-focusable="true"])`).length>0},isOptionMatched:function(e){return this.isValidOption(e)&&typeof this.getOptionLabel(e)==`string`&&this.getOptionLabel(e)?.toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale))},isValidOption:function(e){return T(e)&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))},isValidSelectedOption:function(e){return this.isValidOption(e)&&this.isSelected(e)},isEquals:function(e,t){return S(e,t,this.equalityKey)},isSelected:function(e){var t=this,n=this.getOptionValue(e);return(this.d_value||[]).some(function(e){return t.isEquals(e,n)})},findFirstOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidOption(t)})},findLastOptionIndex:function(){var e=this;return j(this.visibleOptions,function(t){return e.isValidOption(t)})},findNextOptionIndex:function(e){var t=this,n=e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(e){return t.isValidOption(e)}):-1;return n>-1?n+e+1:e},findPrevOptionIndex:function(e){var t=this,n=e>0?j(this.visibleOptions.slice(0,e),function(e){return t.isValidOption(e)}):-1;return n>-1?n:e},findSelectedOptionIndex:function(){var e=this;if(this.$filled){for(var t=function(){var t=e.d_value[r],n=e.visibleOptions.findIndex(function(n){return e.isValidSelectedOption(n)&&e.isEquals(t,e.getOptionValue(n))});if(n>-1)return{v:n}},n,r=this.d_value.length-1;r>=0;r--)if(n=t(),n)return n.v}return-1},findFirstSelectedOptionIndex:function(){var e=this;return this.$filled?this.visibleOptions.findIndex(function(t){return e.isValidSelectedOption(t)}):-1},findLastSelectedOptionIndex:function(){var e=this;return this.$filled?j(this.visibleOptions,function(t){return e.isValidSelectedOption(t)}):-1},findNextSelectedOptionIndex:function(e){var t=this,n=this.$filled&&e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(e){return t.isValidSelectedOption(e)}):-1;return n>-1?n+e+1:-1},findPrevSelectedOptionIndex:function(e){var t=this,n=this.$filled&&e>0?j(this.visibleOptions.slice(0,e),function(e){return t.isValidSelectedOption(e)}):-1;return n>-1?n:-1},findNearestSelectedOptionIndex:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1],n=-1;return this.$filled&&(t?(n=this.findPrevSelectedOptionIndex(e),n=n===-1?this.findNextSelectedOptionIndex(e):n):(n=this.findNextSelectedOptionIndex(e),n=n===-1?this.findPrevSelectedOptionIndex(e):n)),n>-1?n:e},findFirstFocusedOptionIndex:function(){var e=this.findFirstSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e},findLastFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e},searchOptions:function(e){var t=this;this.searchValue=(this.searchValue||``)+e.key;var n=-1;T(this.searchValue)&&(this.focusedOptionIndex===-1?n=this.visibleOptions.findIndex(function(e){return t.isOptionMatched(e)}):(n=this.visibleOptions.slice(this.focusedOptionIndex).findIndex(function(e){return t.isOptionMatched(e)}),n=n===-1?this.visibleOptions.slice(0,this.focusedOptionIndex).findIndex(function(e){return t.isOptionMatched(e)}):n+this.focusedOptionIndex),n===-1&&this.focusedOptionIndex===-1&&(n=this.findFirstFocusedOptionIndex()),n!==-1&&this.changeFocusedOptionIndex(e,n)),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){t.searchValue=``,t.searchTimeout=null},500)},changeFocusedOptionIndex:function(e,t){this.focusedOptionIndex!==t&&(this.focusedOptionIndex=t,this.scrollInView(),this.selectOnFocus&&this.onOptionSelect(e,this.visibleOptions[t]))},scrollInView:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1;this.$nextTick(function(){var n=t===-1?e.focusedOptionId:`${e.$id}_${t}`,r=A(e.list,`li[id="${n}"]`);r?r.scrollIntoView&&r.scrollIntoView({block:`nearest`,inline:`nearest`}):e.virtualScrollerDisabled||e.virtualScroller&&e.virtualScroller.scrollToIndex(t===-1?e.focusedOptionIndex:t)})},autoUpdateModel:function(){if(this.autoOptionFocus&&(this.focusedOptionIndex=this.findFirstFocusedOptionIndex()),this.selectOnFocus&&this.autoOptionFocus&&!this.$filled){var e=this.getOptionValue(this.visibleOptions[this.focusedOptionIndex]);this.updateModel(null,[e])}},updateModel:function(e,t){this.writeValue(t,e),this.$emit(`change`,{originalEvent:e,value:t})},flatOptions:function(e){var t=this;return(e||[]).reduce(function(e,n,r){var i=t.getOptionGroupChildren(n);return i&&Array.isArray(i)?(e.push({optionGroup:n,group:!0,index:r}),i.forEach(function(t){return e.push(t)})):e.push(n),e},[])},overlayRef:function(e){this.overlay=e},listRef:function(e,t){this.list=e,t&&t(e)},virtualScrollerRef:function(e){this.virtualScroller=e}},computed:{visibleOptions:function(){var e=this,t=this.optionGroupLabel?this.flatOptions(this.options):this.options||[];if(this.filterValue){var n=P.filter(t,this.searchFields,this.filterValue,this.filterMatchMode,this.filterLocale);if(this.optionGroupLabel){var r=this.options||[],i=[];return r.forEach(function(t){var r=e.getOptionGroupChildren(t).filter(function(e){return n.includes(e)});r.length>0&&i.push(K(K({},t),{},q({},typeof e.optionGroupChildren==`string`?e.optionGroupChildren:`items`,J(r))))}),this.flatOptions(i)}return n}return t},label:function(){var e;if(this.d_value&&this.d_value.length){if(T(this.maxSelectedLabels)&&this.d_value.length>this.maxSelectedLabels)return this.getSelectedItemsLabel();e=``;for(var t=0;t<this.d_value.length;t++)t!==0&&(e+=`, `),e+=this.getLabelByValue(this.d_value[t])}else e=this.placeholder;return e},chipSelectedItems:function(){return T(this.maxSelectedLabels)&&this.d_value&&this.d_value.length>this.maxSelectedLabels},allSelected:function(){var e=this;return this.selectAll===null?T(this.visibleOptions)&&this.visibleOptions.every(function(t){return e.isOptionGroup(t)||e.isOptionDisabled(t)||e.isSelected(t)}):this.selectAll},hasSelectedOption:function(){return this.$filled},equalityKey:function(){return this.optionValue?null:this.dataKey},searchFields:function(){return this.filterFields||[this.optionLabel]},maxSelectionLimitReached:function(){return this.selectionLimit&&this.d_value&&this.d_value.length===this.selectionLimit},filterResultMessageText:function(){return T(this.visibleOptions)?this.filterMessageText.replaceAll(`{0}`,this.visibleOptions.length):this.emptyFilterMessageText},filterMessageText:function(){return this.filterMessage||this.$primevue.config.locale.searchMessage||``},emptyFilterMessageText:function(){return this.emptyFilterMessage||this.$primevue.config.locale.emptySearchMessage||this.$primevue.config.locale.emptyFilterMessage||``},emptyMessageText:function(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage||``},selectionMessageText:function(){return this.selectionMessage||this.$primevue.config.locale.selectionMessage||``},emptySelectionMessageText:function(){return this.emptySelectionMessage||this.$primevue.config.locale.emptySelectionMessage||``},selectedMessageText:function(){return this.$filled?this.selectionMessageText.replaceAll(`{0}`,this.d_value.length):this.emptySelectionMessageText},focusedOptionId:function(){return this.focusedOptionIndex===-1?null:`${this.$id}_${this.focusedOptionIndex}`},ariaSetSize:function(){var e=this;return this.visibleOptions.filter(function(t){return!e.isOptionGroup(t)}).length},toggleAllAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria[this.allSelected?`selectAll`:`unselectAll`]:void 0},listAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.listLabel:void 0},virtualScrollerDisabled:function(){return!this.virtualScrollerOptions},hasFluid:function(){return E(this.fluid)?!!this.$pcFluid:this.fluid},isClearIconVisible:function(){return this.showClear&&this.d_value&&this.d_value.length&&this.d_value!=null&&T(this.options)&&!this.disabled&&!this.loading},containerDataP:function(){return y(q({invalid:this.$invalid,disabled:this.disabled,focus:this.focused,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))},labelDataP:function(){return y(q(q(q({placeholder:this.label===this.placeholder,clearable:this.showClear,disabled:this.disabled},this.size,this.size),`has-chip`,this.display===`chip`&&this.d_value&&this.d_value.length&&(!this.maxSelectedLabels||this.d_value.length<=this.maxSelectedLabels)),`empty`,!this.placeholder&&!this.$filled))},dropdownIconDataP:function(){return y(q({},this.size,this.size))},overlayDataP:function(){return y(q({},`portal-`+this.appendTo,`portal-`+this.appendTo))}},directives:{ripple:se},components:{InputText:L,Checkbox:H,VirtualScroller:B,Portal:z,Chip:F,IconField:de,InputIcon:fe,TimesIcon:ce,SearchIcon:U,ChevronDownIcon:le,SpinnerIcon:oe,CheckIcon:V}};function Z(e){"@babel/helpers - typeof";return Z=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Z(e)}function Q(e,t,n){return(t=xe(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function xe(e){var t=Se(e,`string`);return Z(t)==`symbol`?t:t+``}function Se(e,t){if(Z(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Z(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Ce=[`data-p`],$=[`id`,`disabled`,`placeholder`,`tabindex`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`aria-invalid`],we=[`data-p`],Te={key:0},Ee=[`data-p`],De=[`id`,`aria-label`],Oe=[`id`],ke=[`id`,`aria-label`,`aria-selected`,`aria-disabled`,`aria-setsize`,`aria-posinset`,`onClick`,`onMousemove`,`data-p-selected`,`data-p-focused`,`data-p-disabled`];function Ae(y,b,x,S,C,w){var T=t(`Chip`),E=t(`SpinnerIcon`),D=t(`Checkbox`),O=t(`InputText`),k=t(`SearchIcon`),A=t(`InputIcon`),j=t(`IconField`),M=t(`VirtualScroller`),N=t(`Portal`),P=c(`ripple`);return i(),f(`div`,a({ref:`container`,class:y.cx(`root`),style:y.sx(`root`),onClick:b[7]||=function(){return w.onContainerClick&&w.onContainerClick.apply(w,arguments)},"data-p":w.containerDataP},y.ptmi(`root`)),[m(`div`,a({class:`p-hidden-accessible`},y.ptm(`hiddenInputContainer`),{"data-p-hidden-accessible":!0}),[m(`input`,a({ref:`focusInput`,id:y.inputId,type:`text`,readonly:``,disabled:y.disabled,placeholder:y.placeholder,tabindex:y.disabled?-1:y.tabindex,role:`combobox`,"aria-label":y.ariaLabel,"aria-labelledby":y.ariaLabelledby,"aria-haspopup":`listbox`,"aria-expanded":C.overlayVisible,"aria-controls":C.overlayVisible?y.$id+`_list`:void 0,"aria-activedescendant":C.focused?w.focusedOptionId:void 0,"aria-invalid":y.invalid||void 0,onFocus:b[0]||=function(){return w.onFocus&&w.onFocus.apply(w,arguments)},onBlur:b[1]||=function(){return w.onBlur&&w.onBlur.apply(w,arguments)},onKeydown:b[2]||=function(){return w.onKeyDown&&w.onKeyDown.apply(w,arguments)}},y.ptm(`hiddenInput`)),null,16,$)],16),m(`div`,a({class:y.cx(`labelContainer`)},y.ptm(`labelContainer`)),[m(`div`,a({class:y.cx(`label`),"data-p":w.labelDataP},y.ptm(`label`)),[v(y.$slots,`value`,{value:y.d_value,placeholder:y.placeholder},function(){return[y.display===`comma`?(i(),f(h,{key:0},[u(e(w.label||`empty`),1)],64)):y.display===`chip`?(i(),f(h,{key:1},[w.chipSelectedItems?(i(),f(`span`,Te,e(w.label),1)):(i(!0),f(h,{key:1},s(y.d_value,function(e,t){return i(),f(`span`,a({key:`chip-${y.optionValue?e:w.getLabelByValue(e)}_${t}`,class:y.cx(`chipItem`)},{ref_for:!0},y.ptm(`chipItem`)),[v(y.$slots,`chip`,{value:e,removeCallback:function(t){return w.removeOption(t,e)}},function(){return[_(T,{class:n(y.cx(`pcChip`)),label:w.getLabelByValue(e),removeIcon:y.chipIcon||y.removeTokenIcon,removable:``,unstyled:y.unstyled,onRemove:function(t){return w.removeOption(t,e)},pt:y.ptm(`pcChip`)},{removeicon:l(function(){return[v(y.$slots,y.$slots.chipicon?`chipicon`:`removetokenicon`,{class:n(y.cx(`chipIcon`)),item:e,removeCallback:function(t){return w.removeOption(t,e)}})]}),_:2},1032,[`class`,`label`,`removeIcon`,`unstyled`,`onRemove`,`pt`])]})],16)}),128)),!y.d_value||y.d_value.length===0?(i(),f(h,{key:2},[u(e(y.placeholder||`empty`),1)],64)):d(``,!0)],64)):d(``,!0)]})],16,we)],16),w.isClearIconVisible?v(y.$slots,`clearicon`,{key:0,class:n(y.cx(`clearIcon`)),clearCallback:w.onClearClick},function(){return[(i(),g(r(y.clearIcon?`i`:`TimesIcon`),a({ref:`clearIcon`,class:[y.cx(`clearIcon`),y.clearIcon],onClick:w.onClearClick},y.ptm(`clearIcon`),{"data-pc-section":`clearicon`}),null,16,[`class`,`onClick`]))]}):d(``,!0),m(`div`,a({class:y.cx(`dropdown`)},y.ptm(`dropdown`)),[y.loading?v(y.$slots,`loadingicon`,{key:0,class:n(y.cx(`loadingIcon`))},function(){return[y.loadingIcon?(i(),f(`span`,a({key:0,class:[y.cx(`loadingIcon`),`pi-spin`,y.loadingIcon],"aria-hidden":`true`},y.ptm(`loadingIcon`)),null,16)):(i(),g(E,a({key:1,class:y.cx(`loadingIcon`),spin:``,"aria-hidden":`true`},y.ptm(`loadingIcon`)),null,16,[`class`]))]}):v(y.$slots,`dropdownicon`,{key:1,class:n(y.cx(`dropdownIcon`))},function(){return[(i(),g(r(y.dropdownIcon?`span`:`ChevronDownIcon`),a({class:[y.cx(`dropdownIcon`),y.dropdownIcon],"aria-hidden":`true`,"data-p":w.dropdownIconDataP},y.ptm(`dropdownIcon`)),null,16,[`class`,`data-p`]))]})],16),_(N,{appendTo:y.appendTo},{default:l(function(){return[_(te,a({name:`p-anchored-overlay`,onEnter:w.onOverlayEnter,onAfterEnter:w.onOverlayAfterEnter,onLeave:w.onOverlayLeave,onAfterLeave:w.onOverlayAfterLeave},y.ptm(`transition`)),{default:l(function(){return[C.overlayVisible?(i(),f(`div`,a({key:0,ref:w.overlayRef,style:[y.panelStyle,y.overlayStyle],class:[y.cx(`overlay`),y.panelClass,y.overlayClass],onClick:b[5]||=function(){return w.onOverlayClick&&w.onOverlayClick.apply(w,arguments)},onKeydown:b[6]||=function(){return w.onOverlayKeyDown&&w.onOverlayKeyDown.apply(w,arguments)},"data-p":w.overlayDataP},y.ptm(`overlay`)),[m(`span`,a({ref:`firstHiddenFocusableElementOnOverlay`,role:`presentation`,"aria-hidden":`true`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:b[3]||=function(){return w.onFirstHiddenFocus&&w.onFirstHiddenFocus.apply(w,arguments)}},y.ptm(`hiddenFirstFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16),v(y.$slots,`header`,{value:y.d_value,options:w.visibleOptions}),y.showToggleAll&&y.selectionLimit==null||y.filter?(i(),f(`div`,a({key:0,class:y.cx(`header`)},y.ptm(`header`)),[y.showToggleAll&&y.selectionLimit==null?(i(),g(D,{key:0,modelValue:w.allSelected,binary:!0,disabled:y.disabled,variant:y.variant,"aria-label":w.toggleAllAriaLabel,onChange:w.onToggleAll,unstyled:y.unstyled,pt:w.getHeaderCheckboxPTOptions(`pcHeaderCheckbox`),formControl:{novalidate:!0}},{icon:l(function(e){return[y.$slots.headercheckboxicon?(i(),g(r(y.$slots.headercheckboxicon),{key:0,checked:e.checked,class:n(e.class)},null,8,[`checked`,`class`])):e.checked?(i(),g(r(y.checkboxIcon?`span`:`CheckIcon`),a({key:1,class:[e.class,Q({},y.checkboxIcon,e.checked)]},w.getHeaderCheckboxPTOptions(`pcHeaderCheckbox.icon`)),null,16,[`class`])):d(``,!0)]}),_:1},8,[`modelValue`,`disabled`,`variant`,`aria-label`,`onChange`,`unstyled`,`pt`])):d(``,!0),y.filter?(i(),g(j,{key:1,class:n(y.cx(`pcFilterContainer`)),unstyled:y.unstyled,pt:y.ptm(`pcFilterContainer`)},{default:l(function(){return[_(O,{ref:`filterInput`,value:C.filterValue,onVnodeMounted:w.onFilterUpdated,onVnodeUpdated:w.onFilterUpdated,class:n(y.cx(`pcFilter`)),placeholder:y.filterPlaceholder,disabled:y.disabled,variant:y.variant,unstyled:y.unstyled,role:`searchbox`,autocomplete:`off`,"aria-owns":y.$id+`_list`,"aria-activedescendant":w.focusedOptionId,onKeydown:w.onFilterKeyDown,onBlur:w.onFilterBlur,onInput:w.onFilterChange,pt:y.ptm(`pcFilter`),formControl:{novalidate:!0}},null,8,[`value`,`onVnodeMounted`,`onVnodeUpdated`,`class`,`placeholder`,`disabled`,`variant`,`unstyled`,`aria-owns`,`aria-activedescendant`,`onKeydown`,`onBlur`,`onInput`,`pt`]),_(A,{unstyled:y.unstyled,pt:y.ptm(`pcFilterIconContainer`)},{default:l(function(){return[v(y.$slots,`filtericon`,{},function(){return[y.filterIcon?(i(),f(`span`,a({key:0,class:y.filterIcon},y.ptm(`filterIcon`)),null,16)):(i(),g(k,o(a({key:1},y.ptm(`filterIcon`))),null,16))]})]}),_:3},8,[`unstyled`,`pt`])]}),_:3},8,[`class`,`unstyled`,`pt`])):d(``,!0),y.filter?(i(),f(`span`,a({key:2,role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},y.ptm(`hiddenFilterResult`),{"data-p-hidden-accessible":!0}),e(w.filterResultMessageText),17)):d(``,!0)],16)):d(``,!0),m(`div`,a({class:y.cx(`listContainer`),style:{"max-height":w.virtualScrollerDisabled?y.scrollHeight:``}},y.ptm(`listContainer`)),[_(M,a({ref:w.virtualScrollerRef},y.virtualScrollerOptions,{items:w.visibleOptions,style:{height:y.scrollHeight},tabindex:-1,disabled:w.virtualScrollerDisabled,pt:y.ptm(`virtualScroller`)}),p({content:l(function(t){var o=t.styleClass,c=t.contentRef,p=t.items,b=t.getItemOptions,x=t.contentStyle,S=t.itemSize;return[m(`ul`,a({ref:function(e){return w.listRef(e,c)},id:y.$id+`_list`,class:[y.cx(`list`),o],style:x,role:`listbox`,"aria-multiselectable":`true`,"aria-label":w.listAriaLabel},y.ptm(`list`)),[(i(!0),f(h,null,s(p,function(t,o){return i(),f(h,{key:w.getOptionRenderKey(t,w.getOptionIndex(o,b))},[w.isOptionGroup(t)?(i(),f(`li`,a({key:0,id:y.$id+`_`+w.getOptionIndex(o,b),style:{height:S?S+`px`:void 0},class:y.cx(`optionGroup`),role:`option`},{ref_for:!0},y.ptm(`optionGroup`)),[v(y.$slots,`optiongroup`,{option:t.optionGroup,index:w.getOptionIndex(o,b)},function(){return[u(e(w.getOptionGroupLabel(t.optionGroup)),1)]})],16,Oe)):ee((i(),f(`li`,a({key:1,id:y.$id+`_`+w.getOptionIndex(o,b),style:{height:S?S+`px`:void 0},class:y.cx(`option`,{option:t,index:o,getItemOptions:b}),role:`option`,"aria-label":w.getOptionLabel(t),"aria-selected":w.isSelected(t),"aria-disabled":w.isOptionDisabled(t),"aria-setsize":w.ariaSetSize,"aria-posinset":w.getAriaPosInset(w.getOptionIndex(o,b)),onClick:function(e){return w.onOptionSelect(e,t,w.getOptionIndex(o,b),!0)},onMousemove:function(e){return w.onOptionMouseMove(e,w.getOptionIndex(o,b))}},{ref_for:!0},w.getCheckboxPTOptions(t,b,o,`option`),{"data-p-selected":w.isSelected(t),"data-p-focused":C.focusedOptionIndex===w.getOptionIndex(o,b),"data-p-disabled":w.isOptionDisabled(t)}),[_(D,{defaultValue:w.isSelected(t),binary:!0,tabindex:-1,variant:y.variant,unstyled:y.unstyled,pt:w.getCheckboxPTOptions(t,b,o,`pcOptionCheckbox`),formControl:{novalidate:!0}},{icon:l(function(e){return[y.$slots.optioncheckboxicon||y.$slots.itemcheckboxicon?(i(),g(r(y.$slots.optioncheckboxicon||y.$slots.itemcheckboxicon),{key:0,checked:e.checked,class:n(e.class)},null,8,[`checked`,`class`])):e.checked?(i(),g(r(y.checkboxIcon?`span`:`CheckIcon`),a({key:1,class:[e.class,Q({},y.checkboxIcon,e.checked)]},{ref_for:!0},w.getCheckboxPTOptions(t,b,o,`pcOptionCheckbox.icon`)),null,16,[`class`])):d(``,!0)]}),_:2},1032,[`defaultValue`,`variant`,`unstyled`,`pt`]),v(y.$slots,`option`,{option:t,selected:w.isSelected(t),index:w.getOptionIndex(o,b)},function(){return[m(`span`,a({ref_for:!0},y.ptm(`optionLabel`)),e(w.getOptionLabel(t)),17)]})],16,ke)),[[P]])],64)}),128)),C.filterValue&&(!p||p&&p.length===0)?(i(),f(`li`,a({key:0,class:y.cx(`emptyMessage`),role:`option`},y.ptm(`emptyMessage`)),[v(y.$slots,`emptyfilter`,{},function(){return[u(e(w.emptyFilterMessageText),1)]})],16)):!y.options||y.options&&y.options.length===0?(i(),f(`li`,a({key:1,class:y.cx(`emptyMessage`),role:`option`},y.ptm(`emptyMessage`)),[v(y.$slots,`empty`,{},function(){return[u(e(w.emptyMessageText),1)]})],16)):d(``,!0)],16,De)]}),_:2},[y.$slots.loader?{name:`loader`,fn:l(function(e){var t=e.options;return[v(y.$slots,`loader`,{options:t})]}),key:`0`}:void 0]),1040,[`items`,`style`,`disabled`,`pt`])],16),v(y.$slots,`footer`,{value:y.d_value,options:w.visibleOptions}),!y.options||y.options&&y.options.length===0?(i(),f(`span`,a({key:1,role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},y.ptm(`hiddenEmptyMessage`),{"data-p-hidden-accessible":!0}),e(w.emptyMessageText),17)):d(``,!0),m(`span`,a({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},y.ptm(`hiddenSelectedMessage`),{"data-p-hidden-accessible":!0}),e(w.selectedMessageText),17),m(`span`,a({ref:`lastHiddenFocusableElementOnOverlay`,role:`presentation`,"aria-hidden":`true`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:b[4]||=function(){return w.onLastHiddenFocus&&w.onLastHiddenFocus.apply(w,arguments)}},y.ptm(`hiddenLastFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16)],16,Ee)):d(``,!0)]}),_:3},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`])],16,Ce)}X.render=Ae;export{X as default};