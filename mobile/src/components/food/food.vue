<template>
  <transition name="move">
    <div v-show="showFlog" class="food" ref="foods">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click.stop.prevent="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
            <price :food="food"></price>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @toggle="toggleContent" @select="selectRating" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    import price from 'components/price/price';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import BScroll from 'better-scroll';
    import {formatDate} from 'common/js/date';

    const ALL = 2;

    export default {
        props: {
            food: {
                type: Object
            }
        },
        filters: {
          formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
          }
        },
        components: {
            price,
            cartcontrol,
            split,
            ratingselect
        },
        data() {
          return {
            showFlog: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
              all: '全部',
              positive: '推荐',
              negative: '吐槽'
            }
          };
        },
        methods: {
          show() {
            this.showFlog = true;
            this.selectType = 2;
            this.onlyContent = true;
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.foods, {
                  click: true
                });
              } else {
                this.scroll.refresh();
              }
            });
          },
          hide() {
            this.showFlog = false;
          },
          addFirst(event) {
            if (!event._constructed) {
              return;
            }
            this.$emit('add', event.target);
            Vue.set(this.food, 'count', 1);
          },
          needShow(type, text) {
            if (this.onlyContent && !text) {
              return false;
            }
            if (this.selectType === ALL) {
              return true;
            } else {
              return type === this.selectType;
            }
          },
          addFood(target) {
            this.$emit('add', target);
          },
          selectRating(type) {
            this.selectType = type;
            this.$nextTick(() => {
              this.scroll.refresh();
            });
          },
          toggleContent() {
            this.onlyContent = !this.onlyContent;
            this.$nextTick(() => {
              this.scroll.refresh();
            });
          }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .food
      position: fixed
      left: 0
      top: 0
      bottom: 48px
      z-index: 30
      width: 100%
      background: #fff
      transform: translate3d(0, 0, 0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
      &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
      .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 10px
          background: rgba(77,85,93,0.2);
          border-radius: 5px
          .icon-arrow_lift
            display: block
            padding: 10px
            font-size: 20px
            color: #fff
      .content
        position: relative
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7,17,27);
        .detail
          margin-bottom: 18px
          line-height: 10px
          height: 10px
          font-size: 0
          .sell-count,.rating
            font-size: 10px
            color: rgb(147,153,159)
          .sell-count
            margin-right: 12px
        .cartcontrol-wrapper
          position: absolute
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          border-radius: 12px
          font-size: 10px
          color: #fff
          background: rgb(0,160,220)
          &.fade-enter-active, &.fade-leave-active
            transition: all 0.2s
          &.fade-enter, &.fade-leave-active
            opacity: 0
            z-index: -1
      .info
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 6px
          font-size: 14px
          color: rgb(7, 17, 27)
        .text
          line-height: 24px
          padding: 0 8px
          font-size: 12px
          color: rgb(77, 85, 93)
      .rating
        padding-top: 18px
        .title
          line-height: 14px
          margin-left: 18px
          font-size: 14px
          font-weight: 700
          color: rgb(7,17,27)
        .rating-wrapper
          padding: 0 18px
          .rating-item
            position: relative
            padding: 16px 0
            border-1px(rgba(7, 17, 27, 0.1))
            .user
              position: absolute
              right: 0
              top: 16px
              font-size: 0
              line-height: 12px
              .name
                display: inline-block
                vertical-align: top
                margin-right: 6px
                font-size: 10px
                color: rgb(147, 153, 159)
              .avatar
                border-radius: 50%
            .time
              margin-bottom: 6px
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
            .text
              line-height: 16px
              font-size: 12px
              color: rgb(7, 17, 27)
              .icon-thumb_down, .icon-thumb_up
                margin-right: 4px
                line-height: 16px
                font-size: 12px
              .icon-thumb_up
                color: rgb(0, 160, 220)
              .icon-thumb_down
                color: rgb(147, 153, 159)
          .no-rating
            padding: 16px 0
            font-size: 12px
            color: rgb(147, 153, 159)
</style>
