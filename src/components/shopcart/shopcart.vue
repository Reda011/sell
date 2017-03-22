<template>
<div>
    <div class="shopcart">
    <div class="content" @click="toggleList">
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo" :class="{'highlight':totalCount>0}">
                    <i class="fa fa-shopping-cart" :class="{'highlight':totalCount>0}"></i>
                </div>
                <div class="num" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
            <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
            <div class="pay" :class="payClass">
                {{payDesc}}
            </div>
        </div>
    </div>
    <transition name="drop">
        <div class="ball-container">
            <div class="ball" v-for="ball in balls" v-show="ball.show">
                <div class="inner inner-hook"></div>
            </div>
        </div>
    </transition>

    <transition name="fade">
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <div class="title">购物车</div>
                <div class="empty" @click="empty">清空</div>
            </div>
            <div class="list-content" id="list-content">
                <ul>
                    <li class="food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                                <span>￥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
    </div>
    <transition name="block">
        <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
</div>
</template>

<script type="text/javascript">
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import BScroll from 'better-scroll';

    export default {
        props:{
            selectFoods: {
                type: Array,
                default() {
                    return [
                        {
                            price: 20,
                            count: 2
                        }
                    ];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                ],
                dropBalls: [],
                fold: true
            };
        },
        computed: {
            totalPrice() {
             var total = 0;
             this.selectFoods.forEach((food) => {
                total += food.price * food.count;
             });
             return total;
            },
            totalCount() {
                var count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            payDesc() {
                if (this.totalPrice === 0){
                    return `￥${this.minPrice}元起送`;
                }else if(this.totalPrice<this.minPrice){
                    var diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                }else{
                    return '去结算';
                }
            },
            payClass() {
                if(this.totalPrice<this.minPrice){
                    return 'not-enough';
                }else{
                return 'enough';
                }
            },
            listShow() {
                if(!this.totalCount) {
                 this.fold = true;
                 return false;
                }
                var show = !this.fold;
                if (show) {
                    if(!this.scroll) {
                        this.scroll = new BScroll(document.getElementById('list-content'), {
                            click: true,
                        });
                    }else{
                        this.scroll.refresh();
                    }
                }
                return show;
            }
        },
        methods: {
            drop(el) {
                for (var i=0;i<this.balls.length; i++){
                    var ball = this.balls[i];
                    if (!ball.show){
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                };
            },
            toggleList() {
                if(!this.totalCount){
                    return;
                }
                this.fold = !this.fold;
            },
            empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                })
            },
            hideList() {
                this.fold = true;
            },
            pay() {
                if(this.totalPrice<this.minPrice){
                    return;
                }else{
                    window.alert(`需支付${this.totalPrice}+${this.deliveryPrice}元`)
                }
            }
        },
        components: {
            cartcontrol
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .shopcart
        position: fixed
        left: 0
        bottom: 0
        z-index: 50
        width: 100%
        height: 48px
        .content
            display: flex
            background: #141d27
            font-size: 0
            color:  rgba(255,255,255,0.4)
            .content-left
                flex: 1
                .logo-wrapper
                    display: inline-block
                    position: relative
                    top: -10px
                    margin: 0 12px
                    padding: 6px
                    width: 56px
                    height: 56px
                    box-sizing: border-box
                    vertical-align: top
                    border-radius: 50%
                    background: #141d27
                    .logo
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        background: #2b343c
                        text-align: center
                        &.highlight
                            background:rgb(0,160,220)
                        .fa-shopping-cart
                            width: 100%
                            height: 100%
                            line-height: 44px
                            font-size: 24px
                            color: #80858a
                            &.highlight
                               color: #fff
                    .num
                        position: absolute
                        top: 0
                        right: 0
                        width: 24px
                        height: 16px
                        line-height: 16px
                        text-align: center
                        border-radius: 50%
                        font-size: 9px
                        font-weight: 700
                        color: #fff
                        background: rgb(240,20,20)
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
                .price
                    display: inline-block
                    vertical-align: top
                    line-height: 24px
                    margin-top: 12px
                    padding-right: 12px
                    box-sizing: border-box
                    border-right:rgba(255,255,255,0.1)
                    font-size: 16px
                    font-weight: 700
                    &.highlight
                        color: #fff
                .desc
                    display: inline-block
                    vertical-align: top
                    margin: 12px 0 0 12px
                    line-height: 24px
                    color:  rgba(255,255,255,0.4)
                    font-size: 10px


            .content-right
                flex: 0 0 105px
                width: 105px
                .pay
                    height: 48px
                    line-height: 48px
                    font-size: 12px
                    text-align: center
                    font-weight: 700
                    &.not-enough
                        background: #2b333b
                    &.enough
                        background: #00b43c
                        color: #fff
        .drop-enter-active, .drop-leave-active
            transition: 1s all ease
        .ball-container
            .ball
                position: fixed
                left: 32px
                bottom: 22px
                z-index: 200
                .inner
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: rgb(0,160,220)

        .fade-enter-active
            opacity: 1
            transition: all 0.8s ease
            transform: translateY(0)
        .fade-enter, .fade-leave-active
            opacity: 0
            transition: all 0.8s ease
            transform: translateY(100%)
        .shopcart-list
          position: absolute
          left: 0
          bottom: 48px
          z-index: -1
          width: 100%
          .list-header
            height: 40px
            line-height: 40px
            padding: 0 18px
            background: #f3f5f7
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            .title
              float: left
              font-size: 14px
              color: rgb(7, 17, 27)
            .empty
              float: right
              font-size: 12px
              color: rgb(0, 160, 220)
          .list-content
            padding: 0 18px
            max-height: 217px
            overflow: hidden
            background: #fff
            .food
              position: relative
              padding: 12px 0
              box-sizing: border-box
              border-1px(rgba(7, 17, 27, 0.1))
              .name
                line-height: 24px
                font-size: 14px
                color: rgb(7, 17, 27)
              .price
                position: absolute
                right: 90px
                bottom: 12px
                line-height: 24px
                font-size: 14px
                font-weight: 700
                color: rgb(240, 20, 20)
              .cartcontrol-wrapper
                position: absolute
                right: 0
                bottom: 6px
    .block-enter-active
        opacity: 1
        transition: 1s all ease
    .block-enter, .block-leave-active
        opacity: 0
        transition: 1s all ease
    .list-mask
        position: fixed
        top:0
        left: 0
        width: 100%
        height: 100%
        z-index: 40
        backdrop-filter: blur(10px)
        background: rgba(7,17,27,0.6)

</style>
