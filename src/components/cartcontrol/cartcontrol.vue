<template>
    <div class="cartcontrol">
        <transition name="fade">
            <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart">
                <span class="inner fa fa-minus-circle"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add fa fa-plus-circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/javascript">
    import Vue from "vue";

    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                //this.$dispatch('cart.add', event.target);
                this.$root.eventHub.$emit('cart.add', event.target);
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return;
                }
                if(this.food.count){
                    this.food.count--;
                }
            }
        }
    };


</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size: 0
        .fade-enter-active, .fade-leave-active
            transition: 1s all ease
            transform: translate3d(0, 0, 0)
            .inner
                transition: all 0.4s linear
                transform: rotate(0)
        .fade-enter-active
            opacity: 1
        .fade-enter, .fade-leave-active
            opacity: 0
            transform: translate3d(24px, 0, 0)
            .inner
                transform: rotate(180deg)
        .cart-decrease
            display: inline-block
            padding: 6px
            .inner
                display: inline-block
                line-height: 24px
                font-size: 24px
                color: rgb(0, 160, 220)

        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147,153,159)
        .cart-add
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0,160,220)


</style>