(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function iv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Ng={exports:{}},Tc={},Lg={exports:{}},Je={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _o=Symbol.for("react.element"),rv=Symbol.for("react.portal"),sv=Symbol.for("react.fragment"),av=Symbol.for("react.strict_mode"),ov=Symbol.for("react.profiler"),lv=Symbol.for("react.provider"),cv=Symbol.for("react.context"),uv=Symbol.for("react.forward_ref"),dv=Symbol.for("react.suspense"),fv=Symbol.for("react.memo"),hv=Symbol.for("react.lazy"),lp=Symbol.iterator;function pv(t){return t===null||typeof t!="object"?null:(t=lp&&t[lp]||t["@@iterator"],typeof t=="function"?t:null)}var Dg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ig=Object.assign,Ug={};function aa(t,e,n){this.props=t,this.context=e,this.refs=Ug,this.updater=n||Dg}aa.prototype.isReactComponent={};aa.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};aa.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Fg(){}Fg.prototype=aa.prototype;function Bf(t,e,n){this.props=t,this.context=e,this.refs=Ug,this.updater=n||Dg}var zf=Bf.prototype=new Fg;zf.constructor=Bf;Ig(zf,aa.prototype);zf.isPureReactComponent=!0;var cp=Array.isArray,Og=Object.prototype.hasOwnProperty,Hf={current:null},kg={key:!0,ref:!0,__self:!0,__source:!0};function Bg(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)Og.call(e,i)&&!kg.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:_o,type:t,key:s,ref:a,props:r,_owner:Hf.current}}function mv(t,e){return{$$typeof:_o,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Gf(t){return typeof t=="object"&&t!==null&&t.$$typeof===_o}function gv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var up=/\/+/g;function Yc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?gv(""+t.key):e.toString(36)}function El(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case _o:case rv:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+Yc(a,0):i,cp(r)?(n="",t!=null&&(n=t.replace(up,"$&/")+"/"),El(r,e,n,"",function(c){return c})):r!=null&&(Gf(r)&&(r=mv(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(up,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",cp(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+Yc(s,o);a+=El(s,e,n,l,r)}else if(l=pv(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+Yc(s,o++),a+=El(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function bo(t,e,n){if(t==null)return t;var i=[],r=0;return El(t,i,"","",function(s){return e.call(n,s,r++)}),i}function _v(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var wn={current:null},wl={transition:null},xv={ReactCurrentDispatcher:wn,ReactCurrentBatchConfig:wl,ReactCurrentOwner:Hf};function zg(){throw Error("act(...) is not supported in production builds of React.")}Je.Children={map:bo,forEach:function(t,e,n){bo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return bo(t,function(){e++}),e},toArray:function(t){return bo(t,function(e){return e})||[]},only:function(t){if(!Gf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Je.Component=aa;Je.Fragment=sv;Je.Profiler=ov;Je.PureComponent=Bf;Je.StrictMode=av;Je.Suspense=dv;Je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xv;Je.act=zg;Je.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Ig({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=Hf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)Og.call(e,l)&&!kg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:_o,type:t.type,key:r,ref:s,props:i,_owner:a}};Je.createContext=function(t){return t={$$typeof:cv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:lv,_context:t},t.Consumer=t};Je.createElement=Bg;Je.createFactory=function(t){var e=Bg.bind(null,t);return e.type=t,e};Je.createRef=function(){return{current:null}};Je.forwardRef=function(t){return{$$typeof:uv,render:t}};Je.isValidElement=Gf;Je.lazy=function(t){return{$$typeof:hv,_payload:{_status:-1,_result:t},_init:_v}};Je.memo=function(t,e){return{$$typeof:fv,type:t,compare:e===void 0?null:e}};Je.startTransition=function(t){var e=wl.transition;wl.transition={};try{t()}finally{wl.transition=e}};Je.unstable_act=zg;Je.useCallback=function(t,e){return wn.current.useCallback(t,e)};Je.useContext=function(t){return wn.current.useContext(t)};Je.useDebugValue=function(){};Je.useDeferredValue=function(t){return wn.current.useDeferredValue(t)};Je.useEffect=function(t,e){return wn.current.useEffect(t,e)};Je.useId=function(){return wn.current.useId()};Je.useImperativeHandle=function(t,e,n){return wn.current.useImperativeHandle(t,e,n)};Je.useInsertionEffect=function(t,e){return wn.current.useInsertionEffect(t,e)};Je.useLayoutEffect=function(t,e){return wn.current.useLayoutEffect(t,e)};Je.useMemo=function(t,e){return wn.current.useMemo(t,e)};Je.useReducer=function(t,e,n){return wn.current.useReducer(t,e,n)};Je.useRef=function(t){return wn.current.useRef(t)};Je.useState=function(t){return wn.current.useState(t)};Je.useSyncExternalStore=function(t,e,n){return wn.current.useSyncExternalStore(t,e,n)};Je.useTransition=function(){return wn.current.useTransition()};Je.version="18.3.1";Lg.exports=Je;var le=Lg.exports;const Hg=iv(le);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vv=le,yv=Symbol.for("react.element"),Sv=Symbol.for("react.fragment"),Mv=Object.prototype.hasOwnProperty,Ev=vv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,wv={key:!0,ref:!0,__self:!0,__source:!0};function Gg(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)Mv.call(e,i)&&!wv.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:yv,type:t,key:s,ref:a,props:r,_owner:Ev.current}}Tc.Fragment=Sv;Tc.jsx=Gg;Tc.jsxs=Gg;Ng.exports=Tc;var R=Ng.exports,Ju={},Vg={exports:{}},Xn={},Wg={exports:{}},Xg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(V,B){var $=V.length;V.push(B);e:for(;0<$;){var te=$-1>>>1,_e=V[te];if(0<r(_e,B))V[te]=B,V[$]=_e,$=te;else break e}}function n(V){return V.length===0?null:V[0]}function i(V){if(V.length===0)return null;var B=V[0],$=V.pop();if($!==B){V[0]=$;e:for(var te=0,_e=V.length,ke=_e>>>1;te<ke;){var K=2*(te+1)-1,pe=V[K],Se=K+1,Le=V[Se];if(0>r(pe,$))Se<_e&&0>r(Le,pe)?(V[te]=Le,V[Se]=$,te=Se):(V[te]=pe,V[K]=$,te=K);else if(Se<_e&&0>r(Le,$))V[te]=Le,V[Se]=$,te=Se;else break e}}return B}function r(V,B){var $=V.sortIndex-B.sortIndex;return $!==0?$:V.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],h=1,m=null,d=3,p=!1,v=!1,M=!1,_=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(V){for(var B=n(c);B!==null;){if(B.callback===null)i(c);else if(B.startTime<=V)i(c),B.sortIndex=B.expirationTime,e(l,B);else break;B=n(c)}}function y(V){if(M=!1,x(V),!v)if(n(l)!==null)v=!0,ee(T);else{var B=n(c);B!==null&&X(y,B.startTime-V)}}function T(V,B){v=!1,M&&(M=!1,u(S),S=-1),p=!0;var $=d;try{for(x(B),m=n(l);m!==null&&(!(m.expirationTime>B)||V&&!L());){var te=m.callback;if(typeof te=="function"){m.callback=null,d=m.priorityLevel;var _e=te(m.expirationTime<=B);B=t.unstable_now(),typeof _e=="function"?m.callback=_e:m===n(l)&&i(l),x(B)}else i(l);m=n(l)}if(m!==null)var ke=!0;else{var K=n(c);K!==null&&X(y,K.startTime-B),ke=!1}return ke}finally{m=null,d=$,p=!1}}var w=!1,f=null,S=-1,P=5,C=-1;function L(){return!(t.unstable_now()-C<P)}function F(){if(f!==null){var V=t.unstable_now();C=V;var B=!0;try{B=f(!0,V)}finally{B?H():(w=!1,f=null)}}else w=!1}var H;if(typeof g=="function")H=function(){g(F)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,Y=D.port2;D.port1.onmessage=F,H=function(){Y.postMessage(null)}}else H=function(){_(F,0)};function ee(V){f=V,w||(w=!0,H())}function X(V,B){S=_(function(){V(t.unstable_now())},B)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(V){V.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,ee(T))},t.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<V?Math.floor(1e3/V):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(V){switch(d){case 1:case 2:case 3:var B=3;break;default:B=d}var $=d;d=B;try{return V()}finally{d=$}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(V,B){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var $=d;d=V;try{return B()}finally{d=$}},t.unstable_scheduleCallback=function(V,B,$){var te=t.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?te+$:te):$=te,V){case 1:var _e=-1;break;case 2:_e=250;break;case 5:_e=1073741823;break;case 4:_e=1e4;break;default:_e=5e3}return _e=$+_e,V={id:h++,callback:B,priorityLevel:V,startTime:$,expirationTime:_e,sortIndex:-1},$>te?(V.sortIndex=$,e(c,V),n(l)===null&&V===n(c)&&(M?(u(S),S=-1):M=!0,X(y,$-te))):(V.sortIndex=_e,e(l,V),v||p||(v=!0,ee(T))),V},t.unstable_shouldYield=L,t.unstable_wrapCallback=function(V){var B=d;return function(){var $=d;d=B;try{return V.apply(this,arguments)}finally{d=$}}}})(Xg);Wg.exports=Xg;var Tv=Wg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bv=le,Wn=Tv;function ce(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var jg=new Set,Ya={};function ts(t,e){$s(t,e),$s(t+"Capture",e)}function $s(t,e){for(Ya[t]=e,t=0;t<e.length;t++)jg.add(e[t])}var Yi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Qu=Object.prototype.hasOwnProperty,Av=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,dp={},fp={};function Rv(t){return Qu.call(fp,t)?!0:Qu.call(dp,t)?!1:Av.test(t)?fp[t]=!0:(dp[t]=!0,!1)}function Cv(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Pv(t,e,n,i){if(e===null||typeof e>"u"||Cv(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Tn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var nn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){nn[t]=new Tn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];nn[e]=new Tn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){nn[t]=new Tn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){nn[t]=new Tn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){nn[t]=new Tn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){nn[t]=new Tn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){nn[t]=new Tn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){nn[t]=new Tn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){nn[t]=new Tn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Vf=/[\-:]([a-z])/g;function Wf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Vf,Wf);nn[e]=new Tn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Vf,Wf);nn[e]=new Tn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Vf,Wf);nn[e]=new Tn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){nn[t]=new Tn(t,1,!1,t.toLowerCase(),null,!1,!1)});nn.xlinkHref=new Tn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){nn[t]=new Tn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Xf(t,e,n,i){var r=nn.hasOwnProperty(e)?nn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Pv(e,n,r,i)&&(n=null),i||r===null?Rv(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Zi=bv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ao=Symbol.for("react.element"),Ts=Symbol.for("react.portal"),bs=Symbol.for("react.fragment"),jf=Symbol.for("react.strict_mode"),ed=Symbol.for("react.profiler"),Yg=Symbol.for("react.provider"),$g=Symbol.for("react.context"),Yf=Symbol.for("react.forward_ref"),td=Symbol.for("react.suspense"),nd=Symbol.for("react.suspense_list"),$f=Symbol.for("react.memo"),sr=Symbol.for("react.lazy"),qg=Symbol.for("react.offscreen"),hp=Symbol.iterator;function fa(t){return t===null||typeof t!="object"?null:(t=hp&&t[hp]||t["@@iterator"],typeof t=="function"?t:null)}var Pt=Object.assign,$c;function Ca(t){if($c===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);$c=e&&e[1]||""}return`
`+$c+t}var qc=!1;function Kc(t,e){if(!t||qc)return"";qc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{qc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ca(t):""}function Nv(t){switch(t.tag){case 5:return Ca(t.type);case 16:return Ca("Lazy");case 13:return Ca("Suspense");case 19:return Ca("SuspenseList");case 0:case 2:case 15:return t=Kc(t.type,!1),t;case 11:return t=Kc(t.type.render,!1),t;case 1:return t=Kc(t.type,!0),t;default:return""}}function id(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case bs:return"Fragment";case Ts:return"Portal";case ed:return"Profiler";case jf:return"StrictMode";case td:return"Suspense";case nd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case $g:return(t.displayName||"Context")+".Consumer";case Yg:return(t._context.displayName||"Context")+".Provider";case Yf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case $f:return e=t.displayName||null,e!==null?e:id(t.type)||"Memo";case sr:e=t._payload,t=t._init;try{return id(t(e))}catch{}}return null}function Lv(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return id(e);case 8:return e===jf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Er(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Kg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Dv(t){var e=Kg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ro(t){t._valueTracker||(t._valueTracker=Dv(t))}function Zg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Kg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Vl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function rd(t,e){var n=e.checked;return Pt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function pp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Er(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Jg(t,e){e=e.checked,e!=null&&Xf(t,"checked",e,!1)}function sd(t,e){Jg(t,e);var n=Er(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?ad(t,e.type,n):e.hasOwnProperty("defaultValue")&&ad(t,e.type,Er(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function mp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function ad(t,e,n){(e!=="number"||Vl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Pa=Array.isArray;function ks(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Er(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function od(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ce(91));return Pt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function gp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ce(92));if(Pa(n)){if(1<n.length)throw Error(ce(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Er(n)}}function Qg(t,e){var n=Er(e.value),i=Er(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function _p(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function e0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ld(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?e0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Co,t0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Co=Co||document.createElement("div"),Co.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Co.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function $a(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ua={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Iv=["Webkit","ms","Moz","O"];Object.keys(Ua).forEach(function(t){Iv.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ua[e]=Ua[t]})});function n0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ua.hasOwnProperty(t)&&Ua[t]?(""+e).trim():e+"px"}function i0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=n0(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Uv=Pt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function cd(t,e){if(e){if(Uv[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ce(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ce(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ce(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ce(62))}}function ud(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var dd=null;function qf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var fd=null,Bs=null,zs=null;function xp(t){if(t=yo(t)){if(typeof fd!="function")throw Error(ce(280));var e=t.stateNode;e&&(e=Pc(e),fd(t.stateNode,t.type,e))}}function r0(t){Bs?zs?zs.push(t):zs=[t]:Bs=t}function s0(){if(Bs){var t=Bs,e=zs;if(zs=Bs=null,xp(t),e)for(t=0;t<e.length;t++)xp(e[t])}}function a0(t,e){return t(e)}function o0(){}var Zc=!1;function l0(t,e,n){if(Zc)return t(e,n);Zc=!0;try{return a0(t,e,n)}finally{Zc=!1,(Bs!==null||zs!==null)&&(o0(),s0())}}function qa(t,e){var n=t.stateNode;if(n===null)return null;var i=Pc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ce(231,e,typeof n));return n}var hd=!1;if(Yi)try{var ha={};Object.defineProperty(ha,"passive",{get:function(){hd=!0}}),window.addEventListener("test",ha,ha),window.removeEventListener("test",ha,ha)}catch{hd=!1}function Fv(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(h){this.onError(h)}}var Fa=!1,Wl=null,Xl=!1,pd=null,Ov={onError:function(t){Fa=!0,Wl=t}};function kv(t,e,n,i,r,s,a,o,l){Fa=!1,Wl=null,Fv.apply(Ov,arguments)}function Bv(t,e,n,i,r,s,a,o,l){if(kv.apply(this,arguments),Fa){if(Fa){var c=Wl;Fa=!1,Wl=null}else throw Error(ce(198));Xl||(Xl=!0,pd=c)}}function ns(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function c0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function vp(t){if(ns(t)!==t)throw Error(ce(188))}function zv(t){var e=t.alternate;if(!e){if(e=ns(t),e===null)throw Error(ce(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return vp(r),t;if(s===i)return vp(r),e;s=s.sibling}throw Error(ce(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(ce(189))}}if(n.alternate!==i)throw Error(ce(190))}if(n.tag!==3)throw Error(ce(188));return n.stateNode.current===n?t:e}function u0(t){return t=zv(t),t!==null?d0(t):null}function d0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=d0(t);if(e!==null)return e;t=t.sibling}return null}var f0=Wn.unstable_scheduleCallback,yp=Wn.unstable_cancelCallback,Hv=Wn.unstable_shouldYield,Gv=Wn.unstable_requestPaint,It=Wn.unstable_now,Vv=Wn.unstable_getCurrentPriorityLevel,Kf=Wn.unstable_ImmediatePriority,h0=Wn.unstable_UserBlockingPriority,jl=Wn.unstable_NormalPriority,Wv=Wn.unstable_LowPriority,p0=Wn.unstable_IdlePriority,bc=null,Ti=null;function Xv(t){if(Ti&&typeof Ti.onCommitFiberRoot=="function")try{Ti.onCommitFiberRoot(bc,t,void 0,(t.current.flags&128)===128)}catch{}}var pi=Math.clz32?Math.clz32:$v,jv=Math.log,Yv=Math.LN2;function $v(t){return t>>>=0,t===0?32:31-(jv(t)/Yv|0)|0}var Po=64,No=4194304;function Na(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Yl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=Na(o):(s&=a,s!==0&&(i=Na(s)))}else a=n&~r,a!==0?i=Na(a):s!==0&&(i=Na(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-pi(e),r=1<<n,i|=t[n],e&=~r;return i}function qv(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Kv(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-pi(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=qv(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function md(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function m0(){var t=Po;return Po<<=1,!(Po&4194240)&&(Po=64),t}function Jc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function xo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-pi(e),t[e]=n}function Zv(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-pi(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Zf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-pi(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var dt=0;function g0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var _0,Jf,x0,v0,y0,gd=!1,Lo=[],pr=null,mr=null,gr=null,Ka=new Map,Za=new Map,or=[],Jv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Sp(t,e){switch(t){case"focusin":case"focusout":pr=null;break;case"dragenter":case"dragleave":mr=null;break;case"mouseover":case"mouseout":gr=null;break;case"pointerover":case"pointerout":Ka.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Za.delete(e.pointerId)}}function pa(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=yo(e),e!==null&&Jf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Qv(t,e,n,i,r){switch(e){case"focusin":return pr=pa(pr,t,e,n,i,r),!0;case"dragenter":return mr=pa(mr,t,e,n,i,r),!0;case"mouseover":return gr=pa(gr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Ka.set(s,pa(Ka.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Za.set(s,pa(Za.get(s)||null,t,e,n,i,r)),!0}return!1}function S0(t){var e=Hr(t.target);if(e!==null){var n=ns(e);if(n!==null){if(e=n.tag,e===13){if(e=c0(n),e!==null){t.blockedOn=e,y0(t.priority,function(){x0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Tl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=_d(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);dd=i,n.target.dispatchEvent(i),dd=null}else return e=yo(n),e!==null&&Jf(e),t.blockedOn=n,!1;e.shift()}return!0}function Mp(t,e,n){Tl(t)&&n.delete(e)}function ey(){gd=!1,pr!==null&&Tl(pr)&&(pr=null),mr!==null&&Tl(mr)&&(mr=null),gr!==null&&Tl(gr)&&(gr=null),Ka.forEach(Mp),Za.forEach(Mp)}function ma(t,e){t.blockedOn===e&&(t.blockedOn=null,gd||(gd=!0,Wn.unstable_scheduleCallback(Wn.unstable_NormalPriority,ey)))}function Ja(t){function e(r){return ma(r,t)}if(0<Lo.length){ma(Lo[0],t);for(var n=1;n<Lo.length;n++){var i=Lo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(pr!==null&&ma(pr,t),mr!==null&&ma(mr,t),gr!==null&&ma(gr,t),Ka.forEach(e),Za.forEach(e),n=0;n<or.length;n++)i=or[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<or.length&&(n=or[0],n.blockedOn===null);)S0(n),n.blockedOn===null&&or.shift()}var Hs=Zi.ReactCurrentBatchConfig,$l=!0;function ty(t,e,n,i){var r=dt,s=Hs.transition;Hs.transition=null;try{dt=1,Qf(t,e,n,i)}finally{dt=r,Hs.transition=s}}function ny(t,e,n,i){var r=dt,s=Hs.transition;Hs.transition=null;try{dt=4,Qf(t,e,n,i)}finally{dt=r,Hs.transition=s}}function Qf(t,e,n,i){if($l){var r=_d(t,e,n,i);if(r===null)lu(t,e,i,ql,n),Sp(t,i);else if(Qv(r,t,e,n,i))i.stopPropagation();else if(Sp(t,i),e&4&&-1<Jv.indexOf(t)){for(;r!==null;){var s=yo(r);if(s!==null&&_0(s),s=_d(t,e,n,i),s===null&&lu(t,e,i,ql,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else lu(t,e,i,null,n)}}var ql=null;function _d(t,e,n,i){if(ql=null,t=qf(i),t=Hr(t),t!==null)if(e=ns(t),e===null)t=null;else if(n=e.tag,n===13){if(t=c0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ql=t,null}function M0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Vv()){case Kf:return 1;case h0:return 4;case jl:case Wv:return 16;case p0:return 536870912;default:return 16}default:return 16}}var ur=null,eh=null,bl=null;function E0(){if(bl)return bl;var t,e=eh,n=e.length,i,r="value"in ur?ur.value:ur.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return bl=r.slice(t,1<i?1-i:void 0)}function Al(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Do(){return!0}function Ep(){return!1}function jn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Do:Ep,this.isPropagationStopped=Ep,this}return Pt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Do)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Do)},persist:function(){},isPersistent:Do}),e}var oa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},th=jn(oa),vo=Pt({},oa,{view:0,detail:0}),iy=jn(vo),Qc,eu,ga,Ac=Pt({},vo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ga&&(ga&&t.type==="mousemove"?(Qc=t.screenX-ga.screenX,eu=t.screenY-ga.screenY):eu=Qc=0,ga=t),Qc)},movementY:function(t){return"movementY"in t?t.movementY:eu}}),wp=jn(Ac),ry=Pt({},Ac,{dataTransfer:0}),sy=jn(ry),ay=Pt({},vo,{relatedTarget:0}),tu=jn(ay),oy=Pt({},oa,{animationName:0,elapsedTime:0,pseudoElement:0}),ly=jn(oy),cy=Pt({},oa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),uy=jn(cy),dy=Pt({},oa,{data:0}),Tp=jn(dy),fy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},hy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},py={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function my(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=py[t])?!!e[t]:!1}function nh(){return my}var gy=Pt({},vo,{key:function(t){if(t.key){var e=fy[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Al(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?hy[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nh,charCode:function(t){return t.type==="keypress"?Al(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Al(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),_y=jn(gy),xy=Pt({},Ac,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bp=jn(xy),vy=Pt({},vo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nh}),yy=jn(vy),Sy=Pt({},oa,{propertyName:0,elapsedTime:0,pseudoElement:0}),My=jn(Sy),Ey=Pt({},Ac,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),wy=jn(Ey),Ty=[9,13,27,32],ih=Yi&&"CompositionEvent"in window,Oa=null;Yi&&"documentMode"in document&&(Oa=document.documentMode);var by=Yi&&"TextEvent"in window&&!Oa,w0=Yi&&(!ih||Oa&&8<Oa&&11>=Oa),Ap=" ",Rp=!1;function T0(t,e){switch(t){case"keyup":return Ty.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function b0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var As=!1;function Ay(t,e){switch(t){case"compositionend":return b0(e);case"keypress":return e.which!==32?null:(Rp=!0,Ap);case"textInput":return t=e.data,t===Ap&&Rp?null:t;default:return null}}function Ry(t,e){if(As)return t==="compositionend"||!ih&&T0(t,e)?(t=E0(),bl=eh=ur=null,As=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return w0&&e.locale!=="ko"?null:e.data;default:return null}}var Cy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Cy[t.type]:e==="textarea"}function A0(t,e,n,i){r0(i),e=Kl(e,"onChange"),0<e.length&&(n=new th("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var ka=null,Qa=null;function Py(t){k0(t,0)}function Rc(t){var e=Ps(t);if(Zg(e))return t}function Ny(t,e){if(t==="change")return e}var R0=!1;if(Yi){var nu;if(Yi){var iu="oninput"in document;if(!iu){var Pp=document.createElement("div");Pp.setAttribute("oninput","return;"),iu=typeof Pp.oninput=="function"}nu=iu}else nu=!1;R0=nu&&(!document.documentMode||9<document.documentMode)}function Np(){ka&&(ka.detachEvent("onpropertychange",C0),Qa=ka=null)}function C0(t){if(t.propertyName==="value"&&Rc(Qa)){var e=[];A0(e,Qa,t,qf(t)),l0(Py,e)}}function Ly(t,e,n){t==="focusin"?(Np(),ka=e,Qa=n,ka.attachEvent("onpropertychange",C0)):t==="focusout"&&Np()}function Dy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Rc(Qa)}function Iy(t,e){if(t==="click")return Rc(e)}function Uy(t,e){if(t==="input"||t==="change")return Rc(e)}function Fy(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var gi=typeof Object.is=="function"?Object.is:Fy;function eo(t,e){if(gi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Qu.call(e,r)||!gi(t[r],e[r]))return!1}return!0}function Lp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Dp(t,e){var n=Lp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Lp(n)}}function P0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?P0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function N0(){for(var t=window,e=Vl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Vl(t.document)}return e}function rh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Oy(t){var e=N0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&P0(n.ownerDocument.documentElement,n)){if(i!==null&&rh(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Dp(n,s);var a=Dp(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var ky=Yi&&"documentMode"in document&&11>=document.documentMode,Rs=null,xd=null,Ba=null,vd=!1;function Ip(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;vd||Rs==null||Rs!==Vl(i)||(i=Rs,"selectionStart"in i&&rh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ba&&eo(Ba,i)||(Ba=i,i=Kl(xd,"onSelect"),0<i.length&&(e=new th("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Rs)))}function Io(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Cs={animationend:Io("Animation","AnimationEnd"),animationiteration:Io("Animation","AnimationIteration"),animationstart:Io("Animation","AnimationStart"),transitionend:Io("Transition","TransitionEnd")},ru={},L0={};Yi&&(L0=document.createElement("div").style,"AnimationEvent"in window||(delete Cs.animationend.animation,delete Cs.animationiteration.animation,delete Cs.animationstart.animation),"TransitionEvent"in window||delete Cs.transitionend.transition);function Cc(t){if(ru[t])return ru[t];if(!Cs[t])return t;var e=Cs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in L0)return ru[t]=e[n];return t}var D0=Cc("animationend"),I0=Cc("animationiteration"),U0=Cc("animationstart"),F0=Cc("transitionend"),O0=new Map,Up="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Rr(t,e){O0.set(t,e),ts(e,[t])}for(var su=0;su<Up.length;su++){var au=Up[su],By=au.toLowerCase(),zy=au[0].toUpperCase()+au.slice(1);Rr(By,"on"+zy)}Rr(D0,"onAnimationEnd");Rr(I0,"onAnimationIteration");Rr(U0,"onAnimationStart");Rr("dblclick","onDoubleClick");Rr("focusin","onFocus");Rr("focusout","onBlur");Rr(F0,"onTransitionEnd");$s("onMouseEnter",["mouseout","mouseover"]);$s("onMouseLeave",["mouseout","mouseover"]);$s("onPointerEnter",["pointerout","pointerover"]);$s("onPointerLeave",["pointerout","pointerover"]);ts("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ts("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ts("onBeforeInput",["compositionend","keypress","textInput","paste"]);ts("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ts("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ts("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var La="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hy=new Set("cancel close invalid load scroll toggle".split(" ").concat(La));function Fp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Bv(i,e,void 0,t),t.currentTarget=null}function k0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Fp(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Fp(r,o,c),s=l}}}if(Xl)throw t=pd,Xl=!1,pd=null,t}function yt(t,e){var n=e[wd];n===void 0&&(n=e[wd]=new Set);var i=t+"__bubble";n.has(i)||(B0(e,t,2,!1),n.add(i))}function ou(t,e,n){var i=0;e&&(i|=4),B0(n,t,i,e)}var Uo="_reactListening"+Math.random().toString(36).slice(2);function to(t){if(!t[Uo]){t[Uo]=!0,jg.forEach(function(n){n!=="selectionchange"&&(Hy.has(n)||ou(n,!1,t),ou(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Uo]||(e[Uo]=!0,ou("selectionchange",!1,e))}}function B0(t,e,n,i){switch(M0(e)){case 1:var r=ty;break;case 4:r=ny;break;default:r=Qf}n=r.bind(null,e,n,t),r=void 0,!hd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function lu(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Hr(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}l0(function(){var c=s,h=qf(n),m=[];e:{var d=O0.get(t);if(d!==void 0){var p=th,v=t;switch(t){case"keypress":if(Al(n)===0)break e;case"keydown":case"keyup":p=_y;break;case"focusin":v="focus",p=tu;break;case"focusout":v="blur",p=tu;break;case"beforeblur":case"afterblur":p=tu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=wp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=sy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=yy;break;case D0:case I0:case U0:p=ly;break;case F0:p=My;break;case"scroll":p=iy;break;case"wheel":p=wy;break;case"copy":case"cut":case"paste":p=uy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=bp}var M=(e&4)!==0,_=!M&&t==="scroll",u=M?d!==null?d+"Capture":null:d;M=[];for(var g=c,x;g!==null;){x=g;var y=x.stateNode;if(x.tag===5&&y!==null&&(x=y,u!==null&&(y=qa(g,u),y!=null&&M.push(no(g,y,x)))),_)break;g=g.return}0<M.length&&(d=new p(d,v,null,n,h),m.push({event:d,listeners:M}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",d&&n!==dd&&(v=n.relatedTarget||n.fromElement)&&(Hr(v)||v[$i]))break e;if((p||d)&&(d=h.window===h?h:(d=h.ownerDocument)?d.defaultView||d.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?Hr(v):null,v!==null&&(_=ns(v),v!==_||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(M=wp,y="onMouseLeave",u="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(M=bp,y="onPointerLeave",u="onPointerEnter",g="pointer"),_=p==null?d:Ps(p),x=v==null?d:Ps(v),d=new M(y,g+"leave",p,n,h),d.target=_,d.relatedTarget=x,y=null,Hr(h)===c&&(M=new M(u,g+"enter",v,n,h),M.target=x,M.relatedTarget=_,y=M),_=y,p&&v)t:{for(M=p,u=v,g=0,x=M;x;x=ss(x))g++;for(x=0,y=u;y;y=ss(y))x++;for(;0<g-x;)M=ss(M),g--;for(;0<x-g;)u=ss(u),x--;for(;g--;){if(M===u||u!==null&&M===u.alternate)break t;M=ss(M),u=ss(u)}M=null}else M=null;p!==null&&Op(m,d,p,M,!1),v!==null&&_!==null&&Op(m,_,v,M,!0)}}e:{if(d=c?Ps(c):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var T=Ny;else if(Cp(d))if(R0)T=Uy;else{T=Dy;var w=Ly}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(T=Iy);if(T&&(T=T(t,c))){A0(m,T,n,h);break e}w&&w(t,d,c),t==="focusout"&&(w=d._wrapperState)&&w.controlled&&d.type==="number"&&ad(d,"number",d.value)}switch(w=c?Ps(c):window,t){case"focusin":(Cp(w)||w.contentEditable==="true")&&(Rs=w,xd=c,Ba=null);break;case"focusout":Ba=xd=Rs=null;break;case"mousedown":vd=!0;break;case"contextmenu":case"mouseup":case"dragend":vd=!1,Ip(m,n,h);break;case"selectionchange":if(ky)break;case"keydown":case"keyup":Ip(m,n,h)}var f;if(ih)e:{switch(t){case"compositionstart":var S="onCompositionStart";break e;case"compositionend":S="onCompositionEnd";break e;case"compositionupdate":S="onCompositionUpdate";break e}S=void 0}else As?T0(t,n)&&(S="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(S="onCompositionStart");S&&(w0&&n.locale!=="ko"&&(As||S!=="onCompositionStart"?S==="onCompositionEnd"&&As&&(f=E0()):(ur=h,eh="value"in ur?ur.value:ur.textContent,As=!0)),w=Kl(c,S),0<w.length&&(S=new Tp(S,t,null,n,h),m.push({event:S,listeners:w}),f?S.data=f:(f=b0(n),f!==null&&(S.data=f)))),(f=by?Ay(t,n):Ry(t,n))&&(c=Kl(c,"onBeforeInput"),0<c.length&&(h=new Tp("onBeforeInput","beforeinput",null,n,h),m.push({event:h,listeners:c}),h.data=f))}k0(m,e)})}function no(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Kl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=qa(t,n),s!=null&&i.unshift(no(t,s,r)),s=qa(t,e),s!=null&&i.push(no(t,s,r))),t=t.return}return i}function ss(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Op(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=qa(n,s),l!=null&&a.unshift(no(n,l,o))):r||(l=qa(n,s),l!=null&&a.push(no(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var Gy=/\r\n?/g,Vy=/\u0000|\uFFFD/g;function kp(t){return(typeof t=="string"?t:""+t).replace(Gy,`
`).replace(Vy,"")}function Fo(t,e,n){if(e=kp(e),kp(t)!==e&&n)throw Error(ce(425))}function Zl(){}var yd=null,Sd=null;function Md(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ed=typeof setTimeout=="function"?setTimeout:void 0,Wy=typeof clearTimeout=="function"?clearTimeout:void 0,Bp=typeof Promise=="function"?Promise:void 0,Xy=typeof queueMicrotask=="function"?queueMicrotask:typeof Bp<"u"?function(t){return Bp.resolve(null).then(t).catch(jy)}:Ed;function jy(t){setTimeout(function(){throw t})}function cu(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ja(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ja(e)}function _r(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function zp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var la=Math.random().toString(36).slice(2),Mi="__reactFiber$"+la,io="__reactProps$"+la,$i="__reactContainer$"+la,wd="__reactEvents$"+la,Yy="__reactListeners$"+la,$y="__reactHandles$"+la;function Hr(t){var e=t[Mi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[$i]||n[Mi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=zp(t);t!==null;){if(n=t[Mi])return n;t=zp(t)}return e}t=n,n=t.parentNode}return null}function yo(t){return t=t[Mi]||t[$i],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ps(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ce(33))}function Pc(t){return t[io]||null}var Td=[],Ns=-1;function Cr(t){return{current:t}}function St(t){0>Ns||(t.current=Td[Ns],Td[Ns]=null,Ns--)}function xt(t,e){Ns++,Td[Ns]=t.current,t.current=e}var wr={},pn=Cr(wr),Cn=Cr(!1),Yr=wr;function qs(t,e){var n=t.type.contextTypes;if(!n)return wr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Pn(t){return t=t.childContextTypes,t!=null}function Jl(){St(Cn),St(pn)}function Hp(t,e,n){if(pn.current!==wr)throw Error(ce(168));xt(pn,e),xt(Cn,n)}function z0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ce(108,Lv(t)||"Unknown",r));return Pt({},n,i)}function Ql(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||wr,Yr=pn.current,xt(pn,t),xt(Cn,Cn.current),!0}function Gp(t,e,n){var i=t.stateNode;if(!i)throw Error(ce(169));n?(t=z0(t,e,Yr),i.__reactInternalMemoizedMergedChildContext=t,St(Cn),St(pn),xt(pn,t)):St(Cn),xt(Cn,n)}var ki=null,Nc=!1,uu=!1;function H0(t){ki===null?ki=[t]:ki.push(t)}function qy(t){Nc=!0,H0(t)}function Pr(){if(!uu&&ki!==null){uu=!0;var t=0,e=dt;try{var n=ki;for(dt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}ki=null,Nc=!1}catch(r){throw ki!==null&&(ki=ki.slice(t+1)),f0(Kf,Pr),r}finally{dt=e,uu=!1}}return null}var Ls=[],Ds=0,ec=null,tc=0,Kn=[],Zn=0,$r=null,Hi=1,Gi="";function Br(t,e){Ls[Ds++]=tc,Ls[Ds++]=ec,ec=t,tc=e}function G0(t,e,n){Kn[Zn++]=Hi,Kn[Zn++]=Gi,Kn[Zn++]=$r,$r=t;var i=Hi;t=Gi;var r=32-pi(i)-1;i&=~(1<<r),n+=1;var s=32-pi(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Hi=1<<32-pi(e)+r|n<<r|i,Gi=s+t}else Hi=1<<s|n<<r|i,Gi=t}function sh(t){t.return!==null&&(Br(t,1),G0(t,1,0))}function ah(t){for(;t===ec;)ec=Ls[--Ds],Ls[Ds]=null,tc=Ls[--Ds],Ls[Ds]=null;for(;t===$r;)$r=Kn[--Zn],Kn[Zn]=null,Gi=Kn[--Zn],Kn[Zn]=null,Hi=Kn[--Zn],Kn[Zn]=null}var Vn=null,Gn=null,Et=!1,di=null;function V0(t,e){var n=Qn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Vp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Vn=t,Gn=_r(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Vn=t,Gn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=$r!==null?{id:Hi,overflow:Gi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Qn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Vn=t,Gn=null,!0):!1;default:return!1}}function bd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ad(t){if(Et){var e=Gn;if(e){var n=e;if(!Vp(t,e)){if(bd(t))throw Error(ce(418));e=_r(n.nextSibling);var i=Vn;e&&Vp(t,e)?V0(i,n):(t.flags=t.flags&-4097|2,Et=!1,Vn=t)}}else{if(bd(t))throw Error(ce(418));t.flags=t.flags&-4097|2,Et=!1,Vn=t}}}function Wp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Vn=t}function Oo(t){if(t!==Vn)return!1;if(!Et)return Wp(t),Et=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Md(t.type,t.memoizedProps)),e&&(e=Gn)){if(bd(t))throw W0(),Error(ce(418));for(;e;)V0(t,e),e=_r(e.nextSibling)}if(Wp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ce(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Gn=_r(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Gn=null}}else Gn=Vn?_r(t.stateNode.nextSibling):null;return!0}function W0(){for(var t=Gn;t;)t=_r(t.nextSibling)}function Ks(){Gn=Vn=null,Et=!1}function oh(t){di===null?di=[t]:di.push(t)}var Ky=Zi.ReactCurrentBatchConfig;function _a(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ce(309));var i=n.stateNode}if(!i)throw Error(ce(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(ce(284));if(!n._owner)throw Error(ce(290,t))}return t}function ko(t,e){throw t=Object.prototype.toString.call(e),Error(ce(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Xp(t){var e=t._init;return e(t._payload)}function X0(t){function e(u,g){if(t){var x=u.deletions;x===null?(u.deletions=[g],u.flags|=16):x.push(g)}}function n(u,g){if(!t)return null;for(;g!==null;)e(u,g),g=g.sibling;return null}function i(u,g){for(u=new Map;g!==null;)g.key!==null?u.set(g.key,g):u.set(g.index,g),g=g.sibling;return u}function r(u,g){return u=Sr(u,g),u.index=0,u.sibling=null,u}function s(u,g,x){return u.index=x,t?(x=u.alternate,x!==null?(x=x.index,x<g?(u.flags|=2,g):x):(u.flags|=2,g)):(u.flags|=1048576,g)}function a(u){return t&&u.alternate===null&&(u.flags|=2),u}function o(u,g,x,y){return g===null||g.tag!==6?(g=_u(x,u.mode,y),g.return=u,g):(g=r(g,x),g.return=u,g)}function l(u,g,x,y){var T=x.type;return T===bs?h(u,g,x.props.children,y,x.key):g!==null&&(g.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===sr&&Xp(T)===g.type)?(y=r(g,x.props),y.ref=_a(u,g,x),y.return=u,y):(y=Il(x.type,x.key,x.props,null,u.mode,y),y.ref=_a(u,g,x),y.return=u,y)}function c(u,g,x,y){return g===null||g.tag!==4||g.stateNode.containerInfo!==x.containerInfo||g.stateNode.implementation!==x.implementation?(g=xu(x,u.mode,y),g.return=u,g):(g=r(g,x.children||[]),g.return=u,g)}function h(u,g,x,y,T){return g===null||g.tag!==7?(g=jr(x,u.mode,y,T),g.return=u,g):(g=r(g,x),g.return=u,g)}function m(u,g,x){if(typeof g=="string"&&g!==""||typeof g=="number")return g=_u(""+g,u.mode,x),g.return=u,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ao:return x=Il(g.type,g.key,g.props,null,u.mode,x),x.ref=_a(u,null,g),x.return=u,x;case Ts:return g=xu(g,u.mode,x),g.return=u,g;case sr:var y=g._init;return m(u,y(g._payload),x)}if(Pa(g)||fa(g))return g=jr(g,u.mode,x,null),g.return=u,g;ko(u,g)}return null}function d(u,g,x,y){var T=g!==null?g.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return T!==null?null:o(u,g,""+x,y);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ao:return x.key===T?l(u,g,x,y):null;case Ts:return x.key===T?c(u,g,x,y):null;case sr:return T=x._init,d(u,g,T(x._payload),y)}if(Pa(x)||fa(x))return T!==null?null:h(u,g,x,y,null);ko(u,x)}return null}function p(u,g,x,y,T){if(typeof y=="string"&&y!==""||typeof y=="number")return u=u.get(x)||null,o(g,u,""+y,T);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Ao:return u=u.get(y.key===null?x:y.key)||null,l(g,u,y,T);case Ts:return u=u.get(y.key===null?x:y.key)||null,c(g,u,y,T);case sr:var w=y._init;return p(u,g,x,w(y._payload),T)}if(Pa(y)||fa(y))return u=u.get(x)||null,h(g,u,y,T,null);ko(g,y)}return null}function v(u,g,x,y){for(var T=null,w=null,f=g,S=g=0,P=null;f!==null&&S<x.length;S++){f.index>S?(P=f,f=null):P=f.sibling;var C=d(u,f,x[S],y);if(C===null){f===null&&(f=P);break}t&&f&&C.alternate===null&&e(u,f),g=s(C,g,S),w===null?T=C:w.sibling=C,w=C,f=P}if(S===x.length)return n(u,f),Et&&Br(u,S),T;if(f===null){for(;S<x.length;S++)f=m(u,x[S],y),f!==null&&(g=s(f,g,S),w===null?T=f:w.sibling=f,w=f);return Et&&Br(u,S),T}for(f=i(u,f);S<x.length;S++)P=p(f,u,S,x[S],y),P!==null&&(t&&P.alternate!==null&&f.delete(P.key===null?S:P.key),g=s(P,g,S),w===null?T=P:w.sibling=P,w=P);return t&&f.forEach(function(L){return e(u,L)}),Et&&Br(u,S),T}function M(u,g,x,y){var T=fa(x);if(typeof T!="function")throw Error(ce(150));if(x=T.call(x),x==null)throw Error(ce(151));for(var w=T=null,f=g,S=g=0,P=null,C=x.next();f!==null&&!C.done;S++,C=x.next()){f.index>S?(P=f,f=null):P=f.sibling;var L=d(u,f,C.value,y);if(L===null){f===null&&(f=P);break}t&&f&&L.alternate===null&&e(u,f),g=s(L,g,S),w===null?T=L:w.sibling=L,w=L,f=P}if(C.done)return n(u,f),Et&&Br(u,S),T;if(f===null){for(;!C.done;S++,C=x.next())C=m(u,C.value,y),C!==null&&(g=s(C,g,S),w===null?T=C:w.sibling=C,w=C);return Et&&Br(u,S),T}for(f=i(u,f);!C.done;S++,C=x.next())C=p(f,u,S,C.value,y),C!==null&&(t&&C.alternate!==null&&f.delete(C.key===null?S:C.key),g=s(C,g,S),w===null?T=C:w.sibling=C,w=C);return t&&f.forEach(function(F){return e(u,F)}),Et&&Br(u,S),T}function _(u,g,x,y){if(typeof x=="object"&&x!==null&&x.type===bs&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Ao:e:{for(var T=x.key,w=g;w!==null;){if(w.key===T){if(T=x.type,T===bs){if(w.tag===7){n(u,w.sibling),g=r(w,x.props.children),g.return=u,u=g;break e}}else if(w.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===sr&&Xp(T)===w.type){n(u,w.sibling),g=r(w,x.props),g.ref=_a(u,w,x),g.return=u,u=g;break e}n(u,w);break}else e(u,w);w=w.sibling}x.type===bs?(g=jr(x.props.children,u.mode,y,x.key),g.return=u,u=g):(y=Il(x.type,x.key,x.props,null,u.mode,y),y.ref=_a(u,g,x),y.return=u,u=y)}return a(u);case Ts:e:{for(w=x.key;g!==null;){if(g.key===w)if(g.tag===4&&g.stateNode.containerInfo===x.containerInfo&&g.stateNode.implementation===x.implementation){n(u,g.sibling),g=r(g,x.children||[]),g.return=u,u=g;break e}else{n(u,g);break}else e(u,g);g=g.sibling}g=xu(x,u.mode,y),g.return=u,u=g}return a(u);case sr:return w=x._init,_(u,g,w(x._payload),y)}if(Pa(x))return v(u,g,x,y);if(fa(x))return M(u,g,x,y);ko(u,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,g!==null&&g.tag===6?(n(u,g.sibling),g=r(g,x),g.return=u,u=g):(n(u,g),g=_u(x,u.mode,y),g.return=u,u=g),a(u)):n(u,g)}return _}var Zs=X0(!0),j0=X0(!1),nc=Cr(null),ic=null,Is=null,lh=null;function ch(){lh=Is=ic=null}function uh(t){var e=nc.current;St(nc),t._currentValue=e}function Rd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Gs(t,e){ic=t,lh=Is=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Rn=!0),t.firstContext=null)}function ti(t){var e=t._currentValue;if(lh!==t)if(t={context:t,memoizedValue:e,next:null},Is===null){if(ic===null)throw Error(ce(308));Is=t,ic.dependencies={lanes:0,firstContext:t}}else Is=Is.next=t;return e}var Gr=null;function dh(t){Gr===null?Gr=[t]:Gr.push(t)}function Y0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,dh(e)):(n.next=r.next,r.next=n),e.interleaved=n,qi(t,i)}function qi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var ar=!1;function fh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function $0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Wi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function xr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,rt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,qi(t,n)}return r=i.interleaved,r===null?(e.next=e,dh(i)):(e.next=r.next,r.next=e),i.interleaved=e,qi(t,n)}function Rl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Zf(t,n)}}function jp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function rc(t,e,n,i){var r=t.updateQueue;ar=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var h=t.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==a&&(o===null?h.firstBaseUpdate=c:o.next=c,h.lastBaseUpdate=l))}if(s!==null){var m=r.baseState;a=0,h=c=l=null,o=s;do{var d=o.lane,p=o.eventTime;if((i&d)===d){h!==null&&(h=h.next={eventTime:p,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var v=t,M=o;switch(d=e,p=n,M.tag){case 1:if(v=M.payload,typeof v=="function"){m=v.call(p,m,d);break e}m=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=M.payload,d=typeof v=="function"?v.call(p,m,d):v,d==null)break e;m=Pt({},m,d);break e;case 2:ar=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[o]:d.push(o))}else p={eventTime:p,lane:d,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(c=h=p,l=m):h=h.next=p,a|=d;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;d=o,o=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(h===null&&(l=m),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=h,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Kr|=a,t.lanes=a,t.memoizedState=m}}function Yp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ce(191,r));r.call(i)}}}var So={},bi=Cr(So),ro=Cr(So),so=Cr(So);function Vr(t){if(t===So)throw Error(ce(174));return t}function hh(t,e){switch(xt(so,e),xt(ro,t),xt(bi,So),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ld(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=ld(e,t)}St(bi),xt(bi,e)}function Js(){St(bi),St(ro),St(so)}function q0(t){Vr(so.current);var e=Vr(bi.current),n=ld(e,t.type);e!==n&&(xt(ro,t),xt(bi,n))}function ph(t){ro.current===t&&(St(bi),St(ro))}var At=Cr(0);function sc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var du=[];function mh(){for(var t=0;t<du.length;t++)du[t]._workInProgressVersionPrimary=null;du.length=0}var Cl=Zi.ReactCurrentDispatcher,fu=Zi.ReactCurrentBatchConfig,qr=0,Ct=null,Ht=null,qt=null,ac=!1,za=!1,ao=0,Zy=0;function on(){throw Error(ce(321))}function gh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!gi(t[n],e[n]))return!1;return!0}function _h(t,e,n,i,r,s){if(qr=s,Ct=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Cl.current=t===null||t.memoizedState===null?tS:nS,t=n(i,r),za){s=0;do{if(za=!1,ao=0,25<=s)throw Error(ce(301));s+=1,qt=Ht=null,e.updateQueue=null,Cl.current=iS,t=n(i,r)}while(za)}if(Cl.current=oc,e=Ht!==null&&Ht.next!==null,qr=0,qt=Ht=Ct=null,ac=!1,e)throw Error(ce(300));return t}function xh(){var t=ao!==0;return ao=0,t}function yi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return qt===null?Ct.memoizedState=qt=t:qt=qt.next=t,qt}function ni(){if(Ht===null){var t=Ct.alternate;t=t!==null?t.memoizedState:null}else t=Ht.next;var e=qt===null?Ct.memoizedState:qt.next;if(e!==null)qt=e,Ht=t;else{if(t===null)throw Error(ce(310));Ht=t,t={memoizedState:Ht.memoizedState,baseState:Ht.baseState,baseQueue:Ht.baseQueue,queue:Ht.queue,next:null},qt===null?Ct.memoizedState=qt=t:qt=qt.next=t}return qt}function oo(t,e){return typeof e=="function"?e(t):e}function hu(t){var e=ni(),n=e.queue;if(n===null)throw Error(ce(311));n.lastRenderedReducer=t;var i=Ht,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var h=c.lane;if((qr&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var m={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=m,a=i):l=l.next=m,Ct.lanes|=h,Kr|=h}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,gi(i,e.memoizedState)||(Rn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Ct.lanes|=s,Kr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function pu(t){var e=ni(),n=e.queue;if(n===null)throw Error(ce(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);gi(s,e.memoizedState)||(Rn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function K0(){}function Z0(t,e){var n=Ct,i=ni(),r=e(),s=!gi(i.memoizedState,r);if(s&&(i.memoizedState=r,Rn=!0),i=i.queue,vh(e_.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||qt!==null&&qt.memoizedState.tag&1){if(n.flags|=2048,lo(9,Q0.bind(null,n,i,r,e),void 0,null),Kt===null)throw Error(ce(349));qr&30||J0(n,e,r)}return r}function J0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ct.updateQueue,e===null?(e={lastEffect:null,stores:null},Ct.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Q0(t,e,n,i){e.value=n,e.getSnapshot=i,t_(e)&&n_(t)}function e_(t,e,n){return n(function(){t_(e)&&n_(t)})}function t_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!gi(t,n)}catch{return!0}}function n_(t){var e=qi(t,1);e!==null&&mi(e,t,1,-1)}function $p(t){var e=yi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:oo,lastRenderedState:t},e.queue=t,t=t.dispatch=eS.bind(null,Ct,t),[e.memoizedState,t]}function lo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Ct.updateQueue,e===null?(e={lastEffect:null,stores:null},Ct.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function i_(){return ni().memoizedState}function Pl(t,e,n,i){var r=yi();Ct.flags|=t,r.memoizedState=lo(1|e,n,void 0,i===void 0?null:i)}function Lc(t,e,n,i){var r=ni();i=i===void 0?null:i;var s=void 0;if(Ht!==null){var a=Ht.memoizedState;if(s=a.destroy,i!==null&&gh(i,a.deps)){r.memoizedState=lo(e,n,s,i);return}}Ct.flags|=t,r.memoizedState=lo(1|e,n,s,i)}function qp(t,e){return Pl(8390656,8,t,e)}function vh(t,e){return Lc(2048,8,t,e)}function r_(t,e){return Lc(4,2,t,e)}function s_(t,e){return Lc(4,4,t,e)}function a_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function o_(t,e,n){return n=n!=null?n.concat([t]):null,Lc(4,4,a_.bind(null,e,t),n)}function yh(){}function l_(t,e){var n=ni();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&gh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function c_(t,e){var n=ni();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&gh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function u_(t,e,n){return qr&21?(gi(n,e)||(n=m0(),Ct.lanes|=n,Kr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Rn=!0),t.memoizedState=n)}function Jy(t,e){var n=dt;dt=n!==0&&4>n?n:4,t(!0);var i=fu.transition;fu.transition={};try{t(!1),e()}finally{dt=n,fu.transition=i}}function d_(){return ni().memoizedState}function Qy(t,e,n){var i=yr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},f_(t))h_(e,n);else if(n=Y0(t,e,n,i),n!==null){var r=En();mi(n,t,i,r),p_(n,e,i)}}function eS(t,e,n){var i=yr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(f_(t))h_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,gi(o,a)){var l=e.interleaved;l===null?(r.next=r,dh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Y0(t,e,r,i),n!==null&&(r=En(),mi(n,t,i,r),p_(n,e,i))}}function f_(t){var e=t.alternate;return t===Ct||e!==null&&e===Ct}function h_(t,e){za=ac=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function p_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Zf(t,n)}}var oc={readContext:ti,useCallback:on,useContext:on,useEffect:on,useImperativeHandle:on,useInsertionEffect:on,useLayoutEffect:on,useMemo:on,useReducer:on,useRef:on,useState:on,useDebugValue:on,useDeferredValue:on,useTransition:on,useMutableSource:on,useSyncExternalStore:on,useId:on,unstable_isNewReconciler:!1},tS={readContext:ti,useCallback:function(t,e){return yi().memoizedState=[t,e===void 0?null:e],t},useContext:ti,useEffect:qp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Pl(4194308,4,a_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Pl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Pl(4,2,t,e)},useMemo:function(t,e){var n=yi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=yi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Qy.bind(null,Ct,t),[i.memoizedState,t]},useRef:function(t){var e=yi();return t={current:t},e.memoizedState=t},useState:$p,useDebugValue:yh,useDeferredValue:function(t){return yi().memoizedState=t},useTransition:function(){var t=$p(!1),e=t[0];return t=Jy.bind(null,t[1]),yi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Ct,r=yi();if(Et){if(n===void 0)throw Error(ce(407));n=n()}else{if(n=e(),Kt===null)throw Error(ce(349));qr&30||J0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,qp(e_.bind(null,i,s,t),[t]),i.flags|=2048,lo(9,Q0.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=yi(),e=Kt.identifierPrefix;if(Et){var n=Gi,i=Hi;n=(i&~(1<<32-pi(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ao++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Zy++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},nS={readContext:ti,useCallback:l_,useContext:ti,useEffect:vh,useImperativeHandle:o_,useInsertionEffect:r_,useLayoutEffect:s_,useMemo:c_,useReducer:hu,useRef:i_,useState:function(){return hu(oo)},useDebugValue:yh,useDeferredValue:function(t){var e=ni();return u_(e,Ht.memoizedState,t)},useTransition:function(){var t=hu(oo)[0],e=ni().memoizedState;return[t,e]},useMutableSource:K0,useSyncExternalStore:Z0,useId:d_,unstable_isNewReconciler:!1},iS={readContext:ti,useCallback:l_,useContext:ti,useEffect:vh,useImperativeHandle:o_,useInsertionEffect:r_,useLayoutEffect:s_,useMemo:c_,useReducer:pu,useRef:i_,useState:function(){return pu(oo)},useDebugValue:yh,useDeferredValue:function(t){var e=ni();return Ht===null?e.memoizedState=t:u_(e,Ht.memoizedState,t)},useTransition:function(){var t=pu(oo)[0],e=ni().memoizedState;return[t,e]},useMutableSource:K0,useSyncExternalStore:Z0,useId:d_,unstable_isNewReconciler:!1};function ci(t,e){if(t&&t.defaultProps){e=Pt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Cd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Pt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Dc={isMounted:function(t){return(t=t._reactInternals)?ns(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=En(),r=yr(t),s=Wi(i,r);s.payload=e,n!=null&&(s.callback=n),e=xr(t,s,r),e!==null&&(mi(e,t,r,i),Rl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=En(),r=yr(t),s=Wi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=xr(t,s,r),e!==null&&(mi(e,t,r,i),Rl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=En(),i=yr(t),r=Wi(n,i);r.tag=2,e!=null&&(r.callback=e),e=xr(t,r,i),e!==null&&(mi(e,t,i,n),Rl(e,t,i))}};function Kp(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!eo(n,i)||!eo(r,s):!0}function m_(t,e,n){var i=!1,r=wr,s=e.contextType;return typeof s=="object"&&s!==null?s=ti(s):(r=Pn(e)?Yr:pn.current,i=e.contextTypes,s=(i=i!=null)?qs(t,r):wr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Dc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Zp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Dc.enqueueReplaceState(e,e.state,null)}function Pd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},fh(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=ti(s):(s=Pn(e)?Yr:pn.current,r.context=qs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Cd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Dc.enqueueReplaceState(r,r.state,null),rc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Qs(t,e){try{var n="",i=e;do n+=Nv(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function mu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Nd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var rS=typeof WeakMap=="function"?WeakMap:Map;function g_(t,e,n){n=Wi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){cc||(cc=!0,Hd=i),Nd(t,e)},n}function __(t,e,n){n=Wi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Nd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Nd(t,e),typeof i!="function"&&(vr===null?vr=new Set([this]):vr.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Jp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new rS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=xS.bind(null,t,e,n),e.then(t,t))}function Qp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function em(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Wi(-1,1),e.tag=2,xr(n,e,1))),n.lanes|=1),t)}var sS=Zi.ReactCurrentOwner,Rn=!1;function Mn(t,e,n,i){e.child=t===null?j0(e,null,n,i):Zs(e,t.child,n,i)}function tm(t,e,n,i,r){n=n.render;var s=e.ref;return Gs(e,r),i=_h(t,e,n,i,s,r),n=xh(),t!==null&&!Rn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ki(t,e,r)):(Et&&n&&sh(e),e.flags|=1,Mn(t,e,i,r),e.child)}function nm(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Rh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,x_(t,e,s,i,r)):(t=Il(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:eo,n(a,i)&&t.ref===e.ref)return Ki(t,e,r)}return e.flags|=1,t=Sr(s,i),t.ref=e.ref,t.return=e,e.child=t}function x_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(eo(s,i)&&t.ref===e.ref)if(Rn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(Rn=!0);else return e.lanes=t.lanes,Ki(t,e,r)}return Ld(t,e,n,i,r)}function v_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},xt(Fs,kn),kn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,xt(Fs,kn),kn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,xt(Fs,kn),kn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,xt(Fs,kn),kn|=i;return Mn(t,e,r,n),e.child}function y_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Ld(t,e,n,i,r){var s=Pn(n)?Yr:pn.current;return s=qs(e,s),Gs(e,r),n=_h(t,e,n,i,s,r),i=xh(),t!==null&&!Rn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ki(t,e,r)):(Et&&i&&sh(e),e.flags|=1,Mn(t,e,n,r),e.child)}function im(t,e,n,i,r){if(Pn(n)){var s=!0;Ql(e)}else s=!1;if(Gs(e,r),e.stateNode===null)Nl(t,e),m_(e,n,i),Pd(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=ti(c):(c=Pn(n)?Yr:pn.current,c=qs(e,c));var h=n.getDerivedStateFromProps,m=typeof h=="function"||typeof a.getSnapshotBeforeUpdate=="function";m||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&Zp(e,a,i,c),ar=!1;var d=e.memoizedState;a.state=d,rc(e,i,a,r),l=e.memoizedState,o!==i||d!==l||Cn.current||ar?(typeof h=="function"&&(Cd(e,n,h,i),l=e.memoizedState),(o=ar||Kp(e,n,o,i,d,l,c))?(m||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,$0(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:ci(e.type,o),a.props=c,m=e.pendingProps,d=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=ti(l):(l=Pn(n)?Yr:pn.current,l=qs(e,l));var p=n.getDerivedStateFromProps;(h=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==m||d!==l)&&Zp(e,a,i,l),ar=!1,d=e.memoizedState,a.state=d,rc(e,i,a,r);var v=e.memoizedState;o!==m||d!==v||Cn.current||ar?(typeof p=="function"&&(Cd(e,n,p,i),v=e.memoizedState),(c=ar||Kp(e,n,c,i,d,v,l)||!1)?(h||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,v,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,v,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),a.props=i,a.state=v,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return Dd(t,e,n,i,s,r)}function Dd(t,e,n,i,r,s){y_(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&Gp(e,n,!1),Ki(t,e,s);i=e.stateNode,sS.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Zs(e,t.child,null,s),e.child=Zs(e,null,o,s)):Mn(t,e,o,s),e.memoizedState=i.state,r&&Gp(e,n,!0),e.child}function S_(t){var e=t.stateNode;e.pendingContext?Hp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Hp(t,e.context,!1),hh(t,e.containerInfo)}function rm(t,e,n,i,r){return Ks(),oh(r),e.flags|=256,Mn(t,e,n,i),e.child}var Id={dehydrated:null,treeContext:null,retryLane:0};function Ud(t){return{baseLanes:t,cachePool:null,transitions:null}}function M_(t,e,n){var i=e.pendingProps,r=At.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),xt(At,r&1),t===null)return Ad(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Fc(a,i,0,null),t=jr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Ud(n),e.memoizedState=Id,t):Sh(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return aS(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Sr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=Sr(o,s):(s=jr(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Ud(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Id,i}return s=t.child,t=s.sibling,i=Sr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Sh(t,e){return e=Fc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Bo(t,e,n,i){return i!==null&&oh(i),Zs(e,t.child,null,n),t=Sh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function aS(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=mu(Error(ce(422))),Bo(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Fc({mode:"visible",children:i.children},r,0,null),s=jr(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Zs(e,t.child,null,a),e.child.memoizedState=Ud(a),e.memoizedState=Id,s);if(!(e.mode&1))return Bo(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(ce(419)),i=mu(s,i,void 0),Bo(t,e,a,i)}if(o=(a&t.childLanes)!==0,Rn||o){if(i=Kt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,qi(t,r),mi(i,t,r,-1))}return Ah(),i=mu(Error(ce(421))),Bo(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=vS.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Gn=_r(r.nextSibling),Vn=e,Et=!0,di=null,t!==null&&(Kn[Zn++]=Hi,Kn[Zn++]=Gi,Kn[Zn++]=$r,Hi=t.id,Gi=t.overflow,$r=e),e=Sh(e,i.children),e.flags|=4096,e)}function sm(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Rd(t.return,e,n)}function gu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function E_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Mn(t,e,i.children,n),i=At.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&sm(t,n,e);else if(t.tag===19)sm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(xt(At,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&sc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),gu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&sc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}gu(e,!0,n,null,s);break;case"together":gu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Nl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ki(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Kr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ce(153));if(e.child!==null){for(t=e.child,n=Sr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Sr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function oS(t,e,n){switch(e.tag){case 3:S_(e),Ks();break;case 5:q0(e);break;case 1:Pn(e.type)&&Ql(e);break;case 4:hh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;xt(nc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(xt(At,At.current&1),e.flags|=128,null):n&e.child.childLanes?M_(t,e,n):(xt(At,At.current&1),t=Ki(t,e,n),t!==null?t.sibling:null);xt(At,At.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return E_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),xt(At,At.current),i)break;return null;case 22:case 23:return e.lanes=0,v_(t,e,n)}return Ki(t,e,n)}var w_,Fd,T_,b_;w_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Fd=function(){};T_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Vr(bi.current);var s=null;switch(n){case"input":r=rd(t,r),i=rd(t,i),s=[];break;case"select":r=Pt({},r,{value:void 0}),i=Pt({},i,{value:void 0}),s=[];break;case"textarea":r=od(t,r),i=od(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Zl)}cd(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ya.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ya.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&yt("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};b_=function(t,e,n,i){n!==i&&(e.flags|=4)};function xa(t,e){if(!Et)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function ln(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function lS(t,e,n){var i=e.pendingProps;switch(ah(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ln(e),null;case 1:return Pn(e.type)&&Jl(),ln(e),null;case 3:return i=e.stateNode,Js(),St(Cn),St(pn),mh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Oo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,di!==null&&(Wd(di),di=null))),Fd(t,e),ln(e),null;case 5:ph(e);var r=Vr(so.current);if(n=e.type,t!==null&&e.stateNode!=null)T_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ce(166));return ln(e),null}if(t=Vr(bi.current),Oo(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Mi]=e,i[io]=s,t=(e.mode&1)!==0,n){case"dialog":yt("cancel",i),yt("close",i);break;case"iframe":case"object":case"embed":yt("load",i);break;case"video":case"audio":for(r=0;r<La.length;r++)yt(La[r],i);break;case"source":yt("error",i);break;case"img":case"image":case"link":yt("error",i),yt("load",i);break;case"details":yt("toggle",i);break;case"input":pp(i,s),yt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},yt("invalid",i);break;case"textarea":gp(i,s),yt("invalid",i)}cd(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&Fo(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&Fo(i.textContent,o,t),r=["children",""+o]):Ya.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&yt("scroll",i)}switch(n){case"input":Ro(i),mp(i,s,!0);break;case"textarea":Ro(i),_p(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Zl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=e0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[Mi]=e,t[io]=i,w_(t,e,!1,!1),e.stateNode=t;e:{switch(a=ud(n,i),n){case"dialog":yt("cancel",t),yt("close",t),r=i;break;case"iframe":case"object":case"embed":yt("load",t),r=i;break;case"video":case"audio":for(r=0;r<La.length;r++)yt(La[r],t);r=i;break;case"source":yt("error",t),r=i;break;case"img":case"image":case"link":yt("error",t),yt("load",t),r=i;break;case"details":yt("toggle",t),r=i;break;case"input":pp(t,i),r=rd(t,i),yt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Pt({},i,{value:void 0}),yt("invalid",t);break;case"textarea":gp(t,i),r=od(t,i),yt("invalid",t);break;default:r=i}cd(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?i0(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&t0(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&$a(t,l):typeof l=="number"&&$a(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ya.hasOwnProperty(s)?l!=null&&s==="onScroll"&&yt("scroll",t):l!=null&&Xf(t,s,l,a))}switch(n){case"input":Ro(t),mp(t,i,!1);break;case"textarea":Ro(t),_p(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Er(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ks(t,!!i.multiple,s,!1):i.defaultValue!=null&&ks(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Zl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return ln(e),null;case 6:if(t&&e.stateNode!=null)b_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ce(166));if(n=Vr(so.current),Vr(bi.current),Oo(e)){if(i=e.stateNode,n=e.memoizedProps,i[Mi]=e,(s=i.nodeValue!==n)&&(t=Vn,t!==null))switch(t.tag){case 3:Fo(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Fo(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Mi]=e,e.stateNode=i}return ln(e),null;case 13:if(St(At),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Et&&Gn!==null&&e.mode&1&&!(e.flags&128))W0(),Ks(),e.flags|=98560,s=!1;else if(s=Oo(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ce(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ce(317));s[Mi]=e}else Ks(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;ln(e),s=!1}else di!==null&&(Wd(di),di=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||At.current&1?Gt===0&&(Gt=3):Ah())),e.updateQueue!==null&&(e.flags|=4),ln(e),null);case 4:return Js(),Fd(t,e),t===null&&to(e.stateNode.containerInfo),ln(e),null;case 10:return uh(e.type._context),ln(e),null;case 17:return Pn(e.type)&&Jl(),ln(e),null;case 19:if(St(At),s=e.memoizedState,s===null)return ln(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)xa(s,!1);else{if(Gt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=sc(t),a!==null){for(e.flags|=128,xa(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return xt(At,At.current&1|2),e.child}t=t.sibling}s.tail!==null&&It()>ea&&(e.flags|=128,i=!0,xa(s,!1),e.lanes=4194304)}else{if(!i)if(t=sc(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),xa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!Et)return ln(e),null}else 2*It()-s.renderingStartTime>ea&&n!==1073741824&&(e.flags|=128,i=!0,xa(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=It(),e.sibling=null,n=At.current,xt(At,i?n&1|2:n&1),e):(ln(e),null);case 22:case 23:return bh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?kn&1073741824&&(ln(e),e.subtreeFlags&6&&(e.flags|=8192)):ln(e),null;case 24:return null;case 25:return null}throw Error(ce(156,e.tag))}function cS(t,e){switch(ah(e),e.tag){case 1:return Pn(e.type)&&Jl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Js(),St(Cn),St(pn),mh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return ph(e),null;case 13:if(St(At),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ce(340));Ks()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return St(At),null;case 4:return Js(),null;case 10:return uh(e.type._context),null;case 22:case 23:return bh(),null;case 24:return null;default:return null}}var zo=!1,dn=!1,uS=typeof WeakSet=="function"?WeakSet:Set,Re=null;function Us(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Dt(t,e,i)}else n.current=null}function Od(t,e,n){try{n()}catch(i){Dt(t,e,i)}}var am=!1;function dS(t,e){if(yd=$l,t=N0(),rh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,h=0,m=t,d=null;t:for(;;){for(var p;m!==n||r!==0&&m.nodeType!==3||(o=a+r),m!==s||i!==0&&m.nodeType!==3||(l=a+i),m.nodeType===3&&(a+=m.nodeValue.length),(p=m.firstChild)!==null;)d=m,m=p;for(;;){if(m===t)break t;if(d===n&&++c===r&&(o=a),d===s&&++h===i&&(l=a),(p=m.nextSibling)!==null)break;m=d,d=m.parentNode}m=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Sd={focusedElem:t,selectionRange:n},$l=!1,Re=e;Re!==null;)if(e=Re,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Re=t;else for(;Re!==null;){e=Re;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var M=v.memoizedProps,_=v.memoizedState,u=e.stateNode,g=u.getSnapshotBeforeUpdate(e.elementType===e.type?M:ci(e.type,M),_);u.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ce(163))}}catch(y){Dt(e,e.return,y)}if(t=e.sibling,t!==null){t.return=e.return,Re=t;break}Re=e.return}return v=am,am=!1,v}function Ha(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Od(e,n,s)}r=r.next}while(r!==i)}}function Ic(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function kd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function A_(t){var e=t.alternate;e!==null&&(t.alternate=null,A_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Mi],delete e[io],delete e[wd],delete e[Yy],delete e[$y])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function R_(t){return t.tag===5||t.tag===3||t.tag===4}function om(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||R_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Bd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Zl));else if(i!==4&&(t=t.child,t!==null))for(Bd(t,e,n),t=t.sibling;t!==null;)Bd(t,e,n),t=t.sibling}function zd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(zd(t,e,n),t=t.sibling;t!==null;)zd(t,e,n),t=t.sibling}var Qt=null,ui=!1;function Qi(t,e,n){for(n=n.child;n!==null;)C_(t,e,n),n=n.sibling}function C_(t,e,n){if(Ti&&typeof Ti.onCommitFiberUnmount=="function")try{Ti.onCommitFiberUnmount(bc,n)}catch{}switch(n.tag){case 5:dn||Us(n,e);case 6:var i=Qt,r=ui;Qt=null,Qi(t,e,n),Qt=i,ui=r,Qt!==null&&(ui?(t=Qt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Qt.removeChild(n.stateNode));break;case 18:Qt!==null&&(ui?(t=Qt,n=n.stateNode,t.nodeType===8?cu(t.parentNode,n):t.nodeType===1&&cu(t,n),Ja(t)):cu(Qt,n.stateNode));break;case 4:i=Qt,r=ui,Qt=n.stateNode.containerInfo,ui=!0,Qi(t,e,n),Qt=i,ui=r;break;case 0:case 11:case 14:case 15:if(!dn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Od(n,e,a),r=r.next}while(r!==i)}Qi(t,e,n);break;case 1:if(!dn&&(Us(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Dt(n,e,o)}Qi(t,e,n);break;case 21:Qi(t,e,n);break;case 22:n.mode&1?(dn=(i=dn)||n.memoizedState!==null,Qi(t,e,n),dn=i):Qi(t,e,n);break;default:Qi(t,e,n)}}function lm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new uS),e.forEach(function(i){var r=yS.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function ri(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Qt=o.stateNode,ui=!1;break e;case 3:Qt=o.stateNode.containerInfo,ui=!0;break e;case 4:Qt=o.stateNode.containerInfo,ui=!0;break e}o=o.return}if(Qt===null)throw Error(ce(160));C_(s,a,r),Qt=null,ui=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Dt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)P_(e,t),e=e.sibling}function P_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ri(e,t),_i(t),i&4){try{Ha(3,t,t.return),Ic(3,t)}catch(M){Dt(t,t.return,M)}try{Ha(5,t,t.return)}catch(M){Dt(t,t.return,M)}}break;case 1:ri(e,t),_i(t),i&512&&n!==null&&Us(n,n.return);break;case 5:if(ri(e,t),_i(t),i&512&&n!==null&&Us(n,n.return),t.flags&32){var r=t.stateNode;try{$a(r,"")}catch(M){Dt(t,t.return,M)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Jg(r,s),ud(o,a);var c=ud(o,s);for(a=0;a<l.length;a+=2){var h=l[a],m=l[a+1];h==="style"?i0(r,m):h==="dangerouslySetInnerHTML"?t0(r,m):h==="children"?$a(r,m):Xf(r,h,m,c)}switch(o){case"input":sd(r,s);break;case"textarea":Qg(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ks(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?ks(r,!!s.multiple,s.defaultValue,!0):ks(r,!!s.multiple,s.multiple?[]:"",!1))}r[io]=s}catch(M){Dt(t,t.return,M)}}break;case 6:if(ri(e,t),_i(t),i&4){if(t.stateNode===null)throw Error(ce(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(M){Dt(t,t.return,M)}}break;case 3:if(ri(e,t),_i(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ja(e.containerInfo)}catch(M){Dt(t,t.return,M)}break;case 4:ri(e,t),_i(t);break;case 13:ri(e,t),_i(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(wh=It())),i&4&&lm(t);break;case 22:if(h=n!==null&&n.memoizedState!==null,t.mode&1?(dn=(c=dn)||h,ri(e,t),dn=c):ri(e,t),_i(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!h&&t.mode&1)for(Re=t,h=t.child;h!==null;){for(m=Re=h;Re!==null;){switch(d=Re,p=d.child,d.tag){case 0:case 11:case 14:case 15:Ha(4,d,d.return);break;case 1:Us(d,d.return);var v=d.stateNode;if(typeof v.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(M){Dt(i,n,M)}}break;case 5:Us(d,d.return);break;case 22:if(d.memoizedState!==null){um(m);continue}}p!==null?(p.return=d,Re=p):um(m)}h=h.sibling}e:for(h=null,m=t;;){if(m.tag===5){if(h===null){h=m;try{r=m.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=m.stateNode,l=m.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=n0("display",a))}catch(M){Dt(t,t.return,M)}}}else if(m.tag===6){if(h===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(M){Dt(t,t.return,M)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;h===m&&(h=null),m=m.return}h===m&&(h=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:ri(e,t),_i(t),i&4&&lm(t);break;case 21:break;default:ri(e,t),_i(t)}}function _i(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(R_(n)){var i=n;break e}n=n.return}throw Error(ce(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&($a(r,""),i.flags&=-33);var s=om(t);zd(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=om(t);Bd(t,o,a);break;default:throw Error(ce(161))}}catch(l){Dt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function fS(t,e,n){Re=t,N_(t)}function N_(t,e,n){for(var i=(t.mode&1)!==0;Re!==null;){var r=Re,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||zo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||dn;o=zo;var c=dn;if(zo=a,(dn=l)&&!c)for(Re=r;Re!==null;)a=Re,l=a.child,a.tag===22&&a.memoizedState!==null?dm(r):l!==null?(l.return=a,Re=l):dm(r);for(;s!==null;)Re=s,N_(s),s=s.sibling;Re=r,zo=o,dn=c}cm(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Re=s):cm(t)}}function cm(t){for(;Re!==null;){var e=Re;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:dn||Ic(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!dn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ci(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Yp(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Yp(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var m=h.dehydrated;m!==null&&Ja(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ce(163))}dn||e.flags&512&&kd(e)}catch(d){Dt(e,e.return,d)}}if(e===t){Re=null;break}if(n=e.sibling,n!==null){n.return=e.return,Re=n;break}Re=e.return}}function um(t){for(;Re!==null;){var e=Re;if(e===t){Re=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Re=n;break}Re=e.return}}function dm(t){for(;Re!==null;){var e=Re;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ic(4,e)}catch(l){Dt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Dt(e,r,l)}}var s=e.return;try{kd(e)}catch(l){Dt(e,s,l)}break;case 5:var a=e.return;try{kd(e)}catch(l){Dt(e,a,l)}}}catch(l){Dt(e,e.return,l)}if(e===t){Re=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Re=o;break}Re=e.return}}var hS=Math.ceil,lc=Zi.ReactCurrentDispatcher,Mh=Zi.ReactCurrentOwner,ei=Zi.ReactCurrentBatchConfig,rt=0,Kt=null,kt=null,tn=0,kn=0,Fs=Cr(0),Gt=0,co=null,Kr=0,Uc=0,Eh=0,Ga=null,An=null,wh=0,ea=1/0,Oi=null,cc=!1,Hd=null,vr=null,Ho=!1,dr=null,uc=0,Va=0,Gd=null,Ll=-1,Dl=0;function En(){return rt&6?It():Ll!==-1?Ll:Ll=It()}function yr(t){return t.mode&1?rt&2&&tn!==0?tn&-tn:Ky.transition!==null?(Dl===0&&(Dl=m0()),Dl):(t=dt,t!==0||(t=window.event,t=t===void 0?16:M0(t.type)),t):1}function mi(t,e,n,i){if(50<Va)throw Va=0,Gd=null,Error(ce(185));xo(t,n,i),(!(rt&2)||t!==Kt)&&(t===Kt&&(!(rt&2)&&(Uc|=n),Gt===4&&lr(t,tn)),Nn(t,i),n===1&&rt===0&&!(e.mode&1)&&(ea=It()+500,Nc&&Pr()))}function Nn(t,e){var n=t.callbackNode;Kv(t,e);var i=Yl(t,t===Kt?tn:0);if(i===0)n!==null&&yp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&yp(n),e===1)t.tag===0?qy(fm.bind(null,t)):H0(fm.bind(null,t)),Xy(function(){!(rt&6)&&Pr()}),n=null;else{switch(g0(i)){case 1:n=Kf;break;case 4:n=h0;break;case 16:n=jl;break;case 536870912:n=p0;break;default:n=jl}n=B_(n,L_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function L_(t,e){if(Ll=-1,Dl=0,rt&6)throw Error(ce(327));var n=t.callbackNode;if(Vs()&&t.callbackNode!==n)return null;var i=Yl(t,t===Kt?tn:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=dc(t,i);else{e=i;var r=rt;rt|=2;var s=I_();(Kt!==t||tn!==e)&&(Oi=null,ea=It()+500,Xr(t,e));do try{gS();break}catch(o){D_(t,o)}while(!0);ch(),lc.current=s,rt=r,kt!==null?e=0:(Kt=null,tn=0,e=Gt)}if(e!==0){if(e===2&&(r=md(t),r!==0&&(i=r,e=Vd(t,r))),e===1)throw n=co,Xr(t,0),lr(t,i),Nn(t,It()),n;if(e===6)lr(t,i);else{if(r=t.current.alternate,!(i&30)&&!pS(r)&&(e=dc(t,i),e===2&&(s=md(t),s!==0&&(i=s,e=Vd(t,s))),e===1))throw n=co,Xr(t,0),lr(t,i),Nn(t,It()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ce(345));case 2:zr(t,An,Oi);break;case 3:if(lr(t,i),(i&130023424)===i&&(e=wh+500-It(),10<e)){if(Yl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){En(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Ed(zr.bind(null,t,An,Oi),e);break}zr(t,An,Oi);break;case 4:if(lr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-pi(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=It()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*hS(i/1960))-i,10<i){t.timeoutHandle=Ed(zr.bind(null,t,An,Oi),i);break}zr(t,An,Oi);break;case 5:zr(t,An,Oi);break;default:throw Error(ce(329))}}}return Nn(t,It()),t.callbackNode===n?L_.bind(null,t):null}function Vd(t,e){var n=Ga;return t.current.memoizedState.isDehydrated&&(Xr(t,e).flags|=256),t=dc(t,e),t!==2&&(e=An,An=n,e!==null&&Wd(e)),t}function Wd(t){An===null?An=t:An.push.apply(An,t)}function pS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!gi(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function lr(t,e){for(e&=~Eh,e&=~Uc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-pi(e),i=1<<n;t[n]=-1,e&=~i}}function fm(t){if(rt&6)throw Error(ce(327));Vs();var e=Yl(t,0);if(!(e&1))return Nn(t,It()),null;var n=dc(t,e);if(t.tag!==0&&n===2){var i=md(t);i!==0&&(e=i,n=Vd(t,i))}if(n===1)throw n=co,Xr(t,0),lr(t,e),Nn(t,It()),n;if(n===6)throw Error(ce(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,zr(t,An,Oi),Nn(t,It()),null}function Th(t,e){var n=rt;rt|=1;try{return t(e)}finally{rt=n,rt===0&&(ea=It()+500,Nc&&Pr())}}function Zr(t){dr!==null&&dr.tag===0&&!(rt&6)&&Vs();var e=rt;rt|=1;var n=ei.transition,i=dt;try{if(ei.transition=null,dt=1,t)return t()}finally{dt=i,ei.transition=n,rt=e,!(rt&6)&&Pr()}}function bh(){kn=Fs.current,St(Fs)}function Xr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Wy(n)),kt!==null)for(n=kt.return;n!==null;){var i=n;switch(ah(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Jl();break;case 3:Js(),St(Cn),St(pn),mh();break;case 5:ph(i);break;case 4:Js();break;case 13:St(At);break;case 19:St(At);break;case 10:uh(i.type._context);break;case 22:case 23:bh()}n=n.return}if(Kt=t,kt=t=Sr(t.current,null),tn=kn=e,Gt=0,co=null,Eh=Uc=Kr=0,An=Ga=null,Gr!==null){for(e=0;e<Gr.length;e++)if(n=Gr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Gr=null}return t}function D_(t,e){do{var n=kt;try{if(ch(),Cl.current=oc,ac){for(var i=Ct.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}ac=!1}if(qr=0,qt=Ht=Ct=null,za=!1,ao=0,Mh.current=null,n===null||n.return===null){Gt=1,co=e,kt=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=tn,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=o,m=h.tag;if(!(h.mode&1)&&(m===0||m===11||m===15)){var d=h.alternate;d?(h.updateQueue=d.updateQueue,h.memoizedState=d.memoizedState,h.lanes=d.lanes):(h.updateQueue=null,h.memoizedState=null)}var p=Qp(a);if(p!==null){p.flags&=-257,em(p,a,o,s,e),p.mode&1&&Jp(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var M=new Set;M.add(l),e.updateQueue=M}else v.add(l);break e}else{if(!(e&1)){Jp(s,c,e),Ah();break e}l=Error(ce(426))}}else if(Et&&o.mode&1){var _=Qp(a);if(_!==null){!(_.flags&65536)&&(_.flags|=256),em(_,a,o,s,e),oh(Qs(l,o));break e}}s=l=Qs(l,o),Gt!==4&&(Gt=2),Ga===null?Ga=[s]:Ga.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=g_(s,l,e);jp(s,u);break e;case 1:o=l;var g=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(vr===null||!vr.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=__(s,o,e);jp(s,y);break e}}s=s.return}while(s!==null)}F_(n)}catch(T){e=T,kt===n&&n!==null&&(kt=n=n.return);continue}break}while(!0)}function I_(){var t=lc.current;return lc.current=oc,t===null?oc:t}function Ah(){(Gt===0||Gt===3||Gt===2)&&(Gt=4),Kt===null||!(Kr&268435455)&&!(Uc&268435455)||lr(Kt,tn)}function dc(t,e){var n=rt;rt|=2;var i=I_();(Kt!==t||tn!==e)&&(Oi=null,Xr(t,e));do try{mS();break}catch(r){D_(t,r)}while(!0);if(ch(),rt=n,lc.current=i,kt!==null)throw Error(ce(261));return Kt=null,tn=0,Gt}function mS(){for(;kt!==null;)U_(kt)}function gS(){for(;kt!==null&&!Hv();)U_(kt)}function U_(t){var e=k_(t.alternate,t,kn);t.memoizedProps=t.pendingProps,e===null?F_(t):kt=e,Mh.current=null}function F_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=cS(n,e),n!==null){n.flags&=32767,kt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Gt=6,kt=null;return}}else if(n=lS(n,e,kn),n!==null){kt=n;return}if(e=e.sibling,e!==null){kt=e;return}kt=e=t}while(e!==null);Gt===0&&(Gt=5)}function zr(t,e,n){var i=dt,r=ei.transition;try{ei.transition=null,dt=1,_S(t,e,n,i)}finally{ei.transition=r,dt=i}return null}function _S(t,e,n,i){do Vs();while(dr!==null);if(rt&6)throw Error(ce(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ce(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Zv(t,s),t===Kt&&(kt=Kt=null,tn=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ho||(Ho=!0,B_(jl,function(){return Vs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=ei.transition,ei.transition=null;var a=dt;dt=1;var o=rt;rt|=4,Mh.current=null,dS(t,n),P_(n,t),Oy(Sd),$l=!!yd,Sd=yd=null,t.current=n,fS(n),Gv(),rt=o,dt=a,ei.transition=s}else t.current=n;if(Ho&&(Ho=!1,dr=t,uc=r),s=t.pendingLanes,s===0&&(vr=null),Xv(n.stateNode),Nn(t,It()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(cc)throw cc=!1,t=Hd,Hd=null,t;return uc&1&&t.tag!==0&&Vs(),s=t.pendingLanes,s&1?t===Gd?Va++:(Va=0,Gd=t):Va=0,Pr(),null}function Vs(){if(dr!==null){var t=g0(uc),e=ei.transition,n=dt;try{if(ei.transition=null,dt=16>t?16:t,dr===null)var i=!1;else{if(t=dr,dr=null,uc=0,rt&6)throw Error(ce(331));var r=rt;for(rt|=4,Re=t.current;Re!==null;){var s=Re,a=s.child;if(Re.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(Re=c;Re!==null;){var h=Re;switch(h.tag){case 0:case 11:case 15:Ha(8,h,s)}var m=h.child;if(m!==null)m.return=h,Re=m;else for(;Re!==null;){h=Re;var d=h.sibling,p=h.return;if(A_(h),h===c){Re=null;break}if(d!==null){d.return=p,Re=d;break}Re=p}}}var v=s.alternate;if(v!==null){var M=v.child;if(M!==null){v.child=null;do{var _=M.sibling;M.sibling=null,M=_}while(M!==null)}}Re=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Re=a;else e:for(;Re!==null;){if(s=Re,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ha(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,Re=u;break e}Re=s.return}}var g=t.current;for(Re=g;Re!==null;){a=Re;var x=a.child;if(a.subtreeFlags&2064&&x!==null)x.return=a,Re=x;else e:for(a=g;Re!==null;){if(o=Re,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Ic(9,o)}}catch(T){Dt(o,o.return,T)}if(o===a){Re=null;break e}var y=o.sibling;if(y!==null){y.return=o.return,Re=y;break e}Re=o.return}}if(rt=r,Pr(),Ti&&typeof Ti.onPostCommitFiberRoot=="function")try{Ti.onPostCommitFiberRoot(bc,t)}catch{}i=!0}return i}finally{dt=n,ei.transition=e}}return!1}function hm(t,e,n){e=Qs(n,e),e=g_(t,e,1),t=xr(t,e,1),e=En(),t!==null&&(xo(t,1,e),Nn(t,e))}function Dt(t,e,n){if(t.tag===3)hm(t,t,n);else for(;e!==null;){if(e.tag===3){hm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(vr===null||!vr.has(i))){t=Qs(n,t),t=__(e,t,1),e=xr(e,t,1),t=En(),e!==null&&(xo(e,1,t),Nn(e,t));break}}e=e.return}}function xS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=En(),t.pingedLanes|=t.suspendedLanes&n,Kt===t&&(tn&n)===n&&(Gt===4||Gt===3&&(tn&130023424)===tn&&500>It()-wh?Xr(t,0):Eh|=n),Nn(t,e)}function O_(t,e){e===0&&(t.mode&1?(e=No,No<<=1,!(No&130023424)&&(No=4194304)):e=1);var n=En();t=qi(t,e),t!==null&&(xo(t,e,n),Nn(t,n))}function vS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),O_(t,n)}function yS(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ce(314))}i!==null&&i.delete(e),O_(t,n)}var k_;k_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Cn.current)Rn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Rn=!1,oS(t,e,n);Rn=!!(t.flags&131072)}else Rn=!1,Et&&e.flags&1048576&&G0(e,tc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Nl(t,e),t=e.pendingProps;var r=qs(e,pn.current);Gs(e,n),r=_h(null,e,i,t,r,n);var s=xh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Pn(i)?(s=!0,Ql(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,fh(e),r.updater=Dc,e.stateNode=r,r._reactInternals=e,Pd(e,i,t,n),e=Dd(null,e,i,!0,s,n)):(e.tag=0,Et&&s&&sh(e),Mn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Nl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=MS(i),t=ci(i,t),r){case 0:e=Ld(null,e,i,t,n);break e;case 1:e=im(null,e,i,t,n);break e;case 11:e=tm(null,e,i,t,n);break e;case 14:e=nm(null,e,i,ci(i.type,t),n);break e}throw Error(ce(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ci(i,r),Ld(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ci(i,r),im(t,e,i,r,n);case 3:e:{if(S_(e),t===null)throw Error(ce(387));i=e.pendingProps,s=e.memoizedState,r=s.element,$0(t,e),rc(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Qs(Error(ce(423)),e),e=rm(t,e,i,n,r);break e}else if(i!==r){r=Qs(Error(ce(424)),e),e=rm(t,e,i,n,r);break e}else for(Gn=_r(e.stateNode.containerInfo.firstChild),Vn=e,Et=!0,di=null,n=j0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ks(),i===r){e=Ki(t,e,n);break e}Mn(t,e,i,n)}e=e.child}return e;case 5:return q0(e),t===null&&Ad(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,Md(i,r)?a=null:s!==null&&Md(i,s)&&(e.flags|=32),y_(t,e),Mn(t,e,a,n),e.child;case 6:return t===null&&Ad(e),null;case 13:return M_(t,e,n);case 4:return hh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Zs(e,null,i,n):Mn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ci(i,r),tm(t,e,i,r,n);case 7:return Mn(t,e,e.pendingProps,n),e.child;case 8:return Mn(t,e,e.pendingProps.children,n),e.child;case 12:return Mn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,xt(nc,i._currentValue),i._currentValue=a,s!==null)if(gi(s.value,a)){if(s.children===r.children&&!Cn.current){e=Ki(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Wi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Rd(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(ce(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Rd(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}Mn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Gs(e,n),r=ti(r),i=i(r),e.flags|=1,Mn(t,e,i,n),e.child;case 14:return i=e.type,r=ci(i,e.pendingProps),r=ci(i.type,r),nm(t,e,i,r,n);case 15:return x_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ci(i,r),Nl(t,e),e.tag=1,Pn(i)?(t=!0,Ql(e)):t=!1,Gs(e,n),m_(e,i,r),Pd(e,i,r,n),Dd(null,e,i,!0,t,n);case 19:return E_(t,e,n);case 22:return v_(t,e,n)}throw Error(ce(156,e.tag))};function B_(t,e){return f0(t,e)}function SS(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qn(t,e,n,i){return new SS(t,e,n,i)}function Rh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function MS(t){if(typeof t=="function")return Rh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Yf)return 11;if(t===$f)return 14}return 2}function Sr(t,e){var n=t.alternate;return n===null?(n=Qn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Il(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")Rh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case bs:return jr(n.children,r,s,e);case jf:a=8,r|=8;break;case ed:return t=Qn(12,n,e,r|2),t.elementType=ed,t.lanes=s,t;case td:return t=Qn(13,n,e,r),t.elementType=td,t.lanes=s,t;case nd:return t=Qn(19,n,e,r),t.elementType=nd,t.lanes=s,t;case qg:return Fc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Yg:a=10;break e;case $g:a=9;break e;case Yf:a=11;break e;case $f:a=14;break e;case sr:a=16,i=null;break e}throw Error(ce(130,t==null?t:typeof t,""))}return e=Qn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function jr(t,e,n,i){return t=Qn(7,t,i,e),t.lanes=n,t}function Fc(t,e,n,i){return t=Qn(22,t,i,e),t.elementType=qg,t.lanes=n,t.stateNode={isHidden:!1},t}function _u(t,e,n){return t=Qn(6,t,null,e),t.lanes=n,t}function xu(t,e,n){return e=Qn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function ES(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Jc(0),this.expirationTimes=Jc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Ch(t,e,n,i,r,s,a,o,l){return t=new ES(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Qn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},fh(s),t}function wS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ts,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function z_(t){if(!t)return wr;t=t._reactInternals;e:{if(ns(t)!==t||t.tag!==1)throw Error(ce(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Pn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ce(171))}if(t.tag===1){var n=t.type;if(Pn(n))return z0(t,n,e)}return e}function H_(t,e,n,i,r,s,a,o,l){return t=Ch(n,i,!0,t,r,s,a,o,l),t.context=z_(null),n=t.current,i=En(),r=yr(n),s=Wi(i,r),s.callback=e??null,xr(n,s,r),t.current.lanes=r,xo(t,r,i),Nn(t,i),t}function Oc(t,e,n,i){var r=e.current,s=En(),a=yr(r);return n=z_(n),e.context===null?e.context=n:e.pendingContext=n,e=Wi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=xr(r,e,a),t!==null&&(mi(t,r,a,s),Rl(t,r,a)),a}function fc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function pm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Ph(t,e){pm(t,e),(t=t.alternate)&&pm(t,e)}function TS(){return null}var G_=typeof reportError=="function"?reportError:function(t){console.error(t)};function Nh(t){this._internalRoot=t}kc.prototype.render=Nh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ce(409));Oc(t,e,null,null)};kc.prototype.unmount=Nh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Zr(function(){Oc(null,t,null,null)}),e[$i]=null}};function kc(t){this._internalRoot=t}kc.prototype.unstable_scheduleHydration=function(t){if(t){var e=v0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<or.length&&e!==0&&e<or[n].priority;n++);or.splice(n,0,t),n===0&&S0(t)}};function Lh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Bc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function mm(){}function bS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=fc(a);s.call(c)}}var a=H_(e,i,t,0,null,!1,!1,"",mm);return t._reactRootContainer=a,t[$i]=a.current,to(t.nodeType===8?t.parentNode:t),Zr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=fc(l);o.call(c)}}var l=Ch(t,0,!1,null,null,!1,!1,"",mm);return t._reactRootContainer=l,t[$i]=l.current,to(t.nodeType===8?t.parentNode:t),Zr(function(){Oc(e,l,n,i)}),l}function zc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=fc(a);o.call(l)}}Oc(e,a,t,r)}else a=bS(n,e,t,r,i);return fc(a)}_0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Na(e.pendingLanes);n!==0&&(Zf(e,n|1),Nn(e,It()),!(rt&6)&&(ea=It()+500,Pr()))}break;case 13:Zr(function(){var i=qi(t,1);if(i!==null){var r=En();mi(i,t,1,r)}}),Ph(t,1)}};Jf=function(t){if(t.tag===13){var e=qi(t,134217728);if(e!==null){var n=En();mi(e,t,134217728,n)}Ph(t,134217728)}};x0=function(t){if(t.tag===13){var e=yr(t),n=qi(t,e);if(n!==null){var i=En();mi(n,t,e,i)}Ph(t,e)}};v0=function(){return dt};y0=function(t,e){var n=dt;try{return dt=t,e()}finally{dt=n}};fd=function(t,e,n){switch(e){case"input":if(sd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Pc(i);if(!r)throw Error(ce(90));Zg(i),sd(i,r)}}}break;case"textarea":Qg(t,n);break;case"select":e=n.value,e!=null&&ks(t,!!n.multiple,e,!1)}};a0=Th;o0=Zr;var AS={usingClientEntryPoint:!1,Events:[yo,Ps,Pc,r0,s0,Th]},va={findFiberByHostInstance:Hr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},RS={bundleType:va.bundleType,version:va.version,rendererPackageName:va.rendererPackageName,rendererConfig:va.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Zi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=u0(t),t===null?null:t.stateNode},findFiberByHostInstance:va.findFiberByHostInstance||TS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Go=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Go.isDisabled&&Go.supportsFiber)try{bc=Go.inject(RS),Ti=Go}catch{}}Xn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=AS;Xn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Lh(e))throw Error(ce(200));return wS(t,e,null,n)};Xn.createRoot=function(t,e){if(!Lh(t))throw Error(ce(299));var n=!1,i="",r=G_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Ch(t,1,!1,null,null,n,!1,i,r),t[$i]=e.current,to(t.nodeType===8?t.parentNode:t),new Nh(e)};Xn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ce(188)):(t=Object.keys(t).join(","),Error(ce(268,t)));return t=u0(e),t=t===null?null:t.stateNode,t};Xn.flushSync=function(t){return Zr(t)};Xn.hydrate=function(t,e,n){if(!Bc(e))throw Error(ce(200));return zc(null,t,e,!0,n)};Xn.hydrateRoot=function(t,e,n){if(!Lh(t))throw Error(ce(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=G_;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=H_(e,null,t,1,n??null,r,!1,s,a),t[$i]=e.current,to(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new kc(e)};Xn.render=function(t,e,n){if(!Bc(e))throw Error(ce(200));return zc(null,t,e,!1,n)};Xn.unmountComponentAtNode=function(t){if(!Bc(t))throw Error(ce(40));return t._reactRootContainer?(Zr(function(){zc(null,null,t,!1,function(){t._reactRootContainer=null,t[$i]=null})}),!0):!1};Xn.unstable_batchedUpdates=Th;Xn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Bc(n))throw Error(ce(200));if(t==null||t._reactInternals===void 0)throw Error(ce(38));return zc(t,e,n,!1,i)};Xn.version="18.3.1-next-f1338f8080-20240426";function V_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(V_)}catch(t){console.error(t)}}V_(),Vg.exports=Xn;var CS=Vg.exports,gm=CS;Ju.createRoot=gm.createRoot,Ju.hydrateRoot=gm.hydrateRoot;const Ul="http://127.0.0.1:8000";let Ms=null;function W_(){return typeof window<"u"&&window.location.protocol==="chrome-extension:"}async function X_(){if(!W_())return"/api";if(Ms)return Ms;try{const t=await chrome.storage.sync.get({backendUrl:Ul});Ms=String(t.backendUrl||Ul).replace(/\/+$/,"")}catch{Ms=Ul}return Ms}var Pg;W_()&&typeof chrome<"u"&&((Pg=chrome.storage)!=null&&Pg.onChanged)&&chrome.storage.onChanged.addListener((t,e)=>{e==="sync"&&t.backendUrl&&(Ms=String(t.backendUrl.newValue||Ul).replace(/\/+$/,""))});async function Dn(){return X_()}async function PS(){const t=await X_();return t==="/api"?typeof window<"u"?window.location.host:"localhost:8000":t.replace(/^https?:\/\//,"")}function Pi(){return typeof window<"u"&&new URLSearchParams(window.location.search).get("meeting_id")||"meet-session-01"}async function _m(){const t=await Dn(),e=await fetch(`${t}/tree?meeting_id=${encodeURIComponent(Pi())}`);if(!e.ok)throw new Error(`Fetch tree failed: ${e.statusText}`);return e.json()}async function j_(t="Municipal Climate Resilience Strategy"){const e=await Dn(),n=encodeURIComponent(t),i=await fetch(`${e}/tree/reset?goal_title=${n}&meeting_id=${encodeURIComponent(Pi())}`,{method:"POST"});if(!i.ok)throw new Error(`Reset tree failed: ${i.statusText}`);return i.json()}async function Y_(t,e){const n=await Dn(),i=await fetch(`${n}/slate/ingest`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({speaker:t,transcript:e,meeting_id:Pi()})});if(!i.ok)throw new Error(`Ingest speech failed: ${i.statusText}`);return i.json()}async function xm(){const t=await Dn(),e=await fetch(`${t}/slate?meeting_id=${encodeURIComponent(Pi())}`);if(!e.ok)throw new Error(`Fetch speech slates failed: ${e.statusText}`);return e.json()}async function $_(t,e){const n=await Dn(),i=await fetch(`${n}/card/transform`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,action:e})});if(!i.ok)throw new Error(`Card transform failed: ${i.statusText}`);return i.json()}async function NS(t,e,n,i="proposal"){const r=await Dn(),s=await fetch(`${r}/proposal/analyze`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({parent_id:t,candidate_text:e,author:n,node_type:i,meeting_id:Pi()})});if(!s.ok)throw new Error(`Analyze proposal failed: ${s.statusText}`);return s.json()}async function vm(){const t=await Dn(),e=await fetch(`${t}/proposals?meeting_id=${encodeURIComponent(Pi())}`);if(!e.ok)throw new Error(`Fetch pending proposals failed: ${e.statusText}`);return e.json()}async function LS(t,e){const n=await Dn(),i=await fetch(`${n}/proposal/vote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({proposal_id:t,voter:e,meeting_id:Pi()})});if(!i.ok)throw new Error(`Vote proposal failed: ${i.statusText}`);return i.json()}async function DS(){const t=await Dn();return(await fetch(`${t}/config/engine`)).json()}async function IS(t,e,n){const i=await Dn();return(await fetch(`${i}/config/engine`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({active_provider:t,gemini_api_key:e,lm_studio_url:n})})).json()}async function US(t=!1){const e=await Dn(),n=await fetch(`${e}/session/extract-ideas?meeting_id=${encodeURIComponent(Pi())}&force_all=${t}`,{method:"POST"});if(!n.ok)throw new Error(`Extract batch ideas failed: ${n.statusText}`);return n.json()}async function FS(t){const e=await Dn(),n=await fetch(`${e}/tree/agenda`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({agenda:t,meeting_id:Pi(),author:"Chair"})});return n.ok?n.json():j_(t)}async function ym(){const t=await Dn(),e=await fetch(`${t}/session/seed-demo?meeting_id=${encodeURIComponent(Pi())}`,{method:"POST"});if(!e.ok)throw new Error(`Seed demo failed: ${e.statusText}`);return e.json()}function OS(t){const[e,n]=le.useState(!1),[i,r]=le.useState(""),[s,a]=le.useState(0),o=le.useRef(null),l=le.useRef(null),c=le.useCallback(async()=>{if(o.current&&(o.current.readyState===WebSocket.OPEN||o.current.readyState===WebSocket.CONNECTING))return;const d=window.location.protocol==="chrome-extension:"?"ws:":window.location.protocol==="https:"?"wss:":"ws:",p=await PS(),M=new URLSearchParams(window.location.search).get("meeting_id")||"meet-session-01",_=`${d}//${p}/ws?meeting_id=${encodeURIComponent(M)}`;try{const u=new WebSocket(_);o.current=u,u.onopen=()=>{console.log("[WebSocket] Connected to BetterGoogleMeets backend"),n(!0)},u.onmessage=g=>{try{const x=JSON.parse(g.data);x.state_hash&&r(x.state_hash),x.revision&&a(x.revision),t&&t(x)}catch(x){console.error("[WebSocket] Error parsing message",x)}},u.onclose=()=>{console.warn("[WebSocket] Disconnected. Retrying in 2.5s..."),n(!1),o.current=null,l.current=setTimeout(c,2500)},u.onerror=g=>{console.error("[WebSocket] Connection error:",g),u.close()}}catch(u){console.error("[WebSocket] Instantiation error:",u),l.current=setTimeout(c,3e3)}},[t]);le.useEffect(()=>(c(),()=>{l.current&&clearTimeout(l.current),o.current&&o.current.close()}),[c]);const h=le.useCallback(()=>{o.current&&o.current.readyState===WebSocket.OPEN&&o.current.send(JSON.stringify({action:"PING"}))},[]);return{isConnected:e,lastStateHash:i,lastRevision:s,sendPing:h}}function kS(){const[t,e]=le.useState(null),[n,i]=le.useState({}),[r,s]=le.useState([]),[a,o]=le.useState(!0),[l,c]=le.useState("node_0000"),h=le.useCallback(x=>{if(x.event==="INITIAL_SNAPSHOT"&&x.data)e(x.data),x.data.slates&&Array.isArray(x.data.slates)&&s(x.data.slates),o(!1);else if(x.event==="SPEECH_CARD_INGESTED"&&x.card){const y=x.card;s(T=>[y,...T.filter(w=>w.id!==y.id)])}else if(x.event==="SPEECH_CARD_UPDATED"&&x.card){const y=x.card;s(T=>T.map(w=>w.id===y.id?{...w,...y}:w))}else if(x.event==="BATCH_IDEAS_EXTRACTED"&&x.cards){const y=x.cards;s(T=>{const w=new Set(T.map(S=>S.id));return[...y.filter(S=>!w.has(S.id)),...T]})}else if(x.event==="TREE_MUTATED"&&x.node)e(y=>{if(!y)return y;const T={...y.nodes,[x.node.id]:{...x.node,created_at:x.timestamp||Date.now(),children_ids:[],metadata:{},content_hash:""}},w=x.node.parent_id;if(w&&T[w]){const f=T[w];f.children_ids.includes(x.node.id)||(f.children_ids=[...f.children_ids,x.node.id])}return{...y,revision:x.revision||y.revision+1,state_hash:x.state_hash||y.state_hash,nodes:T}}),i(y=>{const T={...y};for(const[w,f]of Object.entries(T))f.text===x.node.text&&f.parent_id===x.node.parent_id&&delete T[w];return T});else if(x.event==="GHOST_SPROUT_STAGED"&&x.data){const y=x.data;i(T=>({...T,[y.proposal_id]:{...y,votes:y.votes??[y.author],requiredVotes:y.required_votes??3,isMerging:!1}}))}else if(x.event==="PROPOSAL_VOTED"){const{proposal_id:y,voter:T,merged:w}=x;i(f=>{const S=f[y];if(!S)return f;if(w){const C={...f};return delete C[y],C}const P=S.votes.includes(T)?S.votes:[...S.votes,T];return{...f,[y]:{...S,votes:P}}})}else x.event==="TREE_RESET"&&x.data&&(e(x.data),i({}),s([]))},[]),{isConnected:m,lastStateHash:d,lastRevision:p}=OS(h),v=le.useCallback(async()=>{try{o(!0);const[x,y,T]=await Promise.all([_m().catch(w=>(console.error(w),null)),xm().catch(w=>(console.error(w),{cards:[]})),vm().catch(w=>(console.error(w),{proposals:[]}))]);if(x&&Object.keys(x.nodes||{}).length<=1)try{await ym();const[w,f,S]=await Promise.all([_m(),xm(),vm()]);if(w&&e(w),f!=null&&f.cards&&s(f.cards),S!=null&&S.proposals){const P={};for(const C of S.proposals)P[C.proposal_id]={...C,votes:C.votes,requiredVotes:C.required_votes,isMerging:!1};i(P)}return}catch(w){console.warn("Auto-seed fallback error:",w)}if(x&&e(x),y&&y.cards&&s(y.cards),T&&T.proposals){const w={};for(const f of T.proposals)w[f.proposal_id]={...f,votes:f.votes,requiredVotes:f.required_votes,isMerging:!1};i(w)}}catch(x){console.error("Failed to load initial tree, slates & proposals:",x)}finally{o(!1)}},[]);le.useEffect(()=>{v()},[v]);const M=le.useCallback(async(x,y,T,w="proposal")=>{try{const f=await NS(x,y,T,w),S={...f,votes:f.votes,requiredVotes:f.required_votes,isMerging:!1};return i(P=>({...P,[f.proposal_id]:S})),S}catch(f){throw console.error("Failed to stage proposal:",f),f}},[]),_=le.useCallback(async(x,y)=>{const T=n[x];if(!(!T||T.isMerging||T.votes.includes(y))){i(w=>{const f=w[x];return f?{...w,[x]:{...f,isMerging:!0}}:w});try{const w=await LS(x,y);i(f=>{const S=f[x];if(!S)return f;if(w.merged){const C={...f};return delete C[x],C}const P=S.votes.includes(y)?S.votes:[...S.votes,y];return{...f,[x]:{...S,votes:P,isMerging:!1}}})}catch(w){console.error("Failed to cast vote:",w),i(f=>{const S=f[x];return S?{...f,[x]:{...S,isMerging:!1}}:f})}}},[n]),u=le.useCallback(async x=>{const y=await j_(x);e(y),i({}),c(y.root_id||"node_0000")},[]),g=le.useCallback(async()=>{o(!0);try{await ym(),await v()}catch(x){console.error("Seed scenario error:",x)}finally{o(!1)}},[v]);return{tree:t,ghostSprouts:Object.values(n),slateCards:r,setSlateCards:s,selectedParentId:l,setSelectedParentId:c,stageProposal:M,castVote:_,resetMeetingTree:u,seedScenario:g,refreshTree:v,isConnected:m,lastStateHash:(t==null?void 0:t.state_hash)||d,lastRevision:(t==null?void 0:t.revision)||p,isLoading:a}}/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BS=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),q_=(...t)=>t.filter((e,n,i)=>!!e&&i.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var zS={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HS=le.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:r="",children:s,iconNode:a,...o},l)=>le.createElement("svg",{ref:l,...zS,width:e,height:e,stroke:t,strokeWidth:i?Number(n)*24/Number(e):n,className:q_("lucide",r),...o},[...a.map(([c,h])=>le.createElement(c,h)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=(t,e)=>{const n=le.forwardRef(({className:i,...r},s)=>le.createElement(HS,{ref:s,iconNode:e,className:q_(`lucide-${BS(t)}`,i),...r}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sm=gt("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=gt("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GS=gt("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VS=gt("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WS=gt("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XS=gt("Columns2",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M12 3v18",key:"108xh3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K_=gt("CornerDownRight",[["polyline",{points:"15 10 20 15 15 20",key:"1q7qjw"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12",key:"z08zvw"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jS=gt("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YS=gt("GitBranch",[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $S=gt("Glasses",[["circle",{cx:"6",cy:"15",r:"4",key:"vux9w4"}],["circle",{cx:"18",cy:"15",r:"4",key:"18o8ve"}],["path",{d:"M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2",key:"1ag4bs"}],["path",{d:"M2.5 13 5 7c.7-1.3 1.4-2 3-2",key:"1hm1gs"}],["path",{d:"M21.5 13 19 7c-.7-1.3-1.5-2-3-2",key:"1r31ai"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qS=gt("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KS=gt("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZS=gt("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dh=gt("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z_=gt("MicOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2",key:"80xlxr"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5",key:"p2k8kg"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33",key:"1gzdoj"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12",key:"r2i35w"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J_=gt("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q_=gt("Minimize2",[["polyline",{points:"4 14 10 14 10 20",key:"11kfnr"}],["polyline",{points:"20 10 14 10 14 4",key:"rlmsce"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3",key:"o5lafz"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JS=gt("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QS=gt("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ex=gt("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eM=gt("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tM=gt("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nM=gt("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iM=gt("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rM=gt("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ih=gt("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sM=gt("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]),aM={goal:"agenda",topic:"topic",claim:"claim",question:"question",evidence:"evidence",action:"action",proposal:"proposal"},oM=({currentSpeaker:t,setCurrentSpeaker:e,targetParentId:n,cards:i,setCards:r,onStageCard:s})=>{const[a,o]=le.useState(""),[l,c]=le.useState(!1),[h,m]=le.useState(!1),[d,p]=le.useState(300),[v,M]=le.useState(!1),_=Hg.useRef(null),u=f=>{const S=Math.floor(f/60),P=f%60;return`${S}:${P<10?"0":""}${P}`},g=async(f=!1)=>{if(!v){M(!0);try{const S=await US(f);S&&S.ideas&&S.ideas.length>0&&r(P=>{const C=new Set(P.map(F=>F.id));return[...S.ideas.filter(F=>!C.has(F.id)),...P]}),p(300)}catch(S){console.error("Batch idea extraction error:",S)}finally{M(!1)}}};le.useEffect(()=>{const f=setInterval(()=>{p(S=>S<=1?(g(!1),300):S-1)},1e3);return()=>clearInterval(f)},[]);const x=()=>{const f=window.SpeechRecognition||window.webkitSpeechRecognition;if(!f){alert("Web Speech API is not supported in this browser. Type instead, or use Google Meet captions.");return}if(h){_.current&&_.current.stop(),m(!1);return}try{const S=new f;S.continuous=!1,S.interimResults=!0,S.lang="en-US",S.onstart=()=>{m(!0)},S.onresult=P=>{const C=Array.from(P.results).map(L=>L[0].transcript).join("");o(C)},S.onerror=P=>{console.warn("Speech recognition error:",P),m(!1)},S.onend=()=>{m(!1)},_.current=S,S.start()}catch(S){console.error("Failed to start speech recognition:",S),m(!1)}},y=async f=>{const S=a;if(S.trim()){c(!0);try{const P=await Y_(t,S);if(P.status==="ignored_noise"){console.log("[SidePanel] Noise filtered by epistemic layer:",P.reason),f||o("");return}if(P.card){const C={id:P.card_id||`card_${Date.now()}`,speaker:P.speaker||t,rawText:S,distilledText:P.card.distilled_text,intent:P.card.intent,extractedQuery:P.extracted_query||P.card.extracted_query||"",createdAt:Date.now(),isStaged:!1};r(L=>[C,...L.filter(F=>F.id!==C.id)]),f||o("")}}catch(P){console.error("Failed to ingest speech card via LLM:",P)}finally{c(!1)}}},T=async(f,S)=>{const P=i.find(C=>C.id===f);if(P)try{const C=await $_(P.distilledText,S);r(L=>L.map(F=>F.id===f?{...F,distilledText:C.transformed}:F))}catch(C){console.error(`Failed Texterial ${S}:`,C)}},w=async f=>{try{await s(f,n),r(S=>S.map(P=>P.id===f.id?{...P,isStaged:!0}:P))}catch(S){console.error("Stage card failed:",S)}};return R.jsxs("div",{className:"flex flex-col h-full bg-ink-900 border-r border-ink-700 p-4 select-none",children:[R.jsxs("div",{className:"flex items-center justify-between pb-2 border-b border-ink-700",children:[R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsx("h2",{className:"text-xs font-semibold text-[#e8e6e1]",children:"Slate"}),R.jsx("button",{onClick:()=>g(!1),disabled:v,title:"Check now for ideas missed by real-time extraction (auto-runs every 5m)",className:"px-2 py-0.5 rounded text-[10px] font-mono text-ash-400 hover:text-ash-300 border border-ink-600 transition disabled:opacity-50",children:v?"Extracting…":`Extract now (${u(d)})`})]}),R.jsx("select",{value:t,onChange:f=>e(f.target.value),title:"Acting as (used for both new cards and votes)",className:"bg-ink-800 text-xs text-[#e8e6e1] border border-ink-600 rounded px-2 py-0.5 focus:outline-none focus:border-ash-400 transition max-w-[140px] truncate",children:Array.from(new Set([t,"You","Alice","Bob","Charlie",...i.map(f=>f.speaker).filter(f=>f&&f!=="Participant")])).map(f=>R.jsx("option",{value:f,children:f},f))})]}),R.jsx("div",{className:"my-2.5",children:R.jsxs("div",{className:"relative",children:[R.jsx("textarea",{value:a,onChange:f=>o(f.target.value),onKeyDown:f=>{f.key==="Enter"&&!f.shiftKey&&(f.preventDefault(),y())},placeholder:`Simulate a caption as ${t}…`,rows:2,className:"w-full bg-ink-950 border border-ink-600 rounded p-2.5 pr-18 text-xs text-[#e8e6e1] placeholder-ash-400 focus:outline-none focus:border-ash-400 resize-none transition"}),R.jsxs("div",{className:"absolute right-2 bottom-2.5 flex items-center gap-1.5",children:[R.jsx("button",{onClick:x,title:h?"Listening…":"Dictate with your microphone",className:`p-1.5 rounded border transition ${h?"border-conflict text-conflict":"border-ink-600 text-ash-400 hover:text-ash-300"}`,children:h?R.jsx(J_,{className:"w-3.5 h-3.5"}):R.jsx(Z_,{className:"w-3.5 h-3.5"})}),R.jsx("button",{onClick:()=>y(),disabled:l||!a.trim(),className:"bg-[#e8e6e1] disabled:opacity-30 text-ink-950 p-1.5 rounded transition",children:R.jsx(ex,{className:"w-3.5 h-3.5"})})]})]})}),R.jsx("div",{className:"flex-1 overflow-y-auto space-y-2 pr-1",children:i.length===0?R.jsx("div",{className:"flex items-center justify-center h-32 text-center p-4 rounded border border-dashed border-ink-600 text-ash-400",children:R.jsx("p",{className:"text-xs",children:"No ideas yet"})}):i.map(f=>R.jsxs("div",{className:"rounded border border-ink-600 bg-ink-800 p-3 flex flex-col gap-2 transition hover:border-ash-400",children:[R.jsxs("div",{className:"flex items-center justify-between",children:[R.jsxs("div",{className:"flex items-center gap-2 text-[11px] text-ash-400",children:[R.jsx("span",{className:"font-mono",children:aM[f.intent]}),R.jsx("span",{className:"text-[#e8e6e1] font-medium",children:f.speaker})]}),f.isStaged&&R.jsx("span",{className:"text-[10px] text-ash-400",children:"staged"})]}),R.jsx("p",{className:"text-xs text-[#e8e6e1] leading-relaxed",children:f.distilledText}),R.jsxs("div",{className:"flex items-center justify-between pt-1 border-t border-ink-700 text-[11px]",children:[R.jsxs("div",{className:"flex items-center gap-1",children:[R.jsxs("button",{onClick:()=>T(f.id,"knead"),title:"Condense",className:"flex items-center gap-1 px-1.5 py-0.5 text-ash-400 hover:text-[#e8e6e1] rounded transition",children:[R.jsx(Q_,{className:"w-3 h-3"}),"Condense"]}),R.jsxs("button",{onClick:()=>T(f.id,"stretch"),title:"Expand",className:"flex items-center gap-1 px-1.5 py-0.5 text-ash-400 hover:text-[#e8e6e1] rounded transition",children:[R.jsx(Dh,{className:"w-3 h-3"}),"Expand"]})]}),R.jsxs("button",{onClick:()=>w(f),disabled:f.isStaged,className:`flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-medium transition ${f.isStaged?"text-ash-400 border-ink-600 cursor-not-allowed":"text-[#e8e6e1] border-ash-400 hover:bg-ink-700"}`,children:[R.jsx(K_,{className:"w-3 h-3"}),f.isStaged?"Staged":"Stage"]})]})]},f.id))}),R.jsxs("div",{className:"pt-2 text-[11px] text-ash-400 flex items-center justify-between border-t border-ink-700",children:[R.jsx("span",{children:"Target"}),R.jsx("span",{className:"font-mono text-[#e8e6e1] bg-ink-950 px-2 py-0.5 rounded border border-ink-600",children:n})]})]})},Wr=240,Wa=92,Xd=32,jd=56;function lM(t){const e=t.root_id||Object.keys(t.nodes).find(s=>!t.nodes[s].parent_id)||"";if(!e||!t.nodes[e])return[];const n=[];let i=0;function r(s,a){var p;const o=t.nodes[s];if(!o)return i;const l=((p=o.children_ids)==null?void 0:p.filter(v=>t.nodes[v]))??[];if(l.length===0){const v=i++;return n.push({node:o,x:v*(Wr+Xd)+Wr/2,y:a*(Wa+jd),depth:a,lane:v}),v}const c=l.map(v=>r(v,a+1)),h=Math.min(...c),m=Math.max(...c),d=(h+m)/2*(Wr+Xd)+Wr/2;return n.push({node:o,x:d,y:a*(Wa+jd),depth:a,lane:Math.round((h+m)/2)}),Math.round((h+m)/2)}return r(e,0),n}const cM={goal:"agenda",topic:"topic",claim:"claim",question:"question",evidence:"evidence",action:"action",proposal:"proposal"},uM=({tree:t,ghostSprouts:e,selectedParentId:n,onSelectParent:i,onVote:r,onResetMeeting:s,onOpenAgenda:a,currentVoter:o})=>{const l=le.useRef(null),c=le.useMemo(()=>t?lM(t):[],[t]),h=le.useMemo(()=>c.length===0?600:Math.max(...c.map(M=>M.x+Wr/2))+Xd,[c]),m=le.useMemo(()=>c.length===0?400:Math.max(...c.map(M=>M.y+Wa))+jd,[c]),d=le.useMemo(()=>{const M={};return c.forEach(_=>M[_.node.id]=_),M},[c]),p=le.useMemo(()=>{const M=[];return c.forEach(_=>{var x;const{node:u}=_;(((x=u.children_ids)==null?void 0:x.filter(y=>d[y]))??[]).forEach(y=>{const T=d[y];if(!T)return;const w=_.x,f=_.y+Wa,S=T.x,P=T.y,C=(f+P)/2,L=`M${w},${f} C${w},${C} ${S},${C} ${S},${P}`;M.push({d:L,key:`${u.id}->${y}`})})}),M},[c,d]);if(!t)return R.jsx("div",{className:"flex-1 flex items-center justify-center bg-ink-950 text-ash-400 text-sm",children:"Loading…"});const v=t.nodes[t.root_id||"node_0000"];return R.jsxs("div",{className:"flex-1 flex flex-col h-full bg-ink-950 overflow-hidden",children:[R.jsxs("div",{className:"flex items-center justify-between px-4 md:px-6 py-3 border-b border-ink-700 flex-shrink-0",children:[R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsxs("h1",{className:"text-sm font-semibold text-[#e8e6e1] flex items-center gap-1.5",children:[R.jsx(YS,{className:"w-4 h-4 text-ash-300"}),"Arbor"]}),R.jsxs("span",{className:"text-[10px] font-mono px-1.5 py-0.5 rounded bg-ink-800 text-ash-400 border border-ink-600",children:["rev ",t.revision]}),R.jsxs("span",{className:"text-[10px] font-mono px-1.5 py-0.5 rounded bg-ink-800 text-ash-400 border border-ink-600",children:[Object.keys(t.nodes).length," nodes"]})]}),R.jsxs("div",{className:"flex items-center gap-2",children:[a&&R.jsx("button",{onClick:a,className:"px-2.5 py-1 text-xs text-ash-300 hover:text-[#e8e6e1] border border-ink-600 hover:border-ash-400 rounded transition",children:"Agenda"}),R.jsxs("button",{onClick:()=>{const M=prompt("New agenda:","Discussion");M&&s(M)},className:"flex items-center gap-1 px-2.5 py-1 text-xs text-ash-300 hover:text-[#e8e6e1] border border-ink-600 hover:border-ash-400 rounded transition",children:[R.jsx(QS,{className:"w-3 h-3"}),"Reset"]})]})]}),v&&R.jsxs("div",{className:"mx-4 mt-3 mb-2 px-3 py-2.5 rounded border border-ink-600 flex items-center justify-between gap-3 flex-shrink-0",children:[R.jsxs("div",{className:"min-w-0",children:[R.jsx("span",{className:"text-[10px] text-ash-400 block",children:"Agenda"}),R.jsx("p",{className:"text-xs font-medium text-[#e8e6e1] line-clamp-1",children:v.text})]}),a&&R.jsx("button",{onClick:a,className:"text-[11px] text-ash-400 hover:text-[#e8e6e1] flex-shrink-0 transition",children:"Change"})]}),R.jsx("div",{ref:l,className:"flex-1 overflow-auto p-4",children:R.jsxs("div",{style:{position:"relative",width:h,height:m+(e.length>0?260:0)},children:[R.jsx("svg",{style:{position:"absolute",top:0,left:0,width:h,height:m,pointerEvents:"none",overflow:"visible"},children:p.map(M=>R.jsx("path",{d:M.d,fill:"none",stroke:"#2a2c30",strokeWidth:"1.5"},M.key))}),c.map(M=>{const{node:_}=M,u=n===_.id,g=_.id===t.root_id;return R.jsxs("div",{onClick:()=>i(_.id),style:{position:"absolute",left:M.x-Wr/2,top:M.y,width:Wr,height:Wa},className:`rounded border bg-ink-800 transition cursor-pointer select-none ${u?"border-[#e8e6e1]":"border-ink-600 hover:border-ash-400"} ${g?"border-l-4":""}`,children:[R.jsxs("div",{className:"p-2.5 h-full flex flex-col justify-between",children:[R.jsxs("div",{className:"flex items-center justify-between mb-1 gap-1",children:[R.jsx("span",{className:"text-[9px] font-mono text-ash-400 truncate",children:_.id}),R.jsx("span",{className:"text-[9px] font-mono text-ash-400 flex-shrink-0",children:cM[_.node_type]})]}),R.jsx("p",{className:"text-xs font-medium text-[#e8e6e1] leading-snug line-clamp-2 flex-1 my-1",children:_.text}),R.jsxs("div",{className:"flex items-center justify-between text-[9px] text-ash-400 pt-1 border-t border-ink-700",children:[R.jsx("span",{className:"truncate max-w-[120px]",children:_.author}),R.jsx("span",{className:"font-mono text-[8px]",children:_.content_hash?`#${_.content_hash.substring(0,6)}`:""})]})]}),u&&R.jsx("div",{className:"absolute -top-2 -right-2 bg-[#e8e6e1] text-ink-950 text-[9px] font-semibold px-1.5 py-0.5 rounded shadow z-20",children:"target"})]},_.id)}),e.length>0&&R.jsxs("div",{style:{position:"absolute",top:m+16,left:0,width:Math.max(h,480)},children:[R.jsxs("h2",{className:"text-xs font-semibold text-[#e8e6e1] mb-3",children:["Open proposals (",e.length,")"]}),R.jsx("div",{className:"space-y-3",children:e.map(M=>{const _=M.votes.length,u=M.votes.includes(o);return R.jsxs("div",{className:`p-4 rounded border-2 border-dashed bg-ink-800 transition ${M.has_conflict?"border-conflict":"border-pending"}`,children:[R.jsxs("div",{className:"flex items-center justify-between gap-2 mb-2",children:[R.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-ash-300",children:[R.jsx("span",{className:"font-mono text-[10px] text-ash-400",children:M.proposal_id}),R.jsxs("span",{children:[M.author," → ",M.parent_id]})]}),R.jsx("span",{className:`text-[10px] px-1.5 py-0.5 rounded font-medium ${M.has_conflict?"text-conflict":"text-ash-400"}`,children:M.has_conflict?"conflict":`${(M.alignment_score*100).toFixed(0)}% aligned`})]}),R.jsx("p",{className:"text-sm font-medium text-[#e8e6e1] mb-2",children:M.text}),R.jsxs("div",{className:"bg-ink-900 border border-ink-700 rounded p-2.5 text-xs mb-3",children:[R.jsx("p",{className:"text-ash-300 leading-relaxed",children:M.trade_off_analysis}),M.has_conflict&&R.jsx("p",{className:"text-conflict font-medium pt-1.5",children:M.conflict_reason})]}),M.compromise_synthesis&&R.jsxs("div",{className:"mb-3 bg-ink-900 border border-ink-700 rounded p-2.5 text-xs",children:[R.jsx("span",{className:"font-medium text-[#e8e6e1] mr-1",children:"Suggested compromise:"}),R.jsx("span",{className:"text-ash-300",children:M.compromise_synthesis})]}),R.jsxs("div",{className:"flex items-center justify-between pt-2.5 border-t border-ink-700 text-xs",children:[R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsx("div",{className:"flex items-center gap-1",children:Array.from({length:M.requiredVotes}).map((g,x)=>R.jsx("div",{className:`w-3 h-3 rounded-full border ${x<_?"bg-pending border-pending":"border-ink-600"}`},x))}),R.jsxs("span",{className:"font-mono text-ash-300",children:[_,"/",M.requiredVotes]}),M.votes.length>0&&R.jsxs("span",{className:"text-[10px] text-ash-400",children:["(",M.votes.join(", "),")"]})]}),R.jsx("button",{onClick:()=>r(M.proposal_id,o),disabled:u||M.isMerging,className:`px-3 py-1.5 rounded text-xs font-medium border transition ${u?"text-ash-400 border-ink-600 cursor-not-allowed":"text-[#e8e6e1] border-ash-400 hover:bg-ink-700"}`,children:M.isMerging?"Merging…":u?"Voted":`Vote as ${o}`})]})]},M.proposal_id)})})]})]})})]})},dM=({stateHash:t,revision:e,isConnected:n,tree:i,onOpenSettings:r})=>{const s=()=>{if(!i)return;const a=JSON.stringify(i,null,2),o=new Blob([a],{type:"application/json"}),l=URL.createObjectURL(o),c=document.createElement("a");c.href=l,c.download=`meeting-drr-rev${e}-${t.substring(0,8)}.json`,c.click(),URL.revokeObjectURL(l)};return R.jsxs("footer",{className:"h-9 bg-ink-950 border-t border-ink-700 px-4 flex items-center justify-between text-xs select-none z-20",children:[R.jsxs("div",{className:"flex items-center gap-3",children:[R.jsxs("span",{className:`flex items-center gap-1.5 ${n?"text-merged":"text-conflict"}`,children:[R.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${n?"bg-merged":"bg-conflict"}`}),n?"Connected":"Disconnected"]}),R.jsx("span",{className:"text-ink-600",children:"|"}),R.jsxs("span",{className:"text-ash-400 font-mono text-[11px]",children:["rev ",e]})]}),R.jsx("span",{className:"font-mono text-ash-400 text-[11px]",children:t?`#${t}`:"…"}),R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsxs("button",{onClick:s,disabled:!i,className:"flex items-center gap-1 px-2.5 py-1 rounded border border-ink-600 text-ash-300 hover:text-[#e8e6e1] hover:border-ash-400 transition text-xs disabled:opacity-40",title:"Export the tree as JSON",children:[R.jsx(jS,{className:"w-3 h-3"}),"Export"]}),R.jsx("button",{onClick:r,className:"p-1 rounded text-ash-400 hover:text-[#e8e6e1] hover:bg-ink-800 transition",title:"Settings",children:R.jsx(eM,{className:"w-4 h-4"})})]})]})},Vo="http://127.0.0.1:8000",Wo=typeof window<"u"&&window.location.protocol==="chrome-extension:",fM=({isOpen:t,onClose:e})=>{const[n,i]=le.useState(null),[r,s]=le.useState("auto"),[a,o]=le.useState(""),[l,c]=le.useState("http://localhost:1234/v1"),[h,m]=le.useState(Vo),[d,p]=le.useState(!1),[v,M]=le.useState(!1),[_,u]=le.useState(!1),g=async()=>{try{const w=await DS();i(w),s(w.active_provider),c(w.lm_studio.url)}catch(w){console.error("Failed to fetch engine status:",w)}};if(le.useEffect(()=>{t&&(g(),Dn().then(w=>m(w==="/api"?Vo:w)))},[t]),!t)return null;const x=async()=>{p(!0);try{const w=await IS(r,a||void 0,l||void 0);i(w),M(!0),setTimeout(()=>M(!1),2e3)}catch(w){console.error("Failed to update config:",w)}finally{p(!1)}},y=async()=>{var f;const w=h.trim().replace(/\/+$/,"")||Vo;m(w);try{Wo&&typeof chrome<"u"&&((f=chrome.storage)!=null&&f.sync)&&await chrome.storage.sync.set({backendUrl:w}),u(!0),setTimeout(()=>u(!1),2e3),window.location.reload()}catch(S){console.error("Failed to save backend URL:",S)}},T=[{id:"auto",label:"Auto",sub:"Local, then cloud"},{id:"lm_studio",label:"LM Studio",sub:"Local"},{id:"gemini_flash",label:"Gemini",sub:"Cloud"}];return R.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 select-none",children:R.jsxs("div",{className:"bg-ink-900 border border-ink-600 rounded-lg w-full max-w-lg shadow-xl overflow-hidden",children:[R.jsxs("div",{className:"flex items-center justify-between p-4 border-b border-ink-700",children:[R.jsx("h3",{className:"text-sm font-semibold text-[#e8e6e1]",children:"Settings"}),R.jsx("button",{onClick:e,className:"text-ash-400 hover:text-[#e8e6e1] p-1 rounded hover:bg-ink-800 transition",children:R.jsx(Ih,{className:"w-4 h-4"})})]}),R.jsxs("div",{className:"p-5 space-y-4 text-xs",children:[R.jsxs("div",{children:[R.jsx("label",{className:"block text-ash-300 font-medium mb-2",children:"LLM engine"}),R.jsx("div",{className:"flex border border-ink-600 rounded overflow-hidden",children:T.map((w,f)=>R.jsxs("button",{type:"button",onClick:()=>s(w.id),className:`flex-1 p-2 flex flex-col items-center gap-0.5 transition ${f>0?"border-l border-ink-600":""} ${r===w.id?"bg-ink-700 text-[#e8e6e1]":"text-ash-400 hover:text-ash-300"}`,children:[R.jsx("span",{className:"font-medium text-[11px]",children:w.label}),R.jsx("span",{className:"text-[9px] text-ash-400",children:w.sub})]},w.id))})]}),R.jsxs("div",{className:"border border-ink-600 rounded p-3 space-y-2",children:[R.jsx("div",{className:"font-medium text-[#e8e6e1]",children:"Backend server"}),R.jsx("p",{className:"text-[10px] text-ash-400 leading-relaxed",children:"Point at a shared machine's LAN address (e.g. http://192.168.1.42:8000) so everyone in the meeting talks to the same deliberation tree. Reloads the panel on save."}),R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsx("input",{type:"text",value:h,onChange:w=>m(w.target.value),placeholder:Vo,disabled:!Wo,className:"flex-1 bg-ink-950 border border-ink-600 rounded p-2 text-[#e8e6e1] font-mono text-[11px] focus:outline-none focus:border-ash-400 disabled:opacity-50"}),R.jsxs("button",{onClick:y,disabled:!Wo,className:"flex items-center gap-1 px-2.5 py-2 rounded border border-ash-400 disabled:opacity-40 text-[#e8e6e1] text-[11px] font-medium transition shrink-0 hover:bg-ink-700",children:[_?R.jsx(uo,{className:"w-3 h-3"}):null,_?"Saved":"Save"]})]}),!Wo&&R.jsx("p",{className:"text-[10px] text-pending",children:"Only configurable when running as the installed extension."})]}),R.jsxs("div",{className:"border border-ink-600 rounded p-3 space-y-2",children:[R.jsxs("div",{className:"flex items-center justify-between",children:[R.jsx("div",{className:"font-medium text-[#e8e6e1]",children:"LM Studio"}),R.jsx("span",{className:`text-[10px] font-mono ${n!=null&&n.lm_studio.online?"text-merged":"text-conflict"}`,children:n!=null&&n.lm_studio.online?"online":"offline"})]}),R.jsxs("div",{children:[R.jsx("label",{className:"block text-[11px] text-ash-400 mb-1",children:"URL"}),R.jsx("input",{type:"text",value:l,onChange:w=>c(w.target.value),placeholder:"http://localhost:1234/v1",className:"w-full bg-ink-950 border border-ink-600 rounded p-2 text-[#e8e6e1] font-mono text-[11px] focus:outline-none focus:border-ash-400"})]})]}),R.jsxs("div",{className:"border border-ink-600 rounded p-3 space-y-2",children:[R.jsxs("div",{className:"flex items-center justify-between",children:[R.jsx("div",{className:"font-medium text-[#e8e6e1]",children:"Gemini API (optional cloud fallback)"}),R.jsx("span",{className:"text-[10px] font-mono text-ash-400",children:n!=null&&n.gemini_flash.configured?"configured":"unset"})]}),R.jsxs("div",{children:[R.jsx("label",{className:"block text-[11px] text-ash-400 mb-1",children:"API key"}),R.jsx("input",{type:"password",value:a,onChange:w=>o(w.target.value),placeholder:"AIzaSy...",className:"w-full bg-ink-950 border border-ink-600 rounded p-2 text-[#e8e6e1] font-mono text-[11px] focus:outline-none focus:border-ash-400"})]})]})]}),R.jsxs("div",{className:"flex items-center justify-between p-3.5 border-t border-ink-700",children:[R.jsxs("button",{onClick:g,className:"flex items-center gap-1 text-xs text-ash-400 hover:text-[#e8e6e1] transition",children:[R.jsx(JS,{className:"w-3 h-3"}),"Refresh"]}),R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsx("button",{onClick:e,className:"px-3 py-1.5 text-xs font-medium text-ash-400 hover:text-[#e8e6e1] transition",children:"Cancel"}),R.jsxs("button",{onClick:x,disabled:d,className:"flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#e8e6e1] text-ink-950 font-medium text-xs transition disabled:opacity-50",children:[v?R.jsx(uo,{className:"w-3 h-3"}):null,v?"Saved":d?"Saving…":"Save"]})]})]})]})})},hM=["Technical Architecture: Cloud Migration","Sprint Planning & Task Prioritization","Incident Post-Mortem & Root Cause Analysis","Product Roadmap & Design Spec Deliberation"],pM=({isOpen:t,currentAgenda:e,onSave:n,onClose:i})=>{const[r,s]=le.useState(e||""),[a,o]=le.useState(!1);if(le.useEffect(()=>{e&&e!=="Discussion"&&s(e)},[e]),!t)return null;const l=async c=>{c&&c.preventDefault();const h=r.trim()||"General Deliberation";o(!0);try{await n(h),i()}catch(m){console.error("Failed to save agenda:",m)}finally{o(!1)}};return R.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4",children:R.jsxs("div",{className:"bg-ink-900 border border-ink-600 rounded-lg w-full max-w-lg shadow-xl p-6 relative flex flex-col gap-5 text-[#e8e6e1]",children:[R.jsxs("div",{className:"flex items-start justify-between",children:[R.jsxs("div",{children:[R.jsx("h2",{className:"text-base font-semibold text-[#e8e6e1]",children:"Set the meeting agenda"}),R.jsx("p",{className:"text-xs text-ash-400 mt-0.5",children:"Grounds every idea extraction and conflict check in what this meeting is actually about."})]}),R.jsx("button",{onClick:i,className:"p-1 rounded text-ash-400 hover:text-[#e8e6e1] hover:bg-ink-800 transition",children:R.jsx(Ih,{className:"w-4 h-4"})})]}),R.jsxs("form",{onSubmit:l,className:"flex flex-col gap-4",children:[R.jsxs("div",{className:"flex flex-col gap-1.5",children:[R.jsx("label",{className:"text-xs font-medium text-ash-300",children:"Core objective or question"}),R.jsx("textarea",{value:r,onChange:c=>s(c.target.value),placeholder:"e.g. Q3 Cloud Migration: Moving from PostgreSQL to DynamoDB",rows:3,autoFocus:!0,className:"w-full px-3.5 py-2.5 bg-ink-950 border border-ink-600 rounded text-sm text-[#e8e6e1] placeholder-ash-400 focus:outline-none focus:border-ash-400 transition resize-none"})]}),R.jsxs("div",{className:"flex flex-col gap-1.5",children:[R.jsx("span",{className:"text-[11px] text-ash-400",children:"Or start from:"}),R.jsx("div",{className:"flex flex-wrap gap-1.5",children:hM.map(c=>R.jsx("button",{type:"button",onClick:()=>s(c),className:"text-[11px] px-2.5 py-1 rounded border border-ink-600 text-ash-300 hover:text-[#e8e6e1] hover:border-ash-400 transition text-left",children:c},c))})]}),R.jsxs("div",{className:"flex items-center justify-end gap-2.5 pt-3 border-t border-ink-700",children:[R.jsx("button",{type:"button",onClick:i,className:"px-3.5 py-1.5 text-xs text-ash-400 hover:text-[#e8e6e1] rounded transition",children:"Skip"}),R.jsxs("button",{type:"submit",disabled:a||!r.trim(),className:"flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-ink-950 bg-[#e8e6e1] disabled:opacity-40 rounded transition",children:[R.jsx(uo,{className:"w-3.5 h-3.5"}),a?"Setting…":"Set agenda"]})]})]})]})})};async function mM(){const e=new URLSearchParams(window.location.search).get("mode");if(typeof window.meet<"u")try{const i=await window.meet.addons.createAddonSession();return console.log("[MeetSDK] Successfully initialized Google Meet Add-on session",i),{isMeetAddon:!0,meetingId:"google-meet-live",userRole:"participant",mode:e||"sidePanel"}}catch(i){console.warn("[MeetSDK] Failed to create Google Meet Add-on session; falling back to browser mode.",i)}return{isMeetAddon:!1,meetingId:"standalone-browser-session",userRole:"host",mode:e||"standalone"}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uh="187",Ws={ROTATE:0,DOLLY:1,PAN:2},Os={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},gM=0,Mm=1,_M=2,Fl=1,xM=2,Da=3,Jr=0,Ln=1,fi=2,Xs=0,Xa=1,Em=2,wm=3,Tm=4,vM=5,Es=100,yM=101,SM=102,MM=103,EM=104,wM=200,TM=201,bM=202,AM=203,tx=204,nx=205,RM=206,CM=207,PM=208,NM=209,LM=210,DM=211,IM=212,UM=213,FM=214,Yd=0,$d=1,qd=2,fo=3,Kd=4,Zd=5,Jd=6,Qd=7,ix=0,OM=1,kM=2,Xi=0,rx=1,sx=2,ax=3,ox=4,lx=5,cx=6,ux=7,dx=300,ta=301,ho=302,vu=303,yu=304,ef=1e3,Vi=1001,tf=1002,en=1003,BM=1004,Xo=1005,fn=1006,Su=1007,fr=1008,zn=1009,fx=1010,hx=1011,po=1012,Fh=1013,Ri=1014,Ei=1015,Ci=1016,Oh=1017,kh=1018,na=1020,px=35902,mx=35899,gx=1021,_x=1022,wi=1023,Tr=1026,hr=1027,xx=1028,Bh=1029,Qr=1030,zh=1031,Hh=1033,Ol=33776,kl=33777,Bl=33778,zl=33779,nf=35840,rf=35841,sf=35842,af=35843,of=36196,lf=37492,cf=37496,uf=37488,df=37489,hc=37490,ff=37491,hf=37808,pf=37809,mf=37810,gf=37811,_f=37812,xf=37813,vf=37814,yf=37815,Sf=37816,Mf=37817,Ef=37818,wf=37819,Tf=37820,bf=37821,Af=36492,Rf=36494,Cf=36495,Pf=36283,Nf=36284,pc=36285,Lf=36286,zM=3200,Df=0,HM=1,cr="",qn="srgb",mc="srgb-linear",gc="linear",ut="srgb",Mu=7680,GM=519,VM=512,WM=513,XM=514,vx=515,jM=516,YM=517,yx=518,Sx=519,Mx=35044,bm="300 es",hi=2e3,mo=2001;function $M(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function _c(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function qM(){const t=_c("canvas");return t.style.display="block",t}const Am={};function xc(...t){const e="THREE."+t.shift();console.log(e,...t)}function Ex(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Be(...t){t=Ex(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function it(...t){t=Ex(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Hl(...t){const e=t.join(" ");e in Am||(Am[e]=!0,Be(...t))}function KM(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const ZM={[Yd]:Yd,[qd]:Jd,[Kd]:Kd,[fo]:Zd,[$d]:$d,[Jd]:qd,[Qd]:Qd,[Zd]:fo};class Nr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ja=Math.PI/180,If=180/Math.PI;function is(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(cn[t&255]+cn[t>>8&255]+cn[t>>16&255]+cn[t>>24&255]+"-"+cn[e&255]+cn[e>>8&255]+"-"+cn[e>>16&15|64]+cn[e>>24&255]+"-"+cn[n&63|128]+cn[n>>8&255]+"-"+cn[n>>16&255]+cn[n>>24&255]+cn[i&255]+cn[i>>8&255]+cn[i>>16&255]+cn[i>>24&255]).toLowerCase()}function Ye(t,e,n){return Math.max(e,Math.min(n,t))}function JM(t,e){return(t%e+e)%e}function Eu(t,e,n){return(1-n)*t+n*e}function QM(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function Hc(t){switch(t.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function wx(t,e){if(e.constructor===Float32Array)return t;const n=Hc(e);if(n===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(t/n,-1)}function Tx(t,e){if(e.constructor===Float32Array)return t;const n=Hc(e);if(n===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(t*n)}const eE={DEG2RAD:ja},Qh=class Qh{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Qh.prototype.isVector2=!0;let Ie=Qh;class br{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],h=i[r+2],m=i[r+3],d=s[a+0],p=s[a+1],v=s[a+2],M=s[a+3];if(m!==M||l!==d||c!==p||h!==v){let _=l*d+c*p+h*v+m*M;_<0&&(d=-d,p=-p,v=-v,M=-M,_=-_);let u=1-o;if(_<.9995){const g=Math.acos(_),x=Math.sin(g);u=Math.sin(u*g)/x,o=Math.sin(o*g)/x,l=l*u+d*o,c=c*u+p*o,h=h*u+v*o,m=m*u+M*o}else{l=l*u+d*o,c=c*u+p*o,h=h*u+v*o,m=m*u+M*o;const g=1/Math.sqrt(l*l+c*c+h*h+m*m);l*=g,c*=g,h*=g,m*=g}}e[n]=l,e[n+1]=c,e[n+2]=h,e[n+3]=m}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],h=i[r+3],m=s[a],d=s[a+1],p=s[a+2],v=s[a+3];return e[n]=o*v+h*m+l*p-c*d,e[n+1]=l*v+h*d+c*m-o*p,e[n+2]=c*v+h*p+o*d-l*m,e[n+3]=h*v-o*m-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(r/2),m=o(s/2),d=l(i/2),p=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=d*h*m+c*p*v,this._y=c*p*m-d*h*v,this._z=c*h*v+d*p*m,this._w=c*h*m-d*p*v;break;case"YXZ":this._x=d*h*m+c*p*v,this._y=c*p*m-d*h*v,this._z=c*h*v-d*p*m,this._w=c*h*m+d*p*v;break;case"ZXY":this._x=d*h*m-c*p*v,this._y=c*p*m+d*h*v,this._z=c*h*v+d*p*m,this._w=c*h*m-d*p*v;break;case"ZYX":this._x=d*h*m-c*p*v,this._y=c*p*m+d*h*v,this._z=c*h*v-d*p*m,this._w=c*h*m+d*p*v;break;case"YZX":this._x=d*h*m+c*p*v,this._y=c*p*m+d*h*v,this._z=c*h*v-d*p*m,this._w=c*h*m-d*p*v;break;case"XZY":this._x=d*h*m-c*p*v,this._y=c*p*m-d*h*v,this._z=c*h*v+d*p*m,this._w=c*h*m+d*p*v;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],h=n[6],m=n[10],d=i+o+m;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>m){const p=2*Math.sqrt(1+i-o-m);this._w=(h-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>m){const p=2*Math.sqrt(1+o-i-m);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+m-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-r*o,this._w=a*h-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,n=Math.sin(n*c)/h,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ep=class ep{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Rm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Rm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),h=2*(o*n-s*r),m=2*(s*i-a*n);return this.x=n+l*c+a*m-o*h,this.y=i+l*h+o*c-s*m,this.z=r+l*m+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return wu.copy(this).projectOnVector(e),this.sub(wu)}reflect(e){return this.sub(wu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ep.prototype.isVector3=!0;let U=ep;const wu=new U,Rm=new br,tp=class tp{constructor(e,n,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],m=i[7],d=i[2],p=i[5],v=i[8],M=r[0],_=r[3],u=r[6],g=r[1],x=r[4],y=r[7],T=r[2],w=r[5],f=r[8];return s[0]=a*M+o*g+l*T,s[3]=a*_+o*x+l*w,s[6]=a*u+o*y+l*f,s[1]=c*M+h*g+m*T,s[4]=c*_+h*x+m*w,s[7]=c*u+h*y+m*f,s[2]=d*M+p*g+v*T,s[5]=d*_+p*x+v*w,s[8]=d*u+p*y+v*f,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return n*a*h-n*o*c-i*s*h+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],m=h*a-o*c,d=o*l-h*s,p=c*s-a*l,v=n*m+i*d+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/v;return e[0]=m*M,e[1]=(r*c-h*i)*M,e[2]=(o*i-r*a)*M,e[3]=d*M,e[4]=(h*n-r*l)*M,e[5]=(r*s-o*n)*M,e[6]=p*M,e[7]=(i*l-c*n)*M,e[8]=(a*n-i*s)*M,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return Hl("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Tu.makeScale(e,n)),this}rotate(e){return Hl("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Tu.makeRotation(-e)),this}translate(e,n){return Hl("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Tu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};tp.prototype.isMatrix3=!0;let Ve=tp;const Tu=new Ve,Cm=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pm=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tE(){const t={enabled:!0,workingColorSpace:mc,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ut&&(r.r=ji(r.r),r.g=ji(r.g),r.b=ji(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(r.r=js(r.r),r.g=js(r.g),r.b=js(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===cr?gc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[a].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[mc]:{primaries:e,whitePoint:i,transfer:gc,toXYZ:Cm,fromXYZ:Pm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:qn},outputColorSpaceConfig:{drawingBufferColorSpace:qn}},[qn]:{primaries:e,whitePoint:i,transfer:ut,toXYZ:Cm,fromXYZ:Pm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:qn}}}),t}const tt=tE();function ji(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function js(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let as;class nE{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{as===void 0&&(as=_c("canvas")),as.width=e.width,as.height=e.height;const r=as.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=as}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=_c("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ji(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ji(n[i]/255)*255):n[i]=ji(n[i]);return{data:n,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let iE=0;class Gh{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:iE++}),this.uuid=is(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width||0,n.height||0,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(bu(r[a].image)):s.push(bu(r[a]))}else s=bu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function bu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?nE.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let rE=0;const Au=new U;class hn extends Nr{constructor(e=hn.DEFAULT_IMAGE,n=hn.DEFAULT_MAPPING,i=Vi,r=Vi,s=fn,a=fr,o=wi,l=zn,c=hn.DEFAULT_ANISOTROPY,h=cr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rE++}),this.uuid=is(),this.name="",this.source=new Gh(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ie(0,0),this.repeat=new Ie(1,1),this.center=new Ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Au).x}get height(){return this.source.getSize(Au).y}get depth(){return this.source.getSize(Au).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Be(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Be(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==dx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ef:e.x=e.x-Math.floor(e.x);break;case Vi:e.x=e.x<0?0:1;break;case tf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ef:e.y=e.y-Math.floor(e.y);break;case Vi:e.y=e.y<0?0:1;break;case tf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=dx;hn.DEFAULT_ANISOTROPY=1;const np=class np{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],h=l[4],m=l[8],d=l[1],p=l[5],v=l[9],M=l[2],_=l[6],u=l[10];if(Math.abs(h-d)<.01&&Math.abs(m-M)<.01&&Math.abs(v-_)<.01){if(Math.abs(h+d)<.1&&Math.abs(m+M)<.1&&Math.abs(v+_)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(c+1)/2,y=(p+1)/2,T=(u+1)/2,w=(h+d)/4,f=(m+M)/4,S=(v+_)/4;return x>y&&x>T?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=w/i,s=f/i):y>T?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=w/r,s=S/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=f/s,r=S/s),this.set(i,r,s,n),this}let g=Math.sqrt((_-v)*(_-v)+(m-M)*(m-M)+(d-h)*(d-h));return Math.abs(g)<.001&&(g=1),this.x=(_-v)/g,this.y=(m-M)/g,this.z=(d-h)/g,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this.w=Ye(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this.w=Ye(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};np.prototype.isVector4=!0;let Rt=np;class sE extends Nr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Rt(0,0,e,n),this.scissorTest=!1,this.viewport=new Rt(0,0,e,n),this.textures=[];const r=i.count;for(let s=0;s<r;s++)this.textures[s]=new hn({width:e,height:n,depth:i.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(n.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Gh(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const n=e.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ai extends sE{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class bx extends hn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class aE extends hn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const wc=class wc{constructor(e,n,i,r,s,a,o,l,c,h,m,d,p,v,M,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,h,m,d,p,v,M,_)}set(e,n,i,r,s,a,o,l,c,h,m,d,p,v,M,_){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=m,u[14]=d,u[3]=p,u[7]=v,u[11]=M,u[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wc().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/os.setFromMatrixColumn(e,0).length(),s=1/os.setFromMatrixColumn(e,1).length(),a=1/os.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),m=Math.sin(s);if(e.order==="XYZ"){const d=a*h,p=a*m,v=o*h,M=o*m;n[0]=l*h,n[4]=-l*m,n[8]=c,n[1]=p+v*c,n[5]=d-M*c,n[9]=-o*l,n[2]=M-d*c,n[6]=v+p*c,n[10]=a*l}else if(e.order==="YXZ"){const d=l*h,p=l*m,v=c*h,M=c*m;n[0]=d+M*o,n[4]=v*o-p,n[8]=a*c,n[1]=a*m,n[5]=a*h,n[9]=-o,n[2]=p*o-v,n[6]=M+d*o,n[10]=a*l}else if(e.order==="ZXY"){const d=l*h,p=l*m,v=c*h,M=c*m;n[0]=d-M*o,n[4]=-a*m,n[8]=v+p*o,n[1]=p+v*o,n[5]=a*h,n[9]=M-d*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const d=a*h,p=a*m,v=o*h,M=o*m;n[0]=l*h,n[4]=v*c-p,n[8]=d*c+M,n[1]=l*m,n[5]=M*c+d,n[9]=p*c-v,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,v=o*l,M=o*c;n[0]=l*h,n[4]=M-d*m,n[8]=v*m+p,n[1]=m,n[5]=a*h,n[9]=-o*h,n[2]=-c*h,n[6]=p*m+v,n[10]=d-M*m}else if(e.order==="XZY"){const d=a*l,p=a*c,v=o*l,M=o*c;n[0]=l*h,n[4]=-m,n[8]=c*h,n[1]=d*m+M,n[5]=a*h,n[9]=p*m-v,n[2]=v*m-p,n[6]=o*h,n[10]=M*m+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(oE,e,lE)}lookAt(e,n,i){const r=this.elements;return Fn.subVectors(e,n),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),er.crossVectors(i,Fn),er.lengthSq()===0&&(Math.abs(i.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),er.crossVectors(i,Fn)),er.normalize(),jo.crossVectors(Fn,er),r[0]=er.x,r[4]=jo.x,r[8]=Fn.x,r[1]=er.y,r[5]=jo.y,r[9]=Fn.y,r[2]=er.z,r[6]=jo.z,r[10]=Fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],m=i[5],d=i[9],p=i[13],v=i[2],M=i[6],_=i[10],u=i[14],g=i[3],x=i[7],y=i[11],T=i[15],w=r[0],f=r[4],S=r[8],P=r[12],C=r[1],L=r[5],F=r[9],H=r[13],D=r[2],Y=r[6],ee=r[10],X=r[14],V=r[3],B=r[7],$=r[11],te=r[15];return s[0]=a*w+o*C+l*D+c*V,s[4]=a*f+o*L+l*Y+c*B,s[8]=a*S+o*F+l*ee+c*$,s[12]=a*P+o*H+l*X+c*te,s[1]=h*w+m*C+d*D+p*V,s[5]=h*f+m*L+d*Y+p*B,s[9]=h*S+m*F+d*ee+p*$,s[13]=h*P+m*H+d*X+p*te,s[2]=v*w+M*C+_*D+u*V,s[6]=v*f+M*L+_*Y+u*B,s[10]=v*S+M*F+_*ee+u*$,s[14]=v*P+M*H+_*X+u*te,s[3]=g*w+x*C+y*D+T*V,s[7]=g*f+x*L+y*Y+T*B,s[11]=g*S+x*F+y*ee+T*$,s[15]=g*P+x*H+y*X+T*te,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],m=e[6],d=e[10],p=e[14],v=e[3],M=e[7],_=e[11],u=e[15],g=l*p-c*d,x=o*p-c*m,y=o*d-l*m,T=a*p-c*h,w=a*d-l*h,f=a*m-o*h;return n*(M*g-_*x+u*y)-i*(v*g-_*T+u*w)+r*(v*x-M*T+u*f)-s*(v*y-M*w+_*f)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return n*(a*h-o*c)-i*(s*h-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],m=e[9],d=e[10],p=e[11],v=e[12],M=e[13],_=e[14],u=e[15],g=n*o-i*a,x=n*l-r*a,y=n*c-s*a,T=i*l-r*o,w=i*c-s*o,f=r*c-s*l,S=h*M-m*v,P=h*_-d*v,C=h*u-p*v,L=m*_-d*M,F=m*u-p*M,H=d*u-p*_,D=g*H-x*F+y*L+T*C-w*P+f*S;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Y=1/D;return e[0]=(o*H-l*F+c*L)*Y,e[1]=(r*F-i*H-s*L)*Y,e[2]=(M*f-_*w+u*T)*Y,e[3]=(d*w-m*f-p*T)*Y,e[4]=(l*C-a*H-c*P)*Y,e[5]=(n*H-r*C+s*P)*Y,e[6]=(_*y-v*f-u*x)*Y,e[7]=(h*f-d*y+p*x)*Y,e[8]=(a*F-o*C+c*S)*Y,e[9]=(i*C-n*F-s*S)*Y,e[10]=(v*w-M*y+u*g)*Y,e[11]=(m*y-h*w-p*g)*Y,e[12]=(o*P-a*L-l*S)*Y,e[13]=(n*L-i*P+r*S)*Y,e[14]=(M*x-v*T-_*g)*Y,e[15]=(h*T-m*x+d*g)*Y,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+i,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,h=a+a,m=o+o,d=s*c,p=s*h,v=s*m,M=a*h,_=a*m,u=o*m,g=l*c,x=l*h,y=l*m,T=i.x,w=i.y,f=i.z;return r[0]=(1-(M+u))*T,r[1]=(p+y)*T,r[2]=(v-x)*T,r[3]=0,r[4]=(p-y)*w,r[5]=(1-(d+u))*w,r[6]=(_+g)*w,r[7]=0,r[8]=(v+x)*f,r[9]=(_-g)*f,r[10]=(1-(d+M))*f,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let a=os.set(r[0],r[1],r[2]).length();const o=os.set(r[4],r[5],r[6]).length(),l=os.set(r[8],r[9],r[10]).length();s<0&&(a=-a),si.copy(this);const c=1/a,h=1/o,m=1/l;return si.elements[0]*=c,si.elements[1]*=c,si.elements[2]*=c,si.elements[4]*=h,si.elements[5]*=h,si.elements[6]*=h,si.elements[8]*=m,si.elements[9]*=m,si.elements[10]*=m,n.setFromRotationMatrix(si),i.x=a,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,a,o=hi,l=!1){const c=this.elements,h=2*s/(n-e),m=2*s/(i-r),d=(n+e)/(n-e),p=(i+r)/(i-r);let v,M;if(l)v=s/(a-s),M=a*s/(a-s);else if(o===hi)v=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===mo)v=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=m,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=hi,l=!1){const c=this.elements,h=2/(n-e),m=2/(i-r),d=-(n+e)/(n-e),p=-(i+r)/(i-r);let v,M;if(l)v=1/(a-s),M=a/(a-s);else if(o===hi)v=-2/(a-s),M=-(a+s)/(a-s);else if(o===mo)v=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=m,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};wc.prototype.isMatrix4=!0;let mt=wc;const os=new U,si=new mt,oE=new U(0,0,0),lE=new U(1,1,1),er=new U,jo=new U,Fn=new U,Nm=new mt,Lm=new br;class Ar{constructor(e=0,n=0,i=0,r=Ar.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],m=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-m,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-m,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-m,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Nm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Lm.setFromEuler(this),this.setFromQuaternion(Lm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ar.DEFAULT_ORDER="XYZ";class Vh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let cE=0;const Dm=new U,ls=new br,Li=new mt,Yo=new U,ya=new U,uE=new U,dE=new br,Im=new U(1,0,0),Um=new U(0,1,0),Fm=new U(0,0,1),Om={type:"added"},fE={type:"removed"},cs={type:"childadded",child:null},Ru={type:"childremoved",child:null};class Zt extends Nr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cE++}),this.uuid=is(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zt.DEFAULT_UP.clone();const e=new U,n=new Ar,i=new br,r=new U(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new mt},normalMatrix:{value:new Ve}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ls.setFromAxisAngle(e,n),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,n){return ls.setFromAxisAngle(e,n),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(Im,e)}rotateY(e){return this.rotateOnAxis(Um,e)}rotateZ(e){return this.rotateOnAxis(Fm,e)}translateOnAxis(e,n){return Dm.copy(e).applyQuaternion(this.quaternion),this.position.add(Dm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Im,e)}translateY(e){return this.translateOnAxis(Um,e)}translateZ(e){return this.translateOnAxis(Fm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Yo.copy(e):Yo.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ya.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(ya,Yo,this.up):Li.lookAt(Yo,ya,this.up),this.quaternion.setFromRotationMatrix(Li),r&&(Li.extractRotation(r.matrixWorld),ls.setFromRotationMatrix(Li),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Om),cs.child=e,this.dispatchEvent(cs),cs.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(fE),Ru.child=e,this.dispatchEvent(Ru),Ru.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Om),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ya,e,uE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ya,dE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const m=l[c];s(e.shapes,m)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),m=a(e.shapes),d=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),m.length>0&&(i.shapes=m),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Zt.DEFAULT_UP=new U(0,1,0);Zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class zi extends Zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hE={type:"move"};class Cu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const _=n.getJointPose(M,i),u=this._getHandJoint(c,M);_!==null&&(u.matrix.fromArray(_.transform.matrix),u.matrix.decompose(u.position,u.quaternion,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=_.radius),u.visible=_!==null}const h=c.joints["index-finger-tip"],m=c.joints["thumb-tip"],d=h.position.distanceTo(m.position),p=.02,v=.005;c.inputState.pinching&&d>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(hE)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new zi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Ax={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},tr={h:0,s:0,l:0},$o={h:0,s:0,l:0};function Pu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class $e{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=qn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=tt.workingColorSpace){return this.r=e,this.g=n,this.b=i,tt.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=tt.workingColorSpace){if(e=JM(e,1),n=Ye(n,0,1),i=Ye(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Pu(a,s,e+1/3),this.g=Pu(a,s,e),this.b=Pu(a,s,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,n=qn){function i(s){s!==void 0&&parseFloat(s)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,n);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Be("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=qn){const i=Ax[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qn){return tt.workingToColorSpace(un.copy(this),e),Math.round(Ye(un.r*255,0,255))*65536+Math.round(Ye(un.g*255,0,255))*256+Math.round(Ye(un.b*255,0,255))}getHexString(e=qn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=tt.workingColorSpace){tt.workingToColorSpace(un.copy(this),n);const i=un.r,r=un.g,s=un.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const m=a-o;switch(c=h<=.5?m/(a+o):m/(2-a-o),a){case i:l=(r-s)/m+(r<s?6:0);break;case r:l=(s-i)/m+2;break;case s:l=(i-r)/m+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,n=tt.workingColorSpace){return tt.workingToColorSpace(un.copy(this),n),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=qn){tt.workingToColorSpace(un.copy(this),e);const n=un.r,i=un.g,r=un.b;return e!==qn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(tr),this.setHSL(tr.h+e,tr.s+n,tr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(tr),e.getHSL($o);const i=Eu(tr.h,$o.h,n),r=Eu(tr.s,$o.s,n),s=Eu(tr.l,$o.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const un=new $e;$e.NAMES=Ax;class Wh{constructor(e,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new $e(e),this.near=n,this.far=i}clone(){return new Wh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class pE extends Zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ar,this.environmentIntensity=1,this.environmentRotation=new Ar,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const ai=new U,Di=new U,Nu=new U,Ii=new U,us=new U,ds=new U,km=new U,Lu=new U,Du=new U,Iu=new U,Uu=new Rt,Fu=new Rt,Ou=new Rt;class Hn{constructor(e=new U,n=new U,i=new U){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),ai.subVectors(e,n),r.cross(ai);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){ai.subVectors(r,n),Di.subVectors(i,n),Nu.subVectors(e,n);const a=ai.dot(ai),o=ai.dot(Di),l=ai.dot(Nu),c=Di.dot(Di),h=Di.dot(Nu),m=a*c-o*o;if(m===0)return s.set(0,0,0),null;const d=1/m,p=(c*l-o*h)*d,v=(a*h-o*l)*d;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ii.x),l.addScaledVector(a,Ii.y),l.addScaledVector(o,Ii.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return Uu.setScalar(0),Fu.setScalar(0),Ou.setScalar(0),Uu.fromBufferAttribute(e,n),Fu.fromBufferAttribute(e,i),Ou.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Uu,s.x),a.addScaledVector(Fu,s.y),a.addScaledVector(Ou,s.z),a}static isFrontFacing(e,n,i,r){return ai.subVectors(i,n),Di.subVectors(e,n),ai.cross(Di).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ai.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),ai.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Hn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Hn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;us.subVectors(r,i),ds.subVectors(s,i),Lu.subVectors(e,i);const l=us.dot(Lu),c=ds.dot(Lu);if(l<=0&&c<=0)return n.copy(i);Du.subVectors(e,r);const h=us.dot(Du),m=ds.dot(Du);if(h>=0&&m<=h)return n.copy(r);const d=l*m-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),n.copy(i).addScaledVector(us,a);Iu.subVectors(e,s);const p=us.dot(Iu),v=ds.dot(Iu);if(v>=0&&p<=v)return n.copy(s);const M=p*c-l*v;if(M<=0&&c>=0&&v<=0)return o=c/(c-v),n.copy(i).addScaledVector(ds,o);const _=h*v-p*m;if(_<=0&&m-h>=0&&p-v>=0)return km.subVectors(s,r),o=(m-h)/(m-h+(p-v)),n.copy(r).addScaledVector(km,o);const u=1/(_+M+d);return a=M*u,o=d*u,n.copy(i).addScaledVector(us,a).addScaledVector(ds,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Mo{constructor(e=new U(1/0,1/0,1/0),n=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(oi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(oi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=oi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,oi):oi.fromBufferAttribute(s,a),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),qo.copy(i.boundingBox)),qo.applyMatrix4(e.matrixWorld),this.union(qo)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sa),Ko.subVectors(this.max,Sa),fs.subVectors(e.a,Sa),hs.subVectors(e.b,Sa),ps.subVectors(e.c,Sa),nr.subVectors(hs,fs),ir.subVectors(ps,hs),Ur.subVectors(fs,ps);let n=[0,-nr.z,nr.y,0,-ir.z,ir.y,0,-Ur.z,Ur.y,nr.z,0,-nr.x,ir.z,0,-ir.x,Ur.z,0,-Ur.x,-nr.y,nr.x,0,-ir.y,ir.x,0,-Ur.y,Ur.x,0];return!ku(n,fs,hs,ps,Ko)||(n=[1,0,0,0,1,0,0,0,1],!ku(n,fs,hs,ps,Ko))?!1:(Zo.crossVectors(nr,ir),n=[Zo.x,Zo.y,Zo.z],ku(n,fs,hs,ps,Ko))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ui=[new U,new U,new U,new U,new U,new U,new U,new U],oi=new U,qo=new Mo,fs=new U,hs=new U,ps=new U,nr=new U,ir=new U,Ur=new U,Sa=new U,Ko=new U,Zo=new U,Fr=new U;function ku(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Fr.fromArray(t,s);const o=r.x*Math.abs(Fr.x)+r.y*Math.abs(Fr.y)+r.z*Math.abs(Fr.z),l=e.dot(Fr),c=n.dot(Fr),h=i.dot(Fr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Ot=new U,Jo=new Ie;let mE=0;class Mr extends Nr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mE++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Mx,this.updateRanges=[],this.gpuType=Ei,this.version=0,this._normalizationScale=e!==void 0?Hc(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Jo.fromBufferAttribute(this,n),Jo.applyMatrix3(e),this.setXY(n,Jo.x,Jo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix3(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix4(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyNormalMatrix(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.transformDirection(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,n,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=this._denormalize(n)),n}setX(e,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=this._denormalize(n)),n}setY(e,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=this._denormalize(n)),n}setZ(e,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=this._denormalize(n)),n}setW(e,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=this._normalize(n),i=this._normalize(i),r=this._normalize(r),s=this._normalize(s)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const n=this._normalizationScale;return n!==void 0?Math.max(e/n,-1):wx(e,this.array)}_normalize(e){const n=this._normalizationScale;return n!==void 0?Math.round(e*n):Tx(e,this.array)}}class Rx extends Mr{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Cx extends Mr{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class vt extends Mr{constructor(e,n,i){super(new Float32Array(e),n,i)}}const gE=new Mo,Ma=new U,Bu=new U;class Gc{constructor(e=new U,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):gE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ma.subVectors(e,this.center);const n=Ma.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Ma,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ma.copy(e.center).add(Bu)),this.expandByPoint(Ma.copy(e.center).sub(Bu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let _E=0;const $n=new mt,zu=new Zt,ms=new U,On=new Mo,Ea=new Mo,$t=new U;class Vt extends Nr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_E++}),this.uuid=is(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($M(e)?Cx:Rx)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return $n.makeRotationFromQuaternion(e),this.applyMatrix4($n),this}rotateX(e){return $n.makeRotationX(e),this.applyMatrix4($n),this}rotateY(e){return $n.makeRotationY(e),this.applyMatrix4($n),this}rotateZ(e){return $n.makeRotationZ(e),this.applyMatrix4($n),this}translate(e,n,i){return $n.makeTranslation(e,n,i),this.applyMatrix4($n),this}scale(e,n,i){return $n.makeScale(e,n,i),this.applyMatrix4($n),this}lookAt(e){return zu.lookAt(e),zu.updateMatrix(),this.applyMatrix4(zu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new vt(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];On.setFromBufferAttribute(s),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(On.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];Ea.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(On.min,Ea.min),On.expandByPoint($t),$t.addVectors(On.max,Ea.max),On.expandByPoint($t)):(On.expandByPoint(Ea.min),On.expandByPoint(Ea.max))}On.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)$t.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared($t));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)$t.fromBufferAttribute(o,c),l&&(ms.fromBufferAttribute(e,c),$t.add(ms)),r=Math.max(r,i.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Mr(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(i.count);for(let P=0;P<i.count;P++)o[P]=new U,l[P]=new U;const h=new U,m=new U,d=new U,p=new Ie,v=new Ie,M=new Ie,_=new U,u=new U;function g(P,C,L){c[P]=c[C]=c[L]=1,h.fromBufferAttribute(i,P),m.fromBufferAttribute(i,C),d.fromBufferAttribute(i,L),p.fromBufferAttribute(s,P),v.fromBufferAttribute(s,C),M.fromBufferAttribute(s,L),m.sub(h),d.sub(h),v.sub(p),M.sub(p);const F=1/(v.x*M.y-M.x*v.y);isFinite(F)&&(_.copy(m).multiplyScalar(M.y).addScaledVector(d,-v.y).multiplyScalar(F),u.copy(d).multiplyScalar(v.x).addScaledVector(m,-M.x).multiplyScalar(F),o[P].add(_),o[C].add(_),o[L].add(_),l[P].add(u),l[C].add(u),l[L].add(u))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let P=0,C=x.length;P<C;++P){const L=x[P],F=L.start,H=L.count;for(let D=F,Y=F+H;D<Y;D+=3)g(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const y=new U,T=new U,w=new U,f=new U;function S(P){w.fromBufferAttribute(r,P),f.copy(w);const C=o[P];y.copy(C),y.sub(w.multiplyScalar(w.dot(C))).normalize(),T.crossVectors(f,C);const F=T.dot(l[P])<0?-1:1;a.setXYZW(P,y.x,y.y,y.z,F)}for(let P=0,C=i.count;P<C;++P)c[P]&&S(P);this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Mr(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new U,s=new U,a=new U,o=new U,l=new U,c=new U,h=new U,m=new U;if(e)for(let d=0,p=e.count;d<p;d+=3){const v=e.getX(d+0),M=e.getX(d+1),_=e.getX(d+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,M),a.fromBufferAttribute(n,_),h.subVectors(a,s),m.subVectors(r,s),h.cross(m),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,_),o.add(h),l.add(h),c.add(h),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(_,c.x,c.y,c.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),a.fromBufferAttribute(n,d+2),h.subVectors(a,s),m.subVectors(r,s),h.cross(m),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)$t.fromBufferAttribute(e,n),$t.normalize(),e.setXYZ(n,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,m=o.normalized,d=new c.constructor(l.length*h);let p=0,v=0;for(let M=0,_=l.length;M<_;M++){o.isInterleavedBufferAttribute?p=l[M]*o.data.stride+o.offset:p=l[M]*h;for(let u=0;u<h;u++)d[v++]=c[p++]}return new Mr(d,h,m)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Vt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,m=c.length;h<m;h++){const d=c[h],p=e(d,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let m=0,d=c.length;m<d;m++){const p=c[m];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(n))}const s=e.morphAttributes;for(const c in s){const h=[],m=s[c];for(let d=0,p=m.length;d<p;d++)h.push(m[d].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const m=a[c];this.addGroup(m.start,m.count,m.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xE{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=Mx,this.updateRanges=[],this.version=0,this.uuid=is()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const n=Bm(this.array);e.arrayBuffers[n]===void 0&&(e.arrayBuffers[n]=this.array.slice(0).buffer);const i=new this.array.constructor(e.arrayBuffers[n]),r=new this.constructor(i,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const n=Bm(this.array);e.arrayBuffers[n]===void 0&&(e.arrayBuffers[n]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const i={uuid:this.uuid,buffer:n,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}}function Bm(t){return t.buffer._uuid===void 0&&(t.buffer._uuid=is()),t.byteOffset===0&&t.byteLength===t.buffer.byteLength?t.buffer._uuid:t.buffer._uuid+":"+t.byteOffset+":"+t.byteLength}const yn=new U;class vc{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r,this._normalizationScale=e!==void 0?Hc(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)yn.fromBufferAttribute(this,n),yn.applyMatrix4(e),this.setXYZ(n,yn.x,yn.y,yn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)yn.fromBufferAttribute(this,n),yn.applyNormalMatrix(e),this.setXYZ(n,yn.x,yn.y,yn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)yn.fromBufferAttribute(this,n),yn.transformDirection(e),this.setXYZ(n,yn.x,yn.y,yn.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,n,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=this._denormalize(n)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=this._denormalize(n)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=this._denormalize(n)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=this._denormalize(n)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=this._normalize(n),i=this._normalize(i)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=this._normalize(n),i=this._normalize(i),r=this._normalize(r),s=this._normalize(s)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){xc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new Mr(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new vc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){xc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){const n=this._normalizationScale;return n!==void 0?Math.max(e/n,-1):wx(e,this.data.array)}_normalize(e){const n=this._normalizationScale;return n!==void 0?Math.round(e*n):Tx(e,this.data.array)}}const Hu=new U,vE=new U,yE=new Ve;class Bi{constructor(e=new U(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Hu.subVectors(i,n).cross(vE.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(Hu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:n.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||yE.getNormalMatrix(e),r=this.coplanarPoint(Hu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let SE=0;class rs extends Nr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:SE++}),this.uuid=is(),this.name="",this.type="Material",this.blending=Xa,this.side=Jr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tx,this.blendDst=nx,this.blendEquation=Es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=fo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=GM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mu,this.stencilZFail=Mu,this.stencilZPass=Mu,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Be(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Be(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new $e().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Bi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ie().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ie().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=n[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Px extends rs{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let gs;const wa=new U,_s=new U,xs=new U,vs=new Ie,Ta=new Ie,Nx=new mt,Qo=new U,ba=new U,el=new U,zm=new Ie,Gu=new Ie,Hm=new Ie;class ME extends Zt{constructor(e=new Px){if(super(),this.isSprite=!0,this.type="Sprite",gs===void 0){gs=new Vt;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new xE(n,5);gs.setIndex([0,1,2,0,2,3]),gs.setAttribute("position",new vc(i,3,0,!1)),gs.setAttribute("uv",new vc(i,2,3,!1))}this.geometry=gs,this.material=e,this.center=new Ie(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,n){e.camera===null&&it('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),_s.setFromMatrixScale(this.matrixWorld),Nx.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),xs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&_s.multiplyScalar(-xs.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;tl(Qo.set(-.5,-.5,0),xs,a,_s,r,s),tl(ba.set(.5,-.5,0),xs,a,_s,r,s),tl(el.set(.5,.5,0),xs,a,_s,r,s),zm.set(0,0),Gu.set(1,0),Hm.set(1,1);let o=e.ray.intersectTriangle(Qo,ba,el,!1,wa);if(o===null&&(tl(ba.set(-.5,.5,0),xs,a,_s,r,s),Gu.set(0,1),o=e.ray.intersectTriangle(Qo,el,ba,!1,wa),o===null))return;const l=e.ray.origin.distanceTo(wa);l<e.near||l>e.far||n.push({distance:l,point:wa.clone(),uv:Hn.getInterpolation(wa,Qo,ba,el,zm,Gu,Hm,new Ie),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){const n=super.toJSON(e);return n.object.center=this.center.toArray(),n}}function tl(t,e,n,i,r,s){vs.subVectors(t,n).addScalar(.5).multiply(i),r!==void 0?(Ta.x=s*vs.x-r*vs.y,Ta.y=r*vs.x+s*vs.y):Ta.copy(vs),t.copy(e),t.x+=Ta.x,t.y+=Ta.y,t.applyMatrix4(Nx)}const Fi=new U,Vu=new U,nl=new U,il=new U;class Vc{constructor(e=new U,n=new U(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Fi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,n),Fi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Vu.copy(e).add(n).multiplyScalar(.5),nl.copy(n).sub(e).normalize(),il.copy(this.origin).sub(Vu);const s=e.distanceTo(n)*.5,a=-this.direction.dot(nl),o=il.dot(this.direction),l=-il.dot(nl),c=il.lengthSq(),h=Math.abs(1-a*a);let m,d,p,v;if(h>0)if(m=a*l-o,d=a*o-l,v=s*h,m>=0)if(d>=-v)if(d<=v){const M=1/h;m*=M,d*=M,p=m*(m+a*d+2*o)+d*(a*m+d+2*l)+c}else d=s,m=Math.max(0,-(a*d+o)),p=-m*m+d*(d+2*l)+c;else d=-s,m=Math.max(0,-(a*d+o)),p=-m*m+d*(d+2*l)+c;else d<=-v?(m=Math.max(0,-(-a*s+o)),d=m>0?-s:Math.min(Math.max(-s,-l),s),p=-m*m+d*(d+2*l)+c):d<=v?(m=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(m=Math.max(0,-(a*s+o)),d=m>0?s:Math.min(Math.max(-s,-l),s),p=-m*m+d*(d+2*l)+c);else d=a>0?-s:s,m=Math.max(0,-(a*d+o)),p=-m*m+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,m),r&&r.copy(Vu).addScaledVector(nl,d),p}intersectSphere(e,n){if(e.radius<0)return null;Fi.subVectors(e.center,this.origin);const i=Fi.dot(this.direction),r=Fi.dot(Fi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,m=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),m>=0?(o=(e.min.z-d.z)*m,l=(e.max.z-d.z)*m):(o=(e.max.z-d.z)*m,l=(e.min.z-d.z)*m),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,n,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,m=e.x-a.x,d=e.y-a.y,p=e.z-a.z,v=n.x-a.x,M=n.y-a.y,_=n.z-a.z,u=i.x-a.x,g=i.y-a.y,x=i.z-a.z,y=Math.abs(l),T=Math.abs(c),w=Math.abs(h);let f,S,P,C,L,F,H,D,Y,ee,X,V;if(y>=T&&y>=w?(P=l,F=m,Y=v,V=u,l>=0?(f=c,S=h,C=d,L=p,H=M,D=_,ee=g,X=x):(f=h,S=c,C=p,L=d,H=_,D=M,ee=x,X=g)):T>=w?(P=c,F=d,Y=M,V=g,c>=0?(f=h,S=l,C=p,L=m,H=_,D=v,ee=x,X=u):(f=l,S=h,C=m,L=p,H=v,D=_,ee=u,X=x)):(P=h,F=p,Y=_,V=x,h>=0?(f=l,S=c,C=m,L=d,H=v,D=M,ee=u,X=g):(f=c,S=l,C=d,L=m,H=M,D=v,ee=g,X=u)),P===0)return null;const B=f/P,$=S/P,te=1/P,_e=C-B*F,ke=L-$*F,K=H-B*Y,pe=D-$*Y,Se=ee-B*V,Le=X-$*V,xe=Se*pe-Le*K,ze=_e*Le-ke*Se,Mt=K*ke-pe*_e;if(r){if(xe<0||ze<0||Mt<0)return null}else if((xe<0||ze<0||Mt<0)&&(xe>0||ze>0||Mt>0))return null;const Oe=xe+ze+Mt;if(Oe===0)return null;const st=te*(xe*F+ze*Y+Mt*V);return(Oe>0?st<0:st>0)?null:this.at(st/Oe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Uf extends rs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ar,this.combine=ix,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Gm=new mt,Or=new Vc,rl=new Gc,Vm=new U,sl=new U,al=new U,ol=new U,Wu=new U,ll=new U,Wm=new U,cl=new U;class Bn extends Zt{constructor(e=new Vt,n=new Uf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ll.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],m=s[l];h!==0&&(Wu.fromBufferAttribute(m,e),a?ll.addScaledVector(Wu,h):ll.addScaledVector(Wu.sub(n),h))}n.add(ll)}return n}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),rl.copy(i.boundingSphere),rl.applyMatrix4(s),Or.copy(e.ray).recast(e.near),!(rl.containsPoint(Or.origin)===!1&&(Or.intersectSphere(rl,Vm)===null||Or.origin.distanceToSquared(Vm)>(e.far-e.near)**2))&&(Gm.copy(s).invert(),Or.copy(e.ray).applyMatrix4(Gm),!(i.boundingBox!==null&&Or.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Or)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,m=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,M=d.length;v<M;v++){const _=d[v],u=a[_.materialIndex],g=Math.max(_.start,p.start),x=Math.min(o.count,Math.min(_.start+_.count,p.start+p.count));for(let y=g,T=x;y<T;y+=3){const w=o.getX(y),f=o.getX(y+1),S=o.getX(y+2);r=ul(this,u,e,i,c,h,m,w,f,S),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=_.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let _=v,u=M;_<u;_+=3){const g=o.getX(_),x=o.getX(_+1),y=o.getX(_+2);r=ul(this,a,e,i,c,h,m,g,x,y),r&&(r.faceIndex=Math.floor(_/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,M=d.length;v<M;v++){const _=d[v],u=a[_.materialIndex],g=Math.max(_.start,p.start),x=Math.min(l.count,Math.min(_.start+_.count,p.start+p.count));for(let y=g,T=x;y<T;y+=3){const w=y,f=y+1,S=y+2;r=ul(this,u,e,i,c,h,m,w,f,S),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=_.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),M=Math.min(l.count,p.start+p.count);for(let _=v,u=M;_<u;_+=3){const g=_,x=_+1,y=_+2;r=ul(this,a,e,i,c,h,m,g,x,y),r&&(r.faceIndex=Math.floor(_/3),n.push(r))}}}}function EE(t,e,n,i,r,s,a,o){let l;if(e.side===Ln?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Jr,o),l===null)return null;cl.copy(o),cl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(cl);return c<n.near||c>n.far?null:{distance:c,point:cl.clone(),object:t}}function ul(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,sl),t.getVertexPosition(l,al),t.getVertexPosition(c,ol);const h=EE(t,e,n,i,sl,al,ol,Wm);if(h){const m=new U;Hn.getBarycoord(Wm,sl,al,ol,m),r&&(h.uv=Hn.getInterpolatedAttribute(r,o,l,c,m,new Ie)),s&&(h.uv1=Hn.getInterpolatedAttribute(s,o,l,c,m,new Ie)),a&&(h.normal=Hn.getInterpolatedAttribute(a,o,l,c,m,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new U,materialIndex:0};Hn.getNormal(sl,al,ol,d.normal),h.face=d,h.barycoord=m}return h}class wE extends hn{constructor(e=null,n=1,i=1,r,s,a,o,l,c=en,h=en,m,d){super(null,a,o,l,c,h,r,s,m,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const kr=new Gc,TE=new Ie(.5,.5),dl=new U;class go{constructor(e=new Bi,n=new Bi,i=new Bi,r=new Bi,s=new Bi,a=new Bi){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=hi,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],m=s[5],d=s[6],p=s[7],v=s[8],M=s[9],_=s[10],u=s[11],g=s[12],x=s[13],y=s[14],T=s[15];if(r[0].setComponents(c-a,p-h,u-v,T-g).normalize(),r[1].setComponents(c+a,p+h,u+v,T+g).normalize(),r[2].setComponents(c+o,p+m,u+M,T+x).normalize(),r[3].setComponents(c-o,p-m,u-M,T-x).normalize(),i)r[4].setComponents(l,d,_,y).normalize(),r[5].setComponents(c-l,p-d,u-_,T-y).normalize();else if(r[4].setComponents(c-l,p-d,u-_,T-y).normalize(),n===hi)r[5].setComponents(c+l,p+d,u+_,T+y).normalize();else if(n===mo)r[5].setComponents(l,d,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(kr)}intersectsSprite(e){kr.center.set(0,0,0);const n=TE.distanceTo(e.center);return kr.radius=.7071067811865476+n,kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(kr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(dl.x=r.normal.x>0?e.max.x:e.min.x,dl.y=r.normal.y>0?e.max.y:e.min.y,dl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(dl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Xm=new mt;class Xh{constructor(){this.coordinateSystem=hi,this._frustums=[],this._count=0}setFromArrayCamera(e){const n=e.cameras,i=this._frustums;for(let r=0;r<n.length;r++){const s=n[r];Xm.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),i[r]===void 0&&(i[r]=new go),i[r].setFromProjectionMatrix(Xm,s.coordinateSystem,s.reversedDepth)}return this._count=n.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){const n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){const n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsBox(e))return!0;return!1}containsPoint(e){const n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const n=this._frustums,i=e._frustums;for(let r=0;r<e._count;r++)n[r]===void 0&&(n[r]=new go),n[r].copy(i[r]);return this._count=e._count,this}clone(){return new Xh().copy(this)}}class Ys extends rs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const yc=new U,Sc=new U,jm=new mt,Aa=new Vc,fl=new Gc,Xu=new U,Ym=new U;class ws extends Zt{constructor(e=new Vt,n=new Ys){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)yc.fromBufferAttribute(n,r-1),Sc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=yc.distanceTo(Sc);e.setAttribute("lineDistance",new vt(i,1))}else Be("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fl.copy(i.boundingSphere),fl.applyMatrix4(r),fl.radius+=s,e.ray.intersectsSphere(fl)===!1)return;jm.copy(r).invert(),Aa.copy(e.ray).applyMatrix4(jm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){const p=Math.max(0,a.start),v=Math.min(h.count,a.start+a.count);for(let M=p,_=v-1;M<_;M+=c){const u=h.getX(M),g=h.getX(M+1),x=hl(this,e,Aa,l,u,g,M);x&&n.push(x)}if(this.isLineLoop){const M=h.getX(v-1),_=h.getX(p),u=hl(this,e,Aa,l,M,_,v-1);u&&n.push(u)}}else{const p=Math.max(0,a.start),v=Math.min(d.count,a.start+a.count);for(let M=p,_=v-1;M<_;M+=c){const u=hl(this,e,Aa,l,M,M+1,M);u&&n.push(u)}if(this.isLineLoop){const M=hl(this,e,Aa,l,v-1,p,v-1);M&&n.push(M)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function hl(t,e,n,i,r,s,a){const o=t.geometry.attributes.position;if(yc.fromBufferAttribute(o,r),Sc.fromBufferAttribute(o,s),n.distanceSqToSegment(yc,Sc,Xu,Ym)>i)return;Xu.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Xu);if(!(c<e.near||c>e.far))return{distance:c,point:Ym.clone().applyMatrix4(t.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:t}}const $m=new U,qm=new U;class Lx extends ws{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)$m.fromBufferAttribute(n,r),qm.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+$m.distanceTo(qm);e.setAttribute("lineDistance",new vt(i,1))}else Be("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Dx extends hn{constructor(e=[],n=ta,i,r,s,a,o,l,c,h){super(e,n,i,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ix extends hn{constructor(e,n,i,r,s,a,o,l,c){super(e,n,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ia extends hn{constructor(e,n,i=Ri,r,s,a,o=en,l=en,c,h=Tr,m=1){if(h!==Tr&&h!==hr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:n,depth:m};super(d,r,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Gh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return n.compareFunction=this.compareFunction,n}}class Ux extends ia{constructor(e,n=Ri,i=ta,r,s,a=en,o=en,l,c=Tr){const h={width:e,height:e,depth:1},m=[h,h,h,h,h,h];super(e,e,n,i,r,s,a,o,l,c),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Fx extends hn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ca extends Vt{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],m=[];let d=0,p=0;v("z","y","x",-1,-1,i,n,e,a,s,0),v("z","y","x",1,-1,i,n,-e,a,s,1),v("x","z","y",1,1,e,i,n,r,a,2),v("x","z","y",1,-1,e,i,-n,r,a,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new vt(c,3)),this.setAttribute("normal",new vt(h,3)),this.setAttribute("uv",new vt(m,2));function v(M,_,u,g,x,y,T,w,f,S,P){const C=y/f,L=T/S,F=y/2,H=T/2,D=w/2,Y=f+1,ee=S+1;let X=0,V=0;const B=new U;for(let $=0;$<ee;$++){const te=$*L-H;for(let _e=0;_e<Y;_e++){const ke=_e*C-F;B[M]=ke*g,B[_]=te*x,B[u]=D,c.push(B.x,B.y,B.z),B[M]=0,B[_]=0,B[u]=w>0?1:-1,h.push(B.x,B.y,B.z),m.push(_e/f),m.push(1-$/S),X+=1}}for(let $=0;$<S;$++)for(let te=0;te<f;te++){const _e=d+te+Y*$,ke=d+te+Y*($+1),K=d+(te+1)+Y*($+1),pe=d+(te+1)+Y*$;l.push(_e,ke,pe),l.push(ke,K,pe),V+=6}o.addGroup(p,V,P),p+=V,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ca(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class jh extends Vt{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],m=[],d=[],p=[];let v=0;const M=[],_=i/2;let u=0;g(),a===!1&&(e>0&&x(!0),n>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new vt(m,3)),this.setAttribute("normal",new vt(d,3)),this.setAttribute("uv",new vt(p,2));function g(){const y=new U,T=new U;let w=0;const f=(n-e)/i;for(let S=0;S<=s;S++){const P=[],C=S/s,L=C*(n-e)+e;for(let F=0;F<=r;F++){const H=F/r,D=H*l+o,Y=Math.sin(D),ee=Math.cos(D);T.x=L*Y,T.y=-C*i+_,T.z=L*ee,m.push(T.x,T.y,T.z),y.set(Y,f,ee).normalize(),d.push(y.x,y.y,y.z),p.push(H,1-C),P.push(v++)}M.push(P)}for(let S=0;S<r;S++)for(let P=0;P<s;P++){const C=M[P][S],L=M[P+1][S],F=M[P+1][S+1],H=M[P][S+1];(e>0||P!==0)&&(h.push(C,L,H),w+=3),(n>0||P!==s-1)&&(h.push(L,F,H),w+=3)}c.addGroup(u,w,0),u+=w}function x(y){const T=v,w=new Ie,f=new U;let S=0;const P=y===!0?e:n,C=y===!0?1:-1;for(let F=1;F<=r;F++)m.push(0,_*C,0),d.push(0,C,0),p.push(.5,.5),v++;const L=v;for(let F=0;F<=r;F++){const D=F/r*l+o,Y=Math.cos(D),ee=Math.sin(D);f.x=P*ee,f.y=_*C,f.z=P*Y,m.push(f.x,f.y,f.z),d.push(0,C,0),w.x=Y*.5+.5,w.y=ee*.5*C+.5,p.push(w.x,w.y),v++}for(let F=0;F<r;F++){const H=T+F,D=L+F;y===!0?h.push(D,D+1,H):h.push(D+1,D,H),S+=3}c.addGroup(u,S,y===!0?1:2),u+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jh(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yh extends Vt{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};const s=[],a=[];o(r),c(i),h(),this.setAttribute("position",new vt(s,3)),this.setAttribute("normal",new vt(s.slice(),3)),this.setAttribute("uv",new vt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(g){const x=new U,y=new U,T=new U;for(let w=0;w<n.length;w+=3)p(n[w+0],x),p(n[w+1],y),p(n[w+2],T),l(x,y,T,g)}function l(g,x,y,T){const w=T+1,f=[];for(let S=0;S<=w;S++){f[S]=[];const P=g.clone().lerp(y,S/w),C=x.clone().lerp(y,S/w),L=w-S;for(let F=0;F<=L;F++)F===0&&S===w?f[S][F]=P:f[S][F]=P.clone().lerp(C,F/L)}for(let S=0;S<w;S++)for(let P=0;P<2*(w-S)-1;P++){const C=Math.floor(P/2);P%2===0?(d(f[S][C+1]),d(f[S+1][C]),d(f[S][C])):(d(f[S][C+1]),d(f[S+1][C+1]),d(f[S+1][C]))}}function c(g){const x=new U;for(let y=0;y<s.length;y+=3)x.x=s[y+0],x.y=s[y+1],x.z=s[y+2],x.normalize().multiplyScalar(g),s[y+0]=x.x,s[y+1]=x.y,s[y+2]=x.z}function h(){const g=new U;for(let x=0;x<s.length;x+=3){g.x=s[x+0],g.y=s[x+1],g.z=s[x+2];const y=_(g)/2/Math.PI+.5,T=u(g)/Math.PI+.5;a.push(y,1-T)}v(),m()}function m(){for(let g=0;g<a.length;g+=6){const x=a[g+0],y=a[g+2],T=a[g+4],w=Math.max(x,y,T),f=Math.min(x,y,T);w>.9&&f<.1&&(x<.2&&(a[g+0]+=1),y<.2&&(a[g+2]+=1),T<.2&&(a[g+4]+=1))}}function d(g){s.push(g.x,g.y,g.z)}function p(g,x){const y=g*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function v(){const g=new U,x=new U,y=new U,T=new U,w=new Ie,f=new Ie,S=new Ie;for(let P=0,C=0;P<s.length;P+=9,C+=6){g.set(s[P+0],s[P+1],s[P+2]),x.set(s[P+3],s[P+4],s[P+5]),y.set(s[P+6],s[P+7],s[P+8]),w.set(a[C+0],a[C+1]),f.set(a[C+2],a[C+3]),S.set(a[C+4],a[C+5]),T.copy(g).add(x).add(y).divideScalar(3);const L=_(T);M(w,C+0,g,L),M(f,C+2,x,L),M(S,C+4,y,L)}}function M(g,x,y,T){T<0&&g.x===1&&(a[x]=g.x-1),y.x===0&&y.z===0&&(a[x]=T/2/Math.PI+.5)}function _(g){return Math.atan2(g.z,-g.x)}function u(g){return Math.atan2(-g.y,Math.sqrt(g.x*g.x+g.z*g.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yh(e.vertices,e.indices,e.radius,e.detail)}}const pl=new U,ml=new U,ju=new U,gl=new Hn;class bE extends Vt{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const r=Math.pow(10,4),s=Math.cos(ja*n),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],m=new Array(3),d=new Map,p=[];for(let v=0;v<l;v+=3){a?(c[0]=a.getX(v),c[1]=a.getX(v+1),c[2]=a.getX(v+2)):(c[0]=v,c[1]=v+1,c[2]=v+2);const{a:M,b:_,c:u}=gl;if(M.fromBufferAttribute(o,c[0]),_.fromBufferAttribute(o,c[1]),u.fromBufferAttribute(o,c[2]),gl.getNormal(ju),m[0]=`${Math.round(M.x*r)},${Math.round(M.y*r)},${Math.round(M.z*r)}`,m[1]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,m[2]=`${Math.round(u.x*r)},${Math.round(u.y*r)},${Math.round(u.z*r)}`,!(m[0]===m[1]||m[1]===m[2]||m[2]===m[0]))for(let g=0;g<3;g++){const x=(g+1)%3,y=m[g],T=m[x],w=gl[h[g]],f=gl[h[x]],S=`${y}_${T}`,P=`${T}_${y}`,C=d.get(P);C?(ju.dot(C.normal)<=s&&(p.push(w.x,w.y,w.z),p.push(f.x,f.y,f.z)),d.set(P,null)):d.has(S)||d.set(S,{index0:c[g],index1:c[x],normal:ju.clone()})}}for(const v of d.values())if(v){const{index0:M,index1:_}=v;pl.fromBufferAttribute(o,M),ml.fromBufferAttribute(o,_),p.push(pl.x,pl.y,pl.z),p.push(ml.x,ml.y,ml.z)}this.setAttribute("position",new vt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class AE{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Be("Curve: .getPoint() not implemented.")}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const i=this.getLengths();let r=0;const s=i.length;let a;n?a=n:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const h=i[r],d=i[r+1]-h,p=(a-h)/d;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=n||(a.isVector2?new Ie:new U);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n=!1){const i=new U,r=[],s=[],a=[],o=new U,l=new mt;for(let p=0;p<=e;p++){const v=p/e;r[p]=this.getTangentAt(v,new U)}s[0]=new U,a[0]=new U;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),m=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),m<=c&&(c=m,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();const v=Math.acos(Ye(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,v))}a[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(Ye(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let v=1;v<=e;v++)s[v].applyMatrix4(l.makeRotationAxis(r[v],p*v)),a[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}}function RE(t,e){const n=1-t;return n*n*e}function CE(t,e){return 2*(1-t)*t*e}function PE(t,e){return t*t*e}function Yu(t,e,n,i){return RE(t,e)+CE(t,n)+PE(t,i)}class NE extends AE{constructor(e=new U,n=new U,i=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new U){const i=n,r=this.v0,s=this.v1,a=this.v2;return i.set(Yu(e,r.x,s.x,a.x),Yu(e,r.y,s.y,a.y),Yu(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $h extends Yh{constructor(e=1,n=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,n),this.type="OctahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new $h(e.radius,e.detail)}}class Wc extends Vt{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,h=l+1,m=e/o,d=n/l,p=[],v=[],M=[],_=[];for(let u=0;u<h;u++){const g=u*d-a;for(let x=0;x<c;x++){const y=x*m-s;v.push(y,-g,0),M.push(0,0,1),_.push(x/o),_.push(1-u/l)}}for(let u=0;u<l;u++)for(let g=0;g<o;g++){const x=g+c*u,y=g+c*(u+1),T=g+1+c*(u+1),w=g+1+c*u;p.push(x,y,w),p.push(y,T,w)}this.setIndex(p),this.setAttribute("position",new vt(v,3)),this.setAttribute("normal",new vt(M,3)),this.setAttribute("uv",new vt(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wc(e.width,e.height,e.widthSegments,e.heightSegments)}}class Mc extends Vt{constructor(e=.5,n=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],h=[];let m=e;const d=(n-e)/r,p=new U,v=new Ie;for(let M=0;M<=r;M++){for(let _=0;_<=i;_++){const u=s+_/i*a;p.x=m*Math.cos(u),p.y=m*Math.sin(u),l.push(p.x,p.y,p.z),c.push(0,0,1),v.x=(p.x/n+1)/2,v.y=(p.y/n+1)/2,h.push(v.x,v.y)}m+=d}for(let M=0;M<r;M++){const _=M*(i+1);for(let u=0;u<i;u++){const g=u+_,x=g,y=g+i+1,T=g+i+2,w=g+1;o.push(x,y,w),o.push(y,T,w)}}this.setIndex(o),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(c,3)),this.setAttribute("uv",new vt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class qh extends Vt{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],m=new U,d=new U,p=[],v=[],M=[],_=[];for(let u=0;u<=i;u++){const g=[],x=u/i,y=a+x*o,T=e*Math.cos(y),w=Math.sqrt(e*e-T*T);let f=0;u===0&&a===0?f=.5/n:u===i&&l===Math.PI&&(f=-.5/n);for(let S=0;S<=n;S++){const P=S/n,C=r+P*s;m.x=-w*Math.cos(C),m.y=T,m.z=w*Math.sin(C),v.push(m.x,m.y,m.z),d.copy(m).normalize(),M.push(d.x,d.y,d.z),_.push(P+f,1-x),g.push(c++)}h.push(g)}for(let u=0;u<i;u++)for(let g=0;g<n;g++){const x=h[u][g+1],y=h[u][g],T=h[u+1][g],w=h[u+1][g+1];(u!==0||a>0)&&p.push(x,y,w),(u!==i-1||l<Math.PI)&&p.push(y,T,w)}this.setIndex(p),this.setAttribute("position",new vt(v,3)),this.setAttribute("normal",new vt(M,3)),this.setAttribute("uv",new vt(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function ra(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Km(r))r.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Km(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function Sn(t){const e={};for(let n=0;n<t.length;n++){const i=ra(t[n]);for(const r in i)e[r]=i[r]}return e}function Km(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function LE(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Ox(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const DE={clone:ra,merge:Sn};var IE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,UE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class es extends rs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=IE,this.fragmentShader=UE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ra(e.uniforms),this.uniformsGroups=LE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new $e().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ie().fromArray(r.value);break;case"v3":this.uniforms[i].value=new U().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Rt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[i].value=new mt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class FE extends es{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class _l extends rs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Df,this.normalScale=new Ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ar,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class OE extends rs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class kE extends rs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Zm extends Ys{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Kh extends Zt{static registerNode(e){this.prototype._lightNode=e}constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=n}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const $u=new mt,Jm=new U,Qm=new U;class kx{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ie(512,512),this.mapType=zn,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new go,this._frameExtents=new Ie(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera;Jm.setFromMatrixPosition(e.matrixWorld),n.position.copy(Jm),Qm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Qm),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(e,n,i,r){$u.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix($u,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===mo||e.reversedDepth?n.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):n.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),n.multiply($u)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const xl=new U,vl=new br,xi=new U;class Bx extends Zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xl,vl,xi),xi.x===1&&xi.y===1&&xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xl,vl,xi.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(xl,vl,xi),xi.x===1&&xi.y===1&&xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xl,vl,xi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const rr=new U,eg=new Ie,tg=new Ie;class Jn extends Bx{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=If*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ja*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return If*2*Math.atan(Math.tan(ja*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(rr.x,rr.y).multiplyScalar(-e/rr.z),rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rr.x,rr.y).multiplyScalar(-e/rr.z)}getViewSize(e,n){return this.getViewBounds(e,eg,tg),n.subVectors(tg,eg)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(ja*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class BE extends kx{constructor(){super(new Jn(90,1,.5,500)),this.isPointLightShadow=!0}}class zE extends Kh{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new BE}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class zx extends Bx{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class HE extends kx{constructor(){super(new zx(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class GE extends Kh{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.target=new Zt,this.shadow=new HE}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class VE extends Kh{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const ys=-90,Ss=1;class Ff extends Zt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Jn(ys,Ss,e,n);r.layers=this.layers,this.add(r);const s=new Jn(ys,Ss,e,n);s.layers=this.layers,this.add(s);const a=new Jn(ys,Ss,e,n);a.layers=this.layers,this.add(a);const o=new Jn(ys,Ss,e,n);o.layers=this.layers,this.add(o);const l=new Jn(ys,Ss,e,n);l.layers=this.layers,this.add(l);const c=new Jn(ys,Ss,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===hi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===mo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,m=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.mipmapsAutoUpdate=M,e.setRenderTarget(i,5,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(m,d,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class WE extends Jn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}const ng=new mt;class XE{constructor(e,n,i=0,r=1/0){this.ray=new Vc(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Vh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):it("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return ng.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ng),this}intersectObject(e,n=!0,i=[]){return Of(e,this,i,n),i.sort(ig),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Of(e[r],this,i,n);return i.sort(ig),i}}function ig(t,e){return t.distance-e.distance}function Of(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let a=0,o=s.length;a<o;a++)Of(s[a],e,n,!0)}}class jE{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Be("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=performance.now();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}class rg{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ye(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ye(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class YE extends Lx{constructor(e=10,n=10,i=4473924,r=8947848){i=new $e(i),r=new $e(r);const s=n/2,a=e/n,o=e/2,l=[],c=[];for(let d=0,p=0,v=-o;d<=n;d++,v+=a){l.push(-o,0,v,o,0,v),l.push(v,0,-o,v,0,o);const M=d===s?i:r;M.toArray(c,p),p+=3,M.toArray(c,p),p+=3,M.toArray(c,p),p+=3,M.toArray(c,p),p+=3}const h=new Vt;h.setAttribute("position",new vt(l,3)),h.setAttribute("color",new vt(c,3));const m=new Ys({vertexColors:!0,toneMapped:!1});super(h,m),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class $E extends Nr{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function sg(t,e,n,i){const r=qE(i);switch(n){case gx:return t*e;case xx:return t*e/r.components*r.byteLength;case Bh:return t*e/r.components*r.byteLength;case Qr:return t*e*2/r.components*r.byteLength;case zh:return t*e*2/r.components*r.byteLength;case _x:return t*e*3/r.components*r.byteLength;case wi:return t*e*4/r.components*r.byteLength;case Hh:return t*e*4/r.components*r.byteLength;case Ol:case kl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Bl:case zl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case rf:case af:return Math.max(t,16)*Math.max(e,8)/4;case nf:case sf:return Math.max(t,8)*Math.max(e,8)/2;case of:case lf:case uf:case df:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case cf:case hc:case ff:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case hf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case pf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case mf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case gf:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case _f:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case xf:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case vf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case yf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Sf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Mf:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Ef:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case wf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Tf:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case bf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Af:case Rf:case Cf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Pf:case Nf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case pc:case Lf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function qE(t){switch(t){case zn:case fx:return{byteLength:1,components:1};case po:case hx:case Ci:return{byteLength:2,components:1};case Oh:case kh:return{byteLength:2,components:4};case Ri:case Fh:case Ei:return{byteLength:4,components:1};case px:case mx:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uh}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Hx(){let t=null,e=!1,n=null,i=null;function r(s,a){i=t.requestAnimationFrame(r),n(s,a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function KE(t){const e=new WeakMap;function n(o,l){const c=o.array,h=o.usage,m=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:m}}function i(o,l,c){const h=l.array,m=l.updateRanges;if(t.bindBuffer(c,o),m.length===0)t.bufferSubData(c,0,h);else{m.sort((p,v)=>p.start-v.start);let d=0;for(let p=1;p<m.length;p++){const v=m[d],M=m[p];M.start<=v.start+v.count+1?v.count=Math.max(v.count,M.start+M.count-v.start):(++d,m[d]=M)}m.length=d+1;for(let p=0,v=m.length;p<v;p++){const M=m[p];t.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var ZE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,JE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,QE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,e1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,t1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,n1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,i1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,r1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,s1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,a1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,o1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,l1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,c1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,u1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,d1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,f1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,h1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,p1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,m1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,g1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,_1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,x1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,v1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,y1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,S1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,M1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,E1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,w1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,T1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,b1="gl_FragColor = linearToOutputTexel( gl_FragColor );",A1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,R1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,C1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,P1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,N1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,L1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,D1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,I1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,U1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,F1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,O1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,k1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,B1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,z1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,H1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,G1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,V1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,W1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,X1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,j1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Y1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,q1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,K1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Z1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,J1=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Q1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ew=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,iw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,aw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ow=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,uw=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,hw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,mw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,gw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_w=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,yw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ew=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ww=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,bw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Aw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Dw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Iw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Uw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ow=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,kw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,zw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ww=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Xw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,jw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$w=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qw=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,iT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,rT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,aT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,oT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,dT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,mT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,_T=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,xT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ST=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ET=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,TT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,RT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:ZE,alphahash_pars_fragment:JE,alphamap_fragment:QE,alphamap_pars_fragment:e1,alphatest_fragment:t1,alphatest_pars_fragment:n1,aomap_fragment:i1,aomap_pars_fragment:r1,batching_pars_vertex:s1,batching_vertex:a1,begin_vertex:o1,beginnormal_vertex:l1,bsdfs:c1,iridescence_fragment:u1,bumpmap_pars_fragment:d1,clipping_planes_fragment:f1,clipping_planes_pars_fragment:h1,clipping_planes_pars_vertex:p1,clipping_planes_vertex:m1,color_fragment:g1,color_pars_fragment:_1,color_pars_vertex:x1,color_vertex:v1,common:y1,defaultnormal_vertex:S1,displacementmap_pars_vertex:M1,displacementmap_vertex:E1,emissivemap_fragment:w1,emissivemap_pars_fragment:T1,colorspace_fragment:b1,colorspace_pars_fragment:A1,envmap_fragment:R1,envmap_common_pars_fragment:C1,envmap_pars_fragment:P1,envmap_pars_vertex:N1,envmap_physical_pars_fragment:G1,envmap_vertex:L1,fog_vertex:D1,fog_pars_vertex:I1,fog_fragment:U1,fog_pars_fragment:F1,gradientmap_pars_fragment:O1,lightmap_pars_fragment:k1,lights_lambert_fragment:B1,lights_lambert_pars_fragment:z1,lights_pars_begin:H1,lights_toon_fragment:V1,lights_toon_pars_fragment:W1,lights_phong_fragment:X1,lights_phong_pars_fragment:j1,lights_physical_fragment:Y1,lights_physical_pars_fragment:$1,lights_fragment_begin:q1,lights_fragment_maps:K1,lights_fragment_end:Z1,lightprobes_pars_fragment:J1,logdepthbuf_fragment:Q1,logdepthbuf_pars_fragment:ew,logdepthbuf_pars_vertex:tw,logdepthbuf_vertex:nw,map_fragment:iw,map_pars_fragment:rw,map_particle_fragment:sw,map_particle_pars_fragment:aw,metalnessmap_fragment:ow,metalnessmap_pars_fragment:lw,morphinstance_vertex:cw,morphcolor_vertex:uw,morphnormal_vertex:dw,morphtarget_pars_vertex:fw,morphtarget_vertex:hw,normal_fragment_begin:pw,normal_fragment_maps:mw,normal_pars_fragment:gw,normal_pars_vertex:_w,normal_vertex:xw,normalmap_pars_fragment:vw,clearcoat_normal_fragment_begin:yw,clearcoat_normal_fragment_maps:Sw,clearcoat_pars_fragment:Mw,iridescence_pars_fragment:Ew,opaque_fragment:ww,packing:Tw,premultiplied_alpha_fragment:bw,project_vertex:Aw,dithering_fragment:Rw,dithering_pars_fragment:Cw,roughnessmap_fragment:Pw,roughnessmap_pars_fragment:Nw,shadowmap_pars_fragment:Lw,shadowmap_pars_vertex:Dw,shadowmap_vertex:Iw,shadowmask_pars_fragment:Uw,skinbase_vertex:Fw,skinning_pars_vertex:Ow,skinning_vertex:kw,skinnormal_vertex:Bw,specularmap_fragment:zw,specularmap_pars_fragment:Hw,tonemapping_fragment:Gw,tonemapping_pars_fragment:Vw,transmission_fragment:Ww,transmission_pars_fragment:Xw,uv_pars_fragment:jw,uv_pars_vertex:Yw,uv_vertex:$w,worldpos_vertex:qw,background_vert:Kw,background_frag:Zw,backgroundCube_vert:Jw,backgroundCube_frag:Qw,cube_vert:eT,cube_frag:tT,depth_vert:nT,depth_frag:iT,distance_vert:rT,distance_frag:sT,equirect_vert:aT,equirect_frag:oT,linedashed_vert:lT,linedashed_frag:cT,meshbasic_vert:uT,meshbasic_frag:dT,meshlambert_vert:fT,meshlambert_frag:hT,meshmatcap_vert:pT,meshmatcap_frag:mT,meshnormal_vert:gT,meshnormal_frag:_T,meshphong_vert:xT,meshphong_frag:vT,meshphysical_vert:yT,meshphysical_frag:ST,meshtoon_vert:MT,meshtoon_frag:ET,points_vert:wT,points_frag:TT,shadow_vert:bT,shadow_frag:AT,sprite_vert:RT,sprite_frag:CT},Me={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new Ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Si={basic:{uniforms:Sn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Sn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new $e(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Sn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Sn([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Sn([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new $e(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Sn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Sn([Me.points,Me.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Sn([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Sn([Me.common,Me.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Sn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Sn([Me.sprite,Me.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:Sn([Me.common,Me.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:Sn([Me.lights,Me.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Si.physical={uniforms:Sn([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const yl={r:0,b:0,g:0},PT=new mt,Gx=new Ve;Gx.set(-1,0,0,0,1,0,0,0,1);function NT(t,e,n,i,r,s){const a=new $e(0);let o=r===!0?0:1,l,c,h=null,m=0,d=null;function p(g){let x=g.isScene===!0?g.background:null;if(x&&x.isTexture){const y=g.backgroundBlurriness>0;x=e.get(x,y)}return x}function v(g){let x=!1;const y=p(g);y===null?_(a,o):y&&y.isColor&&(_(y,1),x=!0);const T=t.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function M(g,x){const y=p(x);y&&y.isCubeTexture?(c===void 0&&(c=new Bn(new ca(1,1,1),new es({name:"BackgroundCubeMaterial",uniforms:ra(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,w,f){this.matrixWorld.copyPosition(f.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(PT.makeRotationFromEuler(x.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Gx),c.material.toneMapped=tt.getTransfer(y.colorSpace)!==ut,(h!==y||m!==y.version||d!==t.toneMapping)&&(c.material.needsUpdate=!0,h=y,m=y.version,d=t.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Bn(new Wc(2,2),new es({name:"BackgroundMaterial",uniforms:ra(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:Jr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=tt.getTransfer(y.colorSpace)!==ut,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||m!==y.version||d!==t.toneMapping)&&(l.material.needsUpdate=!0,h=y,m=y.version,d=t.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null))}function _(g,x){g.getRGB(yl,Ox(t)),n.buffers.color.setClear(yl.r,yl.g,yl.b,x,s)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(g,x=1){a.set(g),o=x,_(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(g){o=g,_(a,o)},render:v,addToRenderList:M,dispose:u}}function LT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(L,F,H,D,Y){let ee=!1;const X=m(L,D,H,F);s!==X&&(s=X,c(s.object)),ee=p(L,D,H,Y),ee&&v(L,D,H,Y),Y!==null&&e.update(Y,t.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,y(L,F,H,D),Y!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return t.createVertexArray()}function c(L){return t.bindVertexArray(L)}function h(L){return t.deleteVertexArray(L)}function m(L,F,H,D){const Y=D.wireframe===!0;let ee=i[F.id];ee===void 0&&(ee={},i[F.id]=ee);const X=L.isInstancedMesh===!0?L.id:0;let V=ee[X];V===void 0&&(V={},ee[X]=V);let B=V[H.id];B===void 0&&(B={},V[H.id]=B);let $=B[Y];return $===void 0&&($=d(l()),B[Y]=$),$}function d(L){const F=[],H=[],D=[];for(let Y=0;Y<n;Y++)F[Y]=0,H[Y]=0,D[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:H,attributeDivisors:D,object:L,attributes:{},index:null}}function p(L,F,H,D){const Y=s.attributes,ee=F.attributes;let X=0;const V=H.getAttributes();for(const B in V)if(V[B].location>=0){const te=Y[B];let _e=ee[B];if(_e===void 0&&(B==="instanceMatrix"&&L.instanceMatrix&&(_e=L.instanceMatrix),B==="instanceColor"&&L.instanceColor&&(_e=L.instanceColor)),te===void 0||te.attribute!==_e||_e&&te.data!==_e.data)return!0;X++}return s.attributesNum!==X||s.index!==D}function v(L,F,H,D){const Y={},ee=F.attributes;let X=0;const V=H.getAttributes();for(const B in V)if(V[B].location>=0){let te=ee[B];te===void 0&&(B==="instanceMatrix"&&L.instanceMatrix&&(te=L.instanceMatrix),B==="instanceColor"&&L.instanceColor&&(te=L.instanceColor));const _e={};_e.attribute=te,te&&te.data&&(_e.data=te.data),Y[B]=_e,X++}s.attributes=Y,s.attributesNum=X,s.index=D}function M(){const L=s.newAttributes;for(let F=0,H=L.length;F<H;F++)L[F]=0}function _(L){u(L,0)}function u(L,F){const H=s.newAttributes,D=s.enabledAttributes,Y=s.attributeDivisors;H[L]=1,D[L]===0&&(t.enableVertexAttribArray(L),D[L]=1),Y[L]!==F&&(t.vertexAttribDivisor(L,F),Y[L]=F)}function g(){const L=s.newAttributes,F=s.enabledAttributes;for(let H=0,D=F.length;H<D;H++)F[H]!==L[H]&&(t.disableVertexAttribArray(H),F[H]=0)}function x(L,F,H,D,Y,ee,X){X===!0?t.vertexAttribIPointer(L,F,H,Y,ee):t.vertexAttribPointer(L,F,H,D,Y,ee)}function y(L,F,H,D){M();const Y=D.attributes,ee=H.getAttributes(),X=F.defaultAttributeValues;for(const V in ee){const B=ee[V];if(B.location>=0){let $=Y[V];if($===void 0&&(V==="instanceMatrix"&&L.instanceMatrix&&($=L.instanceMatrix),V==="instanceColor"&&L.instanceColor&&($=L.instanceColor)),$!==void 0){const te=$.normalized,_e=$.itemSize,ke=e.get($);if(ke===void 0)continue;const K=ke.buffer,pe=ke.type,Se=ke.bytesPerElement,Le=pe===t.INT||pe===t.UNSIGNED_INT||$.gpuType===Fh;if($.isInterleavedBufferAttribute){const xe=$.data,ze=xe.isInterleavedBuffer===!0?xe.stride:xe.itemSize,Mt=$.offset;if(xe.isInstancedInterleavedBuffer||xe.isInstancedBufferAttribute){for(let Oe=0;Oe<B.locationSize;Oe++)u(B.location+Oe,xe.meshPerAttribute);L.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let Oe=0;Oe<B.locationSize;Oe++)_(B.location+Oe);t.bindBuffer(t.ARRAY_BUFFER,K);for(let Oe=0;Oe<B.locationSize;Oe++)x(B.location+Oe,_e/B.locationSize,pe,te,ze*Se,(Mt+_e/B.locationSize*Oe)*Se,Le)}else{if($.isInstancedBufferAttribute){for(let xe=0;xe<B.locationSize;xe++)u(B.location+xe,$.meshPerAttribute);L.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let xe=0;xe<B.locationSize;xe++)_(B.location+xe);t.bindBuffer(t.ARRAY_BUFFER,K);for(let xe=0;xe<B.locationSize;xe++)x(B.location+xe,_e/B.locationSize,pe,te,_e*Se,_e/B.locationSize*xe*Se,Le)}}else if(X!==void 0){const te=X[V];if(te!==void 0)switch(te.length){case 2:t.vertexAttrib2fv(B.location,te);break;case 3:t.vertexAttrib3fv(B.location,te);break;case 4:t.vertexAttrib4fv(B.location,te);break;default:t.vertexAttrib1fv(B.location,te)}}}}g()}function T(){P();for(const L in i){const F=i[L];for(const H in F){const D=F[H];for(const Y in D){const ee=D[Y];for(const X in ee)h(ee[X].object),delete ee[X];delete D[Y]}}delete i[L]}}function w(L){if(i[L.id]===void 0)return;const F=i[L.id];for(const H in F){const D=F[H];for(const Y in D){const ee=D[Y];for(const X in ee)h(ee[X].object),delete ee[X];delete D[Y]}}delete i[L.id]}function f(L){for(const F in i){const H=i[F];for(const D in H){const Y=H[D];if(Y[L.id]===void 0)continue;const ee=Y[L.id];for(const X in ee)h(ee[X].object),delete ee[X];delete Y[L.id]}}}function S(L){for(const F in i){const H=i[F],D=L.isInstancedMesh===!0?L.id:0,Y=H[D];if(Y!==void 0){for(const ee in Y){const X=Y[ee];for(const V in X)h(X[V].object),delete X[V];delete Y[ee]}delete H[D],Object.keys(H).length===0&&delete i[F]}}}function P(){C(),a=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:C,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:S,releaseStatesOfProgram:f,initAttributes:M,enableAttribute:_,disableUnusedAttributes:g}}function DT(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,h){h!==0&&(t.drawArraysInstanced(i,l,c,h),n.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let p=0;p<h;p++)d+=c[p];n.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function IT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const f=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(f.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(f){return!(f!==wi&&i.convert(f)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(f){const S=f===Ci&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(f!==zn&&f!==Ei&&!S&&i.convert(f)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE))}function l(f){if(f==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";f="mediump"}return f==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(Be("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const m=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=n.logarithmicDepthBuffer===!0&&m===!1;n.reversedDepthBuffer===!0&&m===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),n.logarithmicDepthBuffer===!0&&m===!0&&Be("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),T=t.getParameter(t.MAX_SAMPLES),w=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:m,maxTextures:p,maxVertexTextures:v,maxTextureSize:M,maxCubemapSize:_,maxAttributes:u,maxVertexUniforms:g,maxVaryings:x,maxFragmentUniforms:y,maxSamples:T,samples:w}}function UT(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Bi,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(m,d){const p=m.length!==0||d||i!==0||r;return r=d,i=m.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(m,d){n=h(m,d,0)},this.setState=function(m,d,p){const v=m.clippingPlanes,M=m.clipIntersection,_=m.clipShadows,u=t.get(m);if(!r||v===null||v.length===0||s&&!_)s?h(null):c();else{const g=s?0:i,x=g*4;let y=u.clippingState||null;l.value=y,y=h(v,d,x,p);for(let T=0;T!==x;++T)y[T]=n[T];u.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(m,d,p,v){const M=m!==null?m.length:0;let _=null;if(M!==0){if(_=l.value,v!==!0||_===null){const u=p+M*4,g=d.matrixWorldInverse;o.getNormalMatrix(g),(_===null||_.length<u)&&(_=new Float32Array(u));for(let x=0,y=p;x!==M;++x,y+=4)a.copy(m[x]).applyMatrix4(g,o),a.normal.toArray(_,y),_[y+3]=a.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,_}}class Zh extends Ai{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Dx(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ca(5,5,5),s=new es({name:"CubemapFromEquirect",uniforms:ra(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ln,blending:Xs});s.uniforms.tEquirect.value=n;const a=new Bn(r,s),o=n.minFilter;return n.minFilter===fr&&(n.minFilter=fn),new Ff(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const ag=256,FT=3,OT=20,Vx=256,Wx=16,kT=3,BT=new U,zT=new $e;class Ec{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ff(1,10,null),this._boxMesh=new Bn(new ca(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=BT}=s,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),h=this._getSourceTarget(!0);n>0&&(h.texture.mipmapsAutoUpdate=!1);const m=l.autoClear,d=l.autoClearColor,p=l.autoClearDepth,v=l.autoClearStencil,M=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,M===null&&(e.background=l.getClearColor(zT));const _=new Ff(i,r,h);return _.position.copy(o),_.update(l,e),l.autoClear=m,l.autoClearColor=d,l.autoClearDepth=p,l.autoClearStencil=v,e.background=M,n>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,n)),this._applyPMREM(c),c}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,n){return n>0?1-Math.sqrt(1-e/n):0}_setSize(e){this._cubeSize=Math.max(ag,QM(e))}_fromTexture(e,n){e.mapping===ta||e.mapping===ho?this._setSize(e.image.length===0?ag:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const i=n||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){const e=this._cubeSize,n=og(e,!1,!1),i=Math.log2(e)-FT;for(let r=0;r<=i;r++)n.texture.mipmaps.push({width:e>>r,height:e>>r});return n.texture.name="PMREM",n.texture.isPMREMTexture=!0,n}_getSourceTarget(e=!1){const n=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==n||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=og(n,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,n,i){const r=this._boxMesh,s=this._cubeCamera;r.material=i,s.renderTarget=e,s.activeMipmapLevel=n;const a=e.width>>n;e.viewport.set(0,0,a,a),s.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let n;e.mapping===ta||e.mapping===ho?(this._cubemapMaterial===null&&(this._cubemapMaterial=cg()),n=this._cubemapMaterial,n.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=lg()),n=this._equirectMaterial),n.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,n)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=HT(),this._integrationMaterial=GT());const n=this._cubeSize,i=e.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;const s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(n/Wx);for(let a=0;a<=i;a++){const o=Ec.lodToRoughness(a,i);if(a>i-kT)s.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const l=o>0?Math.log2(n)+.5*Math.log2(6/(Vx*Math.pow(o,4)))+.5:0;r.roughness.value=o,r.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,n){this._blurMaterial===null&&(this._blurMaterial=VT());const i=this._blurMaterial,r=i.uniforms,s=this._sourceTarget;r.sigma.value=Math.min(n,Math.PI)/Math.SQRT2,r.envMap.value=s.texture,this._renderCube(e,0,i),r.envMap.value=e.texture,this._renderCube(s,0,i)}}function og(t,e,n){return new Zh(t,{minFilter:fr,generateMipmaps:e,type:Ci,colorSpace:mc,depthBuffer:n})}function Eo(t,e,n){return new es({name:t,uniforms:e,vertexShader:je.cube_vert,fragmentShader:n,side:Ln,blending:Xs,depthTest:!1,depthWrite:!1})}function HT(){return Eo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Vx}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function GT(){return Eo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Wx}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function VT(){return Eo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${OT}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function lg(){return Eo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function cg(){return Eo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function WT(t){let e=new WeakMap,n=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?a(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===vu||p===yu)if(e.has(d)){const v=e.get(d).texture;return o(v,d.mapping)}else{const v=d.image;if(v&&v.height>0){const M=new Zh(v.height);return M.fromEquirectangularTexture(t,d),e.set(d,M),d.addEventListener("dispose",c),o(M.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){const p=d.mapping,v=p===vu||p===yu,M=p===ta||p===ho;if(v||M){let _=n.get(d);const u=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==u)return i===null&&(i=new Ec(t)),_=v?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,n.set(d,_),_.texture;if(_!==void 0)return _.texture;{const g=d.image;return v&&g&&g.height>0||M&&g&&l(g)?(i===null&&(i=new Ec(t)),_=v?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,n.set(d,_),d.addEventListener("dispose",h),_.texture):null}}}return d}function o(d,p){return p===vu?d.mapping=ta:p===yu&&(d.mapping=ho),d}function l(d){let p=0;const v=6;for(let M=0;M<v;M++)d[M]!==void 0&&p++;return p===v}function c(d){const p=d.target;p.removeEventListener("dispose",c);const v=e.get(p);v!==void 0&&(e.delete(p),v.dispose())}function h(d){const p=d.target;p.removeEventListener("dispose",h);const v=n.get(p);v!==void 0&&(n.delete(p),v.dispose())}function m(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:m}}function XT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Hl("WebGLRenderer: "+i+" extension not supported."),r}}}function jT(t,e,n,i){const r={},s=new WeakMap,a=new FinalizationRegistry(v=>delete r[v]);function o(v){l(v.target)}function l(v){v.index!==null&&e.remove(v.index);for(const _ in v.attributes)e.remove(v.attributes[_]);v.removeEventListener("dispose",o),delete r[v.id],a.unregister(v);const M=s.get(v);M&&(e.remove(M),s.delete(v)),i.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,n.memory.geometries--}function c(v,M){return r[M.id]!==void 0||(M.addEventListener("dispose",o),r[M.id]=new WeakRef(M),a.register(M,M.id,M),n.memory.geometries++),M}function h(v){const M=v.attributes;for(const _ in M)e.update(M[_],t.ARRAY_BUFFER)}function m(v){const M=v.index,_=v.attributes.position;let u=0;if(_===void 0)return;const g=M!==null?M.array.length:_.array.length/3-1,x=_.count>=65535?Cx:Rx,y=new x(Math.ceil(g/3)*6,1),T=y.array;if(M!==null){const f=M.array;u=M.version;for(let S=0,P=0;S<g;S+=3){const C=f[S+0],L=f[S+1],F=f[S+2];T[P++]=C,T[P++]=L,T[P++]=L,T[P++]=F,T[P++]=F,T[P++]=C}}else{u=_.version;for(let f=0,S=0;f<g;f+=3){const P=f+0,C=f+1,L=f+2;T[S++]=P,T[S++]=C,T[S++]=C,T[S++]=L,T[S++]=L,T[S++]=P}}y.version=u;const w=s.get(v);w&&e.remove(w),s.set(v,y)}function d(v){const M=s.get(v);if(M){const _=v.index;_!==null&&M.version<_.version&&m(v)}else m(v);return s.get(v)}function p(){for(const v in r){const M=r[v].deref();M!==void 0&&l(M)}}return{get:c,update:h,getWireframeAttribute:d,dispose:p}}function YT(t,e,n){let i;function r(m){i=m}let s,a;function o(m){s=m.type,a=m.bytesPerElement}function l(m,d){t.drawElements(i,d,s,m*a),n.update(d,i,1)}function c(m,d,p){p!==0&&(t.drawElementsInstanced(i,d,s,m*a,p),n.update(d,i,p))}function h(m,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,m,0,p);let M=0;for(let _=0;_<p;_++)M+=d[_];n.update(M,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function $T(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:it("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function qT(t,e,n){const i=new WeakMap,r=new Rt;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,m=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==m){let C=function(){S.dispose(),i.delete(o),o.removeEventListener("dispose",C)};var p=C;d!==void 0&&d.texture.dispose();const v=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let y=0;v===!0&&(y=1),M===!0&&(y=2),_===!0&&(y=3);let T=o.attributes.position.count*y,w=1;T>e.maxTextureSize&&(w=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const f=new Float32Array(T*w*4*m),S=new bx(f,T,w,m);S.type=Ei,S.needsUpdate=!0;const P=y*4;for(let L=0;L<m;L++){const F=u[L],H=g[L],D=x[L],Y=T*w*4*L;for(let ee=0;ee<F.count;ee++){const X=ee*P;v===!0&&(r.fromBufferAttribute(F,ee),f[Y+X+0]=r.x,f[Y+X+1]=r.y,f[Y+X+2]=r.z,f[Y+X+3]=0),M===!0&&(r.fromBufferAttribute(H,ee),f[Y+X+4]=r.x,f[Y+X+5]=r.y,f[Y+X+6]=r.z,f[Y+X+7]=0),_===!0&&(r.fromBufferAttribute(D,ee),f[Y+X+8]=r.x,f[Y+X+9]=r.y,f[Y+X+10]=r.z,f[Y+X+11]=D.itemSize===4?r.w:1)}}d={count:m,texture:S,size:new Ie(T,w)},i.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let v=0;for(let _=0;_<c.length;_++)v+=c[_];const M=o.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",M),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function KT(t,e,n,i,r){let s=new WeakMap;function a(c){const h=r.render.frame,m=c.geometry,d=e.get(c,m);if(s.get(d)!==h&&(e.update(d),s.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return d}function o(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:a,dispose:o}}const ZT={[rx]:"LINEAR_TONE_MAPPING",[sx]:"REINHARD_TONE_MAPPING",[ax]:"CINEON_TONE_MAPPING",[ox]:"ACES_FILMIC_TONE_MAPPING",[cx]:"AGX_TONE_MAPPING",[ux]:"NEUTRAL_TONE_MAPPING",[lx]:"CUSTOM_TONE_MAPPING"};function JT(t,e,n,i,r,s){const a=new Ai(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const h=new Vt;h.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new vt([0,2,0,0,2,0],2));const m=new FE({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Bn(h,m),p=new zx(-1,1,1,-1,0,1);let v=null,M=null,_=!1,u,g=null,x=[],y=!1;this.setSize=function(T,w){a.setSize(T,w),o!==null&&o.setSize(T,w),l!==null&&l.setSize(T,w);for(let f=0;f<x.length;f++){const S=x[f];S.setSize&&S.setSize(T,w)}},this.setEffects=function(T){x=T,y=x.length>0&&x[0].isRenderPass===!0;const w=a.width,f=a.height;x.length>0&&o===null&&(o=new Ai(w,f,{type:Ci,depthBuffer:!1,stencilBuffer:!1}),l=new Ai(w,f,{type:Ci,depthBuffer:!1,stencilBuffer:!1}));const S=r===!0&&x.some(P=>P.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&c===null&&(c=new ia(w,f),s===!0&&(c.format=hr,c.type=na)),a.dispose(),a.depthTexture=S?c:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let P=0;P<x.length;P++){const C=x[P];C.setSize&&C.setSize(w,f),S&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(T,w){if(_||T.toneMapping===Xi&&x.length===0)return!1;if(g=w,w!==null){const f=w.width,S=w.height;(a.width!==f||a.height!==S)&&this.setSize(f,S)}return y===!1&&T.setRenderTarget(a),u=T.toneMapping,T.toneMapping=Xi,!0},this.hasRenderPass=function(){return y},this.end=function(T,w){T.toneMapping=u,_=!0;let f=a,S=o;for(let P=0;P<x.length;P++){const C=x[P];C.enabled!==!1&&(C.render(T,S,f,w),C.needsSwap!==!1&&(f=S,S=S===o?l:o))}if(v!==T.outputColorSpace||M!==T.toneMapping){v=T.outputColorSpace,M=T.toneMapping,m.defines={},tt.getTransfer(v)===ut&&(m.defines.SRGB_TRANSFER="");const P=ZT[M];P&&(m.defines[P]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=f.texture,T.setRenderTarget(g),T.render(d,p),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),m.dispose()}}const Xx=new hn,jx=new ia(1,1),Yx=new Ux(1),$x=new bx,qx=new aE,Kx=new Dx,ug=[],dg=[],fg=new Float32Array(16),hg=new Float32Array(9),pg=new Float32Array(4);function ua(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=ug[r];if(s===void 0&&(s=new Float32Array(r),ug[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Wt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Xt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Xc(t,e){let n=dg[e];n===void 0&&(n=new Int32Array(e),dg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function QT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function eb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Wt(n,e))return;t.uniform2fv(this.addr,e),Xt(n,e)}}function tb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Wt(n,e))return;t.uniform3fv(this.addr,e),Xt(n,e)}}function nb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Wt(n,e))return;t.uniform4fv(this.addr,e),Xt(n,e)}}function ib(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Wt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Xt(n,e)}else{if(Wt(n,i))return;pg.set(i),t.uniformMatrix2fv(this.addr,!1,pg),Xt(n,i)}}function rb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Wt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Xt(n,e)}else{if(Wt(n,i))return;hg.set(i),t.uniformMatrix3fv(this.addr,!1,hg),Xt(n,i)}}function sb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Wt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Xt(n,e)}else{if(Wt(n,i))return;fg.set(i),t.uniformMatrix4fv(this.addr,!1,fg),Xt(n,i)}}function ab(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function ob(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Wt(n,e))return;t.uniform2iv(this.addr,e),Xt(n,e)}}function lb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Wt(n,e))return;t.uniform3iv(this.addr,e),Xt(n,e)}}function cb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Wt(n,e))return;t.uniform4iv(this.addr,e),Xt(n,e)}}function ub(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function db(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Wt(n,e))return;t.uniform2uiv(this.addr,e),Xt(n,e)}}function fb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Wt(n,e))return;t.uniform3uiv(this.addr,e),Xt(n,e)}}function hb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Wt(n,e))return;t.uniform4uiv(this.addr,e),Xt(n,e)}}function jc(t){return t.version===0&&(t.compareFunction=Sx,t.needsUpdate=!0),t}function pb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?s=jc(jx):s=Xx,n.setTexture2D(e||s,r)}function mb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||qx,r)}function gb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_CUBE_SHADOW?s=jc(Yx):s=Kx,n.setTextureCube(e||s,r)}function _b(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||$x,r)}function xb(t){switch(t){case 5126:return QT;case 35664:return eb;case 35665:return tb;case 35666:return nb;case 35674:return ib;case 35675:return rb;case 35676:return sb;case 5124:case 35670:return ab;case 35667:case 35671:return ob;case 35668:case 35672:return lb;case 35669:case 35673:return cb;case 5125:return ub;case 36294:return db;case 36295:return fb;case 36296:return hb;case 35678:case 36198:case 36298:case 36306:case 35682:return pb;case 35679:case 36299:case 36307:return mb;case 35680:case 36300:case 36308:case 36293:return gb;case 36289:case 36303:case 36311:case 36292:return _b}}function vb(t,e){t.uniform1fv(this.addr,e)}function yb(t,e){const n=ua(e,this.size,2);t.uniform2fv(this.addr,n)}function Sb(t,e){const n=ua(e,this.size,3);t.uniform3fv(this.addr,n)}function Mb(t,e){const n=ua(e,this.size,4);t.uniform4fv(this.addr,n)}function Eb(t,e){const n=ua(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function wb(t,e){const n=ua(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Tb(t,e){const n=ua(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function bb(t,e){t.uniform1iv(this.addr,e)}function Ab(t,e){t.uniform2iv(this.addr,e)}function Rb(t,e){t.uniform3iv(this.addr,e)}function Cb(t,e){t.uniform4iv(this.addr,e)}function Pb(t,e){t.uniform1uiv(this.addr,e)}function Nb(t,e){t.uniform2uiv(this.addr,e)}function Lb(t,e){t.uniform3uiv(this.addr,e)}function Db(t,e){t.uniform4uiv(this.addr,e)}function Ib(t,e,n){const i=this.cache,r=e.length,s=Xc(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),Xt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=jc(jx):a=Xx;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function Ub(t,e,n){const i=this.cache,r=e.length,s=Xc(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),Xt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||qx,s[a])}function Fb(t,e,n){const i=this.cache,r=e.length,s=Xc(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),Xt(i,s));let a;this.type===t.SAMPLER_CUBE_SHADOW?a=jc(Yx):a=Kx;for(let o=0;o!==r;++o)n.setTextureCube(e[o]||a,s[o])}function Ob(t,e,n){const i=this.cache,r=e.length,s=Xc(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),Xt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||$x,s[a])}function kb(t){switch(t){case 5126:return vb;case 35664:return yb;case 35665:return Sb;case 35666:return Mb;case 35674:return Eb;case 35675:return wb;case 35676:return Tb;case 5124:case 35670:return bb;case 35667:case 35671:return Ab;case 35668:case 35672:return Rb;case 35669:case 35673:return Cb;case 5125:return Pb;case 36294:return Nb;case 36295:return Lb;case 36296:return Db;case 35678:case 36198:case 36298:case 36306:case 35682:return Ib;case 35679:case 36299:case 36307:return Ub;case 35680:case 36300:case 36308:case 36293:return Fb;case 36289:case 36303:case 36311:case 36292:return Ob}}class Bb{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=xb(n.type)}}class zb{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=kb(n.type)}}class Hb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const qu=/(\w+)(\])?(\[|\.)?/g;function mg(t,e){t.seq.push(e),t.map[e.id]=e}function Gb(t,e,n){const i=t.name,r=i.length;for(qu.lastIndex=0;;){const s=qu.exec(i),a=qu.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){mg(n,c===void 0?new Bb(o,t,e):new zb(o,t,e));break}else{let m=n.map[o];m===void 0&&(m=new Hb(o),mg(n,m)),n=m}}}class Gl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),l=e.getUniformLocation(n,o.name);Gb(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function gg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const Vb=37297;let Wb=0;function Xb(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const _g=new Ve;function jb(t){tt._getMatrix(_g,tt.workingColorSpace,t);const e=`mat3( ${_g.elements.map(n=>n.toFixed(4))} )`;switch(tt.getTransfer(t)){case gc:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function xg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+Xb(t.getShaderSource(e),o)}else return s}function Yb(t,e){const n=jb(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const $b={[rx]:"Linear",[sx]:"Reinhard",[ax]:"Cineon",[ox]:"ACESFilmic",[cx]:"AgX",[ux]:"Neutral",[lx]:"Custom"};function qb(t,e){const n=$b[e];return n===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Sl=new U;function Kb(){tt.getLuminanceCoefficients(Sl);const t=Sl.x.toFixed(4),e=Sl.y.toFixed(4),n=Sl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zb(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ia).join(`
`)}function Jb(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function Qb(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ia(t){return t!==""}function vg(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function yg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const eA=/^[ \t]*#include +<([\w\d./]+)>/gm;function kf(t){return t.replace(eA,tA)}function tA(t,e){const n=je[e];if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return kf(n)}const nA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sg(t){return t.replace(nA,iA)}function iA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Mg(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const rA={[Fl]:"SHADOWMAP_TYPE_PCF",[Da]:"SHADOWMAP_TYPE_VSM"};function sA(t){return rA[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const aA={[ho]:"ENVMAP_MODE_REFRACTION"};function oA(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":aA[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const lA={[ix]:"ENVMAP_BLENDING_MULTIPLY",[OM]:"ENVMAP_BLENDING_MIX",[kM]:"ENVMAP_BLENDING_ADD"};function cA(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":lA[t.combine]||"ENVMAP_BLENDING_NONE"}function uA(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=sA(n),c=n.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=oA(n),m=cA(n),d=Zb(n),p=Jb(s),v=r.createProgram();let M,_,u=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(M=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,p].filter(Ia).join(`
`),M.length>0&&(M+=`
`),_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,p].filter(Ia).join(`
`),_.length>0&&(_+=`
`)):(M=[Mg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,p,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+n.diffuseRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ia).join(`
`),_=[Mg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,p,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+m:"",n.envMapPMREM?"#define ENVMAP_MAX_LOD "+n.envMapMaxLod+".0":"",n.envMapPMREM?"#define ENVMAP_SIZE "+n.envMapSize+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",n.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Xi?"#define TONE_MAPPING":"",n.toneMapping!==Xi?je.tonemapping_pars_fragment:"",n.toneMapping!==Xi?qb("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,Yb("linearToOutputTexel",n.outputColorSpace),Kb(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ia).join(`
`)),a=kf(a),a=vg(a,n),a=yg(a,n),o=kf(o),o=vg(o,n),o=yg(o,n),a=Sg(a),o=Sg(o),n.isRawShaderMaterial!==!0&&(u=`#version 300 es
`,M=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,_=["#define varying in",n.glslVersion===bm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===bm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const g=u+M+a,x=u+_+o,y=gg(r,r.VERTEX_SHADER,g),T=gg(r,r.FRAGMENT_SHADER,x);r.attachShader(v,y),r.attachShader(v,T),n.index0AttributeName!==void 0?r.bindAttribLocation(v,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function w(C){if(t.debug.checkShaderErrors){const L=r.getProgramInfoLog(v)||"",F=r.getShaderInfoLog(y)||"",H=r.getShaderInfoLog(T)||"",D=L.trim(),Y=F.trim(),ee=H.trim();let X=!0,V=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(X=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,v,y,T);else{const B=xg(r,y,"vertex"),$=xg(r,T,"fragment");it("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+D+`
`+B+`
`+$)}else D!==""?Be("WebGLProgram: Program Info Log:",D):(Y===""||ee==="")&&(V=!1);V&&(C.diagnostics={runnable:X,programLog:D,vertexShader:{log:Y,prefix:M},fragmentShader:{log:ee,prefix:_}})}r.deleteShader(y),r.deleteShader(T),f=new Gl(r,v),S=Qb(r,v)}let f;this.getUniforms=function(){return f===void 0&&w(this),f};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let P=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(v,Vb)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Wb++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=y,this.fragmentShader=T,this}let dA=0;class fA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new hA(e),n.set(e,i)),i}}class hA{constructor(e){this.id=dA++,this.code=e,this.usedTimes=0}}function pA(t){return t===Qr||t===hc||t===pc}function mA(t,e,n,i,r,s){const a=new Vh,o=new fA,l=new Set,c=[],h=new Map,m=i.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(f){return l.add(f),f===0?"uv":`uv${f}`}function v(f,S,P,C,L,F){const H=C.fog,D=L.geometry,Y=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?C.environment:null,ee=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,X=e.get(f.envMap||Y,ee),V=d[f.type];let B=i.precision;f.precision!==null&&(B=i.getMaxPrecision(f.precision),B!==f.precision&&Be("WebGLProgram.getParameters:",f.precision,"not supported, using",B,"instead."));const $=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,te=$!==void 0?$.length:0;let _e=0;D.morphAttributes.position!==void 0&&(_e=1),D.morphAttributes.normal!==void 0&&(_e=2),D.morphAttributes.color!==void 0&&(_e=3);let ke,K,pe,Se;if(V){const he=Si[V];ke=he.vertexShader,K=he.fragmentShader}else{ke=f.vertexShader,K=f.fragmentShader;const he=o.getVertexShaderStage(f),Xe=o.getFragmentShaderStage(f);o.update(f,he,Xe),pe=he.id,Se=Xe.id}const Le=t.getRenderTarget(),xe=t.state.buffers.depth.getReversed(),ze=L.isInstancedMesh===!0,Mt=L.isBatchedMesh===!0,Oe=!!f.map,st=!!f.matcap,lt=!!X,qe=lt&&X.isPMREMTexture===!0,Bt=!!f.aoMap,wt=!!f.lightMap,rn=!!f.bumpMap&&f.wireframe===!1,Ge=!!f.normalMap,Nt=!!f.displacementMap,Ke=!!f.emissiveMap,mn=!!f.metalnessMap,gn=!!f.roughnessMap,_n=f.anisotropy>0,O=f.clearcoat>0,xn=f.diffuseRoughness>0,ft=f.dispersion>0,ht=f.retroreflectivity>0,ve=f.iridescence>0,Ae=f.sheen>0,fe=f.transmission>0,me=_n&&!!f.anisotropyMap,A=O&&!!f.clearcoatMap,E=O&&!!f.clearcoatNormalMap,k=O&&!!f.clearcoatRoughnessMap,re=xn&&!!f.diffuseRoughnessMap,J=ve&&!!f.iridescenceMap,oe=ve&&!!f.iridescenceThicknessMap,ue=Ae&&!!f.sheenColorMap,Z=Ae&&!!f.sheenRoughnessMap,Q=!!f.specularMap,de=!!f.specularColorMap,N=!!f.specularIntensityMap,j=fe&&!!f.transmissionMap,z=fe&&!!f.thicknessMap,ae=!!f.gradientMap,ie=!!f.alphaMap,se=f.alphaTest>0,Ee=!!f.alphaHash,Ue=!!f.extensions;let ne=Xi;f.toneMapped&&(Le===null||Le.isXRRenderTarget===!0)&&(ne=t.toneMapping);const Te=qe?X.isCompressedCubeTexture?X.image[0].mipmaps:X.mipmaps:null,Fe={shaderID:V,shaderType:f.type,shaderName:f.name,vertexShader:ke,fragmentShader:K,defines:f.defines,customVertexShaderID:pe,customFragmentShaderID:Se,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:B,batching:Mt,batchingColor:Mt&&L._colorsTexture!==null,instancing:ze,instancingColor:ze&&L.instanceColor!==null,instancingMorph:ze&&L.morphTexture!==null,outputColorSpace:Le===null?t.outputColorSpace:Le.isXRRenderTarget===!0?Le.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:Oe,matcap:st,envMap:lt,envMapMode:lt&&X.mapping,envMapPMREM:qe,envMapMaxLod:qe?Te.length-1:null,envMapSize:qe?Te[0].width:null,aoMap:Bt,lightMap:wt,bumpMap:rn,normalMap:Ge,displacementMap:Nt,emissiveMap:Ke,normalMapObjectSpace:Ge&&f.normalMapType===HM,normalMapTangentSpace:Ge&&f.normalMapType===Df,packedNormalMap:Ge&&f.normalMapType===Df&&pA(f.normalMap.format),metalnessMap:mn,roughnessMap:gn,anisotropy:_n,anisotropyMap:me,clearcoat:O,clearcoatMap:A,clearcoatNormalMap:E,clearcoatRoughnessMap:k,diffuseRoughness:xn,diffuseRoughnessMap:re,dispersion:ft,retroreflection:ht,iridescence:ve,iridescenceMap:J,iridescenceThicknessMap:oe,sheen:Ae,sheenColorMap:ue,sheenRoughnessMap:Z,specularMap:Q,specularColorMap:de,specularIntensityMap:N,transmission:fe,transmissionMap:j,thicknessMap:z,gradientMap:ae,opaque:f.transparent===!1&&f.blending===Xa&&f.alphaToCoverage===!1,alphaMap:ie,alphaTest:se,alphaHash:Ee,combine:f.combine,mapUv:Oe&&p(f.map.channel),aoMapUv:Bt&&p(f.aoMap.channel),lightMapUv:wt&&p(f.lightMap.channel),bumpMapUv:rn&&p(f.bumpMap.channel),normalMapUv:Ge&&p(f.normalMap.channel),displacementMapUv:Nt&&p(f.displacementMap.channel),emissiveMapUv:Ke&&p(f.emissiveMap.channel),metalnessMapUv:mn&&p(f.metalnessMap.channel),roughnessMapUv:gn&&p(f.roughnessMap.channel),anisotropyMapUv:me&&p(f.anisotropyMap.channel),clearcoatMapUv:A&&p(f.clearcoatMap.channel),clearcoatNormalMapUv:E&&p(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:k&&p(f.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:re&&p(f.diffuseRoughnessMap.channel),iridescenceMapUv:J&&p(f.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&p(f.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&p(f.sheenColorMap.channel),sheenRoughnessMapUv:Z&&p(f.sheenRoughnessMap.channel),specularMapUv:Q&&p(f.specularMap.channel),specularColorMapUv:de&&p(f.specularColorMap.channel),specularIntensityMapUv:N&&p(f.specularIntensityMap.channel),transmissionMapUv:j&&p(f.transmissionMap.channel),thicknessMapUv:z&&p(f.thicknessMap.channel),alphaMapUv:ie&&p(f.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(Ge||_n),vertexNormals:!!D.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!D.attributes.uv&&(Oe||ie),fog:!!H,useFog:f.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||D.attributes.normal===void 0&&Ge===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:xe,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:_e,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:F.filter(he=>he.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:t.shadowMap.enabled&&P.length>0,shadowMapType:t.shadowMap.type,toneMapping:ne,decodeVideoTexture:Oe&&f.map.isVideoTexture===!0&&tt.getTransfer(f.map.colorSpace)===ut,decodeVideoTextureEmissive:Ke&&f.emissiveMap.isVideoTexture===!0&&tt.getTransfer(f.emissiveMap.colorSpace)===ut,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===fi,flipSided:f.side===Ln,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Ue&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&f.extensions.multiDraw===!0||Mt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Fe.vertexUv1s=l.has(1),Fe.vertexUv2s=l.has(2),Fe.vertexUv3s=l.has(3),l.clear(),Fe}function M(f){const S=[];if(f.shaderID?S.push(f.shaderID):(S.push(f.customVertexShaderID),S.push(f.customFragmentShaderID)),f.defines!==void 0)for(const P in f.defines)S.push(P),S.push(f.defines[P]);return f.isRawShaderMaterial===!1&&(_(S,f),u(S,f),S.push(t.outputColorSpace)),S.push(f.customProgramCacheKey),S.join()}function _(f,S){f.push(S.precision),f.push(S.outputColorSpace),f.push(S.envMapMode),f.push(S.envMapPMREM),f.push(S.envMapMaxLod),f.push(S.envMapSize),f.push(S.mapUv),f.push(S.alphaMapUv),f.push(S.lightMapUv),f.push(S.aoMapUv),f.push(S.bumpMapUv),f.push(S.normalMapUv),f.push(S.displacementMapUv),f.push(S.emissiveMapUv),f.push(S.metalnessMapUv),f.push(S.roughnessMapUv),f.push(S.anisotropyMapUv),f.push(S.clearcoatMapUv),f.push(S.clearcoatNormalMapUv),f.push(S.clearcoatRoughnessMapUv),f.push(S.diffuseRoughnessMapUv),f.push(S.iridescenceMapUv),f.push(S.iridescenceThicknessMapUv),f.push(S.sheenColorMapUv),f.push(S.sheenRoughnessMapUv),f.push(S.specularMapUv),f.push(S.specularColorMapUv),f.push(S.specularIntensityMapUv),f.push(S.transmissionMapUv),f.push(S.thicknessMapUv),f.push(S.combine),f.push(S.fogExp2),f.push(S.sizeAttenuation),f.push(S.morphTargetsCount),f.push(S.numSunLights),f.push(S.numDirLights),f.push(S.numPointLights),f.push(S.numSpotLights),f.push(S.numSpotLightMaps),f.push(S.numHemiLights),f.push(S.numRectAreaLights),f.push(S.numSunLightShadows),f.push(S.numDirLightShadows),f.push(S.numPointLightShadows),f.push(S.numSpotLightShadows),f.push(S.numSpotLightShadowsWithMaps),f.push(S.numLightProbes),f.push(S.numLightProbeGrids),f.push(S.shadowMapType),f.push(S.toneMapping),f.push(S.numClippingPlanes),f.push(S.numClipIntersection),f.push(S.depthPacking)}function u(f,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),f.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),f.push(a.mask)}function g(f){const S=d[f.type];let P;if(S){const C=Si[S];P=DE.clone(C.uniforms)}else P=f.uniforms;return P}function x(f,S){let P=h.get(S);return P!==void 0?++P.usedTimes:(P=new uA(t,S,f,r),c.push(P),h.set(S,P)),P}function y(f){if(--f.usedTimes===0){const S=c.indexOf(f);c[S]=c[c.length-1],c.pop(),h.delete(f.cacheKey),f.destroy()}}function T(f){o.remove(f)}function w(){o.dispose()}return{getParameters:v,getProgramCacheKey:M,getUniforms:g,acquireProgram:x,releaseProgram:y,releaseShaderCache:T,programs:c,dispose:w}}function gA(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function _A(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Eg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function wg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,v,M,_,u){let g=t[e];return g===void 0?(g={id:d.id,object:d,geometry:p,material:v,materialVariant:a(d),groupOrder:M,renderOrder:d.renderOrder,z:_,group:u},t[e]=g):(g.id=d.id,g.object=d,g.geometry=p,g.material=v,g.materialVariant=a(d),g.groupOrder=M,g.renderOrder=d.renderOrder,g.z=_,g.group=u),e++,g}function l(d,p,v,M,_,u,g){g.reversedDepth===!0&&(_=-_);const x=o(d,p,v,M,_,u);v.transmission>0?i.push(x):v.transparent===!0?r.push(x):n.push(x)}function c(d,p,v,M,_,u){const g=o(d,p,v,M,_,u);v.transmission>0?i.unshift(g):v.transparent===!0?r.unshift(g):n.unshift(g)}function h(d,p){n.length>1&&n.sort(d||_A),i.length>1&&i.sort(p||Eg),r.length>1&&r.sort(p||Eg)}function m(){for(let d=e,p=t.length;d<p;d++){const v=t[d];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:m,sort:h}}function xA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new wg,t.set(i,[a])):r>=s.length?(a=new wg,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function vA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={direction:new U,color:new $e};break;case"SpotLight":n={position:new U,direction:new U,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new U,color:new $e,distance:0,decay:0};break;case"HemisphereLight":n={direction:new U,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":n={color:new $e,position:new U,halfWidth:new U,halfHeight:new U};break}return t[e.id]=n,n}}}function yA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let SA=0;function MA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function EA(t){const e=new vA,n=yA(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new U);const r=new U,s=new mt,a=new mt;function o(c){let h=0,m=0,d=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let p=0,v=0,M=0,_=0,u=0,g=0,x=0,y=0,T=0,w=0,f=0,S=0,P=0,C=0;c.sort(MA);for(let F=0,H=c.length;F<H;F++){const D=c[F],Y=D.color,ee=D.intensity,X=D.distance;let V=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Qr?V=D.shadow.map.texture:V=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=Y.r*ee,m+=Y.g*ee,d+=Y.b*ee;else if(D.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(D.sh.coefficients[B],ee);C++}else if(D.isSunLight){const B=e.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const $=D.shadow,te=n.get(D);te.shadowIntensity=$.intensity,te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),i.sunShadow[v]=te,i.sunShadowMap[v]=V;const _e=$.getViewportCount();for(let ke=0;ke<_e;ke++)i.sunShadowMatrix[M+ke]=$.getMatrix(ke),i.sunShadowCascade[M+ke]=$._cascadeData[ke];M+=_e,v++}i.sun[p]=B,p++}else if(D.isDirectionalLight){const B=e.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const $=D.shadow,te=n.get(D);te.shadowIntensity=$.intensity,te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,i.directionalShadow[_]=te,i.directionalShadowMap[_]=V,i.directionalShadowMatrix[_]=D.shadow.matrix,T++}i.directional[_]=B,_++}else if(D.isSpotLight){const B=e.get(D);B.position.setFromMatrixPosition(D.matrixWorld),B.color.copy(Y).multiplyScalar(ee),B.distance=X,B.coneCos=Math.cos(D.angle),B.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),B.decay=D.decay,i.spot[g]=B;const $=D.shadow;if(D.map&&(i.spotLightMap[S]=D.map,S++,$.updateMatrices(D),D.castShadow&&P++),i.spotLightMatrix[g]=$.matrix,D.castShadow){const te=n.get(D);te.shadowIntensity=$.intensity,te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,i.spotShadow[g]=te,i.spotShadowMap[g]=V,f++}g++}else if(D.isRectAreaLight){const B=e.get(D);B.color.copy(Y).multiplyScalar(ee),B.halfWidth.set(D.width*.5,0,0),B.halfHeight.set(0,D.height*.5,0),i.rectArea[x]=B,x++}else if(D.isPointLight){const B=e.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),B.distance=D.distance,B.decay=D.decay,D.castShadow){const $=D.shadow,te=n.get(D);te.shadowIntensity=$.intensity,te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,te.shadowCameraNear=$.camera.near,te.shadowCameraFar=$.camera.far,i.pointShadow[u]=te,i.pointShadowMap[u]=V,i.pointShadowMatrix[u]=D.shadow.matrix,w++}i.point[u]=B,u++}else if(D.isHemisphereLight){const B=e.get(D);B.skyColor.copy(D.color).multiplyScalar(ee),B.groundColor.copy(D.groundColor).multiplyScalar(ee),i.hemi[y]=B,y++}}x>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=m,i.ambient[2]=d;const L=i.hash;(L.sunLength!==p||L.directionalLength!==_||L.pointLength!==u||L.spotLength!==g||L.rectAreaLength!==x||L.hemiLength!==y||L.numSunShadows!==v||L.numDirectionalShadows!==T||L.numPointShadows!==w||L.numSpotShadows!==f||L.numSpotMaps!==S||L.numLightProbes!==C)&&(i.sun.length=p,i.directional.length=_,i.spot.length=g,i.rectArea.length=x,i.point.length=u,i.hemi.length=y,i.sunShadow.length=v,i.sunShadowMap.length=v,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=f,i.spotShadowMap.length=f,i.spotLightMatrix.length=f+S-P,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=C,L.sunLength=p,L.directionalLength=_,L.pointLength=u,L.spotLength=g,L.rectAreaLength=x,L.hemiLength=y,L.numSunShadows=v,L.numDirectionalShadows=T,L.numPointShadows=w,L.numSpotShadows=f,L.numSpotMaps=S,L.numLightProbes=C,i.version=SA++)}function l(c,h){let m=0,d=0,p=0,v=0,M=0,_=0;const u=h.matrixWorldInverse;for(let g=0,x=c.length;g<x;g++){const y=c[g];if(y.isSunLight){const T=i.sun[m];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(u),m++}else if(y.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(u),d++}else if(y.isSpotLight){const T=i.spot[v];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(u),T.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(u),v++}else if(y.isRectAreaLight){const T=i.rectArea[M];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(u),a.identity(),s.copy(y.matrixWorld),s.premultiply(u),a.extractRotation(s),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),M++}else if(y.isPointLight){const T=i.point[p];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(u),p++}else if(y.isHemisphereLight){const T=i.hemi[_];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(u),_++}}}return{setup:o,setupView:l,state:i}}function Tg(t){const e=new EA(t),n=[],i=[],r=[];function s(m){h.camera=m,n.length=0,i.length=0,r.length=0}function a(m){m.isLightProbeGrid?r.push(m):n.push(m)}function o(m){i.push(m)}function l(){e.setup(n),r.sort((m,d)=>m.priority-d.priority||m.id-d.id)}function c(m){e.setupView(n,m)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function wA(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Tg(t),e.set(r,[o])):s>=a.length?(o=new Tg(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const TA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,AA=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],RA=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],bg=new mt,Ra=new U,Ku=new U;function CA(t,e,n){let i=new go;const r=new Ie,s=new Ie,a=new Rt,o=new OE,l=new kE,c={},h=n.maxTextureSize,m={[Jr]:Ln,[Ln]:Jr,[fi]:fi},d=new es({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ie},radius:{value:4}},vertexShader:TA,fragmentShader:bA}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const v=new Vt;v.setAttribute("position",new Mr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Bn(v,d),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fl;let u=this.type;this.render=function(w,f,S){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||w.length===0)return;this.type===xM&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Fl);const P=t.getRenderTarget(),C=t.getActiveCubeFace(),L=t.getActiveMipmapLevel(),F=t.state;F.setBlending(Xs),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const H=u!==this.type;H&&f.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(Y=>Y.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,Y=w.length;D<Y;D++){const ee=w[D],X=ee.shadow;if(X===void 0){Be("WebGLShadowMap:",ee,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const V=X.getFrameExtents();r.multiply(V),s.copy(X.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/V.x),r.x=s.x*V.x,X.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/V.y),r.y=s.y*V.y,X.mapSize.y=s.y));const B=t.state.buffers.depth.getReversed();if(X.camera._reversedDepth=B,X.map===null||H===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Da){if(ee.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Ai(r.x,r.y,{format:Qr,type:Ci,minFilter:fn,magFilter:fn,generateMipmaps:!1}),X.map.texture.name=ee.name+".shadowMap",X.map.depthTexture=new ia(r.x,r.y,Ei),X.map.depthTexture.name=ee.name+".shadowMapDepth",X.map.depthTexture.format=Tr,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=en,X.map.depthTexture.magFilter=en}else ee.isPointLight?(X.map=new Zh(r.x),X.map.depthTexture=new Ux(r.x,Ri)):(X.map=new Ai(r.x,r.y),X.map.depthTexture=new ia(r.x,r.y,Ri)),X.map.depthTexture.name=ee.name+".shadowMap",X.map.depthTexture.format=Tr,this.type===Fl?(X.map.depthTexture.compareFunction=B?yx:vx,X.map.depthTexture.minFilter=fn,X.map.depthTexture.magFilter=fn):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=en,X.map.depthTexture.magFilter=en);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==r.x||X.map.height!==r.y)&&X.map.setSize(r.x,r.y);const $=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();ee.isPointLight!==!0&&X.updateMatrices(ee,S);const te=X.camera.layers.mask&4294967294?X.camera.layers:S.layers;for(let _e=0;_e<$;_e++){const ke=X.getCamera(_e);if(ee.isPointLight){const K=X.camera,pe=X.matrix,Se=ee.distance||K.far;Se!==K.far&&(K.far=Se,K.updateProjectionMatrix()),Ra.setFromMatrixPosition(ee.matrixWorld),K.position.copy(Ra),Ku.copy(K.position),Ku.add(AA[_e]),K.up.copy(RA[_e]),K.lookAt(Ku),K.updateMatrixWorld(),pe.makeTranslation(-Ra.x,-Ra.y,-Ra.z),bg.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),X._frustum.setFromProjectionMatrix(bg,K.coordinateSystem,K.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)t.setRenderTarget(X.map,_e),t.clear();else{_e===0&&(t.setRenderTarget(X.map),t.clear());const K=X.getViewport(_e);a.set(s.x*K.x,s.y*K.y,s.x*K.z,s.y*K.w),F.viewport(a)}i=X.getFrustum(_e),y(f,S,ke,ee,te,this.type)}X.isPointLightShadow!==!0&&this.type===Da&&g(X,S),X.needsUpdate=!1}u=this.type,_.needsUpdate=!1,t.setRenderTarget(P,C,L)};function g(w,f){const S=e.update(M);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new Ai(r.x,r.y,{format:Qr,type:Ci}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(f,null,S,d,M,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(f,null,S,p,M,null)}function x(w,f,S,P){let C=null;const L=S.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)C=L;else if(C=S.isPointLight===!0?l:o,t.localClippingEnabled&&f.clipShadows===!0&&Array.isArray(f.clippingPlanes)&&f.clippingPlanes.length!==0||f.displacementMap&&f.displacementScale!==0||f.alphaMap&&f.alphaTest>0||f.map&&f.alphaTest>0||f.alphaToCoverage===!0){const F=C.uuid,H=f.uuid;let D=c[F];D===void 0&&(D={},c[F]=D);let Y=D[H];Y===void 0&&(Y=C.clone(),D[H]=Y,f.addEventListener("dispose",T)),C=Y}if(C.visible=f.visible,C.wireframe=f.wireframe,P===Da?C.side=f.shadowSide!==null?f.shadowSide:f.side:C.side=f.shadowSide!==null?f.shadowSide:m[f.side],C.alphaMap=f.alphaMap,C.alphaTest=f.alphaToCoverage===!0?.5:f.alphaTest,C.map=f.map,C.clipShadows=f.clipShadows,C.clippingPlanes=f.clippingPlanes,C.clipIntersection=f.clipIntersection,C.displacementMap=f.displacementMap,C.displacementScale=f.displacementScale,C.displacementBias=f.displacementBias,C.wireframeLinewidth=f.wireframeLinewidth,C.linewidth=f.linewidth,S.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const F=t.properties.get(C);F.light=S}return C}function y(w,f,S,P,C,L){if(w.visible===!1)return;if(w.layers.test(C)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&L===Da)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,w.matrixWorld);const D=e.update(w),Y=w.material;if(Array.isArray(Y)){const ee=D.groups;for(let X=0,V=ee.length;X<V;X++){const B=ee[X],$=Y[B.materialIndex];if($&&$.visible){const te=x(w,$,P,L);w.onBeforeShadow(t,w,f,S,D,te,B),t.renderBufferDirect(S,null,D,te,w,B),w.onAfterShadow(t,w,f,S,D,te,B)}}}else if(Y.visible){const ee=x(w,Y,P,L);w.onBeforeShadow(t,w,f,S,D,ee,null),t.renderBufferDirect(S,null,D,ee,w,null),w.onAfterShadow(t,w,f,S,D,ee,null)}}const H=w.children;for(let D=0,Y=H.length;D<Y;D++)y(H[D],f,S,P,C,L)}function T(w){w.target.removeEventListener("dispose",T);for(const S in c){const P=c[S],C=w.target.uuid;C in P&&(P[C].dispose(),delete P[C])}}}function PA(t,e){function n(){let N=!1;const j=new Rt;let z=null;const ae=new Rt(0,0,0,0);return{setMask:function(ie){z!==ie&&!N&&(t.colorMask(ie,ie,ie,ie),z=ie)},setLocked:function(ie){N=ie},setClear:function(ie,se,Ee,Ue,ne){ne===!0&&(ie*=Ue,se*=Ue,Ee*=Ue),j.set(ie,se,Ee,Ue),ae.equals(j)===!1&&(t.clearColor(ie,se,Ee,Ue),ae.copy(j))},reset:function(){N=!1,z=null,ae.set(-1,0,0,0)}}}function i(){let N=!1,j=!1,z=null,ae=null,ie=null;return{setReversed:function(se){if(j!==se){const Ee=e.get("EXT_clip_control");se?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),j=se;const Ue=ie;ie=null,this.setClear(Ue)}},getReversed:function(){return j},setTest:function(se){se?xe(t.DEPTH_TEST):ze(t.DEPTH_TEST)},setMask:function(se){z!==se&&!N&&(t.depthMask(se),z=se)},setFunc:function(se){if(j&&(se=ZM[se]),ae!==se){switch(se){case Yd:t.depthFunc(t.NEVER);break;case $d:t.depthFunc(t.ALWAYS);break;case qd:t.depthFunc(t.LESS);break;case fo:t.depthFunc(t.LEQUAL);break;case Kd:t.depthFunc(t.EQUAL);break;case Zd:t.depthFunc(t.GEQUAL);break;case Jd:t.depthFunc(t.GREATER);break;case Qd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ae=se}},setLocked:function(se){N=se},setClear:function(se){ie!==se&&(ie=se,j&&(se=1-se),t.clearDepth(se))},reset:function(){N=!1,z=null,ae=null,ie=null,j=!1}}}function r(){let N=!1,j=null,z=null,ae=null,ie=null,se=null,Ee=null,Ue=null,ne=null;return{setTest:function(Te){N||(Te?xe(t.STENCIL_TEST):ze(t.STENCIL_TEST))},setMask:function(Te){j!==Te&&!N&&(t.stencilMask(Te),j=Te)},setFunc:function(Te,Fe,he){(z!==Te||ae!==Fe||ie!==he)&&(t.stencilFunc(Te,Fe,he),z=Te,ae=Fe,ie=he)},setOp:function(Te,Fe,he){(se!==Te||Ee!==Fe||Ue!==he)&&(t.stencilOp(Te,Fe,he),se=Te,Ee=Fe,Ue=he)},setLocked:function(Te){N=Te},setClear:function(Te){ne!==Te&&(t.clearStencil(Te),ne=Te)},reset:function(){N=!1,j=null,z=null,ae=null,ie=null,se=null,Ee=null,Ue=null,ne=null}}}const s=new n,a=new i,o=new r;let l={};const c=new WeakMap;let h={},m={},d={},p=new WeakMap,v=[],M=null,_=!1,u=null,g=null,x=null,y=null,T=null,w=null,f=null,S=new $e(0,0,0),P=0,C=!1,L=null,F=null,H=null,D=null,Y=null;const ee=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,V=0;const B=t.getParameter(t.VERSION);B.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(B)[1]),X=V>=1):B.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),X=V>=2);let $=null,te={};const _e=t.getParameter(t.SCISSOR_BOX),ke=t.getParameter(t.VIEWPORT),K=new Rt().fromArray(_e),pe=new Rt().fromArray(ke);function Se(N,j,z,ae){const ie=new Uint8Array(4),se=t.createTexture();t.bindTexture(N,se),t.texParameteri(N,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(N,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ee=0;Ee<z;Ee++)N===t.TEXTURE_3D||N===t.TEXTURE_2D_ARRAY?t.texImage3D(j,0,t.RGBA,1,1,ae,0,t.RGBA,t.UNSIGNED_BYTE,ie):t.texImage2D(j+Ee,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ie);return se}const Le={};Le[t.TEXTURE_2D]=Se(t.TEXTURE_2D,t.TEXTURE_2D,1),Le[t.TEXTURE_CUBE_MAP]=Se(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Le[t.TEXTURE_2D_ARRAY]=Se(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Le[t.TEXTURE_3D]=Se(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),xe(t.DEPTH_TEST),a.setFunc(fo),rn(!1),Ge(Mm),xe(t.CULL_FACE),Bt(Xs);function xe(N){h[N]!==!0&&(t.enable(N),h[N]=!0)}function ze(N){h[N]!==!1&&(t.disable(N),h[N]=!1)}function Mt(N,j){return d[N]!==j?(t.bindFramebuffer(N,j),d[N]=j,N===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=j),N===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=j),!0):!1}function Oe(N,j){let z=v,ae=!1;if(N){z=p.get(j),z===void 0&&(z=[],p.set(j,z));const ie=N.textures;if(z.length!==ie.length||z[0]!==t.COLOR_ATTACHMENT0){for(let se=0,Ee=ie.length;se<Ee;se++)z[se]=t.COLOR_ATTACHMENT0+se;z.length=ie.length,ae=!0}}else z[0]!==t.BACK&&(z[0]=t.BACK,ae=!0);ae&&t.drawBuffers(z)}function st(N){return M!==N?(t.useProgram(N),M=N,!0):!1}const lt={[Es]:t.FUNC_ADD,[yM]:t.FUNC_SUBTRACT,[SM]:t.FUNC_REVERSE_SUBTRACT};lt[MM]=t.MIN,lt[EM]=t.MAX;const qe={[wM]:t.ZERO,[TM]:t.ONE,[bM]:t.SRC_COLOR,[tx]:t.SRC_ALPHA,[LM]:t.SRC_ALPHA_SATURATE,[PM]:t.DST_COLOR,[RM]:t.DST_ALPHA,[AM]:t.ONE_MINUS_SRC_COLOR,[nx]:t.ONE_MINUS_SRC_ALPHA,[NM]:t.ONE_MINUS_DST_COLOR,[CM]:t.ONE_MINUS_DST_ALPHA,[DM]:t.CONSTANT_COLOR,[IM]:t.ONE_MINUS_CONSTANT_COLOR,[UM]:t.CONSTANT_ALPHA,[FM]:t.ONE_MINUS_CONSTANT_ALPHA};function Bt(N,j,z,ae,ie,se,Ee,Ue,ne,Te){if(N===Xs){_===!0&&(ze(t.BLEND),_=!1);return}if(_===!1&&(xe(t.BLEND),_=!0),N!==vM){if(N!==u||Te!==C){if((g!==Es||T!==Es)&&(t.blendEquation(t.FUNC_ADD),g=Es,T=Es),Te)switch(N){case Xa:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Em:t.blendFunc(t.ONE,t.ONE);break;case wm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Tm:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:it("WebGLState: Invalid blending: ",N);break}else switch(N){case Xa:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Em:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case wm:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Tm:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",N);break}x=null,y=null,w=null,f=null,S.set(0,0,0),P=0,u=N,C=Te}return}ie=ie||j,se=se||z,Ee=Ee||ae,(j!==g||ie!==T)&&(t.blendEquationSeparate(lt[j],lt[ie]),g=j,T=ie),(z!==x||ae!==y||se!==w||Ee!==f)&&(t.blendFuncSeparate(qe[z],qe[ae],qe[se],qe[Ee]),x=z,y=ae,w=se,f=Ee),(Ue.equals(S)===!1||ne!==P)&&(t.blendColor(Ue.r,Ue.g,Ue.b,ne),S.copy(Ue),P=ne),u=N,C=!1}function wt(N,j){N.side===fi?ze(t.CULL_FACE):xe(t.CULL_FACE);let z=N.side===Ln;j&&(z=!z),rn(z),N.blending===Xa&&N.transparent===!1?Bt(Xs):Bt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const ae=N.stencilWrite;o.setTest(ae),ae&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ke(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?xe(t.SAMPLE_ALPHA_TO_COVERAGE):ze(t.SAMPLE_ALPHA_TO_COVERAGE)}function rn(N){L!==N&&(N?t.frontFace(t.CW):t.frontFace(t.CCW),L=N)}function Ge(N){N!==gM?(xe(t.CULL_FACE),N!==F&&(N===Mm?t.cullFace(t.BACK):N===_M?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ze(t.CULL_FACE),F=N}function Nt(N){N!==H&&(X&&t.lineWidth(N),H=N)}function Ke(N,j,z){N?(xe(t.POLYGON_OFFSET_FILL),(D!==j||Y!==z)&&(D=j,Y=z,a.getReversed()&&(j=-j,z=-z),t.polygonOffset(j,z))):ze(t.POLYGON_OFFSET_FILL)}function mn(N){N?xe(t.SCISSOR_TEST):ze(t.SCISSOR_TEST)}function gn(N){N===void 0&&(N=t.TEXTURE0+ee-1),$!==N&&(t.activeTexture(N),$=N)}function _n(N,j,z){z===void 0&&($===null?z=t.TEXTURE0+ee-1:z=$);let ae=te[z];ae===void 0&&(ae={type:void 0,texture:void 0},te[z]=ae),(ae.type!==N||ae.texture!==j)&&($!==z&&(t.activeTexture(z),$=z),t.bindTexture(N,j||Le[N]),ae.type=N,ae.texture=j)}function O(){const N=te[$];N!==void 0&&N.type!==void 0&&(t.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function xn(){try{t.compressedTexImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function ft(){try{t.compressedTexImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function ht(){try{t.texSubImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function ve(){try{t.texSubImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function Ae(){try{t.compressedTexSubImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function fe(){try{t.compressedTexSubImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function me(){try{t.texStorage2D(...arguments)}catch(N){it("WebGLState:",N)}}function A(){try{t.texStorage3D(...arguments)}catch(N){it("WebGLState:",N)}}function E(){try{t.texImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function k(){try{t.texImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function re(N){return m[N]!==void 0?m[N]:t.getParameter(N)}function J(N,j){m[N]!==j&&(t.pixelStorei(N,j),m[N]=j)}function oe(N){K.equals(N)===!1&&(t.scissor(N.x,N.y,N.z,N.w),K.copy(N))}function ue(N){pe.equals(N)===!1&&(t.viewport(N.x,N.y,N.z,N.w),pe.copy(N))}function Z(N,j){let z=c.get(j);z===void 0&&(z=new WeakMap,c.set(j,z));let ae=z.get(N);ae===void 0&&(ae=t.getUniformBlockIndex(j,N.name),t.uniformBlockBinding(j,ae,ae),z.set(N,ae))}function Q(N,j,z){const ie=c.get(j).get(N);l[ie]!==z&&(t.bindBufferBase(t.UNIFORM_BUFFER,ie,z),l[ie]=z)}function de(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),h={},m={},$=null,te={},d={},l={},p=new WeakMap,v=[],M=null,_=!1,u=null,g=null,x=null,y=null,T=null,w=null,f=null,S=new $e(0,0,0),P=0,C=!1,L=null,F=null,H=null,D=null,Y=null,K.set(0,0,t.canvas.width,t.canvas.height),pe.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:xe,disable:ze,bindFramebuffer:Mt,drawBuffers:Oe,useProgram:st,setBlending:Bt,setMaterial:wt,setFlipSided:rn,setCullFace:Ge,setLineWidth:Nt,setPolygonOffset:Ke,setScissorTest:mn,activeTexture:gn,bindTexture:_n,unbindTexture:O,compressedTexImage2D:xn,compressedTexImage3D:ft,texImage2D:E,texImage3D:k,pixelStorei:J,getParameter:re,updateUBOMapping:Z,uniformBlockBinding:Q,texStorage2D:me,texStorage3D:A,texSubImage2D:ht,texSubImage3D:ve,compressedTexSubImage2D:Ae,compressedTexSubImage3D:fe,scissor:oe,viewport:ue,reset:de}}function NA(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ie,h=new WeakMap,m=new Set;let d;const p=new WeakMap,v=new Set,M=new FinalizationRegistry(A=>v.delete(A));let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function u(A,E){return _?new OffscreenCanvas(A,E):_c("canvas")}function g(A,E,k){let re=1;const J=me(A);if((J.width>k||J.height>k)&&(re=k/Math.max(J.width,J.height)),re<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const oe=Math.floor(re*J.width),ue=Math.floor(re*J.height);d===void 0&&(d=u(oe,ue));const Z=E?u(oe,ue):d;return Z.width=oe,Z.height=ue,Z.getContext("2d").drawImage(A,0,0,oe,ue),Be("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+oe+"x"+ue+")."),Z}else return"data"in A&&Be("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),A;return A}function x(A){return A.generateMipmaps}function y(A){t.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?t.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function w(A,E,k,re,J,oe=!1){if(A!==null){if(t[A]!==void 0)return t[A];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ue;re&&(ue=e.get("EXT_texture_norm16"),ue||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=E;if(E===t.RED&&(k===t.FLOAT&&(Z=t.R32F),k===t.HALF_FLOAT&&(Z=t.R16F),k===t.UNSIGNED_BYTE&&(Z=t.R8),k===t.UNSIGNED_SHORT&&ue&&(Z=ue.R16_EXT),k===t.SHORT&&ue&&(Z=ue.R16_SNORM_EXT)),E===t.RED_INTEGER&&(k===t.UNSIGNED_BYTE&&(Z=t.R8UI),k===t.UNSIGNED_SHORT&&(Z=t.R16UI),k===t.UNSIGNED_INT&&(Z=t.R32UI),k===t.BYTE&&(Z=t.R8I),k===t.SHORT&&(Z=t.R16I),k===t.INT&&(Z=t.R32I)),E===t.RG&&(k===t.FLOAT&&(Z=t.RG32F),k===t.HALF_FLOAT&&(Z=t.RG16F),k===t.UNSIGNED_BYTE&&(Z=t.RG8),k===t.UNSIGNED_SHORT&&ue&&(Z=ue.RG16_EXT),k===t.SHORT&&ue&&(Z=ue.RG16_SNORM_EXT)),E===t.RG_INTEGER&&(k===t.UNSIGNED_BYTE&&(Z=t.RG8UI),k===t.UNSIGNED_SHORT&&(Z=t.RG16UI),k===t.UNSIGNED_INT&&(Z=t.RG32UI),k===t.BYTE&&(Z=t.RG8I),k===t.SHORT&&(Z=t.RG16I),k===t.INT&&(Z=t.RG32I)),E===t.RGB_INTEGER&&(k===t.UNSIGNED_BYTE&&(Z=t.RGB8UI),k===t.UNSIGNED_SHORT&&(Z=t.RGB16UI),k===t.UNSIGNED_INT&&(Z=t.RGB32UI),k===t.BYTE&&(Z=t.RGB8I),k===t.SHORT&&(Z=t.RGB16I),k===t.INT&&(Z=t.RGB32I)),E===t.RGBA_INTEGER&&(k===t.UNSIGNED_BYTE&&(Z=t.RGBA8UI),k===t.UNSIGNED_SHORT&&(Z=t.RGBA16UI),k===t.UNSIGNED_INT&&(Z=t.RGBA32UI),k===t.BYTE&&(Z=t.RGBA8I),k===t.SHORT&&(Z=t.RGBA16I),k===t.INT&&(Z=t.RGBA32I)),E===t.RGB&&(k===t.UNSIGNED_SHORT&&ue&&(Z=ue.RGB16_EXT),k===t.SHORT&&ue&&(Z=ue.RGB16_SNORM_EXT),k===t.UNSIGNED_INT_5_9_9_9_REV&&(Z=t.RGB9_E5),k===t.UNSIGNED_INT_10F_11F_11F_REV&&(Z=t.R11F_G11F_B10F)),E===t.RGBA){const Q=oe?gc:tt.getTransfer(J);k===t.FLOAT&&(Z=t.RGBA32F),k===t.HALF_FLOAT&&(Z=t.RGBA16F),k===t.UNSIGNED_BYTE&&(Z=Q===ut?t.SRGB8_ALPHA8:t.RGBA8),k===t.UNSIGNED_SHORT&&ue&&(Z=ue.RGBA16_EXT),k===t.SHORT&&ue&&(Z=ue.RGBA16_SNORM_EXT),k===t.UNSIGNED_SHORT_4_4_4_4&&(Z=t.RGBA4),k===t.UNSIGNED_SHORT_5_5_5_1&&(Z=t.RGB5_A1)}return(Z===t.R16F||Z===t.R32F||Z===t.RG16F||Z===t.RG32F||Z===t.RGBA16F||Z===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function f(A,E){let k;return A?E===null||E===Ri||E===na?k=t.DEPTH24_STENCIL8:E===Ei?k=t.DEPTH32F_STENCIL8:E===po&&(k=t.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ri||E===na?k=t.DEPTH_COMPONENT24:E===Ei?k=t.DEPTH_COMPONENT32F:E===po&&(k=t.DEPTH_COMPONENT16),k}function S(A,E){return x(A)===!0||A.isFramebufferTexture&&A.minFilter!==en&&A.minFilter!==fn?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function P(A){const E=new WeakRef(A);i.get(A).__ref=E,v.add(E),M.register(A,E,E)}function C(A){const E=i.get(A).__ref;E!==void 0&&(v.delete(E),M.unregister(E))}function L(A){H(A.target)}function F(A){D(A.target)}function H(A){A.removeEventListener("dispose",L),C(A),ee(A),A.isVideoTexture&&h.delete(A),A.isHTMLTexture&&m.delete(A)}function D(A){A.removeEventListener("dispose",F),C(A),V(A)}function Y(){for(const A of v){const E=A.deref();E!==void 0&&(E.isRenderTarget===!0?D(E):H(E))}v.clear(),m.clear()}function ee(A){const E=i.get(A);if(E.__webglInit===void 0)return;const k=A.source,re=p.get(k);if(re){const J=re[E.__cacheKey];J.usedTimes--,J.usedTimes===0&&X(A),Object.keys(re).length===0&&p.delete(k)}i.remove(A)}function X(A){const E=i.get(A);t.deleteTexture(E.__webglTexture);const k=A.source,re=p.get(k);delete re[E.__cacheKey],a.memory.textures--}function V(A){const E=i.get(A);E.__depthDisposeCallback&&E.__depthDisposeCallback();const k=A.depthTexture;if(k&&k.renderTarget===A&&H(k),A.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let oe=0;oe<E.__webglFramebuffer[J].length;oe++)t.deleteFramebuffer(E.__webglFramebuffer[J][oe]);else t.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)t.deleteFramebuffer(E.__webglFramebuffer[J]);else t.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&t.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&t.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&t.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const re=A.textures;for(let J=0,oe=re.length;J<oe;J++){const ue=i.get(re[J]);ue.__webglTexture&&(t.deleteTexture(ue.__webglTexture),a.memory.textures--),i.remove(re[J])}i.remove(A)}let B=0;function $(){B=0}function te(){return B}function _e(A){B=A}function ke(){const A=B;return A>=r.maxTextures&&Be("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),B+=1,A}function K(A){const E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.mipmapsAutoUpdate),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function pe(A,E){const k=i.get(A);if(A.isVideoTexture&&Ae(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&k.__version!==A.version){const re=A.image;if(re===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{wt(k,A,E);return}}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,k.__webglTexture,t.TEXTURE0+E)}function Se(A,E){const k=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){wt(k,A,E);return}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,k.__webglTexture,t.TEXTURE0+E)}function Le(A,E){const k=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){wt(k,A,E);return}n.bindTexture(t.TEXTURE_3D,k.__webglTexture,t.TEXTURE0+E)}function xe(A,E){const k=i.get(A);if(A.version>0&&k.__version!==A.version){rn(k,A,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture,t.TEXTURE0+E)}const ze={[ef]:t.REPEAT,[Vi]:t.CLAMP_TO_EDGE,[tf]:t.MIRRORED_REPEAT},Mt={[en]:t.NEAREST,[BM]:t.NEAREST_MIPMAP_NEAREST,[Xo]:t.NEAREST_MIPMAP_LINEAR,[fn]:t.LINEAR,[Su]:t.LINEAR_MIPMAP_NEAREST,[fr]:t.LINEAR_MIPMAP_LINEAR},Oe={[VM]:t.NEVER,[Sx]:t.ALWAYS,[WM]:t.LESS,[vx]:t.LEQUAL,[XM]:t.EQUAL,[yx]:t.GEQUAL,[jM]:t.GREATER,[YM]:t.NOTEQUAL};function st(A,E){if(E.type===Ei&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===fn||E.magFilter===Su||E.magFilter===Xo||E.magFilter===fr||E.minFilter===fn||E.minFilter===Su||E.minFilter===Xo||E.minFilter===fr)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(A,t.TEXTURE_WRAP_S,ze[E.wrapS]),t.texParameteri(A,t.TEXTURE_WRAP_T,ze[E.wrapT]),(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)&&t.texParameteri(A,t.TEXTURE_WRAP_R,ze[E.wrapR]),t.texParameteri(A,t.TEXTURE_MAG_FILTER,Mt[E.magFilter]),t.texParameteri(A,t.TEXTURE_MIN_FILTER,Mt[E.minFilter]),E.compareFunction&&(t.texParameteri(A,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(A,t.TEXTURE_COMPARE_FUNC,Oe[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===en||E.minFilter!==Xo&&E.minFilter!==fr||E.type===Ei&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");t.texParameterf(A,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function lt(A,E){let k=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",L),P(E));const re=E.source;let J=p.get(re);J===void 0&&(J={},p.set(re,J));const oe=K(E);if(oe!==A.__cacheKey){J[oe]===void 0&&(J[oe]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,k=!0),J[oe].usedTimes++;const ue=J[A.__cacheKey];ue!==void 0&&(J[A.__cacheKey].usedTimes--,ue.usedTimes===0&&X(E)),A.__cacheKey=oe,A.__webglTexture=J[oe].texture}return k}function qe(A,E,k){return Math.floor(Math.floor(A/k)/E)}function Bt(A,E,k,re){const oe=A.updateRanges;if(oe.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,E.width,E.height,k,re,E.data);else{oe.sort((N,j)=>N.start-j.start);let ue=0;for(let N=1;N<oe.length;N++){const j=oe[ue],z=oe[N],ae=j.start+j.count,ie=qe(z.start,E.width,4),se=qe(j.start,E.width,4);z.start<=ae+1&&ie===se&&qe(z.start+z.count-1,E.width,4)===ie?j.count=Math.max(j.count,z.start+z.count-j.start):(++ue,oe[ue]=z)}oe.length=ue+1;const Z=n.getParameter(t.UNPACK_ROW_LENGTH),Q=n.getParameter(t.UNPACK_SKIP_PIXELS),de=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,E.width);for(let N=0,j=oe.length;N<j;N++){const z=oe[N],ae=Math.floor(z.start/4),ie=Math.ceil(z.count/4),se=ae%E.width,Ee=Math.floor(ae/E.width),Ue=ie,ne=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,se),n.pixelStorei(t.UNPACK_SKIP_ROWS,Ee),n.texSubImage2D(t.TEXTURE_2D,0,se,Ee,Ue,ne,k,re,E.data)}A.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,Z),n.pixelStorei(t.UNPACK_SKIP_PIXELS,Q),n.pixelStorei(t.UNPACK_SKIP_ROWS,de)}}function wt(A,E,k){let re=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(re=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(re=t.TEXTURE_3D);const J=lt(A,E),oe=E.source;n.bindTexture(re,A.__webglTexture,t.TEXTURE0+k);const ue=i.get(oe);if(oe.version!==ue.__version||J===!0){if(n.activeTexture(t.TEXTURE0+k),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const ne=tt.getPrimaries(tt.workingColorSpace),Te=E.colorSpace===cr?null:tt.getPrimaries(E.colorSpace),Fe=E.colorSpace===cr||ne===Te?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe)}n.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment);let Q=g(E.image,!1,r.maxTextureSize);Q=fe(E,Q);const de=s.convert(E.format,E.colorSpace),N=s.convert(E.type);let j=w(E.internalFormat,de,N,E.normalized,E.colorSpace,E.isVideoTexture);st(re,E);let z;const ae=E.mipmaps,ie=E.isVideoTexture!==!0,se=ue.__version===void 0||J===!0,Ee=oe.dataReady,Ue=S(E,Q);if(E.isDepthTexture)j=f(E.format===hr,E.type),se&&(ie?n.texStorage2D(t.TEXTURE_2D,1,j,Q.width,Q.height):n.texImage2D(t.TEXTURE_2D,0,j,Q.width,Q.height,0,de,N,null));else if(E.isDataTexture)if(ae.length>0){ie&&se&&n.texStorage2D(t.TEXTURE_2D,Ue,j,ae[0].width,ae[0].height);for(let ne=0,Te=ae.length;ne<Te;ne++)z=ae[ne],ie?Ee&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,z.width,z.height,de,N,z.data):n.texImage2D(t.TEXTURE_2D,ne,j,z.width,z.height,0,de,N,z.data);E.generateMipmaps=!1}else ie?(se&&n.texStorage2D(t.TEXTURE_2D,Ue,j,Q.width,Q.height),Ee&&Bt(E,Q,de,N)):n.texImage2D(t.TEXTURE_2D,0,j,Q.width,Q.height,0,de,N,Q.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ie&&se&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ue,j,ae[0].width,ae[0].height,Q.depth);for(let ne=0,Te=ae.length;ne<Te;ne++)if(z=ae[ne],E.format!==wi)if(de!==null)if(ie){if(Ee)if(E.layerUpdates.size>0){const Fe=sg(z.width,z.height,E.format,E.type);for(const he of E.layerUpdates){const Xe=z.data.subarray(he*Fe/z.data.BYTES_PER_ELEMENT,(he+1)*Fe/z.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,he,z.width,z.height,1,de,Xe)}}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,0,z.width,z.height,Q.depth,de,z.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ne,j,z.width,z.height,Q.depth,0,z.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ie?Ee&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,0,z.width,z.height,Q.depth,de,N,z.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ne,j,z.width,z.height,Q.depth,0,de,N,z.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{ie&&se&&n.texStorage2D(t.TEXTURE_2D,Ue,j,ae[0].width,ae[0].height);for(let ne=0,Te=ae.length;ne<Te;ne++)z=ae[ne],E.format!==wi?de!==null?ie?Ee&&n.compressedTexSubImage2D(t.TEXTURE_2D,ne,0,0,z.width,z.height,de,z.data):n.compressedTexImage2D(t.TEXTURE_2D,ne,j,z.width,z.height,0,z.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?Ee&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,z.width,z.height,de,N,z.data):n.texImage2D(t.TEXTURE_2D,ne,j,z.width,z.height,0,de,N,z.data)}else if(E.isDataArrayTexture)if(ie){if(se&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ue,j,Q.width,Q.height,Q.depth),Ee)if(E.layerUpdates.size>0){const ne=sg(Q.width,Q.height,E.format,E.type);for(const Te of E.layerUpdates){const Fe=Q.data.subarray(Te*ne/Q.data.BYTES_PER_ELEMENT,(Te+1)*ne/Q.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Te,Q.width,Q.height,1,de,N,Fe)}E.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,de,N,Q.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,j,Q.width,Q.height,Q.depth,0,de,N,Q.data);else if(E.isData3DTexture)ie?(se&&n.texStorage3D(t.TEXTURE_3D,Ue,j,Q.width,Q.height,Q.depth),Ee&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,de,N,Q.data)):n.texImage3D(t.TEXTURE_3D,0,j,Q.width,Q.height,Q.depth,0,de,N,Q.data);else if(E.isFramebufferTexture){if(se)if(ie)n.texStorage2D(t.TEXTURE_2D,Ue,j,Q.width,Q.height);else{let ne=Q.width,Te=Q.height;for(let Fe=0;Fe<Ue;Fe++)n.texImage2D(t.TEXTURE_2D,Fe,j,ne,Te,0,de,N,null),ne>>=1,Te>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in t){const ne=t.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),Q.parentNode!==ne){ne.appendChild(Q),m.add(E),ne.onpaint=Te=>{const Fe=Te.changedElements;for(const he of m)Fe.includes(he.image)&&(he.needsUpdate=!0)},ne.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,Q);else{const Fe=t.RGBA,he=t.RGBA,Xe=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,Fe,he,Xe,Q)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(ae.length>0){if(ie&&se){const ne=me(ae[0]);n.texStorage2D(t.TEXTURE_2D,Ue,j,ne.width,ne.height)}for(let ne=0,Te=ae.length;ne<Te;ne++)z=ae[ne],ie?Ee&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,de,N,z):n.texImage2D(t.TEXTURE_2D,ne,j,de,N,z);E.generateMipmaps=!1}else if(ie){if(se){const ne=me(Q);n.texStorage2D(t.TEXTURE_2D,Ue,j,ne.width,ne.height)}Ee&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,de,N,Q)}else n.texImage2D(t.TEXTURE_2D,0,j,de,N,Q);x(E)&&E.mipmapsAutoUpdate===!0&&y(re),ue.__version=oe.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function rn(A,E,k){if(E.image.length!==6)return;const re=lt(A,E),J=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,A.__webglTexture,t.TEXTURE0+k);const oe=i.get(J);if(J.version!==oe.__version||re===!0){n.activeTexture(t.TEXTURE0+k);const ue=tt.getPrimaries(tt.workingColorSpace),Z=E.colorSpace===cr?null:tt.getPrimaries(E.colorSpace),Q=E.colorSpace===cr||ue===Z?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const de=E.isCompressedTexture||E.image[0].isCompressedTexture,N=E.image[0]&&E.image[0].isDataTexture,j=[];for(let he=0;he<6;he++)!de&&!N?j[he]=g(E.image[he],!0,r.maxCubemapSize):j[he]=N?E.image[he].image:E.image[he],j[he]=fe(E,j[he]);const z=j[0],ae=s.convert(E.format,E.colorSpace),ie=s.convert(E.type);let se=w(E.internalFormat,ae,ie,E.normalized,E.colorSpace);const Ee=E.isVideoTexture!==!0,Ue=oe.__version===void 0||re===!0,ne=J.dataReady;let Te=S(E,z);st(t.TEXTURE_CUBE_MAP,E);let Fe;if(E.isDepthTexture){if(se=f(E.format===hr,E.type),Ue)if(Ee)n.texStorage2D(t.TEXTURE_CUBE_MAP,1,se,z.width,z.height);else for(let he=0;he<6;he++)n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,se,z.width,z.height,0,ae,ie,null)}else if(de){Ee&&Ue&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Te,se,z.width,z.height);for(let he=0;he<6;he++){Fe=j[he].mipmaps;for(let Xe=0;Xe<Fe.length;Xe++){const ct=Fe[Xe];E.format!==wi?ae!==null?Ee?ne&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe,0,0,ct.width,ct.height,ae,ct.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe,se,ct.width,ct.height,0,ct.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ee?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe,0,0,ct.width,ct.height,ae,ie,ct.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe,se,ct.width,ct.height,0,ae,ie,ct.data)}}}else{if(Fe=E.mipmaps,Ee&&Ue){Fe.length>0&&Te++;const he=me(j[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Te,se,he.width,he.height)}for(let he=0;he<6;he++)if(N){Ee?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,j[he].width,j[he].height,ae,ie,j[he].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,se,j[he].width,j[he].height,0,ae,ie,j[he].data);for(let Xe=0;Xe<Fe.length;Xe++){const jt=Fe[Xe].image[he].image;Ee?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe+1,0,0,jt.width,jt.height,ae,ie,jt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe+1,se,jt.width,jt.height,0,ae,ie,jt.data)}}else{Ee?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,ae,ie,j[he]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,se,ae,ie,j[he]);for(let Xe=0;Xe<Fe.length;Xe++){const ct=Fe[Xe];Ee?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe+1,0,0,ae,ie,ct.image[he]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,Xe+1,se,ae,ie,ct.image[he])}}}x(E)&&E.mipmapsAutoUpdate===!0&&y(t.TEXTURE_CUBE_MAP),oe.__version=J.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function Ge(A,E,k,re,J,oe){const ue=s.convert(k.format,k.colorSpace),Z=s.convert(k.type),Q=w(k.internalFormat,ue,Z,k.normalized,k.colorSpace),de=i.get(E),N=i.get(k);if(N.__renderTarget=E,!de.__hasExternalTextures){const j=Math.max(1,E.width>>oe),z=Math.max(1,E.height>>oe);J===t.TEXTURE_3D||J===t.TEXTURE_2D_ARRAY?n.texImage3D(J,oe,Q,j,z,E.depth,0,ue,Z,null):n.texImage2D(J,oe,Q,j,z,0,ue,Z,null)}n.bindFramebuffer(t.FRAMEBUFFER,A),ve(E)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,re,J,N.__webglTexture,0,ht(E)):(J===t.TEXTURE_2D||J>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,re,J,N.__webglTexture,oe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Nt(A,E,k){if(t.bindRenderbuffer(t.RENDERBUFFER,A),E.depthBuffer){const re=E.depthTexture,J=re&&re.isDepthTexture?re.type:null,oe=f(E.stencilBuffer,J),ue=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;ve(E)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ht(E),oe,E.width,E.height):k?t.renderbufferStorageMultisample(t.RENDERBUFFER,ht(E),oe,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,oe,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ue,t.RENDERBUFFER,A)}else{const re=E.textures;for(let J=0;J<re.length;J++){const oe=re[J],ue=s.convert(oe.format,oe.colorSpace),Z=s.convert(oe.type),Q=w(oe.internalFormat,ue,Z,oe.normalized,oe.colorSpace);ve(E)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ht(E),Q,E.width,E.height):k?t.renderbufferStorageMultisample(t.RENDERBUFFER,ht(E),Q,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,Q,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ke(A,E,k){const re=E.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=i.get(E.depthTexture);J.__renderTarget=E;const oe=re?E.depthTexture.image[0]:E.depthTexture.image;(!J.__webglTexture||oe.width!==E.width||oe.height!==E.height)&&(oe.width=E.width,oe.height=E.height,E.depthTexture.needsUpdate=!0),re?xe(E.depthTexture,0):pe(E.depthTexture,0);const ue=J.__webglTexture,Z=ht(E),Q=re?t.TEXTURE_CUBE_MAP_POSITIVE_X+k:t.TEXTURE_2D,de=E.depthTexture.format===hr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(E.depthTexture.format===Tr)ve(E)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,de,Q,ue,0,Z):t.framebufferTexture2D(t.FRAMEBUFFER,de,Q,ue,0);else if(E.depthTexture.format===hr)ve(E)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,de,Q,ue,0,Z):t.framebufferTexture2D(t.FRAMEBUFFER,de,Q,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function mn(A){const E=i.get(A),k=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){const re=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),re){const J=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,re.removeEventListener("dispose",J)};re.addEventListener("dispose",J),E.__depthDisposeCallback=J}E.__boundDepthTexture=re}if(A.depthTexture&&!E.__autoAllocateDepthBuffer)if(k)for(let re=0;re<6;re++)Ke(E.__webglFramebuffer[re],A,re);else A.texture.mipmaps.length>0?Ke(E.__webglFramebuffer[0],A,0):Ke(E.__webglFramebuffer,A,0);else if(k){E.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[re]),E.__webglDepthbuffer[re]===void 0)E.__webglDepthbuffer[re]=t.createRenderbuffer(),Nt(E.__webglDepthbuffer[re],A,!1);else{const J=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=E.__webglDepthbuffer[re];t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,oe)}}else if(A.texture.mipmaps.length>0?n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=t.createRenderbuffer(),Nt(E.__webglDepthbuffer,A,!1);else{const J=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=E.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,oe)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function gn(A,E,k){const re=i.get(A);E!==void 0&&Ge(re.__webglFramebuffer,A,A.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),k!==void 0&&mn(A)}function _n(A){const E=A.texture,k=i.get(A),re=i.get(E);A.addEventListener("dispose",F),P(A);const J=A.textures,oe=A.isWebGLCubeRenderTarget===!0,ue=J.length>1;if(ue||(re.__webglTexture===void 0&&(re.__webglTexture=t.createTexture()),re.__version=E.version,a.memory.textures++),oe){k.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(E.mipmaps.length>0){k.__webglFramebuffer[Z]=[];for(let Q=0;Q<E.mipmaps.length;Q++)k.__webglFramebuffer[Z][Q]=t.createFramebuffer()}else k.__webglFramebuffer[Z]=t.createFramebuffer()}else{if(E.mipmaps.length>0){k.__webglFramebuffer=[];for(let Z=0;Z<E.mipmaps.length;Z++)k.__webglFramebuffer[Z]=t.createFramebuffer()}else k.__webglFramebuffer=t.createFramebuffer();if(ue)for(let Z=0,Q=J.length;Z<Q;Z++){const de=i.get(J[Z]);de.__webglTexture===void 0&&(de.__webglTexture=t.createTexture(),a.memory.textures++)}if(A.samples>0&&ve(A)===!1){k.__webglMultisampledFramebuffer=t.createFramebuffer(),k.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Z=0;Z<J.length;Z++){const Q=J[Z];k.__webglColorRenderbuffer[Z]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,k.__webglColorRenderbuffer[Z]);const de=s.convert(Q.format,Q.colorSpace),N=s.convert(Q.type),j=w(Q.internalFormat,de,N,Q.normalized,Q.colorSpace,A.isXRRenderTarget===!0),z=ht(A);t.renderbufferStorageMultisample(t.RENDERBUFFER,z,j,A.width,A.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Z,t.RENDERBUFFER,k.__webglColorRenderbuffer[Z])}t.bindRenderbuffer(t.RENDERBUFFER,null),A.depthBuffer&&(k.__webglDepthRenderbuffer=t.createRenderbuffer(),Nt(k.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(oe){n.bindTexture(t.TEXTURE_CUBE_MAP,re.__webglTexture),st(t.TEXTURE_CUBE_MAP,E);for(let Z=0;Z<6;Z++)if(E.mipmaps.length>0)for(let Q=0;Q<E.mipmaps.length;Q++)Ge(k.__webglFramebuffer[Z][Q],A,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Q);else Ge(k.__webglFramebuffer[Z],A,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);x(E)?y(t.TEXTURE_CUBE_MAP):E.mipmaps.length>0&&t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),n.unbindTexture()}else if(ue){for(let Z=0,Q=J.length;Z<Q;Z++){const de=J[Z],N=i.get(de);let j=t.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(j=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(j,N.__webglTexture),st(j,de),Ge(k.__webglFramebuffer,A,de,t.COLOR_ATTACHMENT0+Z,j,0),x(de)&&y(j)}n.unbindTexture()}else{let Z=t.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Z=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Z,re.__webglTexture),st(Z,E),E.mipmaps.length>0)for(let Q=0;Q<E.mipmaps.length;Q++)Ge(k.__webglFramebuffer[Q],A,E,t.COLOR_ATTACHMENT0,Z,Q);else Ge(k.__webglFramebuffer,A,E,t.COLOR_ATTACHMENT0,Z,0);x(E)?y(Z):E.mipmaps.length>0&&t.texParameteri(Z,t.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),n.unbindTexture()}A.depthBuffer&&mn(A)}function O(A){const E=A.textures;for(let k=0,re=E.length;k<re;k++){const J=E[k];if(x(J)&&J.mipmapsAutoUpdate===!0){const oe=T(A),ue=i.get(J).__webglTexture;n.bindTexture(oe,ue),y(oe),n.unbindTexture()}}}const xn=[];function ft(A){if(A.samples>0){if(ve(A)===!1){const E=A.textures,k=A.width,re=A.height;let J=t.COLOR_BUFFER_BIT;const oe=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ue=i.get(A),Z=E.length>1;if(Z)for(let de=0;de<E.length;de++)n.bindFramebuffer(t.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ue.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let de=0;de<E.length;de++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(J|=t.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(J|=t.STENCIL_BUFFER_BIT)),Z){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);const N=i.get(E[de]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,N,0)}t.blitFramebuffer(0,0,k,re,0,0,k,re,J,t.NEAREST),l===!0&&(xn.length=0,xn.push(t.COLOR_ATTACHMENT0+de),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&xn.push(oe),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,xn))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Z)for(let de=0;de<E.length;de++){n.bindFramebuffer(t.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);const N=i.get(E[de]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ue.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.TEXTURE_2D,N,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const E=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[E])}}}function ht(A){return Math.min(r.maxSamples,A.samples)}function ve(A){const E=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ae(A){const E=a.render.frame;h.get(A)!==E&&(h.set(A,E),A.update())}function fe(A,E){const k=A.colorSpace,re=A.format,J=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||k!==mc&&k!==cr&&(tt.getTransfer(k)===ut?(re!==wi||J!==zn)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",k)),E}function me(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=ke,this.resetTextureUnits=$,this.getTextureUnits=te,this.setTextureUnits=_e,this.setTexture2D=pe,this.setTexture2DArray=Se,this.setTexture3D=Le,this.setTextureCube=xe,this.rebindTextures=gn,this.setupRenderTarget=_n,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=mn,this.setupFrameBufferTexture=Ge,this.useMultisampledRTT=ve,this.dispose=Y}function LA(t,e){function n(i,r=cr){let s;const a=tt.getTransfer(r);if(i===zn)return t.UNSIGNED_BYTE;if(i===Oh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===kh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===px)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===mx)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===fx)return t.BYTE;if(i===hx)return t.SHORT;if(i===po)return t.UNSIGNED_SHORT;if(i===Fh)return t.INT;if(i===Ri)return t.UNSIGNED_INT;if(i===Ei)return t.FLOAT;if(i===Ci)return t.HALF_FLOAT;if(i===gx)return t.ALPHA;if(i===_x)return t.RGB;if(i===wi)return t.RGBA;if(i===Tr)return t.DEPTH_COMPONENT;if(i===hr)return t.DEPTH_STENCIL;if(i===xx)return t.RED;if(i===Bh)return t.RED_INTEGER;if(i===Qr)return t.RG;if(i===zh)return t.RG_INTEGER;if(i===Hh)return t.RGBA_INTEGER;if(i===Ol||i===kl||i===Bl||i===zl)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ol)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===kl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Bl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===zl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ol)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===kl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Bl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===zl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===nf||i===rf||i===sf||i===af)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===nf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===rf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===sf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===af)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===of||i===lf||i===cf||i===uf||i===df||i===hc||i===ff)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===of||i===lf)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===cf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===uf)return s.COMPRESSED_R11_EAC;if(i===df)return s.COMPRESSED_SIGNED_R11_EAC;if(i===hc)return s.COMPRESSED_RG11_EAC;if(i===ff)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===hf||i===pf||i===mf||i===gf||i===_f||i===xf||i===vf||i===yf||i===Sf||i===Mf||i===Ef||i===wf||i===Tf||i===bf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===hf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===pf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===mf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===gf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_f)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===yf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Mf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ef)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===wf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Tf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===bf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Af||i===Rf||i===Cf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Af)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Rf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Pf||i===Nf||i===pc||i===Lf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Pf)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Nf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===pc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Lf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===na?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const DA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,IA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class UA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Fx(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new es({vertexShader:DA,fragmentShader:IA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Bn(new Wc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class FA extends Nr{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,m=null,d=null,p=null,v=null;const M=typeof XRWebGLBinding<"u",_=new UA,u={},g=n.getContextAttributes();let x=null,y=null;const T=[],w=[],f=new Ie;let S=null,P=null;const C=new Jn;C.viewport=new Rt;const L=new Jn;L.viewport=new Rt;const F=[C,L],H=new WE;let D=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let pe=T[K];return pe===void 0&&(pe=new Cu,T[K]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(K){let pe=T[K];return pe===void 0&&(pe=new Cu,T[K]=pe),pe.getGripSpace()},this.getHand=function(K){let pe=T[K];return pe===void 0&&(pe=new Cu,T[K]=pe),pe.getHandSpace()};function ee(K){const pe=w.indexOf(K.inputSource);if(pe===-1)return;const Se=T[pe];Se!==void 0&&(Se.update(K.inputSource,K.frame,c||a),Se.dispatchEvent({type:K.type,data:K.inputSource}))}function X(){r.removeEventListener("select",ee),r.removeEventListener("selectstart",ee),r.removeEventListener("selectend",ee),r.removeEventListener("squeeze",ee),r.removeEventListener("squeezestart",ee),r.removeEventListener("squeezeend",ee),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",V);for(let K=0;K<T.length;K++){const pe=w[K];pe!==null&&(w[K]=null,T[K].disconnect(pe))}D=null,Y=null,_.reset();for(const K in u)delete u[K];if(e.setRenderTarget(x),p=null,d=null,m=null,r=null,y=null,ke.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(f.width,f.height,!1),P!==null){const K=P.camera;K.fov=P.fov,K.zoom=P.zoom,K.updateProjectionMatrix(),P=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return m===null&&M&&(m=new XRWebGLBinding(r,n)),m},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(x=e.getRenderTarget(),r.addEventListener("select",ee),r.addEventListener("selectstart",ee),r.addEventListener("selectend",ee),r.addEventListener("squeeze",ee),r.addEventListener("squeezestart",ee),r.addEventListener("squeezeend",ee),r.addEventListener("end",X),r.addEventListener("inputsourceschange",V),g.xrCompatible!==!0&&await n.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(f),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Le=null,xe=null;g.depth&&(xe=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Se=g.stencil?hr:Tr,Le=g.stencil?na:Ri);const ze={colorFormat:n.RGBA8,depthFormat:xe,scaleFactor:s};m=this.getBinding(),d=m.createProjectionLayer(ze),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Ai(d.textureWidth,d.textureHeight,{format:wi,type:zn,depthTexture:new ia(d.textureWidth,d.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const Se={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,Se),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Ai(p.framebufferWidth,p.framebufferHeight,{format:wi,type:zn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function V(K){for(let pe=0;pe<K.removed.length;pe++){const Se=K.removed[pe],Le=w.indexOf(Se);Le>=0&&(w[Le]=null,T[Le].disconnect(Se))}for(let pe=0;pe<K.added.length;pe++){const Se=K.added[pe];let Le=w.indexOf(Se);if(Le===-1){for(let ze=0;ze<T.length;ze++)if(ze>=w.length){w.push(Se),Le=ze;break}else if(w[ze]===null){w[ze]=Se,Le=ze;break}if(Le===-1)break}const xe=T[Le];xe&&xe.connect(Se)}}function B(K,pe){pe===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(pe.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let pe=K.near,Se=K.far;_.texture!==null&&(_.depthNear>0&&(pe=_.depthNear),_.depthFar>0&&(Se=_.depthFar)),H.near=L.near=C.near=pe,H.far=L.far=C.far=Se,(D!==H.near||Y!==H.far)&&(r.updateRenderState({depthNear:H.near,depthFar:H.far}),D=H.near,Y=H.far),H.layers.mask=K.layers.mask|6,C.layers.mask=H.layers.mask&-5,L.layers.mask=H.layers.mask&-3;const Le=K.parent,xe=H.cameras;B(H,Le);for(let ze=0;ze<xe.length;ze++)B(xe[ze],Le);H.projectionMatrix.copy(C.projectionMatrix),H.projectionMatrixInverse.copy(C.projectionMatrixInverse),P===null&&K.isPerspectiveCamera&&(P={camera:K,fov:K.fov,zoom:K.zoom}),$(K,H,Le)};function $(K,pe,Se){Se===null?K.matrix.copy(pe.matrixWorld):(K.matrix.copy(Se.matrixWorld),K.matrix.invert(),K.matrix.multiply(pe.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(pe.projectionMatrix),K.projectionMatrixInverse.copy(pe.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=If*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(H)},this.getCameraTexture=function(K){return u[K]};let te=null;function _e(K,pe){if(h=pe.getViewerPose(c||a),v=pe,h!==null){const Se=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Le=!1;Se.length!==H.cameras.length&&(H.cameras.length=0,Le=!0);for(let Oe=0;Oe<Se.length;Oe++){const st=Se[Oe];let lt=null;if(p!==null)lt=p.getViewport(st);else{const Bt=m.getViewSubImage(d,st);lt=Bt.viewport,Oe===0&&(e.setRenderTargetTextures(y,Bt.colorTexture,Bt.depthStencilTexture),e.setRenderTarget(y))}let qe=F[Oe];qe===void 0&&(qe=new Jn,qe.layers.enable(Oe),qe.viewport=new Rt,F[Oe]=qe),qe.matrix.fromArray(st.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(st.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(lt.x,lt.y,lt.width,lt.height),Oe===0&&(H.matrix.copy(qe.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Le===!0&&H.cameras.push(qe)}const xe=r.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){m=i.getBinding();const Oe=m.getDepthInformation(Se[0]);Oe&&Oe.isValid&&Oe.texture&&_.init(Oe,r.renderState)}if(xe&&xe.includes("camera-access")&&M){e.state.unbindTexture(),m=i.getBinding();for(let Oe=0;Oe<Se.length;Oe++){const st=Se[Oe].camera;if(st){let lt=u[st];lt||(lt=new Fx,u[st]=lt);const qe=m.getCameraImage(st);lt.sourceTexture=qe}}}}for(let Se=0;Se<T.length;Se++){const Le=w[Se],xe=T[Se];Le!==null&&xe!==void 0&&xe.update(Le,pe,c||a)}te&&te(K,pe),pe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pe}),v=null}const ke=new Hx;ke.setAnimationLoop(_e),this.setAnimationLoop=function(K){te=K},this.dispose=function(){}}}const OA=new mt,Zx=new Ve;Zx.set(-1,0,0,0,1,0,0,0,1);function kA(t,e){function n(_,u){_.matrixAutoUpdate===!0&&_.updateMatrix(),u.value.copy(_.matrix)}function i(_,u){u.color.getRGB(_.fogColor.value,Ox(t)),u.isFog?(_.fogNear.value=u.near,_.fogFar.value=u.far):u.isFogExp2&&(_.fogDensity.value=u.density)}function r(_,u,g,x,y){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?s(_,u):u.isMeshLambertMaterial?(s(_,u),u.envMap&&(_.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(s(_,u),m(_,u)):u.isMeshPhongMaterial?(s(_,u),h(_,u),u.envMap&&(_.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(s(_,u),d(_,u),u.isMeshPhysicalMaterial&&p(_,u,y)):u.isMeshMatcapMaterial?(s(_,u),v(_,u)):u.isMeshDepthMaterial?s(_,u):u.isMeshDistanceMaterial?(s(_,u),M(_,u)):u.isMeshNormalMaterial?s(_,u):u.isLineBasicMaterial?(a(_,u),u.isLineDashedMaterial&&o(_,u)):u.isPointsMaterial?l(_,u,g,x):u.isSpriteMaterial?c(_,u):u.isShadowMaterial?(_.color.value.copy(u.color),_.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(_,u){_.opacity.value=u.opacity,u.color&&_.diffuse.value.copy(u.color),u.emissive&&_.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(_.map.value=u.map,n(u.map,_.mapTransform)),u.alphaMap&&(_.alphaMap.value=u.alphaMap,n(u.alphaMap,_.alphaMapTransform)),u.bumpMap&&(_.bumpMap.value=u.bumpMap,n(u.bumpMap,_.bumpMapTransform),_.bumpScale.value=u.bumpScale,u.side===Ln&&(_.bumpScale.value*=-1)),u.normalMap&&(_.normalMap.value=u.normalMap,n(u.normalMap,_.normalMapTransform),_.normalScale.value.copy(u.normalScale),u.side===Ln&&_.normalScale.value.negate()),u.displacementMap&&(_.displacementMap.value=u.displacementMap,n(u.displacementMap,_.displacementMapTransform),_.displacementScale.value=u.displacementScale,_.displacementBias.value=u.displacementBias),u.emissiveMap&&(_.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,_.emissiveMapTransform)),u.specularMap&&(_.specularMap.value=u.specularMap,n(u.specularMap,_.specularMapTransform)),u.alphaTest>0&&(_.alphaTest.value=u.alphaTest);const g=e.get(u),x=g.envMap,y=g.envMapRotation;x&&(_.envMap.value=x,_.envMapRotation.value.setFromMatrix4(OA.makeRotationFromEuler(y)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&_.envMapRotation.value.premultiply(Zx),_.reflectivity.value=u.reflectivity,_.ior.value=u.ior,_.refractionRatio.value=u.refractionRatio),u.lightMap&&(_.lightMap.value=u.lightMap,_.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,_.lightMapTransform)),u.aoMap&&(_.aoMap.value=u.aoMap,_.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,_.aoMapTransform))}function a(_,u){_.diffuse.value.copy(u.color),_.opacity.value=u.opacity,u.map&&(_.map.value=u.map,n(u.map,_.mapTransform))}function o(_,u){_.dashSize.value=u.dashSize,_.totalSize.value=u.dashSize+u.gapSize,_.scale.value=u.scale}function l(_,u,g,x){_.diffuse.value.copy(u.color),_.opacity.value=u.opacity,_.size.value=u.size*g,_.scale.value=x*.5,u.map&&(_.map.value=u.map,n(u.map,_.uvTransform)),u.alphaMap&&(_.alphaMap.value=u.alphaMap,n(u.alphaMap,_.alphaMapTransform)),u.alphaTest>0&&(_.alphaTest.value=u.alphaTest)}function c(_,u){_.diffuse.value.copy(u.color),_.opacity.value=u.opacity,_.rotation.value=u.rotation,u.map&&(_.map.value=u.map,n(u.map,_.mapTransform)),u.alphaMap&&(_.alphaMap.value=u.alphaMap,n(u.alphaMap,_.alphaMapTransform)),u.alphaTest>0&&(_.alphaTest.value=u.alphaTest)}function h(_,u){_.specular.value.copy(u.specular),_.shininess.value=Math.max(u.shininess,1e-4)}function m(_,u){u.gradientMap&&(_.gradientMap.value=u.gradientMap)}function d(_,u){_.metalness.value=u.metalness,u.metalnessMap&&(_.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,_.metalnessMapTransform)),_.roughness.value=u.roughness,u.roughnessMap&&(_.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,_.roughnessMapTransform)),u.envMap&&(_.envMapIntensity.value=u.envMapIntensity)}function p(_,u,g){_.ior.value=u.ior,u.diffuseRoughness>0&&(_.diffuseRoughness.value=u.diffuseRoughness,u.diffuseRoughnessMap&&(_.diffuseRoughnessMap.value=u.diffuseRoughnessMap,n(u.diffuseRoughnessMap,_.diffuseRoughnessMapTransform))),u.sheen>0&&(_.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),_.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(_.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,_.sheenColorMapTransform)),u.sheenRoughnessMap&&(_.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,_.sheenRoughnessMapTransform))),u.clearcoat>0&&(_.clearcoat.value=u.clearcoat,_.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(_.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,_.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(_.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ln&&_.clearcoatNormalScale.value.negate())),u.dispersion>0&&(_.dispersion.value=u.dispersion),u.retroreflectivity>0&&(_.retroreflectivity.value=u.retroreflectivity),u.iridescence>0&&(_.iridescence.value=u.iridescence,_.iridescenceIOR.value=u.iridescenceIOR,_.iridescenceThicknessMinimum.value=u.iridescenceThicknessMinimum,_.iridescenceThicknessMaximum.value=u.iridescenceThicknessMaximum,u.iridescenceMap&&(_.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,_.iridescenceMapTransform)),u.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),u.transmission>0&&(_.transmission.value=u.transmission,_.transmissionSamplerMap.value=g.texture,_.transmissionSamplerSize.value.set(g.width,g.height),u.transmissionMap&&(_.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,_.transmissionMapTransform)),_.thickness.value=u.thickness,u.thicknessMap&&(_.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=u.attenuationDistance,_.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(_.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(_.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=u.specularIntensity,_.specularColor.value.copy(u.specularColor),u.specularColorMap&&(_.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,_.specularColorMapTransform)),u.specularIntensityMap&&(_.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,_.specularIntensityMapTransform))}function v(_,u){u.matcap&&(_.matcap.value=u.matcap)}function M(_,u){const g=e.get(u).light;_.referencePosition.value.setFromMatrixPosition(g.matrixWorld),_.nearDistance.value=g.shadow.camera.near,_.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function BA(t,e,n,i){let r={},s={};function a(g,x){const y=x.program;i.uniformBlockBinding(g,y,r[g.id])}function o(g,x){let y=r[g.id];y===void 0&&(v(g),y=l(g),r[g.id]=y,g.addEventListener("dispose",_));const T=x.program;i.updateUBOMapping(g,T);const w=e.render.frame;s[g.id]!==w&&(c(g),s[g.id]=w)}function l(g){const x=t.createBuffer(),y=g.__size,T=g.usage;return t.bindBuffer(t.UNIFORM_BUFFER,x),t.bufferData(t.UNIFORM_BUFFER,y,T),t.bindBuffer(t.UNIFORM_BUFFER,null),x}function c(g){const x=r[g.id],y=g.uniforms,T=g.__cache;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let w=0,f=y.length;w<f;w++){const S=y[w];if(Array.isArray(S))for(let P=0,C=S.length;P<C;P++)h(S[P],w,P,T);else h(S,w,0,T)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function h(g,x,y,T){if(d(g,x,y,T)===!0){const w=g.__offset,f=g.value;if(Array.isArray(f)){let S=0;for(let P=0;P<f.length;P++){const C=f[P],L=M(C,!0);m(C,g.__data,S),S+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else m(f,g.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,w,g.__data)}}function m(g,x,y){typeof g=="number"||typeof g=="boolean"?x[y]=g:g.isMatrix3?(x[y]=g.elements[0],x[y+1]=g.elements[1],x[y+2]=g.elements[2],x[y+3]=0,x[y+4]=g.elements[3],x[y+5]=g.elements[4],x[y+6]=g.elements[5],x[y+7]=0,x[y+8]=g.elements[6],x[y+9]=g.elements[7],x[y+10]=g.elements[8],x[y+11]=0):ArrayBuffer.isView(g)?x.set(g.subarray(0,x.length-y),y):g.toArray(x,y)}function d(g,x,y,T){const w=g.value,f=x+"_"+y;if(Array.isArray(w)){T[f]===void 0&&(T[f]=[]);const S=T[f];let P=!1;for(let C=0;C<w.length;C++)p(w[C],S,C)===!0&&(P=!0);return P}return p(w,T,f)}function p(g,x,y){if(x[y]===void 0)return typeof g=="number"||typeof g=="boolean"?x[y]=g:ArrayBuffer.isView(g)?x[y]=g.slice():x[y]=g.clone(),!0;{const T=x[y];if(typeof g=="number"||typeof g=="boolean"){if(T!==g)return x[y]=g,!0}else{if(ArrayBuffer.isView(g))return!0;if(T.equals(g)===!1)return T.copy(g),!0}}return!1}function v(g){const x=g.uniforms;let y=0;const T=16;for(let f=0,S=x.length;f<S;f++){const P=Array.isArray(x[f])?x[f]:[x[f]];for(let C=0,L=P.length;C<L;C++){const F=P[C],H=Array.isArray(F.value)?F.value:[F.value],D=Array.isArray(x[f])||Array.isArray(F.value);let Y=y;for(let X=0,V=H.length;X<V;X++){const B=H[X],$=M(B,D),te=y%T,_e=te%$.boundary,ke=te+_e;y+=_e,ke!==0&&T-ke<$.storage&&(y+=T-ke),X===0&&(Y=y),y+=$.storage}const ee=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new ee((y-Y)/Float32Array.BYTES_PER_ELEMENT),F.__offset=Y}}const w=y%T;return w>0&&(y+=T-w),g.__size=y,g.__cache={},this}function M(g,x){const y={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(y.boundary=4,y.storage=4):g.isVector2?(y.boundary=8,y.storage=8):g.isVector3||g.isColor?(y.boundary=16,y.storage=12):g.isVector4?(y.boundary=16,y.storage=16):g.isMatrix3?(y.boundary=16,y.storage=48):g.isMatrix4?(y.boundary=16,y.storage=64):g.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(g)?(y.boundary=16,y.storage=g.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",g),x===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function _(g){const x=g.target;x.removeEventListener("dispose",_),t.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function u(){for(const g in r)t.deleteBuffer(r[g]);r={},s={}}return{bind:a,update:o,dispose:u}}const zA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let vi=null;function HA(){return vi===null&&(vi=new wE(zA,16,16,Qr,Ci),vi.name="DFG_LUT",vi.minFilter=fn,vi.magFilter=fn,vi.wrapS=Vi,vi.wrapT=Vi,vi.generateMipmaps=!1,vi.needsUpdate=!0),vi}class GA{constructor(e={}){const{canvas:n=qM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:d=!1,outputBufferType:p=zn}=e;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=a;const M=p,_=new Set([Hh,zh,Bh]),u=new Set([zn,Ri,po,na,Oh,kh]),g=new Uint32Array(4),x=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]};let T=null,w=null;const f=[],S=[];let P=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let L=!1,F=null,H=null,D=null,Y=null;this._outputColorSpace=qn;let ee=0,X=0,V=null,B=-1,$=null;const te=new Rt,_e=new Rt;let ke=null;const K=new $e(0);let pe=0,Se=n.width,Le=n.height,xe=1,ze=null,Mt=null;const Oe=new Rt(0,0,Se,Le),st=new Rt(0,0,Se,Le);let lt=!1;const qe=new go,Bt=new Xh;let wt=!1,rn=!1;const Ge=new mt,Nt=new U,Ke=new Rt,mn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gn=!1;function _n(){return V===null?xe:1}let O=i;function xn(b,I){return n.getContext(b,I)}let ft,ht,ve,Ae,fe,me,A,E,k,re,J,oe,ue,Z,Q,de,N,j,z,ae,ie,se,Ee;try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:m};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Uh}`),n.addEventListener("webglcontextlost",Te,!1),n.addEventListener("webglcontextrestored",Fe,!1),n.addEventListener("webglcontextcreationerror",he,!1),O===null){const I="webgl2";if(O=xn(I,b),O===null)throw xn(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ue()}catch(b){throw n.removeEventListener("webglcontextlost",Te,!1),n.removeEventListener("webglcontextrestored",Fe,!1),n.removeEventListener("webglcontextcreationerror",he,!1),it("WebGLRenderer: "+b.message),b}function Ue(){ft=new XT(O),ft.init(),ie=new LA(O,ft),ht=new IT(O,ft,e,ie),ve=new PA(O,ft),ht.reversedDepthBuffer&&d&&ve.buffers.depth.setReversed(!0),H=O.createFramebuffer(),D=O.createFramebuffer(),Y=O.createFramebuffer(),Ae=new $T(O),fe=new gA,me=new NA(O,ft,ve,fe,ht,ie,Ae),A=new WT(C),E=new KE(O),se=new LT(O,E),k=new jT(O,E,Ae,se),re=new KT(O,k,E,se,Ae),j=new qT(O,ht,me),Q=new UT(fe),J=new mA(C,A,ft,ht,se,Q),oe=new kA(C,fe),ue=new xA,Z=new wA(ft),N=new NT(C,A,ve,re,v,l),de=new CA(C,re,ht),Ee=new BA(O,Ae,ht,ve),z=new DT(O,ft,Ae),ae=new YT(O,ft,Ae),Ae.programs=J.programs,C.capabilities=ht,C.extensions=ft,C.properties=fe,C.renderLists=ue,C.shadowMap=de,C.state=ve,C.info=Ae}M!==zn&&(P=new JT(M,n.width,n.height,o,r,s));const ne=new FA(C,O);this.xr=ne,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const b=ft.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ft.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return xe},this.setPixelRatio=function(b){b!==void 0&&(xe=b,this.setSize(Se,Le,!1))},this.getSize=function(b){return b.set(Se,Le)},this.setSize=function(b,I,q=!0){if(ne.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}Se=b,Le=I,n.width=Math.floor(b*xe),n.height=Math.floor(I*xe),q===!0&&(n.style.width=b+"px",n.style.height=I+"px"),P!==null&&P.setSize(n.width,n.height),this.setViewport(0,0,b,I)},this.getDrawingBufferSize=function(b){return b.set(Se*xe,Le*xe).floor()},this.setDrawingBufferSize=function(b,I,q){Se=b,Le=I,xe=q,n.width=Math.floor(b*q),n.height=Math.floor(I*q),this.setViewport(0,0,b,I)},this.setEffects=function(b){if(M===zn){it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let I=0;I<b.length;I++)if(b[I].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(te)},this.getViewport=function(b){return b.copy(Oe)},this.setViewport=function(b,I,q,G){b.isVector4?Oe.set(b.x,b.y,b.z,b.w):Oe.set(b,I,q,G),ve.viewport(te.copy(Oe).multiplyScalar(_n()).round())},this.getScissor=function(b){return b.copy(st)},this.setScissor=function(b,I,q,G){b.isVector4?st.set(b.x,b.y,b.z,b.w):st.set(b,I,q,G),ve.scissor(_e.copy(st).multiplyScalar(_n()).round())},this.getScissorTest=function(){return lt},this.setScissorTest=function(b){ve.setScissorTest(lt=b)},this.setOpaqueSort=function(b){ze=b},this.setTransparentSort=function(b){Mt=b},this.getClearColor=function(b){return b.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(b=!0,I=!0,q=!0){let G=0;if(b){let W=!1;if(V!==null){const ye=V.texture.format;W=_.has(ye)}if(W){const ye=V.texture.type,Ce=u.has(ye),ge=N.getClearColor(),we=N.getClearAlpha(),De=ge.r,We=ge.g,Qe=ge.b;Ce?(g[0]=De,g[1]=We,g[2]=Qe,g[3]=we,O.clearBufferuiv(O.COLOR,0,g)):(x[0]=De,x[1]=We,x[2]=Qe,x[3]=we,O.clearBufferiv(O.COLOR,0,x))}else G|=O.COLOR_BUFFER_BIT}I&&(G|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),F=b},this.dispose=function(){n.removeEventListener("webglcontextlost",Te,!1),n.removeEventListener("webglcontextrestored",Fe,!1),n.removeEventListener("webglcontextcreationerror",he,!1),N.dispose(),ue.dispose(),Z.dispose(),me.dispose(),fe.dispose(),A.dispose(),re.dispose(),k.dispose(),se.dispose(),Ee.dispose(),J.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",He),ne.removeEventListener("sessionend",be),Ze.stop()};function Te(b){b.preventDefault(),xc("WebGLRenderer: Context Lost."),L=!0}function Fe(){xc("WebGLRenderer: Context Restored."),L=!1;const b=Ae.autoReset,I=de.enabled,q=de.autoUpdate,G=de.needsUpdate,W=de.type;Ue(),Ae.autoReset=b,de.enabled=I,de.autoUpdate=q,de.needsUpdate=G,de.type=W}function he(b){it("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Xe(b){const I=b.target;I.removeEventListener("dispose",Xe),ct(I)}function ct(b){jt(b),fe.remove(b)}function jt(b){const I=fe.get(b).programs;I!==void 0&&(I.forEach(function(q){J.releaseProgram(q)}),b.isShaderMaterial&&J.releaseShaderCache(b))}this.renderBufferDirect=function(b,I,q,G,W,ye){I===null&&(I=mn);const Ce=W.isMesh&&W.matrixWorld.determinantAffine()<0,ge=ev(b,I,q,G,W);ve.setMaterial(G,Ce);let we=q.index,De=1;if(G.wireframe===!0){if(we=k.getWireframeAttribute(q),we===void 0)return;De=2}const We=q.drawRange,Qe=q.attributes.position;let Pe=We.start*De,et=(We.start+We.count)*De;ye!==null&&(Pe=Math.max(Pe,ye.start*De),et=Math.min(et,(ye.start+ye.count)*De)),we!==null?(Pe=Math.max(Pe,0),et=Math.min(et,we.count)):Qe!=null&&(Pe=Math.max(Pe,0),et=Math.min(et,Qe.count));const Ft=et-Pe;if(Ft<0||Ft===1/0)return;se.setup(W,G,ge,q,we);let _t,pt=z;if(we!==null&&(_t=E.get(we),pt=ae,pt.setIndex(_t)),W.isMesh)G.wireframe===!0?(ve.setLineWidth(G.wireframeLinewidth*_n()),pt.setMode(O.LINES)):pt.setMode(O.TRIANGLES);else if(W.isLine){let sn=G.linewidth;sn===void 0&&(sn=1),ve.setLineWidth(sn*_n()),W.isLineSegments?pt.setMode(O.LINES):W.isLineLoop?pt.setMode(O.LINE_LOOP):pt.setMode(O.LINE_STRIP)}else W.isPoints?pt.setMode(O.POINTS):W.isSprite&&pt.setMode(O.TRIANGLES);if(W.isBatchedMesh)if(ft.get("WEBGL_multi_draw"))pt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const sn=W._multiDrawStarts,Ne=W._multiDrawCounts,vn=W._multiDrawCount,at=we?E.get(we).bytesPerElement:1,Dr=fe.get(G).currentProgram.getUniforms();for(let an=0;an<vn;an++)Dr.setValue(O,"_gl_DrawID",an),pt.render(sn[an]/at,Ne[an])}else if(W.isInstancedMesh)pt.renderInstances(Pe,Ft,W.count);else if(q.isInstancedBufferGeometry){const sn=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ne=Math.min(q.instanceCount,sn);pt.renderInstances(Pe,Ft,Ne)}else pt.render(Pe,Ft)};function Yn(b,I,q,G){F!==null&&b.isNodeMaterial&&F.setObject(G,b),wt===!0&&Q.setState(b,q,!1),b.transparent===!0&&b.side===fi&&b.forceSinglePass===!1?(b.side=Ln,b.needsUpdate=!0,da(b,I,G),b.side=Jr,b.needsUpdate=!0,da(b,I,G),b.side=fi):da(b,I,G)}this.compile=function(b,I,q=null){q===null&&(q=b),F!==null&&F.renderStart(b,I,q),w=Z.get(q),w.init(I),S.push(w),q.traverseVisible(function(W){W.isLight&&W.layers.test(I.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),b!==q&&b.traverseVisible(function(W){W.isLight&&W.layers.test(I.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),w.setupLights(),F!==null&&F.updateLights(w.state.lightsArray),rn=this.localClippingEnabled,wt=Q.init(this.clippingPlanes,rn),wt===!0&&Q.setGlobalState(this.clippingPlanes,I),F!==null&&de.render(w.state.shadowsArray,q,I);const G=new Set;return b.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const ye=W.material;if(ye)if(Array.isArray(ye))for(let Ce=0;Ce<ye.length;Ce++){const ge=ye[Ce];Yn(ge,q,I,W),G.add(ge)}else Yn(ye,q,I,W),G.add(ye)}),w=S.pop(),F!==null&&F.renderEnd(),G},this.compileAsync=function(b,I,q=null){const G=this.compile(b,I,q);return new Promise(W=>{function ye(){if(G.forEach(function(Ce){const we=fe.get(Ce).currentProgram;(we===void 0||we.isReady())&&G.delete(Ce)}),G.size===0){W(b);return}setTimeout(ye,10)}ft.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let In=null;function Un(b){In&&In(b)}function He(){Ze.stop()}function be(){Ze.start()}const Ze=new Hx;Ze.setAnimationLoop(Un),typeof self<"u"&&Ze.setContext(self),this.setAnimationLoop=function(b){In=b,ne.setAnimationLoop(b),b===null?Ze.stop():Ze.start()},ne.addEventListener("sessionstart",He),ne.addEventListener("sessionend",be),this.render=function(b,I){if(I!==void 0&&I.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;F!==null&&F.renderStart(b,I);const q=ne.enabled===!0&&ne.isPresenting===!0,G=P!==null&&(V===null||q)&&P.begin(C,V);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(I),I=ne.getCamera()),b.isScene===!0&&b.onBeforeRender(C,b,I,V),w=Z.get(b,S.length),w.init(I),w.state.textureUnits=me.getTextureUnits(),S.push(w),Ge.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),I.isArrayCamera?Bt.setFromArrayCamera(I):qe.setFromProjectionMatrix(Ge,hi,I.reversedDepth),rn=this.localClippingEnabled,wt=Q.init(this.clippingPlanes,rn),T=ue.get(b,f.length),T.init(),f.push(T),this.info.render.frame++,ne.enabled===!0&&ne.isPresenting===!0){const Ce=C.xr.getDepthSensingMesh();Ce!==null&&Tt(Ce,I,-1/0,C.sortObjects)}Tt(b,I,0,C.sortObjects),T.finish(),F!==null&&F.updateLights(w.state.lightsArray),C.sortObjects===!0&&T.sort(ze,Mt),gn=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,gn&&N.addToRenderList(T,b),this.info.autoReset===!0&&this.info.reset(),wt===!0&&Q.beginShadows();const W=w.state.shadowsArray;if(de.render(W,b,I),wt===!0&&Q.endShadows(),(G&&P.hasRenderPass())===!1){const Ce=T.opaque,ge=T.transmissive;if(w.setupLights(),I.isArrayCamera){const we=I.cameras;if(ge.length>0)for(let De=0,We=we.length;De<We;De++){const Qe=we[De];Ut(Ce,ge,b,Qe)}gn&&N.render(b);for(let De=0,We=we.length;De<We;De++){const Qe=we[De];Lt(T,b,Qe,Qe.viewport)}}else ge.length>0&&Ut(Ce,ge,b,I),gn&&N.render(b),Lt(T,b,I)}V!==null&&X===0&&(me.updateMultisampleRenderTarget(V),me.updateRenderTargetMipmap(V)),G&&P.end(C),b.isScene===!0&&b.onAfterRender(C,b,I),se.resetDefaultState(),B=-1,$=null,S.pop(),S.length>0?(w=S[S.length-1],me.setTextureUnits(w.state.textureUnits),wt===!0&&Q.setGlobalState(C.clippingPlanes,w.state.camera)):w=null,f.pop(),f.length>0?T=f[f.length-1]:T=null,F!==null&&F.renderEnd()};function Tt(b,I,q,G){if(b.visible===!1)return;if(b.layers.test(I.layers)){if(b.isGroup)q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(I);else if(b.isLight)w.pushLight(b),b.castShadow&&w.pushShadow(b);else if(b.isSprite){const Ce=I.isArrayCamera?Bt:qe;if(!b.frustumCulled||b.intersectsFrustum(Ce)){G&&Ke.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ge);const ge=re.update(b),we=b.material;we.visible&&T.push(b,ge,we,q,Ke.z,null,I)}}else if(b.isMesh||b.isLine||b.isPoints){const Ce=I.isArrayCamera?Bt:qe;if(!b.frustumCulled||b.intersectsFrustum(Ce)){const ge=re.update(b),we=b.material;if(G&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ke.copy(b.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Ke.copy(ge.boundingSphere.center)),Ke.applyMatrix4(b.matrixWorld).applyMatrix4(Ge)),Array.isArray(we)){const De=ge.groups;for(let We=0,Qe=De.length;We<Qe;We++){const Pe=De[We],et=we[Pe.materialIndex];et&&et.visible&&T.push(b,ge,et,q,Ke.z,Pe,I)}}else we.visible&&T.push(b,ge,we,q,Ke.z,null,I)}}}const ye=b.children;for(let Ce=0,ge=ye.length;Ce<ge;Ce++)Tt(ye[Ce],I,q,G)}function Lt(b,I,q,G){const{opaque:W,transmissive:ye,transparent:Ce}=b;w.setupLightsView(q),wt===!0&&Q.setGlobalState(C.clippingPlanes,q),G&&ve.viewport(te.copy(G)),W.length>0&&Lr(W,I,q),ye.length>0&&Lr(ye,I,q),Ce.length>0&&Lr(Ce,I,q),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Ut(b,I,q,G){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[G.id]===void 0){const Pe=ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[G.id]=new Ai(1,1,{generateMipmaps:!0,type:Pe?Ci:zn,minFilter:fr,samples:Math.max(4,ht.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const ye=w.state.transmissionRenderTarget[G.id],Ce=G.viewport||te;ye.setSize(Ce.z*C.transmissionResolutionScale,Ce.w*C.transmissionResolutionScale);const ge=C.getRenderTarget(),we=C.getActiveCubeFace(),De=C.getActiveMipmapLevel();C.setRenderTarget(ye),C.getClearColor(K),pe=C.getClearAlpha(),pe<1&&C.setClearColor(16777215,.5),C.clear(),gn&&N.render(q);const We=C.toneMapping;C.toneMapping=Xi;const Qe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),w.setupLightsView(G),wt===!0&&Q.setGlobalState(C.clippingPlanes,G),Lr(b,q,G),me.updateMultisampleRenderTarget(ye),me.updateRenderTargetMipmap(ye),ft.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let et=0,Ft=I.length;et<Ft;et++){const _t=I[et],{object:pt,geometry:sn,material:Ne,group:vn}=_t;if(Ne.side===fi&&pt.layers.test(G.layers)){const at=Ne.side;Ne.side=Ln,Ne.needsUpdate=!0,wo(pt,q,G,sn,Ne,vn),Ne.side=at,Ne.needsUpdate=!0,Pe=!0}}Pe===!0&&(me.updateMultisampleRenderTarget(ye),me.updateRenderTargetMipmap(ye))}C.setRenderTarget(ge,we,De),C.setClearColor(K,pe),Qe!==void 0&&(G.viewport=Qe),C.toneMapping=We}function Lr(b,I,q){const G=I.isScene===!0?I.overrideMaterial:null;for(let W=0,ye=b.length;W<ye;W++){const Ce=b[W],{object:ge,geometry:we,group:De}=Ce;let We=Ce.material;We.allowOverride===!0&&G!==null&&(We=G),ge.layers.test(q.layers)&&wo(ge,I,q,we,We,De)}}function wo(b,I,q,G,W,ye){F!==null&&W.isNodeMaterial&&F.setObject(b,W),b.onBeforeRender(C,I,q,G,W,ye),b.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),W.onBeforeRender(C,I,q,G,b,ye),W.transparent===!0&&W.side===fi&&W.forceSinglePass===!1?(W.side=Ln,W.needsUpdate=!0,C.renderBufferDirect(q,I,G,W,b,ye),W.side=Jr,W.needsUpdate=!0,C.renderBufferDirect(q,I,G,W,b,ye),W.side=fi):C.renderBufferDirect(q,I,G,W,b,ye),b.onAfterRender(C,I,q,G,W,ye)}function ip(b){let I=0;for(const q of b)q.texture!==null&&I++;return I}function da(b,I,q){I.isScene!==!0&&(I=mn);const G=fe.get(b),W=w.state.lights,ye=w.state.shadowsArray,Ce=W.state.version,ge=J.getParameters(b,W.state,ye,I,q,w.state.lightProbeGridArray),we=J.getProgramCacheKey(ge);let De=G.programs;G.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?I.environment:null,G.fog=I.fog;const We=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;G.envMap=A.get(b.envMap||G.environment,We),G.envMapRotation=G.environment!==null&&b.envMap===null?I.environmentRotation:b.envMapRotation,De===void 0&&(b.addEventListener("dispose",Xe),De=new Map,G.programs=De,G.programVariants=new Map);let Qe=De.get(we);if(Qe!==void 0){if(G.currentProgram===Qe&&G.lightsStateVersion===Ce)return sp(b,ge),Qe}else ge.uniforms=J.getUniforms(b),F!==null&&b.isNodeMaterial&&F.build(b,q,ge),b.onBeforeCompile(ge,C),Qe=J.acquireProgram(ge,we),De.set(we,Qe),G.uniforms=ge.uniforms;const Pe=G.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Pe.clippingPlanes=Q.uniform),sp(b,ge),G.needsLights=nv(b),G.lightsStateVersion=Ce,G.needsLights&&(Pe.ambientLightColor.value=W.state.ambient,Pe.lightProbe.value=W.state.probe,Pe.sunLights.value=W.state.sun,Pe.sunLightShadows.value=W.state.sunShadow,Pe.directionalLights.value=W.state.directional,Pe.directionalLightShadows.value=W.state.directionalShadow,Pe.spotLights.value=W.state.spot,Pe.spotLightShadows.value=W.state.spotShadow,Pe.rectAreaLights.value=W.state.rectArea,Pe.ltc_1.value=W.state.rectAreaLTC1,Pe.ltc_2.value=W.state.rectAreaLTC2,Pe.pointLights.value=W.state.point,Pe.pointLightShadows.value=W.state.pointShadow,Pe.hemisphereLights.value=W.state.hemi,Pe.sunShadowMatrix.value=W.state.sunShadowMatrix,Pe.sunShadowCascade.value=W.state.sunShadowCascade,Pe.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Pe.spotLightMatrix.value=W.state.spotLightMatrix,Pe.spotLightMap.value=W.state.spotLightMap,Pe.pointShadowMatrix.value=W.state.pointShadowMatrix),G.numLightProbeGrids=ip(w.state.lightProbeGridArray),G.currentProgram=Qe,G.uniformsList=null,Qe}function Qx(b,I,q,G,W){const ye=fe.get(b),Ce=ye.currentProgram.id+","+G+","+W;let ge=ye.programVariants.get(Ce);return ge===void 0?(ge=da(b,I,q),ye.programVariants.set(Ce,ge)):(ye.currentProgram=ge,ye.uniformsList=null,ye.outputColorSpace=G,ye.toneMapping=W),ge}function rp(b){if(b.uniformsList===null){const I=b.currentProgram.getUniforms();b.uniformsList=Gl.seqWithValue(I.seq,b.uniforms)}return b.uniformsList}function sp(b,I){const q=fe.get(b);q.outputColorSpace=I.outputColorSpace,q.batching=I.batching,q.batchingColor=I.batchingColor,q.instancing=I.instancing,q.instancingColor=I.instancingColor,q.instancingMorph=I.instancingMorph,q.skinning=I.skinning,q.morphTargets=I.morphTargets,q.morphNormals=I.morphNormals,q.morphColors=I.morphColors,q.morphTargetsCount=I.morphTargetsCount,q.numClippingPlanes=I.numClippingPlanes,q.numIntersection=I.numClipIntersection,q.vertexAlphas=I.vertexAlphas,q.vertexTangents=I.vertexTangents,q.toneMapping=I.toneMapping}function ev(b,I,q,G,W){I.isScene!==!0&&(I=mn),me.resetTextureUnits();const ye=I.fog,Ce=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?I.environment:null,ge=V===null?C.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:tt.workingColorSpace,we=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,De=A.get(G.envMap||Ce,we),We=G.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Qe=!!q.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Pe=!!q.morphAttributes.position,et=!!q.morphAttributes.normal,Ft=!!q.morphAttributes.color;let _t=Xi;G.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(_t=C.toneMapping);const pt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,sn=pt!==void 0?pt.length:0,Ne=fe.get(G),vn=w.state.lights;if(wt===!0&&(rn===!0||b!==$)){const bt=b===$&&G.id===B;Q.setState(G,b,bt)}let at=!1,Dr=!1;G.version===Ne.__version?Ne.needsLights&&Ne.lightsStateVersion!==vn.state.version||W.isBatchedMesh&&Ne.batching===!1||!W.isBatchedMesh&&Ne.batching===!0||W.isBatchedMesh&&Ne.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Ne.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Ne.instancing===!1||!W.isInstancedMesh&&Ne.instancing===!0||W.isSkinnedMesh&&Ne.skinning===!1||!W.isSkinnedMesh&&Ne.skinning===!0||W.isInstancedMesh&&Ne.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ne.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ne.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ne.instancingMorph===!1&&W.morphTexture!==null||Ne.envMap!==De||G.fog===!0&&Ne.fog!==ye||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==Q.numPlanes||Ne.numIntersection!==Q.numIntersection)||Ne.vertexAlphas!==We||Ne.vertexTangents!==Qe||Ne.morphTargets!==Pe||Ne.morphNormals!==et||Ne.morphColors!==Ft||Ne.morphTargetsCount!==sn||Ne.numLightProbeGrids!==ip(w.state.lightProbeGridArray)?at=!0:(Ne.outputColorSpace!==ge||Ne.toneMapping!==_t)&&(Dr=!0):(at=!0,Ne.__version=G.version);let an=Ne.currentProgram;(at===!0||Dr===!0)&&(an=Dr===!0?Qx(G,I,W,ge,_t):da(G,I,W),F&&G.isNodeMaterial&&F.onUpdateProgram(G,an,Ne));let To=!1,Ji=!1,Ir=!1;const nt=an.getUniforms(),Jt=Ne.uniforms;if(ve.useProgram(an.program)&&(To=!0,Ji=!0,Ir=!0),G.id!==B&&(B=G.id,Ji=!0),To||$!==b){ve.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),nt.setValue(O,"projectionMatrix",b.projectionMatrix),nt.setValue(O,"viewMatrix",b.matrixWorldInverse);const Yt=nt.map.cameraPosition;Yt!==void 0&&Yt.setValue(O,Nt.setFromMatrixPosition(b.matrixWorld)),ht.logarithmicDepthBuffer&&nt.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&nt.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),$!==b&&($=b,Ji=!0,Ir=!0)}if(Ne.needsLights&&(vn.state.sunShadowMap.length>0&&nt.setValue(O,"sunShadowMap",vn.state.sunShadowMap,me),vn.state.directionalShadowMap.length>0&&nt.setValue(O,"directionalShadowMap",vn.state.directionalShadowMap,me),vn.state.spotShadowMap.length>0&&nt.setValue(O,"spotShadowMap",vn.state.spotShadowMap,me),vn.state.pointShadowMap.length>0&&nt.setValue(O,"pointShadowMap",vn.state.pointShadowMap,me)),W.isSkinnedMesh){nt.setOptional(O,W,"bindMatrix"),nt.setOptional(O,W,"bindMatrixInverse");const bt=W.skeleton;bt&&(bt.boneTexture===null&&bt.computeBoneTexture(),nt.setValue(O,"boneTexture",bt.boneTexture,me))}W.isBatchedMesh&&(nt.setOptional(O,W,"batchingTexture"),nt.setValue(O,"batchingTexture",W._matricesTexture,me),nt.setOptional(O,W,"batchingIdTexture"),nt.setValue(O,"batchingIdTexture",W._indirectTexture,me),nt.setOptional(O,W,"batchingColorTexture"),W._colorsTexture!==null&&nt.setValue(O,"batchingColorTexture",W._colorsTexture,me));const ii=q.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&j.update(W,q,an),(Ji||Ne.receiveShadow!==W.receiveShadow)&&(Ne.receiveShadow=W.receiveShadow,nt.setValue(O,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&I.environment!==null&&(Jt.envMapIntensity.value=I.environmentIntensity),Jt.dfgLUT!==void 0&&(Jt.dfgLUT.value=HA()),Ji){if(nt.setValue(O,"toneMappingExposure",C.toneMappingExposure),Ne.needsLights&&tv(Jt,Ir),ye&&G.fog===!0&&oe.refreshFogUniforms(Jt,ye),oe.refreshMaterialUniforms(Jt,G,xe,Le,w.state.transmissionRenderTarget[b.id]),Ne.needsLights&&Ne.numLightProbeGrids>0){const bt=y;let Yt=0;for(const Ni of w.state.lightProbeGridArray)Ni.texture!==null&&(bt.textures[Yt]=Ni.texture,bt.min[Yt]=Ni.boundingBox.min,bt.max[Yt]=Ni.boundingBox.max,bt.resolution[Yt]=Ni.resolution,Yt++);for(const Ni in bt)bt[Ni].length=Yt;Jt.probesSH.value=bt.textures,Jt.probesMin.value=bt.min,Jt.probesMax.value=bt.max,Jt.probesResolution.value=bt.resolution}Gl.upload(O,rp(Ne),Jt,me)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Gl.upload(O,rp(Ne),Jt,me),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&nt.setValue(O,"center",W.center),nt.setValue(O,"modelViewMatrix",W.modelViewMatrix),nt.setValue(O,"normalMatrix",W.normalMatrix),nt.setValue(O,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){const bt=G.uniformsGroups;for(let Yt=0,Ni=bt.length;Yt<Ni;Yt++){const op=bt[Yt];Ee.update(op,an),Ee.bind(op,an)}}return an}function tv(b,I){b.ambientLightColor.needsUpdate=I,b.lightProbe.needsUpdate=I,b.sunLights.needsUpdate=I,b.sunLightShadows.needsUpdate=I,b.directionalLights.needsUpdate=I,b.directionalLightShadows.needsUpdate=I,b.pointLights.needsUpdate=I,b.pointLightShadows.needsUpdate=I,b.spotLights.needsUpdate=I,b.spotLightShadows.needsUpdate=I,b.rectAreaLights.needsUpdate=I,b.hemisphereLights.needsUpdate=I}function nv(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return ee},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(b,I,q){const G=fe.get(b);G.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),fe.get(b.texture).__webglTexture=I,fe.get(b.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:q,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,I){const q=fe.get(b);q.__webglFramebuffer=I,q.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(b,I=0,q=0){V=b,ee=I,X=q;let G=null,W=!1,ye=!1;if(b){const ge=fe.get(b);if(ge.__useDefaultFramebuffer!==void 0){ve.bindFramebuffer(O.FRAMEBUFFER,ge.__webglFramebuffer),te.copy(b.viewport),_e.copy(b.scissor),ke=b.scissorTest,ve.viewport(te),ve.scissor(_e),ve.setScissorTest(ke),B=-1;return}else if(ge.__webglFramebuffer===void 0)me.setupRenderTarget(b);else if(ge.__hasExternalTextures)me.rebindTextures(b,fe.get(b.texture).__webglTexture,fe.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const We=b.depthTexture;if(ge.__boundDepthTexture!==We){if(We!==null&&fe.has(We)&&(b.width!==We.image.width||b.height!==We.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");me.setupDepthRenderbuffer(b)}}const we=b.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ye=!0);const De=fe.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(De[I])?G=De[I][q]:G=De[I],W=!0):b.samples>0&&me.useMultisampledRTT(b)===!1?G=fe.get(b).__webglMultisampledFramebuffer:Array.isArray(De)?G=De[q]:G=De,te.copy(b.viewport),_e.copy(b.scissor),ke=b.scissorTest}else te.copy(Oe).multiplyScalar(xe).floor(),_e.copy(st).multiplyScalar(xe).floor(),ke=lt;if(q!==0&&(G=H),ve.bindFramebuffer(O.FRAMEBUFFER,G)&&ve.drawBuffers(b,G),ve.viewport(te),ve.scissor(_e),ve.setScissorTest(ke),W){const ge=fe.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+I,ge.__webglTexture,q)}else if(ye){const ge=I;for(let we=0;we<b.textures.length;we++){const De=fe.get(b.textures[we]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+we,De.__webglTexture,q,ge)}}else if(b!==null&&q!==0){const ge=fe.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ge.__webglTexture,q)}B=-1};function ap(b){const I=fe.get(b);return(I.__readFormat!==b.format||I.__readType!==b.type)&&(I.__readFormat=b.format,I.__readType=b.type,I.__formatReadable=ht.textureFormatReadable(b.format),I.__typeReadable=ht.textureTypeReadable(b.type)),I}this.readRenderTargetPixels=function(b,I,q,G,W,ye,Ce,ge=0){if(!(b&&b.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=fe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ce!==void 0&&(we=we[Ce],Array.isArray(we)&&(we=we[0])),we){ve.bindFramebuffer(O.FRAMEBUFFER,we);try{const De=b.textures[ge],We=De.format,Qe=De.type;b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ge);const Pe=ap(De);if(Pe.__formatReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pe.__typeReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=b.width-G&&q>=0&&q<=b.height-W&&O.readPixels(I,q,G,W,ie.convert(We),ie.convert(Qe),ye)}finally{const De=V!==null?fe.get(V).__webglFramebuffer:null;ve.bindFramebuffer(O.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(b,I,q,G,W,ye,Ce,ge=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=fe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ce!==void 0&&(we=we[Ce],Array.isArray(we)&&(we=we[0])),we)if(I>=0&&I<=b.width-G&&q>=0&&q<=b.height-W){ve.bindFramebuffer(O.FRAMEBUFFER,we);const De=b.textures[ge],We=De.format,Qe=De.type;b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ge);const Pe=ap(De);if(Pe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,et),O.bufferData(O.PIXEL_PACK_BUFFER,ye.byteLength,O.STREAM_READ),O.readPixels(I,q,G,W,ie.convert(We),ie.convert(Qe),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);const Ft=V!==null?fe.get(V).__webglFramebuffer:null;ve.bindFramebuffer(O.FRAMEBUFFER,Ft);const _t=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await KM(O,_t,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,et),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ye),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(et),O.deleteSync(_t),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,I=null,q=0){const G=Math.pow(2,-q),W=Math.floor(b.image.width*G),ye=Math.floor(b.image.height*G),Ce=I!==null?I.x:0,ge=I!==null?I.y:0;me.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,q,0,0,Ce,ge,W,ye),ve.unbindTexture()},this.copyTextureToTexture=function(b,I,q=null,G=null,W=0,ye=0){let Ce,ge,we,De,We,Qe,Pe,et,Ft;const _t=b.isCompressedTexture?b.mipmaps[ye]:b.image;if(q!==null)Ce=q.max.x-q.min.x,ge=q.max.y-q.min.y,we=q.isBox3?q.max.z-q.min.z:1,De=q.min.x,We=q.min.y,Qe=q.isBox3?q.min.z:0;else{const nt=Math.pow(2,-W);Ce=Math.floor(_t.width*nt),ge=Math.floor(_t.height*nt),b.isDataArrayTexture?we=_t.depth:b.isData3DTexture?we=Math.floor(_t.depth*nt):we=1,De=0,We=0,Qe=0}G!==null?(Pe=G.x,et=G.y,Ft=G.z):(Pe=0,et=0,Ft=0);const pt=ie.convert(I.format),sn=ie.convert(I.type);let Ne;I.isData3DTexture?(me.setTexture3D(I,0),Ne=O.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(me.setTexture2DArray(I,0),Ne=O.TEXTURE_2D_ARRAY):(me.setTexture2D(I,0),Ne=O.TEXTURE_2D),ve.activeTexture(O.TEXTURE0),ve.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,I.flipY),ve.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),ve.pixelStorei(O.UNPACK_ALIGNMENT,I.unpackAlignment);const vn=ve.getParameter(O.UNPACK_ROW_LENGTH),at=ve.getParameter(O.UNPACK_IMAGE_HEIGHT),Dr=ve.getParameter(O.UNPACK_SKIP_PIXELS),an=ve.getParameter(O.UNPACK_SKIP_ROWS),To=ve.getParameter(O.UNPACK_SKIP_IMAGES);ve.pixelStorei(O.UNPACK_ROW_LENGTH,_t.width),ve.pixelStorei(O.UNPACK_IMAGE_HEIGHT,_t.height),ve.pixelStorei(O.UNPACK_SKIP_PIXELS,De),ve.pixelStorei(O.UNPACK_SKIP_ROWS,We),ve.pixelStorei(O.UNPACK_SKIP_IMAGES,Qe);const Ji=b.isDataArrayTexture||b.isData3DTexture,Ir=I.isDataArrayTexture||I.isData3DTexture;if(b.isDepthTexture){const nt=fe.get(b),Jt=fe.get(I),ii=fe.get(nt.__renderTarget),bt=fe.get(Jt.__renderTarget);ve.bindFramebuffer(O.READ_FRAMEBUFFER,ii.__webglFramebuffer),ve.bindFramebuffer(O.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let Yt=0;Yt<we;Yt++)Ji&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,fe.get(b).__webglTexture,W,Qe+Yt),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,fe.get(I).__webglTexture,ye,Ft+Yt)),O.blitFramebuffer(De,We,De+Ce,We+ge,Pe,et,Pe+Ce,et+ge,O.DEPTH_BUFFER_BIT,O.NEAREST);ve.bindFramebuffer(O.READ_FRAMEBUFFER,null),ve.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(W!==0||b.isRenderTargetTexture||fe.has(b)){const nt=fe.get(b),Jt=fe.get(I);ve.bindFramebuffer(O.READ_FRAMEBUFFER,D),ve.bindFramebuffer(O.DRAW_FRAMEBUFFER,Y);for(let ii=0;ii<we;ii++)Ji?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,nt.__webglTexture,W,Qe+ii):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,nt.__webglTexture,W),Ir?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Jt.__webglTexture,ye,Ft+ii):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Jt.__webglTexture,ye),W!==0?O.blitFramebuffer(De,We,De+Ce,We+ge,Pe,et,Pe+Ce,et+ge,O.COLOR_BUFFER_BIT,O.NEAREST):Ir?O.copyTexSubImage3D(Ne,ye,Pe,et,Ft+ii,De,We,Ce,ge):O.copyTexSubImage2D(Ne,ye,Pe,et,De,We,Ce,ge);ve.bindFramebuffer(O.READ_FRAMEBUFFER,null),ve.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Ir?b.isDataTexture||b.isData3DTexture?O.texSubImage3D(Ne,ye,Pe,et,Ft,Ce,ge,we,pt,sn,_t.data):I.isCompressedArrayTexture?O.compressedTexSubImage3D(Ne,ye,Pe,et,Ft,Ce,ge,we,pt,_t.data):O.texSubImage3D(Ne,ye,Pe,et,Ft,Ce,ge,we,pt,sn,_t):b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ye,Pe,et,Ce,ge,pt,sn,_t.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ye,Pe,et,_t.width,_t.height,pt,_t.data):O.texSubImage2D(O.TEXTURE_2D,ye,Pe,et,Ce,ge,pt,sn,_t);ve.pixelStorei(O.UNPACK_ROW_LENGTH,vn),ve.pixelStorei(O.UNPACK_IMAGE_HEIGHT,at),ve.pixelStorei(O.UNPACK_SKIP_PIXELS,Dr),ve.pixelStorei(O.UNPACK_SKIP_ROWS,an),ve.pixelStorei(O.UNPACK_SKIP_IMAGES,To),ye===0&&I.generateMipmaps===!0&&I.mipmapsAutoUpdate===!0&&O.generateMipmap(Ne),ve.unbindTexture()},this.initRenderTarget=function(b){fe.get(b).__webglFramebuffer===void 0&&me.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?me.setTextureCube(b,0):b.isData3DTexture?me.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?me.setTexture2DArray(b,0):me.setTexture2D(b,0),ve.unbindTexture()},this.resetState=function(){ee=0,X=0,V=null,ve.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),n.unpackColorSpace=tt._getUnpackColorSpace()}}const Ag={type:"change"},Jh={type:"start"},Jx={type:"end"},Ml=new Vc,Rg=new Bi,VA=Math.cos(70*eE.DEG2RAD),zt=new U,bn=2*Math.PI,ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Zu=1e-6;class WA extends $E{constructor(e,n=null){super(e,n),this.state=ot.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ws.ROTATE,MIDDLE:Ws.DOLLY,RIGHT:Ws.PAN},this.touches={ONE:Os.ROTATE,TWO:Os.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new br,this._lastTargetPosition=new U,this._quat=new br().setFromUnitVectors(e.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new rg,this._sphericalDelta=new rg,this._scale=1,this._panOffset=new U,this._rotateStart=new Ie,this._rotateEnd=new Ie,this._rotateDelta=new Ie,this._panStart=new Ie,this._panEnd=new Ie,this._panDelta=new Ie,this._dollyStart=new Ie,this._dollyEnd=new Ie,this._dollyDelta=new Ie,this._dollyDirection=new U,this._mouse=new Ie,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=jA.bind(this),this._onPointerDown=XA.bind(this),this._onPointerUp=YA.bind(this),this._onContextMenu=eR.bind(this),this._onMouseWheel=KA.bind(this),this._onKeyDown=ZA.bind(this),this._onTouchStart=JA.bind(this),this._onTouchMove=QA.bind(this),this._onMouseDown=$A.bind(this),this._onMouseMove=qA.bind(this),this._interceptControlDown=tR.bind(this),this._interceptControlUp=nR.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ot.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ag),this.update(),this.state=ot.NONE}pan(e,n){this._pan(e,n),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const n=this.object.position;zt.copy(n).sub(this.target),zt.applyQuaternion(this._quat),this._spherical.setFromVector3(zt),this.autoRotate&&this.state===ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=bn:i>Math.PI&&(i-=bn),r<-Math.PI?r+=bn:r>Math.PI&&(r-=bn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(zt.setFromSpherical(this._spherical),zt.applyQuaternion(this._quatInverse),n.copy(this.target).add(zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=zt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new U(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new U(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ml.origin.copy(this.object.position),Ml.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ml.direction))<VA?this.object.lookAt(this.target):(Rg.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ml.intersectPlane(Rg,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Zu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Zu||this._lastTargetPosition.distanceToSquared(this.target)>Zu?(this.dispatchEvent(Ag),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?bn/60*this.autoRotateSpeed*e:bn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){zt.setFromMatrixColumn(n,0),zt.multiplyScalar(-e),this._panOffset.add(zt)}_panUp(e,n){this.screenSpacePanning===!0?zt.setFromMatrixColumn(n,1):(zt.setFromMatrixColumn(n,0),zt.crossVectors(this.object.up,zt)),zt.multiplyScalar(e),this._panOffset.add(zt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;zt.copy(r).sub(this.target);let s=zt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/n.clientHeight),this._rotateUp(bn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/n.clientHeight),this._rotateUp(bn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+n.x)*.5,o=(e.pageY+n.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new Ie,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function XA(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function jA(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function YA(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Jx),this.state=ot.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function $A(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ws.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=ot.DOLLY;break;case Ws.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ot.ROTATE}break;case Ws.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ot.PAN}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(Jh)}function qA(t){switch(this.state){case ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function KA(t){this.enabled===!1||this.enableZoom===!1||this.state!==ot.NONE||(t.preventDefault(),this.dispatchEvent(Jh),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Jx))}function ZA(t){this.enabled!==!1&&this._handleKeyDown(t)}function JA(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Os.ROTATE:if(this.enableRotate===!1){this.state=ot.NONE;break}this._handleTouchStartRotate(t),this.state=ot.TOUCH_ROTATE;break;case Os.PAN:if(this.enablePan===!1){this.state=ot.NONE;break}this._handleTouchStartPan(t),this.state=ot.TOUCH_PAN;break;default:this.state=ot.NONE}break;case 2:switch(this.touches.TWO){case Os.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=ot.TOUCH_DOLLY_PAN;break;case Os.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=ot.TOUCH_DOLLY_ROTATE;break;default:this.state=ot.NONE}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(Jh)}function QA(t){switch(this._trackPointer(t),this.state){case ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=ot.NONE}}function eR(t){this.enabled!==!1&&t.preventDefault()}function tR(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function nR(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class sa{static createButton(e,n={}){const i=document.createElement("button");function r(){let c=null;async function h(p){p.addEventListener("end",m),await e.xr.setSession(p),i.textContent="EXIT VR",c=p}function m(){c.removeEventListener("end",m),i.textContent="ENTER VR",c=null}i.style.display="",i.style.cursor="pointer",i.style.left="calc(50% - 50px)",i.style.width="100px",i.textContent="ENTER VR";const d={...n,optionalFeatures:["local-floor","bounded-floor","layers",...n.optionalFeatures||[]]};i.onmouseenter=function(){i.style.opacity="1.0"},i.onmouseleave=function(){i.style.opacity="0.5"},i.onclick=function(){c===null?navigator.xr.requestSession("immersive-vr",d).then(h):(c.end(),navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",d).then(h).catch(p=>{console.warn(p)}))},navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",d).then(h).catch(p=>{console.warn(p)})}function s(){i.style.display="",i.style.cursor="auto",i.style.left="calc(50% - 75px)",i.style.width="150px",i.onmouseenter=null,i.onmouseleave=null,i.onclick=null}function a(){s(),i.textContent="VR NOT SUPPORTED"}function o(c){s(),console.warn("Exception when trying to call xr.isSessionSupported",c),i.textContent="VR NOT ALLOWED"}function l(c){c.style.position="absolute",c.style.bottom="20px",c.style.padding="12px 6px",c.style.border="1px solid #fff",c.style.borderRadius="4px",c.style.background="rgba(0,0,0,0.1)",c.style.color="#fff",c.style.font="normal 13px sans-serif",c.style.textAlign="center",c.style.opacity="0.5",c.style.outline="none",c.style.zIndex="999"}if("xr"in navigator)return i.id="VRButton",i.style.display="none",l(i),navigator.xr.isSessionSupported("immersive-vr").then(function(c){c?r():a(),c&&sa.xrSessionIsGranted&&i.click()}).catch(o),i;{const c=document.createElement("a");return window.isSecureContext===!1?(c.href=document.location.href.replace(/^http:/,"https:"),c.innerHTML="WEBXR NEEDS HTTPS"):(c.href="https://immersiveweb.dev/",c.innerHTML="WEBXR NOT AVAILABLE"),c.style.left="calc(50% - 90px)",c.style.width="180px",c.style.textDecoration="none",l(c),c}}static registerSessionGrantedListener(){if(typeof navigator<"u"&&"xr"in navigator){if(/WebXRViewer\//i.test(navigator.userAgent))return;navigator.xr.addEventListener("sessiongranted",()=>{sa.xrSessionIsGranted=!0})}}}sa.xrSessionIsGranted=!1;sa.registerSessionGrantedListener();const li={goal:{main:440020,emissive:561586,hex:"#06b6d4"},topic:{main:3900150,emissive:2450411,hex:"#3b82f6"},claim:{main:1096065,emissive:366185,hex:"#10b981"},question:{main:16096779,emissive:14251782,hex:"#f59e0b"},evidence:{main:6514417,emissive:5195493,hex:"#6366f1"},action:{main:11032055,emissive:9647082,hex:"#a855f7"},proposal:{main:15485081,emissive:14362487,hex:"#ec4899"}};function Cg(t,e,n){const i=document.createElement("canvas");i.width=512,i.height=160;const r=i.getContext("2d");r.fillStyle="rgba(11, 15, 23, 0.92)",r.strokeStyle=n,r.lineWidth=4,r.beginPath(),r.roundRect(10,10,492,140,24),r.fill(),r.stroke(),r.fillStyle="#94a3b8",r.font="bold 22px sans-serif",r.textAlign="center",r.fillText(e.toUpperCase(),256,50),r.fillStyle="#f8fafc",r.font="bold 26px sans-serif";const s=t.length>34?t.slice(0,33)+"…":t;r.fillText(s,256,104);const a=new Ix(i);a.minFilter=fn;const o=new Px({map:a,transparent:!0,depthTest:!0,depthWrite:!1}),l=new ME(o);return l.scale.set(.68,.21,1),l}function iR(t,e){const n=document.createElement("canvas");n.width=512,n.height=320;const i=n.getContext("2d");i.fillStyle="#0a0e17",i.strokeStyle=e,i.lineWidth=6,i.beginPath(),i.roundRect(8,8,496,304,26),i.fill(),i.stroke(),i.fillStyle="#94a3b8",i.font="bold 24px sans-serif",i.fillText(t.speaker.toUpperCase(),32,50),i.fillStyle=e,i.font="bold 20px monospace",i.textAlign="right",i.fillText(`[${t.intent.toUpperCase()}]`,480,50),i.textAlign="left",i.strokeStyle="#1e293b",i.lineWidth=2,i.beginPath(),i.moveTo(24,68),i.lineTo(488,68),i.stroke(),i.fillStyle="#f8fafc",i.font="bold 24px sans-serif";const r=t.distilledText.split(" ");let s="",a=108;for(let l=0;l<r.length;l++){const c=s+r[l]+" ";if(i.measureText(c).width>440&&l>0){if(i.fillText(s,32,a),s=r[l]+" ",a+=34,a>215){s+="...";break}}else s=c}i.fillText(s,32,a),i.fillStyle="#f59e0b",i.font="bold 20px sans-serif",i.fillText("◂ Drag Left: Knead",32,288),i.fillStyle="#06b6d4",i.textAlign="right",i.fillText("Drag Right: Stretch ▸",480,288);const o=new Ix(n);return o.minFilter=fn,o}const rR=({tree:t,ghostSprouts:e,slateCards:n,setSlateCards:i,selectedParentId:r,onSelectParent:s,onStageCard:a,onVote:o,currentSpeaker:l,setCurrentSpeaker:c,lastStateHash:h,lastRevision:m,onSeedDemo:d})=>{var mn,gn,_n,O,xn,ft,ht,ve;const p=le.useRef(null),v=le.useRef(null),M=le.useRef(null),[_,u]=le.useState(""),[g,x]=le.useState(!1),[y,T]=le.useState(!1),[w,f]=le.useState(null),[S,P]=le.useState(!1),[C,L]=le.useState(!0),F=le.useRef(null),[H,D]=le.useState({id:r||"node_0000",type:"node"}),Y=le.useRef(n);Y.current=n;const ee=le.useRef(t);ee.current=t;const X=le.useRef(e);X.current=e;const V=le.useRef(r);V.current=r;const B=le.useRef(null),$=le.useRef(null),te=le.useRef(null),_e=le.useRef(null),ke=le.useRef([]),K=le.useRef(new Map),pe=le.useRef([]),Se=le.useRef(new Map),Le=le.useRef({isArmed:!1,isDragging:!1,cardId:null,downClientX:0,downClientY:0,deltaX:0,deltaY:0,group:null,mesh:null,initialPos:new U}),xe=le.useRef({controller0Grabbing:!1,controller1Grabbing:!1,grabbedTileId:null,initialDistance:0,gestureAction:null});le.useEffect(()=>{var Ae;r&&((Ae=t==null?void 0:t.nodes)!=null&&Ae[r])&&D({id:r,type:"node"})},[r,t]);const ze=le.useCallback(async(Ae,fe)=>{const me=Y.current.find(A=>A.id===Ae);if(me){f(Ae);try{const A=await $_(me.distilledText,fe);i(E=>E.map(k=>k.id===Ae?{...k,distilledText:A.transformed}:k))}catch(A){console.error(`Texterial ${fe} failed:`,A)}finally{f(null)}}},[i]),Mt=le.useCallback(async Ae=>{try{await a(Ae,V.current),i(fe=>fe.map(me=>me.id===Ae.id?{...me,isStaged:!0}:me))}catch(fe){console.error("Staging card failed:",fe)}},[a,i]),Oe=le.useRef(ze);Oe.current=ze;const st=le.useRef(Mt);st.current=Mt;const lt=le.useRef(s);lt.current=s;const qe=le.useRef(o);qe.current=o,le.useEffect(()=>{if(!v.current||!p.current)return;const Ae=p.current.clientWidth,fe=p.current.clientHeight,me=new pE;B.current=me,me.background=new $e(395277),me.fog=new Wh(395277,3.2,10);const A=new Jn(50,Ae/fe,.1,50);A.position.set(0,1.45,.95),te.current=A;const E=new GA({canvas:v.current,antialias:!0,alpha:!0});if($.current=E,E.setSize(Ae,fe),E.setPixelRatio(Math.min(window.devicePixelRatio,2)),E.shadowMap.enabled=!0,E.xr.enabled=!0,M.current){M.current.innerHTML="";const He=sa.createButton(E);He.style.position="static",He.style.padding="4px 10px",He.style.fontSize="11px",He.style.fontWeight="bold",He.style.background="#0284c7",He.style.color="#ffffff",He.style.borderRadius="8px",He.style.border="1px solid #38bdf8",He.style.cursor="pointer",He.style.height="28px",He.style.lineHeight="20px",M.current.appendChild(He)}const k=new WA(A,E.domElement);_e.current=k,k.target.set(0,1.15,-1.05),k.maxPolarAngle=Math.PI/2.05,k.minDistance=.4,k.maxDistance=5.2,k.enableDamping=!0,k.dampingFactor=.08,k.update();const re=new VE(16777215,.9);me.add(re);const J=new GE(16777215,1.35);J.position.set(2.5,4.5,1.8),J.castShadow=!0,me.add(J);const oe=new zE(3718648,2.5,6);oe.position.set(0,2,-1.05),me.add(oe);const ue=new zi;ue.position.set(0,0,-1.05);const Z=new jh(1.35,1.35,.04,48),Q=new _l({color:1185312,roughness:.35,metalness:.25}),de=new Bn(Z,Q);de.position.y=.72,ue.add(de);for(let He=.4;He<=1.25;He+=.28){const be=new Mc(He-.003,He+.003,64),Ze=new Uf({color:3718648,transparent:!0,opacity:.16,side:fi}),Tt=new Bn(be,Ze);Tt.rotation.x=-Math.PI/2,Tt.position.y=.742,ue.add(Tt)}const N=new YE(10,20,1976635,988970);N.position.y=.01,me.add(N),me.add(ue);const j=E.xr.getController(0),z=E.xr.getController(1);me.add(j),me.add(z);const ae=new Vt().setFromPoints([new U(0,0,0),new U(0,0,-2.5)]),ie=new Ys({color:3718648,transparent:!0,opacity:.6});j.add(new ws(ae,ie)),z.add(new ws(ae,ie.clone()));const se=()=>{xe.current.controller0Grabbing=!0,Te()},Ee=()=>{xe.current.controller0Grabbing=!1,Fe()},Ue=()=>{xe.current.controller1Grabbing=!0,Te()},ne=()=>{xe.current.controller1Grabbing=!1,Fe()};function Te(){const He=xe.current;if(He.controller0Grabbing&&He.controller1Grabbing){const be=new U,Ze=new U;j.getWorldPosition(be),z.getWorldPosition(Ze),He.initialDistance=be.distanceTo(Ze)}}function Fe(){const He=xe.current;if(He.gestureAction&&Y.current.length>0){const be=Y.current[0];He.gestureAction==="stretch"?Oe.current(be.id,"stretch"):He.gestureAction==="knead"&&Oe.current(be.id,"knead")}He.gestureAction=null,He.initialDistance=0}j.addEventListener("selectstart",se),j.addEventListener("selectend",Ee),z.addEventListener("selectstart",Ue),z.addEventListener("selectend",ne);const he=new jE;E.setAnimationLoop(()=>{k.update();const He=he.getElapsedTime();if(ke.current.forEach(({mesh:be,id:Ze})=>{be.rotation.y=He*.75,be.position.y+=Math.sin(He*2.5+parseFloat(Ze.replace(/\D/g,"")||"1"))*3e-4}),Se.current.forEach(({group:be,initialPos:Ze},Tt)=>{const Lt=Le.current;if(!Lt.isDragging||Lt.cardId!==Tt){const Ut=Tt.charCodeAt(Tt.length-1)||1;be.position.y=Ze.y+Math.sin(He*2+Ut)*.006}}),E.xr.isPresenting){const be=xe.current;if(be.controller0Grabbing&&be.controller1Grabbing&&be.initialDistance>0){const Ze=new U,Tt=new U;j.getWorldPosition(Ze),z.getWorldPosition(Tt);const Ut=Ze.distanceTo(Tt)/be.initialDistance;Ut>1.25?be.gestureAction="stretch":Ut<.75&&(be.gestureAction="knead")}}E.render(me,A)});const Xe=()=>{if(!p.current)return;const He=p.current.clientWidth,be=p.current.clientHeight;A.aspect=He/be,A.updateProjectionMatrix(),E.setSize(He,be)};window.addEventListener("resize",Xe);const ct=new XE,jt=new Ie,Yn=He=>{const be=E.domElement.getBoundingClientRect();jt.x=(He.clientX-be.left)/be.width*2-1,jt.y=-((He.clientY-be.top)/be.height)*2+1,ct.setFromCamera(jt,A);const Ze=ct.intersectObjects(pe.current,!1);if(Ze.length>0){const Tt=Ze[0].object,Lt=K.current.get(Tt.id);if(Lt)if(Lt.type==="tile"){const Ut=Se.current.get(Lt.id);Ut&&(Le.current={isArmed:!0,isDragging:!1,cardId:Lt.id,downClientX:He.clientX,downClientY:He.clientY,deltaX:0,deltaY:0,group:Ut.group,mesh:Ut.mesh,initialPos:Ut.initialPos.clone()})}else Lt.type==="node"?(lt.current(Lt.id),D({id:Lt.id,type:"node"}),L(!0)):Lt.type==="sprout"&&(D({id:Lt.id,type:"sprout"}),L(!0))}},In=He=>{const be=Le.current;if(!be.isArmed||!be.mesh||!be.group)return;const Ze=He.clientX-be.downClientX,Tt=He.clientY-be.downClientY,Lt=Math.hypot(Ze,Tt);if(!be.isDragging)if(Lt>=6)be.isDragging=!0,k.enabled=!1;else return;if(be.deltaX=Ze,be.deltaY=Tt,Tt<-25&&Math.abs(Ze)<40)be.group.position.y=be.initialPos.y+Math.min(Math.abs(Tt)*.003,.45),be.mesh.material.emissive.setHex(1096065),be.mesh.material.emissiveIntensity=.8;else if(Ze>0){const Ut=Math.min(Ze/70,1);be.mesh.scale.x=1+Ut*.48,be.mesh.scale.y=1-Ut*.12,be.mesh.material.emissive.setHex(440020),be.mesh.material.emissiveIntensity=.8}else if(Ze<0){const Ut=Math.min(Math.abs(Ze)/70,1);be.mesh.scale.x=Math.max(1-Ut*.42,.58),be.mesh.scale.y=1+Ut*.32,be.mesh.material.emissive.setHex(16096779),be.mesh.material.emissiveIntensity=.8}},Un=He=>{const be=Le.current;if(!be.isArmed)return;const Ze=be.cardId,Tt=be.isDragging,Lt=be.deltaX,Ut=be.deltaY;if(be.isArmed=!1,be.isDragging=!1,be.cardId=null,k.enabled=!0,be.mesh&&(be.mesh.scale.set(1,1,1),be.mesh.material.emissiveIntensity=.25),be.group&&be.group.position.copy(be.initialPos),Tt&&Ze){const Lr=Y.current.find(wo=>wo.id===Ze);Lt>=55?Oe.current(Ze,"stretch"):Lt<=-55?Oe.current(Ze,"knead"):Ut<=-40&&Math.abs(Lt)<40&&Lr&&st.current(Lr)}else Ze&&(D({id:Ze,type:"tile"}),L(!0))};return E.domElement.addEventListener("pointerdown",Yn),window.addEventListener("pointermove",In),window.addEventListener("pointerup",Un),()=>{E.setAnimationLoop(null),window.removeEventListener("resize",Xe),E.domElement.removeEventListener("pointerdown",Yn),window.removeEventListener("pointermove",In),window.removeEventListener("pointerup",Un),j.removeEventListener("selectstart",se),j.removeEventListener("selectend",Ee),z.removeEventListener("selectstart",Ue),z.removeEventListener("selectend",ne),E.dispose()}},[]),le.useEffect(()=>{const Ae=B.current;if(!Ae)return;const fe=Ae.getObjectByName("DynamicArborGroup");fe&&Ae.remove(fe),K.current.clear(),pe.current=[],ke.current=[],Se.current.clear();const me=new zi;if(me.name="DynamicArborGroup",!t||!t.nodes)return;const A=t.root_id||Object.keys(t.nodes).find(N=>!t.nodes[N].parent_id)||"";if(!A||!t.nodes[A])return;const E=new Map,k=.4,re=.92,J=-1.05;function oe(N,j,z,ae){var Te;const ie=t.nodes[N];if(!ie)return;const se=(z+ae)/2,Ee=j===0?0:.58+j*.34,Ue=new U(Math.sin(se)*Ee,re+j*k,J+Math.cos(se)*Ee*.85);E.set(N,Ue);const ne=((Te=ie.children_ids)==null?void 0:Te.filter(Fe=>t.nodes[Fe]))||[];if(ne.length>0){const Fe=(ae-z)/ne.length;ne.forEach((he,Xe)=>{oe(he,j+1,z+Xe*Fe,z+(Xe+1)*Fe)})}}oe(A,0,-Math.PI*.78,Math.PI*.78),E.forEach((N,j)=>{const z=t.nodes[j],ae=j===r,ie=li[z.node_type]||li.claim,se=new zi;se.position.copy(N);const Ee=new qh(ae?.08:.06,24,24),Ue=new _l({color:ie.main,emissive:ie.emissive,emissiveIntensity:ae?.95:.35,roughness:.25,metalness:.15}),ne=new Bn(Ee,Ue);se.add(ne),K.current.set(ne.id,{id:j,type:"node",mesh:ne}),pe.current.push(ne);const Te=Cg(z.text,`${z.author} • ${z.node_type}`,ie.hex);if(Te.position.set(0,.14,0),se.add(Te),me.add(se),z.parent_id&&E.has(z.parent_id)){const Fe=E.get(z.parent_id),he=new U().addVectors(Fe,N).multiplyScalar(.5);he.y+=.09;const ct=new NE(Fe,he,N).getPoints(16),jt=new Vt().setFromPoints(ct),Yn=new Ys({color:3718648,transparent:!0,opacity:.75}),In=new ws(jt,Yn);me.add(In)}}),e.forEach(N=>{var Un;const j=E.get(N.parent_id)||E.get(A);if(!j)return;const z=Math.hypot(j.x,j.z-J)||1,ae=j.x/z,ie=(j.z-J)/z,se=new U(j.x+ae*.35,j.y+.18,j.z+ie*.35),Ee=new zi;Ee.position.copy(se);const Ue=new $h(.075,0),ne=new _l({color:N.has_conflict?16281969:3718648,emissive:N.has_conflict?15680580:165063,emissiveIntensity:.75,transparent:!0,opacity:.85,wireframe:!0}),Te=new Bn(Ue,ne);Ee.add(Te),ke.current.push({mesh:Te,id:N.proposal_id}),K.current.set(Te.id,{id:N.proposal_id,type:"sprout",mesh:Te}),pe.current.push(Te);const Fe=((Un=N.votes)==null?void 0:Un.length)||0,he=N.requiredVotes||3,Xe=`[VOTE ${Fe}/${he}] by ${N.author}`,ct=Cg(N.text,Xe,N.has_conflict?"#ef4444":"#38bdf8");ct.position.set(0,.16,0),Ee.add(ct),me.add(Ee);const jt=new Vt().setFromPoints([j,se]),Yn=new Zm({color:N.has_conflict?15680580:3718648,dashSize:.03,gapSize:.02}),In=new ws(jt,Yn);In.computeLineDistances(),me.add(In)});const ue=n.length,Z=.92,Q=Math.min(.4*Math.max(ue-1,1),1.65),de=-Q/2;n.forEach((N,j)=>{const z=li[N.intent]||li.claim,ae=ue<=1?0:de+j/(ue-1)*Q,ie=Math.sin(ae)*Z,se=-1.05+Math.cos(ae)*Z,Ee=.89,Ue=new zi;Ue.position.set(ie,Ee,se),Ue.rotation.y=ae,Ue.rotation.x=-.24;const ne=new Mc(.04,.12,32),Te=new Uf({color:z.main,transparent:!0,opacity:.22,side:fi}),Fe=new Bn(ne,Te);Fe.rotation.x=-Math.PI/2,Fe.position.set(ie,.744,se),me.add(Fe);const he=new Vt().setFromPoints([new U(ie,.745,se),new U(ie,Ee-.08,se)]),Xe=new Zm({color:z.main,dashSize:.015,gapSize:.015,transparent:!0,opacity:.35}),ct=new ws(he,Xe);ct.computeLineDistances(),me.add(ct);const jt=iR(N,z.hex),Yn=new ca(.26,.16,.012),In=new _l({map:jt,roughness:.25,metalness:.1,emissive:z.emissive,emissiveIntensity:.25,transparent:!0,opacity:.95}),Un=new Bn(Yn,In);Ue.add(Un);const He=new bE(Yn),be=new Lx(He,new Ys({color:z.main,transparent:!0,opacity:.7}));Ue.add(be),me.add(Ue),K.current.set(Un.id,{id:N.id,type:"tile",mesh:Un}),pe.current.push(Un),Se.current.set(N.id,{group:Ue,mesh:Un,initialPos:Ue.position.clone()})}),Ae.add(me)},[t,e,n,r]);const Bt=()=>{const Ae=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Ae){alert("Web Speech API is not supported in this browser. Please type text instead.");return}if(y){F.current&&F.current.stop(),T(!1);return}const fe=new Ae;fe.continuous=!1,fe.interimResults=!1,fe.lang="en-US",fe.onstart=()=>T(!0),fe.onresult=async me=>{const A=me.results[0][0].transcript;u(A),await wt(A),T(!1)},fe.onerror=()=>T(!1),fe.onend=()=>T(!1),F.current=fe,fe.start()},wt=async Ae=>{var me,A,E;const fe=(Ae||_).trim();if(!(!fe||g)){x(!0);try{const k=await Y_(l,fe),re=((me=k.card)==null?void 0:me.distilled_text)||k.distilledText||fe,J=((A=k.card)==null?void 0:A.intent)||k.intent||"claim",oe={id:k.card_id||`card_${Date.now()}`,speaker:k.speaker||l,rawText:fe,distilledText:re,intent:J,extractedQuery:k.extracted_query||((E=k.card)==null?void 0:E.extracted_query)||fe,createdAt:Date.now(),isStaged:!1};i(ue=>[oe,...ue.filter(Z=>Z.id!==oe.id)]),Ae||u("")}catch(k){console.error("Ingest speech failed, falling back locally:",k);const re={id:`card_${Date.now()}`,speaker:l,rawText:fe,distilledText:fe,intent:"claim",extractedQuery:fe,createdAt:Date.now(),isStaged:!1};i(J=>[re,...J.filter(oe=>oe.id!==re.id)]),Ae||u("")}finally{x(!1)}}},rn=async()=>{if(!S){P(!0);try{d&&await d()}catch(Ae){console.error("Seeding scenario error:",Ae)}finally{P(!1)}}};let Ge=null,Nt=null,Ke=null;return H.type==="node"&&(t!=null&&t.nodes)?Ge=t.nodes[H.id]||t.nodes[r]||null:H.type==="sprout"?Nt=e.find(Ae=>Ae.proposal_id===H.id)||null:H.type==="tile"&&(Ke=n.find(Ae=>Ae.id===H.id)||null),R.jsxs("div",{ref:p,className:"relative w-full h-full bg-[#06080d] overflow-hidden select-none font-sans",children:[R.jsx("canvas",{ref:v,className:"absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing"}),R.jsxs("header",{className:"absolute top-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none flex-wrap gap-2",children:[R.jsxs("div",{className:"flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg",children:[R.jsx(nM,{className:"w-4 h-4 text-cyan-400"}),R.jsx("span",{className:"text-xs font-semibold text-slate-200",children:"BetterMeets XR • Spatial Arbor"}),R.jsxs("span",{className:"text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded",children:["rev ",m]}),R.jsxs("span",{className:"text-[10px] font-mono text-slate-400",children:["Hash: ",h?h.slice(0,10):"genesis"]})]}),R.jsxs("div",{className:"pointer-events-auto flex items-center gap-2",children:[R.jsxs("button",{onClick:rn,disabled:S,className:"bg-amber-600/90 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-amber-400/40 shadow transition cursor-pointer",title:"Populate complete Smart City Disaster scenario with 11 nodes, 3 ghost sprouts & 5 cards",children:[R.jsx(sM,{className:`w-3.5 h-3.5 ${S?"animate-spin":"text-amber-200"}`}),S?"Populating...":"⚡ Populate Scenario"]}),R.jsx("div",{ref:M,className:"flex items-center"}),R.jsxs("button",{onClick:()=>L(Ae=>!Ae),className:`px-2.5 py-1 rounded-xl text-xs font-medium border transition cursor-pointer flex items-center gap-1 ${C?"bg-cyan-950/90 text-cyan-300 border-cyan-600":"bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white"}`,title:"Toggle Node Full-Text Inspector",children:[R.jsx(KS,{className:"w-3.5 h-3.5 text-cyan-400"}),R.jsx("span",{children:"Inspector"})]}),R.jsxs("div",{className:"bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/60 flex items-center gap-1.5 text-xs text-slate-300",children:[R.jsx("span",{className:"text-[11px] text-slate-400",children:"Speaker:"}),R.jsx("select",{value:l,onChange:Ae=>c(Ae.target.value),className:"bg-slate-800 text-xs text-white border border-slate-600 rounded px-1.5 py-0.5 outline-none cursor-pointer",children:["You","Alice","Bob","Charlie"].map(Ae=>R.jsx("option",{value:Ae,children:Ae},Ae))})]}),R.jsxs("div",{className:"bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/60 text-xs text-slate-300",children:[R.jsx("span",{className:"text-slate-400 mr-1",children:"Target:"}),R.jsx("span",{className:"font-mono text-cyan-300 font-bold",children:r})]})]})]}),R.jsxs("div",{className:"absolute top-14 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-4 bg-slate-900/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800 text-[11px] text-slate-300 shadow-xl",children:[R.jsxs("span",{className:"flex items-center gap-1 text-cyan-300 font-medium",children:[R.jsx(VS,{className:"w-3.5 h-3.5"})," Drag 3D Table Tile Right: ",R.jsx("strong",{children:"Stretch (Elaborate)"})]}),R.jsx("span",{className:"text-slate-600",children:"•"}),R.jsxs("span",{className:"flex items-center gap-1 text-amber-300 font-medium",children:[R.jsx(GS,{className:"w-3.5 h-3.5"})," Drag 3D Table Tile Left: ",R.jsx("strong",{children:"Knead (Condense)"})]}),R.jsx("span",{className:"text-slate-600",children:"•"}),R.jsxs("span",{className:"flex items-center gap-1 text-emerald-300 font-medium",children:[R.jsx(WS,{className:"w-3.5 h-3.5"})," Flick 3D Table Tile Up: ",R.jsx("strong",{children:"Stage"})]})]}),C&&R.jsxs("aside",{className:"absolute top-14 right-4 w-[410px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-170px)] bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 z-30 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-right-4 duration-200",children:[R.jsxs("div",{className:"flex items-center justify-between border-b border-slate-800 pb-2.5",children:[R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsx(ZS,{className:"w-4 h-4 text-cyan-400"}),R.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-slate-200",children:"Epistemic Node Inspector"})]}),R.jsx("button",{onClick:()=>L(!1),className:"text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer",children:R.jsx(Ih,{className:"w-4 h-4"})})]}),Ge?R.jsxs("div",{className:"flex flex-col gap-3",children:[R.jsxs("div",{className:"flex items-center justify-between text-xs",children:[R.jsx("span",{style:{backgroundColor:`${((mn=li[Ge.node_type])==null?void 0:mn.hex)||"#06b6d4"}22`,color:((gn=li[Ge.node_type])==null?void 0:gn.hex)||"#06b6d4",borderColor:((_n=li[Ge.node_type])==null?void 0:_n.hex)||"#06b6d4"},className:"px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase font-mono tracking-wide",children:Ge.node_type}),R.jsxs("span",{className:"text-[11px] font-semibold text-slate-300",children:["By ",Ge.author]}),R.jsx("span",{className:"font-mono text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800",children:Ge.id})]}),R.jsxs("div",{children:[R.jsx("label",{className:"text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1",children:"Full Proposition Sentence"}),R.jsx("div",{className:"text-[13px] text-slate-100 font-medium leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 shadow-inner select-text",children:Ge.text})]}),R.jsxs("div",{className:"flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-900/70 px-2.5 py-1.5 rounded-lg border border-slate-800",children:[R.jsx(qS,{className:"w-3.5 h-3.5 text-cyan-400 flex-shrink-0"}),R.jsxs("span",{className:"truncate",children:["Merkle Content Hash: ",Ge.content_hash||"genesis"]})]}),Ge.parent_id&&((O=t==null?void 0:t.nodes)==null?void 0:O[Ge.parent_id])&&R.jsxs("div",{className:"bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs",children:[R.jsx("span",{className:"text-[10px] uppercase text-slate-400 block mb-0.5 font-bold",children:"Attached Parent:"}),R.jsxs("button",{onClick:()=>{s(Ge.parent_id),D({id:Ge.parent_id,type:"node"})},className:"text-left text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition cursor-pointer flex items-center gap-1",children:[R.jsx(K_,{className:"w-3 h-3 flex-shrink-0 text-slate-500"}),R.jsxs("span",{className:"truncate",children:["[",Ge.parent_id,"] ",t.nodes[Ge.parent_id].text]})]})]}),Ge.children_ids&&Ge.children_ids.length>0&&R.jsxs("div",{className:"flex flex-col gap-1",children:[R.jsxs("span",{className:"text-[10px] uppercase text-slate-400 font-bold",children:["Child Branches (",Ge.children_ids.length,"):"]}),R.jsx("div",{className:"flex flex-col gap-1 max-h-32 overflow-y-auto custom-scrollbar",children:Ge.children_ids.map(Ae=>{var me,A;const fe=(me=t==null?void 0:t.nodes)==null?void 0:me[Ae];return fe?R.jsxs("button",{onClick:()=>{s(Ae),D({id:Ae,type:"node"})},className:"text-left text-[11px] bg-slate-900/80 hover:bg-slate-850 p-1.5 rounded border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5",children:[R.jsx("span",{style:{backgroundColor:((A=li[fe.node_type])==null?void 0:A.hex)||"#06b6d4"},className:"w-1.5 h-1.5 rounded-full flex-shrink-0"}),R.jsxs("span",{className:"truncate",children:["[",Ae,"] ",fe.text]})]},Ae):null})})]}),R.jsxs("button",{onClick:()=>s(Ge.id),className:`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${r===Ge.id?"bg-cyan-900/80 text-cyan-200 border border-cyan-500/50 shadow":"bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"}`,children:[R.jsx(Sm,{className:"w-3.5 h-3.5"}),r===Ge.id?"Active Target Branch":"Set as Target Branch"]})]}):Nt?R.jsxs("div",{className:"flex flex-col gap-3",children:[R.jsxs("div",{className:"flex items-center justify-between text-xs",children:[R.jsx("span",{className:"px-2.5 py-0.5 rounded-full border border-pink-500/50 bg-pink-950/40 text-pink-300 text-[10px] font-bold uppercase font-mono",children:"Pending Proposal PR"}),R.jsxs("span",{className:"text-[11px] font-semibold text-slate-300",children:["By ",Nt.author]})]}),R.jsxs("div",{children:[R.jsx("label",{className:"text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1",children:"Candidate Proposal Text"}),R.jsx("div",{className:"text-[13px] text-slate-100 font-medium leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 shadow-inner select-text",children:Nt.text})]}),Nt.has_conflict?R.jsxs("div",{className:"p-3 rounded-xl bg-red-950/40 border border-red-600/60 text-xs text-red-200 flex items-start gap-2",children:[R.jsx(rM,{className:"w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"}),R.jsxs("div",{children:[R.jsx("strong",{className:"block text-red-300 font-semibold mb-0.5",children:"Semantic Collision Warning"}),R.jsx("p",{className:"text-[11px] text-red-200/90 leading-snug",children:Nt.conflict_reason})]})]}):R.jsxs("div",{className:"p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-600/50 text-[11px] text-emerald-200 flex items-center gap-1.5",children:[R.jsx(tM,{className:"w-4 h-4 text-emerald-400 flex-shrink-0"}),R.jsx("span",{children:"Consensus Aligned (No Semantic Collisions Detected)"})]}),Nt.trade_off_analysis&&R.jsxs("div",{className:"bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs",children:[R.jsx("span",{className:"text-[10px] uppercase text-slate-400 font-bold block mb-1",children:"Deliberation Trade-Off Analysis:"}),R.jsx("p",{className:"text-[11px] text-slate-300 leading-relaxed",children:Nt.trade_off_analysis})]}),R.jsxs("div",{className:"bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs",children:[R.jsx("span",{className:"text-[11px] text-slate-400",children:"Consensus Votes:"}),R.jsxs("span",{className:"font-mono font-bold text-cyan-300",children:[((xn=Nt.votes)==null?void 0:xn.length)||0," / ",Nt.requiredVotes||3," Required"]})]}),R.jsxs("button",{onClick:()=>o(Nt.proposal_id,l),className:"w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow transition cursor-pointer flex items-center justify-center gap-1.5",children:[R.jsx(uo,{className:"w-3.5 h-3.5"}),"Cast Approval Vote as ",l]})]}):Ke?R.jsxs("div",{className:"flex flex-col gap-3",children:[R.jsxs("div",{className:"flex items-center justify-between text-xs",children:[R.jsx("span",{style:{backgroundColor:`${((ft=li[Ke.intent])==null?void 0:ft.hex)||"#06b6d4"}22`,color:((ht=li[Ke.intent])==null?void 0:ht.hex)||"#06b6d4",borderColor:((ve=li[Ke.intent])==null?void 0:ve.hex)||"#06b6d4"},className:"px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase font-mono tracking-wide",children:Ke.intent}),R.jsxs("span",{className:"text-[11px] font-semibold text-slate-300",children:["Speaker: ",Ke.speaker]})]}),R.jsxs("div",{children:[R.jsx("label",{className:"text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1",children:"Distilled Proposition"}),R.jsx("div",{className:"text-[13px] text-slate-100 font-medium leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 shadow-inner select-text",children:Ke.distilledText})]}),Ke.rawText&&Ke.rawText!==Ke.distilledText&&R.jsxs("div",{children:[R.jsx("label",{className:"text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1",children:"Raw Spoken Utterance"}),R.jsxs("p",{className:"text-xs text-slate-400 italic bg-slate-900/50 p-2.5 rounded-xl border border-slate-800",children:['"',Ke.rawText,'"']})]}),R.jsxs("div",{className:"grid grid-cols-2 gap-2 pt-1",children:[R.jsxs("button",{onClick:()=>ze(Ke.id,"stretch"),className:"py-2 px-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border border-cyan-800/40 transition cursor-pointer",children:[R.jsx(Dh,{className:"w-3 h-3"}),"Stretch (Expand)"]}),R.jsxs("button",{onClick:()=>ze(Ke.id,"knead"),className:"py-2 px-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border border-amber-800/40 transition cursor-pointer",children:[R.jsx(Q_,{className:"w-3 h-3"}),"Knead (Condense)"]})]}),R.jsxs("button",{onClick:()=>Mt(Ke),disabled:Ke.isStaged,className:`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${Ke.isStaged?"bg-slate-800 text-slate-500 cursor-not-allowed":"bg-emerald-600 hover:bg-emerald-500 text-white shadow"}`,children:[Ke.isStaged?R.jsx(uo,{className:"w-3.5 h-3.5"}):R.jsx(Sm,{className:"w-3.5 h-3.5"}),Ke.isStaged?"Already Staged":`Stage onto Branch [${r}]`]})]}):R.jsx("div",{className:"text-center py-8 text-xs text-slate-500",children:"Select any 3D node, ghost sprout, or table tile to inspect its full text, Merkle hash, and trade-offs."})]}),R.jsxs("div",{className:"absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl flex items-center gap-2",children:[R.jsxs("button",{onClick:Bt,className:`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex-shrink-0 ${y?"bg-red-600 text-white animate-pulse":"bg-slate-800 text-slate-300 hover:text-white border border-slate-700"}`,children:[y?R.jsx(Z_,{className:"w-3.5 h-3.5"}):R.jsx(J_,{className:"w-3.5 h-3.5"}),y?"Listening...":"Speak"]}),R.jsx("input",{type:"text",value:_,onChange:Ae=>u(Ae.target.value),onKeyDown:Ae=>{Ae.key==="Enter"&&wt()},placeholder:`Speak or type an idea as ${l} to place a 3D tile on the table...`,className:"flex-1 bg-slate-950/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"}),R.jsxs("button",{onClick:()=>wt(),disabled:g||!_.trim(),className:"bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer flex-shrink-0 shadow",children:[R.jsx(ex,{className:"w-3.5 h-3.5"}),"Ingest"]})]})]})},sR=()=>{var F;const[t,e]=le.useState(null),[n,i]=le.useState(()=>{if(typeof window<"u"){const H=new URLSearchParams(window.location.search).get("mode");if(H==="vr")return"vr";if(H==="sidePanel")return"sidePanel";if(H==="mainStage")return"mainStage"}return"dual"}),[r,s]=le.useState(()=>typeof window<"u"&&new URLSearchParams(window.location.search).get("user")||"You"),[a,o]=le.useState(!1),[l,c]=le.useState(!1),[h,m]=le.useState(!1),{tree:d,ghostSprouts:p,slateCards:v,setSlateCards:M,selectedParentId:_,setSelectedParentId:u,stageProposal:g,castVote:x,resetMeetingTree:y,seedScenario:T,isConnected:w,lastStateHash:f,lastRevision:S}=kS(),P=((F=d==null?void 0:d.nodes[d.root_id||"node_0000"])==null?void 0:F.text)||"";le.useEffect(()=>{d&&!h&&((P==="Discussion"||!P)&&c(!0),m(!0))},[d,P,h]),le.useEffect(()=>{mM().then(H=>{e(H),H.mode==="sidePanel"?i("sidePanel"):H.mode==="mainStage"&&i("mainStage")})},[]);const C=async(H,D)=>{await g(D,H.distilledText,H.speaker,H.intent)},L=async H=>{await FS(H),y&&await y(H)};return R.jsxs("div",{className:"flex flex-col h-screen w-screen bg-ink-950 text-[#e8e6e1] overflow-hidden font-sans",children:[R.jsxs("header",{className:"h-10 bg-ink-900 border-b border-ink-700 px-3 flex items-center justify-between z-20 select-none",children:[R.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[R.jsx("h1",{className:"text-xs font-semibold tracking-tight text-[#e8e6e1] flex-shrink-0",children:"BetterMeets"}),R.jsx("button",{onClick:()=>c(!0),className:"hidden sm:block px-2 py-0.5 rounded border border-ink-600 text-[11px] text-ash-300 hover:text-[#e8e6e1] hover:border-ash-400 transition max-w-[240px] truncate text-left",title:"Meeting agenda (click to edit)",children:P||"Set agenda"})]}),R.jsxs("div",{className:"flex items-center border border-ink-600 rounded p-0.5 text-xs",children:[R.jsxs("button",{onClick:()=>i("dual"),className:`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${n==="dual"?"bg-ink-700 text-[#e8e6e1] font-medium":"text-ash-400 hover:text-ash-300"}`,children:[R.jsx(XS,{className:"w-3 h-3"}),"Split"]}),R.jsxs("button",{onClick:()=>i("sidePanel"),className:`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${n==="sidePanel"?"bg-ink-700 text-[#e8e6e1] font-medium":"text-ash-400 hover:text-ash-300"}`,children:[R.jsx(iM,{className:"w-3 h-3"}),"Slate"]}),R.jsxs("button",{onClick:()=>i("mainStage"),className:`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${n==="mainStage"?"bg-ink-700 text-[#e8e6e1] font-medium":"text-ash-400 hover:text-ash-300"}`,children:[R.jsx(Dh,{className:"w-3 h-3"}),"Tree"]}),R.jsxs("button",{onClick:()=>i("vr"),className:`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${n==="vr"?"bg-cyan-700 text-white font-medium shadow-sm":"text-cyan-400 hover:text-cyan-300"}`,title:"3D Spatial Arbor and Texterial Slate",children:[R.jsx($S,{className:"w-3 h-3"}),"VR / 3D"]})]})]}),R.jsxs("main",{className:"flex-1 flex overflow-hidden",children:[(n==="dual"||n==="sidePanel")&&R.jsx("div",{className:n==="dual"?"w-80 md:w-96 flex-shrink-0":"w-full",children:R.jsx(oM,{currentSpeaker:r,setCurrentSpeaker:s,targetParentId:_,cards:v,setCards:M,onStageCard:C})}),(n==="dual"||n==="mainStage")&&R.jsx("div",{className:"flex-1 overflow-hidden flex flex-col",children:R.jsx(uM,{tree:d,ghostSprouts:p,selectedParentId:_,onSelectParent:u,onVote:x,onResetMeeting:y,onOpenAgenda:()=>c(!0),currentVoter:r})}),n==="vr"&&R.jsx("div",{className:"flex-1 overflow-hidden flex flex-col relative",children:R.jsx(rR,{tree:d,ghostSprouts:p,slateCards:v,setSlateCards:M,selectedParentId:_,onSelectParent:u,onStageCard:C,onVote:x,currentSpeaker:r,setCurrentSpeaker:s,lastStateHash:f,lastRevision:S,onSeedDemo:T})})]}),R.jsx(dM,{stateHash:f,revision:S,isConnected:w,tree:d,onOpenSettings:()=>o(!0)}),R.jsx(pM,{isOpen:l,currentAgenda:P,onSave:L,onClose:()=>c(!1)}),R.jsx(fM,{isOpen:a,onClose:()=>o(!1)})]})};Ju.createRoot(document.getElementById("root")).render(R.jsx(Hg.StrictMode,{children:R.jsx(sR,{})}));
