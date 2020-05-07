<template>
    <transition 
    v-on:before-enter="beforeEnter" 
    v-on:enter="enter" 
    v-on:after-enter="afterEnter" 
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave">
        <slot></slot>
    </transition>
</template>


<script>
import CollapseTransition from './CollapseTransition.class';
export default CollapseTransition;
</script>