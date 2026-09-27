import{At as e,B as t,Dt as n,H as r,I as i,O as a,R as o,V as s,X as c,Z as l,_ as u,d,f,h as p,kt as m,l as h,r as g,u as _,v,z as y}from"./Ca5TY7vb.js";import{t as b}from"./CRHlWn3X.js";import{t as x}from"./cO8iUN-n.js";import{Dt as ee,F as S,J as C,Nt as w,Ot as T,Rt as E,S as D,U as O,_ as k,ct as A,gt as j,jt as M,o as te,ot as ne}from"#entry";import{t as re}from"./DNrkBYt1.js";import{t as ie}from"./BnSyHpKn.js";import{t as ae}from"./C-0OC8iq.js";import{t as oe}from"./Cm8kdziv.js";import{t as N}from"./CujpVRyB.js";import{n as P}from"./BZh0fBGQ.js";import{t as F}from"./DA01FRxN.js";import{n as I}from"./AQq5B3VT.js";import{t as L}from"./nFz5vn1U.js";import{t as R}from"./Bqeo7u7y.js";import{t as z}from"./zrJUdTnj.js";var B=te.extend({name:`autocomplete`,style:`
    .p-autocomplete {
        display: inline-flex;
    }

    .p-autocomplete-loader {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        inset-inline-end: dt('autocomplete.padding.x');
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-loader {
        inset-inline-end: calc(dt('autocomplete.dropdown.width') + dt('autocomplete.padding.x'));
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input {
        flex: 1 1 auto;
        width: 1%;
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input,
    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input-multiple {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-autocomplete-dropdown {
        cursor: pointer;
        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('autocomplete.dropdown.width');
        border-start-end-radius: dt('autocomplete.dropdown.border.radius');
        border-end-end-radius: dt('autocomplete.dropdown.border.radius');
        background: dt('autocomplete.dropdown.background');
        border: 1px solid dt('autocomplete.dropdown.border.color');
        border-inline-start: 0 none;
        color: dt('autocomplete.dropdown.color');
        transition:
            background dt('autocomplete.transition.duration'),
            color dt('autocomplete.transition.duration'),
            border-color dt('autocomplete.transition.duration'),
            outline-color dt('autocomplete.transition.duration'),
            box-shadow dt('autocomplete.transition.duration');
        outline-color: transparent;
    }

    .p-autocomplete-dropdown:not(:disabled):hover {
        background: dt('autocomplete.dropdown.hover.background');
        border-color: dt('autocomplete.dropdown.hover.border.color');
        color: dt('autocomplete.dropdown.hover.color');
    }

    .p-autocomplete-dropdown:not(:disabled):active {
        background: dt('autocomplete.dropdown.active.background');
        border-color: dt('autocomplete.dropdown.active.border.color');
        color: dt('autocomplete.dropdown.active.color');
    }

    .p-autocomplete-dropdown:focus-visible {
        box-shadow: dt('autocomplete.dropdown.focus.ring.shadow');
        outline: dt('autocomplete.dropdown.focus.ring.width') dt('autocomplete.dropdown.focus.ring.style') dt('autocomplete.dropdown.focus.ring.color');
        outline-offset: dt('autocomplete.dropdown.focus.ring.offset');
    }

    .p-autocomplete-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('autocomplete.overlay.background');
        color: dt('autocomplete.overlay.color');
        border: 1px solid dt('autocomplete.overlay.border.color');
        border-radius: dt('autocomplete.overlay.border.radius');
        box-shadow: dt('autocomplete.overlay.shadow');
        min-width: 100%;
    }

    .p-autocomplete-list-container {
        overflow: auto;
    }

    .p-autocomplete-list {
        margin: 0;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: dt('autocomplete.list.gap');
        padding: dt('autocomplete.list.padding');
    }

    .p-autocomplete-option {
        cursor: pointer;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: dt('autocomplete.option.padding');
        border: 0 none;
        color: dt('autocomplete.option.color');
        background: transparent;
        transition:
            background dt('autocomplete.transition.duration'),
            color dt('autocomplete.transition.duration'),
            border-color dt('autocomplete.transition.duration');
        border-radius: dt('autocomplete.option.border.radius');
    }

    .p-autocomplete-option:not(.p-autocomplete-option-selected):not(.p-disabled).p-focus {
        background: dt('autocomplete.option.focus.background');
        color: dt('autocomplete.option.focus.color');
    }

    .p-autocomplete-option:not(.p-autocomplete-option-selected):not(.p-disabled):hover {
        background: dt('autocomplete.option.focus.background');
        color: dt('autocomplete.option.focus.color');
    }

    .p-autocomplete-option-selected {
        background: dt('autocomplete.option.selected.background');
        color: dt('autocomplete.option.selected.color');
    }

    .p-autocomplete-option-selected.p-focus {
        background: dt('autocomplete.option.selected.focus.background');
        color: dt('autocomplete.option.selected.focus.color');
    }

    .p-autocomplete-option-group {
        margin: 0;
        padding: dt('autocomplete.option.group.padding');
        color: dt('autocomplete.option.group.color');
        background: dt('autocomplete.option.group.background');
        font-weight: dt('autocomplete.option.group.font.weight');
    }

    .p-autocomplete-input-multiple {
        margin: 0;
        list-style-type: none;
        cursor: text;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: calc(dt('autocomplete.padding.y') / 2) dt('autocomplete.padding.x');
        gap: calc(dt('autocomplete.padding.y') / 2);
        color: dt('autocomplete.color');
        background: dt('autocomplete.background');
        border: 1px solid dt('autocomplete.border.color');
        border-radius: dt('autocomplete.border.radius');
        width: 100%;
        transition:
            background dt('autocomplete.transition.duration'),
            color dt('autocomplete.transition.duration'),
            border-color dt('autocomplete.transition.duration'),
            outline-color dt('autocomplete.transition.duration'),
            box-shadow dt('autocomplete.transition.duration');
        outline-color: transparent;
        box-shadow: dt('autocomplete.shadow');
    }

    .p-autocomplete-input-multiple.p-disabled {
        opacity: 1;
        background: dt('autocomplete.disabled.background');
        color: dt('autocomplete.disabled.color');
    }

    .p-autocomplete-input-multiple:not(.p-disabled):hover {
        border-color: dt('autocomplete.hover.border.color');
    }

    .p-autocomplete.p-focus .p-autocomplete-input-multiple:not(.p-disabled) {
        border-color: dt('autocomplete.focus.border.color');
        box-shadow: dt('autocomplete.focus.ring.shadow');
        outline: dt('autocomplete.focus.ring.width') dt('autocomplete.focus.ring.style') dt('autocomplete.focus.ring.color');
        outline-offset: dt('autocomplete.focus.ring.offset');
    }

    .p-autocomplete.p-invalid .p-autocomplete-input-multiple {
        border-color: dt('autocomplete.invalid.border.color');
    }

    .p-variant-filled.p-autocomplete-input-multiple {
        background: dt('autocomplete.filled.background');
    }

    .p-autocomplete-input-multiple.p-variant-filled:not(.p-disabled):hover {
        background: dt('autocomplete.filled.hover.background');
    }

    .p-autocomplete.p-focus .p-autocomplete-input-multiple.p-variant-filled:not(.p-disabled) {
        background: dt('autocomplete.filled.focus.background');
    }

    .p-autocomplete-chip.p-chip {
        padding-block-start: calc(dt('autocomplete.padding.y') / 2);
        padding-block-end: calc(dt('autocomplete.padding.y') / 2);
        border-radius: dt('autocomplete.chip.border.radius');
    }

    .p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
        padding-inline-start: calc(dt('autocomplete.padding.y') / 2);
        padding-inline-end: calc(dt('autocomplete.padding.y') / 2);
    }

    .p-autocomplete-chip-item.p-focus .p-autocomplete-chip {
        background: dt('autocomplete.chip.focus.background');
        color: dt('autocomplete.chip.focus.color');
    }

    .p-autocomplete-input-chip {
        flex: 1 1 auto;
        display: inline-flex;
        padding-block-start: calc(dt('autocomplete.padding.y') / 2);
        padding-block-end: calc(dt('autocomplete.padding.y') / 2);
    }

    .p-autocomplete-input-chip input {
        border: 0 none;
        outline: 0 none;
        background: transparent;
        margin: 0;
        padding: 0;
        box-shadow: none;
        border-radius: 0;
        width: 100%;
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: inherit;
    }

    .p-autocomplete-input-chip input::placeholder {
        color: dt('autocomplete.placeholder.color');
    }

    .p-autocomplete.p-invalid .p-autocomplete-input-chip input::placeholder {
        color: dt('autocomplete.invalid.placeholder.color');
    }

    .p-autocomplete-empty-message {
        padding: dt('autocomplete.empty.message.padding');
    }

    .p-autocomplete-fluid {
        display: flex;
    }

    .p-autocomplete-fluid:has(.p-autocomplete-dropdown) .p-autocomplete-input {
        width: 1%;
    }

    .p-autocomplete:has(.p-inputtext-sm) .p-autocomplete-dropdown {
        width: dt('autocomplete.dropdown.sm.width');
    }

    .p-autocomplete:has(.p-inputtext-sm) .p-autocomplete-dropdown .p-icon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
    }

    .p-autocomplete:has(.p-inputtext-lg) .p-autocomplete-dropdown {
        width: dt('autocomplete.dropdown.lg.width');
    }

    .p-autocomplete:has(.p-inputtext-lg) .p-autocomplete-dropdown .p-icon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
    }

    .p-autocomplete-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        color: dt('form.field.icon.color');
        inset-inline-end: dt('autocomplete.padding.x');
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-clear-icon {
        inset-inline-end: calc(dt('autocomplete.padding.x') + dt('autocomplete.dropdown.width'));
    }

    .p-autocomplete:has(.p-autocomplete-clear-icon) .p-autocomplete-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputgroup .p-autocomplete-dropdown {
        border-radius: 0;
    }

    .p-inputgroup > .p-autocomplete:last-child:has(.p-autocomplete-dropdown) > .p-autocomplete-input {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-inputgroup > .p-autocomplete:last-child .p-autocomplete-dropdown {
        border-start-end-radius: dt('autocomplete.dropdown.border.radius');
        border-end-end-radius: dt('autocomplete.dropdown.border.radius');
    }
`,classes:{root:function(e){var t=e.instance;return[`p-autocomplete p-component p-inputwrapper`,{"p-invalid":t.$invalid,"p-focus":t.focused,"p-inputwrapper-filled":t.$filled||w(t.inputValue),"p-inputwrapper-focus":t.focused,"p-autocomplete-open":t.overlayVisible,"p-autocomplete-fluid":t.$fluid,"p-autocomplete-clearable":t.isClearIconVisible}]},pcInputText:`p-autocomplete-input`,inputMultiple:function(e){var t=e.instance,n=e.props;return[`p-autocomplete-input-multiple`,{"p-variant-filled":t.$variant===`filled`,"p-disabled":n.disabled}]},clearIcon:`p-autocomplete-clear-icon`,chipItem:function(e){var t=e.instance,n=e.i;return[`p-autocomplete-chip-item`,{"p-focus":t.focusedMultipleOptionIndex===n}]},pcChip:`p-autocomplete-chip`,chipIcon:`p-autocomplete-chip-icon`,inputChip:`p-autocomplete-input-chip`,loader:`p-autocomplete-loader`,dropdown:`p-autocomplete-dropdown`,overlay:`p-autocomplete-overlay p-component`,listContainer:`p-autocomplete-list-container`,list:`p-autocomplete-list`,optionGroup:`p-autocomplete-option-group`,option:function(e){var t=e.instance,n=e.option,r=e.i,i=e.getItemOptions;return[`p-autocomplete-option`,{"p-autocomplete-option-selected":t.isSelected(n),"p-focus":t.focusedOptionIndex===t.getOptionIndex(r,i),"p-disabled":t.isOptionDisabled(n)}]},emptyMessage:`p-autocomplete-empty-message`},inlineStyles:{root:{position:`relative`}}}),V={name:`BaseAutoComplete`,extends:F,props:{suggestions:{type:Array,default:null},optionLabel:null,optionDisabled:null,optionGroupLabel:null,optionGroupChildren:null,scrollHeight:{type:String,default:`14rem`},dropdown:{type:Boolean,default:!1},dropdownMode:{type:String,default:`blank`},multiple:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},placeholder:{type:String,default:null},dataKey:{type:String,default:null},minLength:{type:Number,default:1},delay:{type:Number,default:300},appendTo:{type:[String,Object],default:`body`},forceSelection:{type:Boolean,default:!1},completeOnFocus:{type:Boolean,default:!1},showClear:{type:Boolean,default:!1},inputId:{type:String,default:null},inputStyle:{type:Object,default:null},inputClass:{type:[String,Object],default:null},panelStyle:{type:Object,default:null},panelClass:{type:[String,Object],default:null},overlayStyle:{type:Object,default:null},overlayClass:{type:[String,Object],default:null},dropdownIcon:{type:String,default:null},dropdownClass:{type:[String,Object],default:null},loader:{type:String,default:null},loadingIcon:{type:String,default:null},removeTokenIcon:{type:String,default:null},chipIcon:{type:String,default:null},virtualScrollerOptions:{type:Object,default:null},autoOptionFocus:{type:Boolean,default:!1},selectOnFocus:{type:Boolean,default:!1},focusOnHover:{type:Boolean,default:!0},searchLocale:{type:String,default:void 0},searchMessage:{type:String,default:null},selectionMessage:{type:String,default:null},emptySelectionMessage:{type:String,default:null},emptySearchMessage:{type:String,default:null},showEmptyMessage:{type:Boolean,default:!0},tabindex:{type:Number,default:0},typeahead:{type:Boolean,default:!0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:B,provide:function(){return{$pcAutoComplete:this,$parentInstance:this}}};function H(e,t,n){return(t=U(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function U(e){var t=W(e,`string`);return G(t)==`symbol`?t:t+``}function W(e,t){if(G(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(G(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function G(e){"@babel/helpers - typeof";return G=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},G(e)}function K(e){return le(e)||ce(e)||se(e)||q()}function q(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function se(e,t){if(e){if(typeof e==`string`)return J(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?J(e,t):void 0}}function ce(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function le(e){if(Array.isArray(e))return J(e)}function J(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var Y={name:`AutoComplete`,extends:V,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`item-select`,`item-unselect`,`option-select`,`option-unselect`,`dropdown-click`,`clear`,`complete`,`before-show`,`before-hide`,`show`,`hide`],inject:{$pcFluid:{default:null}},outsideClickListener:null,resizeListener:null,scrollHandler:null,overlay:null,virtualScroller:null,searchTimeout:null,dirty:!1,startRangeIndex:-1,data:function(){return{clicked:!1,focused:!1,focusedOptionIndex:-1,focusedMultipleOptionIndex:-1,overlayVisible:!1,searching:!1}},watch:{suggestions:function(){this.searching&&(this.show(),this.focusedOptionIndex=this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1,this.searching=!1,!this.showEmptyMessage&&this.visibleOptions.length===0&&this.hide()),this.autoUpdateModel()}},mounted:function(){this.autoUpdateModel()},updated:function(){this.overlayVisible&&this.alignOverlay()},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.overlay&&=(x.clear(this.overlay),null)},methods:{getOptionIndex:function(e,t){return this.virtualScrollerDisabled?e:t&&t(e).index},getOptionLabel:function(e){return this.optionLabel?M(e,this.optionLabel):e},getOptionValue:function(e){return e},getOptionRenderKey:function(e,t){return(this.dataKey?M(e,this.dataKey):this.getOptionLabel(e))+`_`+t},getPTOptions:function(e,t,n,r){return this.ptm(r,{context:{option:e,index:n,selected:this.isSelected(e),focused:this.focusedOptionIndex===this.getOptionIndex(n,t),disabled:this.isOptionDisabled(e)}})},isOptionDisabled:function(e){return this.optionDisabled?M(e,this.optionDisabled):!1},isOptionGroup:function(e){return this.optionGroupLabel&&e.optionGroup&&e.group},getOptionGroupLabel:function(e){return M(e,this.optionGroupLabel)},getOptionGroupChildren:function(e){return M(e,this.optionGroupChildren)},getAriaPosInset:function(e){var t=this;return(this.optionGroupLabel?e-this.visibleOptions.slice(0,e).filter(function(e){return t.isOptionGroup(e)}).length:e)+1},show:function(e){this.$emit(`before-show`),this.dirty=!0,this.overlayVisible=!0,this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1:this.focusedOptionIndex,e&&C(this.multiple?this.$refs.focusInput:this.$refs.focusInput.$el)},hide:function(e){var t=this,n=function(){t.$emit(`before-hide`),t.dirty=e,t.overlayVisible=!1,t.clicked=!1,t.focusedOptionIndex=-1,e&&C(t.multiple?t.$refs.focusInput:t.$refs.focusInput?.$el)};setTimeout(function(){n()},0)},onFocus:function(e){this.disabled||(!this.dirty&&this.completeOnFocus&&this.search(e,e.target.value,`focus`),this.dirty=!0,this.focused=!0,this.overlayVisible&&(this.focusedOptionIndex=this.focusedOptionIndex===-1?this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1:this.focusedOptionIndex,this.scrollInView(this.focusedOptionIndex)),this.$emit(`focus`,e))},onBlur:function(e){var t,n;this.dirty=!1,this.focused=!1,this.focusedOptionIndex=-1,this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n)},onKeyDown:function(e){if(this.disabled){e.preventDefault();return}switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`ArrowRight`:this.onArrowRightKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`ShiftLeft`:case`ShiftRight`:this.onShiftKey(e);break;case`Backspace`:this.onBackspaceKey(e)}this.clicked=!1},onInput:function(e){var t=this;if(this.typeahead){this.searchTimeout&&clearTimeout(this.searchTimeout);var n=e.target.value;this.multiple||this.updateModel(e,n),n.length===0?(this.searching=!1,this.hide(),this.$emit(`clear`)):n.length>=this.minLength?(this.focusedOptionIndex=-1,this.searchTimeout=setTimeout(function(){t.search(e,n,`input`)},this.delay)):(this.searching=!1,this.hide())}},onChange:function(e){var t=this;if(this.forceSelection){var n=!1;if(this.visibleOptions&&!this.multiple){var r,i=this.multiple?this.$refs.focusInput.value:(r=this.$refs.focusInput)==null||(r=r.$el)==null?void 0:r.value,a=this.visibleOptions.find(function(e){return t.isOptionMatched(e,i||``)});a!==void 0&&(n=!0,!this.isSelected(a)&&this.onOptionSelect(e,a))}if(!n){if(this.multiple)this.$refs.focusInput.value=``;else{var o=this.$refs.focusInput?.$el;o&&(o.value=``)}this.$emit(`clear`),!this.multiple&&this.updateModel(e,null)}}},onMultipleContainerFocus:function(){this.disabled||(this.focused=!0)},onMultipleContainerBlur:function(){this.focusedMultipleOptionIndex=-1,this.focused=!1},onMultipleContainerKeyDown:function(e){if(this.disabled){e.preventDefault();return}switch(e.code){case`ArrowLeft`:this.onArrowLeftKeyOnMultiple(e);break;case`ArrowRight`:this.onArrowRightKeyOnMultiple(e);break;case`Backspace`:this.onBackspaceKeyOnMultiple(e)}},onContainerClick:function(e){this.clicked=!0,!(this.disabled||this.searching||this.loading||this.isDropdownClicked(e))&&(!this.overlay||!this.overlay.contains(e.target))&&C(this.multiple?this.$refs.focusInput:this.$refs.focusInput.$el)},onDropdownClick:function(e){var t=void 0;if(this.overlayVisible)this.hide(!0);else{var n=this.multiple?this.$refs.focusInput:this.$refs.focusInput.$el;C(n),t=n.value,this.dropdownMode===`blank`?this.search(e,``,`dropdown`):this.dropdownMode===`current`&&this.search(e,t,`dropdown`)}this.$emit(`dropdown-click`,{originalEvent:e,query:t})},onOptionSelect:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,r=this.getOptionValue(t);this.multiple?(this.$refs.focusInput.value=``,this.isSelected(t)||this.updateModel(e,[].concat(K(this.d_value||[]),[r]))):this.updateModel(e,r),this.$emit(`item-select`,{originalEvent:e,value:t}),this.$emit(`option-select`,{originalEvent:e,value:t}),n&&this.hide(!0)},onOptionMouseMove:function(e,t){this.focusOnHover&&this.changeFocusedOptionIndex(e,t)},onOptionSelectRange:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:-1,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:-1;if(n===-1&&(n=this.findNearestSelectedOptionIndex(r,!0)),r===-1&&(r=this.findNearestSelectedOptionIndex(n)),n!==-1&&r!==-1){var i=Math.min(n,r),a=Math.max(n,r),o=this.visibleOptions.slice(i,a+1).filter(function(e){return t.isValidOption(e)}).filter(function(e){return!t.isSelected(e)}).map(function(e){return t.getOptionValue(e)});this.updateModel(e,[].concat(K(this.d_value||[]),K(o)))}},onClearClick:function(e){this.updateModel(e,null)},onOverlayClick:function(e){L.emit(`overlay-click`,{originalEvent:e,target:this.$el})},onOverlayKeyDown:function(e){e.code===`Escape`&&this.onEscapeKey(e)},onArrowDownKey:function(e){if(this.overlayVisible){var t=this.focusedOptionIndex===-1?this.clicked?this.findFirstOptionIndex():this.findFirstFocusedOptionIndex():this.findNextOptionIndex(this.focusedOptionIndex);this.multiple&&e.shiftKey&&this.onOptionSelectRange(e,this.startRangeIndex,t),this.changeFocusedOptionIndex(e,t),e.preventDefault()}},onArrowUpKey:function(e){if(this.overlayVisible){if(e.altKey)this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(),e.preventDefault();else{var t=this.focusedOptionIndex===-1?this.clicked?this.findLastOptionIndex():this.findLastFocusedOptionIndex():this.findPrevOptionIndex(this.focusedOptionIndex);this.multiple&&e.shiftKey&&this.onOptionSelectRange(e,t,this.startRangeIndex),this.changeFocusedOptionIndex(e,t),e.preventDefault()}}},onArrowLeftKey:function(e){var t=e.currentTarget;this.focusedOptionIndex=-1,this.multiple&&(T(t.value)&&this.$filled?(C(this.$refs.multiContainer),this.focusedMultipleOptionIndex=this.d_value.length):e.stopPropagation())},onArrowRightKey:function(e){this.focusedOptionIndex=-1,this.multiple&&e.stopPropagation()},onHomeKey:function(e){var t=e.currentTarget,n=t.value.length,r=e.metaKey||e.ctrlKey,i=this.findFirstOptionIndex();this.multiple&&e.shiftKey&&r&&this.onOptionSelectRange(e,i,this.startRangeIndex),t.setSelectionRange(0,e.shiftKey?n:0),this.focusedOptionIndex=-1,e.preventDefault()},onEndKey:function(e){var t=e.currentTarget,n=t.value.length,r=e.metaKey||e.ctrlKey,i=this.findLastOptionIndex();this.multiple&&e.shiftKey&&r&&this.onOptionSelectRange(e,this.startRangeIndex,i),t.setSelectionRange(e.shiftKey?0:n,n),this.focusedOptionIndex=-1,e.preventDefault()},onPageUpKey:function(e){this.scrollInView(0),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.visibleOptions.length-1),e.preventDefault()},onEnterKey:function(e){this.typeahead?this.overlayVisible?(this.focusedOptionIndex!==-1&&(this.multiple&&e.shiftKey?(this.onOptionSelectRange(e,this.focusedOptionIndex),e.preventDefault()):this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex])),this.hide()):(this.focusedOptionIndex=-1,this.onArrowDownKey(e)):this.multiple&&(e.target.value.trim()&&(this.updateModel(e,[].concat(K(this.d_value||[]),[e.target.value.trim()])),this.$refs.focusInput.value=``),e.preventDefault())},onSpaceKey:function(e){!this.autoOptionFocus&&this.focusedOptionIndex!==-1&&this.onEnterKey(e)},onEscapeKey:function(e){this.overlayVisible&&this.hide(!0),e.preventDefault()},onTabKey:function(e){this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide()},onShiftKey:function(){this.startRangeIndex=this.focusedOptionIndex},onBackspaceKey:function(e){if(this.multiple){if(w(this.d_value)&&!this.$refs.focusInput.value){var t=this.d_value[this.d_value.length-1],n=this.d_value.slice(0,-1);this.writeValue(n,e),this.$emit(`item-unselect`,{originalEvent:e,value:t}),this.$emit(`option-unselect`,{originalEvent:e,value:t})}e.stopPropagation()}},onArrowLeftKeyOnMultiple:function(){this.focusedMultipleOptionIndex=this.focusedMultipleOptionIndex<1?0:this.focusedMultipleOptionIndex-1},onArrowRightKeyOnMultiple:function(){this.focusedMultipleOptionIndex++,this.focusedMultipleOptionIndex>this.d_value.length-1&&(this.focusedMultipleOptionIndex=-1,C(this.$refs.focusInput))},onBackspaceKeyOnMultiple:function(e){this.focusedMultipleOptionIndex!==-1&&this.removeOption(e,this.focusedMultipleOptionIndex)},onOverlayEnter:function(e){x.set(`overlay`,e,this.$primevue.config.zIndex.overlay),S(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.$attrSelector&&e.setAttribute(this.$attrSelector,``)},onOverlayAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit(`show`)},onOverlayLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit(`hide`),this.overlay=null},onOverlayAfterLeave:function(e){x.clear(e)},alignOverlay:function(){var e=this.multiple?this.$refs.multiContainer:this.$refs.focusInput.$el;this.appendTo===`self`?D(this.overlay,e):(this.overlay.style.minWidth=ne(e)+`px`,k(this.overlay,e))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){e.overlayVisible&&e.overlay&&e.isOutsideClicked(t)&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new N(this.$refs.container,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!O()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},isOutsideClicked:function(e){return!this.overlay.contains(e.target)&&!this.isInputClicked(e)&&!this.isDropdownClicked(e)},isInputClicked:function(e){return this.multiple?e.target===this.$refs.multiContainer||this.$refs.multiContainer.contains(e.target):e.target===this.$refs.focusInput.$el},isDropdownClicked:function(e){return this.$refs.dropdownButton?e.target===this.$refs.dropdownButton||this.$refs.dropdownButton.contains(e.target):!1},isOptionMatched:function(e,t){return this.isValidOption(e)&&this.getOptionLabel(e)?.toLocaleLowerCase(this.searchLocale)===t.toLocaleLowerCase(this.searchLocale)},isValidOption:function(e){return w(e)&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))},isValidSelectedOption:function(e){return this.isValidOption(e)&&this.isSelected(e)},isEquals:function(e,t){return ee(e,t,this.equalityKey)},isSelected:function(e){var t=this,n=this.getOptionValue(e);return this.multiple?(this.d_value||[]).some(function(e){return t.isEquals(e,n)}):this.isEquals(this.d_value,this.getOptionValue(e))},findFirstOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidOption(t)})},findLastOptionIndex:function(){var e=this;return j(this.visibleOptions,function(t){return e.isValidOption(t)})},findNextOptionIndex:function(e){var t=this,n=e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(e){return t.isValidOption(e)}):-1;return n>-1?n+e+1:e},findPrevOptionIndex:function(e){var t=this,n=e>0?j(this.visibleOptions.slice(0,e),function(e){return t.isValidOption(e)}):-1;return n>-1?n:e},findSelectedOptionIndex:function(){var e=this;return this.$filled?this.visibleOptions.findIndex(function(t){return e.isValidSelectedOption(t)}):-1},findFirstFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e},findLastFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e},search:function(e,t,n){t!=null&&(n!==`input`||t.trim().length!==0)&&(this.searching=!0,this.$emit(`complete`,{originalEvent:e,query:t}))},removeOption:function(e,t){var n=this,r=this.d_value[t],i=this.d_value.filter(function(e,n){return n!==t}).map(function(e){return n.getOptionValue(e)});this.updateModel(e,i),this.$emit(`item-unselect`,{originalEvent:e,value:r}),this.$emit(`option-unselect`,{originalEvent:e,value:r}),this.dirty=!0,C(this.multiple?this.$refs.focusInput:this.$refs.focusInput.$el)},changeFocusedOptionIndex:function(e,t){this.focusedOptionIndex!==t&&(this.focusedOptionIndex=t,this.scrollInView(),this.selectOnFocus&&this.onOptionSelect(e,this.visibleOptions[t],!1))},scrollInView:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1;this.$nextTick(function(){var n=t===-1?e.focusedOptionId:`${e.$id}_${t}`,r=A(e.list,`li[id="${n}"]`);r?r.scrollIntoView&&r.scrollIntoView({block:`nearest`,inline:`start`}):e.virtualScrollerDisabled||e.virtualScroller&&e.virtualScroller.scrollToIndex(t===-1?e.focusedOptionIndex:t)})},autoUpdateModel:function(){this.selectOnFocus&&this.autoOptionFocus&&!this.$filled&&(this.focusedOptionIndex=this.findFirstFocusedOptionIndex(),this.onOptionSelect(null,this.visibleOptions[this.focusedOptionIndex],!1))},updateModel:function(e,t){this.writeValue(t,e),this.$emit(`change`,{originalEvent:e,value:t})},flatOptions:function(e){var t=this;return(e||[]).reduce(function(e,n,r){e.push({optionGroup:n,group:!0,index:r});var i=t.getOptionGroupChildren(n);return i&&i.forEach(function(t){return e.push(t)}),e},[])},overlayRef:function(e){this.overlay=e},listRef:function(e,t){this.list=e,t&&t(e)},virtualScrollerRef:function(e){this.virtualScroller=e},findNextSelectedOptionIndex:function(e){var t=this,n=this.$filled&&e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(e){return t.isValidSelectedOption(e)}):-1;return n>-1?n+e+1:-1},findPrevSelectedOptionIndex:function(e){var t=this,n=this.$filled&&e>0?j(this.visibleOptions.slice(0,e),function(e){return t.isValidSelectedOption(e)}):-1;return n>-1?n:-1},findNearestSelectedOptionIndex:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1],n=-1;return this.$filled&&(t?(n=this.findPrevSelectedOptionIndex(e),n=n===-1?this.findNextSelectedOptionIndex(e):n):(n=this.findNextSelectedOptionIndex(e),n=n===-1?this.findPrevSelectedOptionIndex(e):n)),n>-1?n:e}},computed:{visibleOptions:function(){return this.optionGroupLabel?this.flatOptions(this.suggestions):this.suggestions||[]},inputValue:function(){return this.$filled?G(this.d_value)===`object`?this.getOptionLabel(this.d_value)??this.d_value:this.d_value:``},hasSelectedOption:function(){return this.$filled},equalityKey:function(){return this.dataKey},searchResultMessageText:function(){return w(this.visibleOptions)&&this.overlayVisible?this.searchMessageText.replaceAll(`{0}`,this.visibleOptions.length):this.emptySearchMessageText},searchMessageText:function(){return this.searchMessage||this.$primevue.config.locale.searchMessage||``},emptySearchMessageText:function(){return this.emptySearchMessage||this.$primevue.config.locale.emptySearchMessage||``},selectionMessageText:function(){return this.selectionMessage||this.$primevue.config.locale.selectionMessage||``},emptySelectionMessageText:function(){return this.emptySelectionMessage||this.$primevue.config.locale.emptySelectionMessage||``},selectedMessageText:function(){return this.$filled?this.selectionMessageText.replaceAll(`{0}`,this.multiple?this.d_value.length:`1`):this.emptySelectionMessageText},listAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.listLabel:void 0},focusedOptionId:function(){return this.focusedOptionIndex===-1?null:`${this.$id}_${this.focusedOptionIndex}`},focusedMultipleOptionId:function(){return this.focusedMultipleOptionIndex===-1?null:`${this.$id}_multiple_option_${this.focusedMultipleOptionIndex}`},isClearIconVisible:function(){return this.showClear&&this.$filled&&!this.disabled&&!this.loading},ariaSetSize:function(){var e=this;return this.visibleOptions.filter(function(t){return!e.isOptionGroup(t)}).length},virtualScrollerDisabled:function(){return!this.virtualScrollerOptions},panelId:function(){return this.$id+`_panel`},containerDataP:function(){return b({fluid:this.$fluid})},overlayDataP:function(){return b(H({},`portal-`+this.appendTo,`portal-`+this.appendTo))},inputMultipleDataP:function(){return b(H({invalid:this.$invalid,disabled:this.disabled,focus:this.focused,fluid:this.$fluid,filled:this.$variant===`filled`,empty:!this.$filled},this.size,this.size))}},components:{InputText:I,VirtualScroller:z,Portal:R,Chip:P,ChevronDownIcon:oe,SpinnerIcon:re,TimesIcon:ae},directives:{ripple:ie}};function X(e){"@babel/helpers - typeof";return X=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},X(e)}function Z(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Z(Object(n),!0).forEach(function(t){ue(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Z(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ue(e,t,n){return(t=de(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function de(e){var t=fe(e,`string`);return X(t)==`symbol`?t:t+``}function fe(e,t){if(X(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(X(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var pe=[`data-p`],$=[`aria-activedescendant`,`data-p-has-dropdown`,`data-p`],me=[`id`,`aria-label`,`aria-setsize`,`aria-posinset`],he=[`id`,`placeholder`,`tabindex`,`disabled`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`aria-invalid`],ge=[`data-p-has-dropdown`],_e=[`disabled`,`aria-expanded`,`aria-controls`],ve=[`id`,`data-p`],ye=[`id`,`aria-label`],be=[`id`],xe=[`id`,`aria-label`,`aria-selected`,`aria-disabled`,`aria-setsize`,`aria-posinset`,`onClick`,`onMousemove`,`data-p-selected`,`data-p-focused`,`data-p-disabled`];function Se(b,x,ee,S,C,w){var T=t(`InputText`),D=t(`TimesIcon`),O=t(`Chip`),k=t(`SpinnerIcon`),A=t(`VirtualScroller`),j=t(`Portal`),M=s(`ripple`);return i(),f(`div`,a({ref:`container`,class:b.cx(`root`),style:b.sx(`root`),onClick:x[11]||=function(){return w.onContainerClick&&w.onContainerClick.apply(w,arguments)},"data-p":w.containerDataP},b.ptmi(`root`)),[b.multiple?d(``,!0):(i(),_(T,{key:0,ref:`focusInput`,id:b.inputId,type:`text`,name:b.$formName,class:n([b.cx(`pcInputText`),b.inputClass]),style:m(b.inputStyle),defaultValue:w.inputValue,placeholder:b.placeholder,tabindex:b.disabled?-1:b.tabindex,fluid:b.$fluid,disabled:b.disabled,size:b.size,invalid:b.invalid,variant:b.variant,autocomplete:`off`,role:`combobox`,"aria-label":b.ariaLabel,"aria-labelledby":b.ariaLabelledby,"aria-haspopup":`listbox`,"aria-autocomplete":`list`,"aria-expanded":C.overlayVisible,"aria-controls":C.overlayVisible?w.panelId:void 0,"aria-activedescendant":C.focused?w.focusedOptionId:void 0,onFocus:w.onFocus,onBlur:w.onBlur,onKeydown:w.onKeyDown,onInput:w.onInput,onChange:w.onChange,unstyled:b.unstyled,"data-p-has-dropdown":b.dropdown,pt:b.ptm(`pcInputText`)},null,8,[`id`,`name`,`class`,`style`,`defaultValue`,`placeholder`,`tabindex`,`fluid`,`disabled`,`size`,`invalid`,`variant`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`onFocus`,`onBlur`,`onKeydown`,`onInput`,`onChange`,`unstyled`,`data-p-has-dropdown`,`pt`])),w.isClearIconVisible?y(b.$slots,`clearicon`,{key:1,class:n(b.cx(`clearIcon`)),clearCallback:w.onClearClick},function(){return[v(D,a({class:[b.cx(`clearIcon`)],onClick:w.onClearClick},b.ptm(`clearIcon`)),null,16,[`class`,`onClick`])]}):d(``,!0),b.multiple?(i(),f(`ul`,a({key:2,ref:`multiContainer`,class:b.cx(`inputMultiple`),tabindex:`-1`,role:`listbox`,"aria-orientation":`horizontal`,"aria-activedescendant":C.focused?w.focusedMultipleOptionId:void 0,onFocus:x[5]||=function(){return w.onMultipleContainerFocus&&w.onMultipleContainerFocus.apply(w,arguments)},onBlur:x[6]||=function(){return w.onMultipleContainerBlur&&w.onMultipleContainerBlur.apply(w,arguments)},onKeydown:x[7]||=function(){return w.onMultipleContainerKeyDown&&w.onMultipleContainerKeyDown.apply(w,arguments)},"data-p-has-dropdown":b.dropdown,"data-p":w.inputMultipleDataP},b.ptm(`inputMultiple`)),[(i(!0),f(g,null,o(b.d_value,function(e,t){return i(),f(`li`,a({key:`${t}_${w.getOptionLabel(e)}`,id:b.$id+`_multiple_option_`+t,class:b.cx(`chipItem`,{i:t}),role:`option`,"aria-label":w.getOptionLabel(e),"aria-selected":!0,"aria-setsize":b.d_value.length,"aria-posinset":t+1},{ref_for:!0},b.ptm(`chipItem`)),[y(b.$slots,`chip`,a({class:b.cx(`pcChip`),value:e,index:t,removeCallback:function(e){return w.removeOption(e,t)}},{ref_for:!0},b.ptm(`pcChip`)),function(){return[v(O,{class:n(b.cx(`pcChip`)),label:w.getOptionLabel(e),removeIcon:b.chipIcon||b.removeTokenIcon,removable:``,unstyled:b.unstyled,onRemove:function(e){return w.removeOption(e,t)},"data-p-focused":C.focusedMultipleOptionIndex===t,pt:b.ptm(`pcChip`)},{removeicon:c(function(){return[y(b.$slots,b.$slots.chipicon?`chipicon`:`removetokenicon`,{class:n(b.cx(`chipIcon`)),index:t,removeCallback:function(e){return w.removeOption(e,t)}})]}),_:2},1032,[`class`,`label`,`removeIcon`,`unstyled`,`onRemove`,`data-p-focused`,`pt`])]})],16,me)}),128)),h(`li`,a({class:b.cx(`inputChip`),role:`option`},b.ptm(`inputChip`)),[h(`input`,a({ref:`focusInput`,id:b.inputId,type:`text`,style:b.inputStyle,class:b.inputClass,placeholder:b.placeholder,tabindex:b.disabled?-1:b.tabindex,disabled:b.disabled,autocomplete:`off`,role:`combobox`,"aria-label":b.ariaLabel,"aria-labelledby":b.ariaLabelledby,"aria-haspopup":`listbox`,"aria-autocomplete":`list`,"aria-expanded":C.overlayVisible,"aria-controls":b.$id+`_list`,"aria-activedescendant":C.focused?w.focusedOptionId:void 0,"aria-invalid":b.invalid||void 0,onFocus:x[0]||=function(){return w.onFocus&&w.onFocus.apply(w,arguments)},onBlur:x[1]||=function(){return w.onBlur&&w.onBlur.apply(w,arguments)},onKeydown:x[2]||=function(){return w.onKeyDown&&w.onKeyDown.apply(w,arguments)},onInput:x[3]||=function(){return w.onInput&&w.onInput.apply(w,arguments)},onChange:x[4]||=function(){return w.onChange&&w.onChange.apply(w,arguments)}},b.ptm(`input`)),null,16,he)],16)],16,$)):d(``,!0),C.searching||b.loading?y(b.$slots,b.$slots.loader?`loader`:`loadingicon`,{key:3,class:n(b.cx(`loader`))},function(){return[b.loader||b.loadingIcon?(i(),f(`i`,a({key:0,class:[`pi-spin`,b.cx(`loader`),b.loader,b.loadingIcon],"aria-hidden":`true`,"data-p-has-dropdown":b.dropdown},b.ptm(`loader`)),null,16,ge)):b.loading?(i(),_(k,a({key:1,class:b.cx(`loader`),spin:``,"aria-hidden":`true`,"data-p-has-dropdown":b.dropdown},b.ptm(`loader`)),null,16,[`class`,`data-p-has-dropdown`])):d(``,!0)]}):d(``,!0),y(b.$slots,b.$slots.dropdown?`dropdown`:`dropdownbutton`,{toggleCallback:function(e){return w.onDropdownClick(e)}},function(){return[b.dropdown?(i(),f(`button`,a({key:0,ref:`dropdownButton`,type:`button`,class:[b.cx(`dropdown`),b.dropdownClass],disabled:b.disabled,"aria-haspopup":`listbox`,"aria-expanded":C.overlayVisible,"aria-controls":w.panelId,onClick:x[8]||=function(){return w.onDropdownClick&&w.onDropdownClick.apply(w,arguments)}},b.ptm(`dropdown`)),[y(b.$slots,`dropdownicon`,{class:n(b.dropdownIcon)},function(){return[(i(),_(r(b.dropdownIcon?`span`:`ChevronDownIcon`),a({class:b.dropdownIcon},b.ptm(`dropdownIcon`)),null,16,[`class`]))]})],16,_e)):d(``,!0)]}),b.typeahead?(i(),f(`span`,a({key:4,role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},b.ptm(`hiddenSearchResult`),{"data-p-hidden-accessible":!0}),e(w.searchResultMessageText),17)):d(``,!0),v(j,{appendTo:b.appendTo},{default:c(function(){return[v(E,a({name:`p-anchored-overlay`,onEnter:w.onOverlayEnter,onAfterEnter:w.onOverlayAfterEnter,onLeave:w.onOverlayLeave,onAfterLeave:w.onOverlayAfterLeave},b.ptm(`transition`)),{default:c(function(){return[C.overlayVisible?(i(),f(`div`,a({key:0,ref:w.overlayRef,id:w.panelId,class:[b.cx(`overlay`),b.panelClass,b.overlayClass],style:Q(Q({},b.panelStyle),b.overlayStyle),onClick:x[9]||=function(){return w.onOverlayClick&&w.onOverlayClick.apply(w,arguments)},onKeydown:x[10]||=function(){return w.onOverlayKeyDown&&w.onOverlayKeyDown.apply(w,arguments)},"data-p":w.overlayDataP},b.ptm(`overlay`)),[y(b.$slots,`header`,{value:b.d_value,suggestions:w.visibleOptions}),h(`div`,a({class:b.cx(`listContainer`),style:{"max-height":w.virtualScrollerDisabled?b.scrollHeight:``}},b.ptm(`listContainer`)),[v(A,a({ref:w.virtualScrollerRef},b.virtualScrollerOptions,{style:{height:b.scrollHeight},items:w.visibleOptions,tabindex:-1,disabled:w.virtualScrollerDisabled,pt:b.ptm(`virtualScroller`)}),p({content:c(function(t){var n=t.styleClass,r=t.contentRef,s=t.items,c=t.getItemOptions,p=t.contentStyle,m=t.itemSize;return[h(`ul`,a({ref:function(e){return w.listRef(e,r)},id:b.$id+`_list`,class:[b.cx(`list`),n],style:p,role:`listbox`,"aria-label":w.listAriaLabel},b.ptm(`list`)),[(i(!0),f(g,null,o(s,function(t,n){return i(),f(g,{key:w.getOptionRenderKey(t,w.getOptionIndex(n,c))},[w.isOptionGroup(t)?(i(),f(`li`,a({key:0,id:b.$id+`_`+w.getOptionIndex(n,c),style:{height:m?m+`px`:void 0},class:b.cx(`optionGroup`),role:`option`},{ref_for:!0},b.ptm(`optionGroup`)),[y(b.$slots,`optiongroup`,{option:t.optionGroup,index:w.getOptionIndex(n,c)},function(){return[u(e(w.getOptionGroupLabel(t.optionGroup)),1)]})],16,be)):l((i(),f(`li`,a({key:1,id:b.$id+`_`+w.getOptionIndex(n,c),style:{height:m?m+`px`:void 0},class:b.cx(`option`,{option:t,i:n,getItemOptions:c}),role:`option`,"aria-label":w.getOptionLabel(t),"aria-selected":w.isSelected(t),"aria-disabled":w.isOptionDisabled(t),"aria-setsize":w.ariaSetSize,"aria-posinset":w.getAriaPosInset(w.getOptionIndex(n,c)),onClick:function(e){return w.onOptionSelect(e,t)},onMousemove:function(e){return w.onOptionMouseMove(e,w.getOptionIndex(n,c))},"data-p-selected":w.isSelected(t),"data-p-focused":C.focusedOptionIndex===w.getOptionIndex(n,c),"data-p-disabled":w.isOptionDisabled(t)},{ref_for:!0},w.getPTOptions(t,c,n,`option`)),[y(b.$slots,`option`,{option:t,index:w.getOptionIndex(n,c)},function(){return[u(e(w.getOptionLabel(t)),1)]})],16,xe)),[[M]])],64)}),128)),b.showEmptyMessage&&(!s||s&&s.length===0)?(i(),f(`li`,a({key:0,class:b.cx(`emptyMessage`),role:`option`},b.ptm(`emptyMessage`)),[y(b.$slots,`empty`,{},function(){return[u(e(w.searchResultMessageText),1)]})],16)):d(``,!0)],16,ye)]}),_:2},[b.$slots.loader?{name:`loader`,fn:c(function(e){var t=e.options;return[y(b.$slots,`loader`,{options:t})]}),key:`0`}:void 0]),1040,[`style`,`items`,`disabled`,`pt`])],16),y(b.$slots,`footer`,{value:b.d_value,suggestions:w.visibleOptions}),h(`span`,a({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},b.ptm(`hiddenSelectedMessage`),{"data-p-hidden-accessible":!0}),e(w.selectedMessageText),17)],16,ve)):d(``,!0)]}),_:3},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`])],16,pe)}Y.render=Se;export{Y as default};