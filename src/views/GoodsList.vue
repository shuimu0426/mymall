<template>
    <div>
      <nav-header></nav-header>
      <nav-bread></nav-bread>
      <img src="../../resource/loading/loading-bubbles.svg"/>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop"  v-bind:class="{'filterby-show':filterBy}" id="filter">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="priceChecked='all'"  v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)"  v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}}-{{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+item.prodcutImg" alt=""></a>
                    </div>
                    <div class="main">
                    	{{item.productId}}
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.prodcutPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
		import './../assets/css/base.css'
		import NavHeader from '@/components/NavHeader.vue'
		import NavBread from '@/components/NavBread.vue'
		import NavFooter from '@/components/NavFooter.vue'
		import axios from 'axios'
		export default{
			data(){
				return{
					goodsList:[],
					priceFilter:[
						{
							startPrice:'0.00',
							endPrice:'500.00'
						},
						{
							startPrice:'500.00',
							endPrice:'1000.00'
						},
						{
							startPrice:'1000.00',
							endPrice:'2000.00'
						}
					],
					priceChecked:'all',
					filterBy:false,
					overLayFlag:false
				}
			},
			components:{
				NavHeader,
				NavBread,
				NavFooter
			},
			mounted:function(){
				this.getGoodsList();
			},
			methods:{
				getGoodsList(){
					axios.get("./goods").then((result)=>{
						var res = result.data;
						this.goodsList = res.result;
					});
				},
				showFilterPop(){
					this.filterBy = true;
					this.overLayFlag = true;
				},
				setPriceFilter(index){
					this.priceChecked = index;
					this.closePop();
				},
				closePop(){
					this.filterBy = false;
					this.overLayFlag = false;
				}
			}
		}
</script>
