<template>
<div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
          <ul>
              <li v-for="(item, index) in goods" class="menu-item border-1px" :class="{'current': currentIndex === index}" @click.stop.prevent="selectMenu($event,index)" ref="menuList">
                  <span class="text">
                      <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                  </span>
              </li>
          </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
          <ul>
              <li v-for="item in goods" class="food-list food-list-hook">
                  <h1 class="title">{{item.name}}</h1>
                  <ul>
                      <li v-for="food in item.foods" class="food-item border-1px">
                          <div class="icon">
                              <img width=57 height=57 :src="food.icon">
                          </div>
                          <div class="content">
                              <h2 class="name">{{food.name}}</h2>
                              <p class="desc">{{food.description}}</p>
                              <div class="extra">
                                  <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                              </div>
                              <price :food="food"></price>
                              <div class="cartcontrol-wrapper">
                                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                              </div>
                          </div>
                      </li>
                  </ul>
              </li>
          </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>

    </div>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
</div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import shopcart from "components/shopcart/shopcart";
import cartcontrol from "components/cartcontrol/cartcontrol";
import food from "components/food/food";
import price from "components/price/price";
import { data } from "common/js/data";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.goods = data().goods;
    this.$nextTick(() => {
      this._initScroll();
      this._calculateHeight();
    });
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(event, index) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    },
    addFood(target) {
      this._drop(target);
    },
    _followScroll(index) {
      let menuList = this.$refs.menuList;
      let el = menuList[index];
      this.menuScroll.scrollToElement(el, 300, 0, -100);
    },
    _drop(target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i);
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food,
    price
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
@import '../../common/stylus/base.styl';

.goods {
  display: flex;
  position: absolute;
  width: 100%;
  top: 174px;
  bottom: 46px;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;
      border-1px(rgba(7, 17, 27, 0.1));

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      &:last-child {
        border-none();
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        background-size: 12px 12px;
        margin-right: 2px;
        background-repeat: no-repeat;

        &.decrease {
          bg-image('decrease_3');
        }

        &.discount {
          bg-image('discount_3');
        }

        &.guarantee {
          bg-image('guarantee_3');
        }

        &.invoice {
          bg-image('invoice_3');
        }

        &.special {
          bg-image('special_3');
        }
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;
        overflow: hidden;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
