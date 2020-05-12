import { mount,createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from 'vue-router'
import Products from "@/views/Products.vue";
const localVue = createLocalVue();
const router = new VueRouter()
// import { RouterLinkStub } from '@vue/test-utils';

localVue.use(Vuex)

const store = new Vuex.Store({
    state: {
        products:{
            allProducts:[
                {title:"title TEST",
                category:"category TEST",
                description:"description TEST", 
                price:20}
            ],
        selectedProduct:null,
        writtenProduct:null
      }
    }
})

describe("Products.vue", () => {
  const wrapper = mount(Products, { 
    store, 
    localVue,
    router,
    stubs: ['router-link', 'router-view']  //
    // stubs: {
    //     RouterLink: RouterLinkStub,
    // } 
  });
  
  describe("it has a wrapper with a text of Expert Advice", () => {
    it("has a wrapper", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("has expert advice text", () => {
        expect(wrapper.text()).toContain('Expert Advice');
    });
  })

  describe("it has a list of test product cards with fields", () => {
    it("has a list container", ()=>{
        const list = wrapper.find('.product-list');
        expect(list.exists()).toBe(true)

    })
    it("has a card inside the list", ()=>{
        const card = wrapper.find('.product-list .product-card');
        expect(card.exists()).toBe(true)

    })
    it("has product information displayed", ()=>{
        const card = wrapper.find('.product-list .product-card');
        expect(card.exists()).toBe(true)

        const title = card.find('.title')
        const description = card.find('.description')
        const category = card.find('.category-chip-product');
        const price = card.find('.product-price');
        
        expect(title.text()).toBe('title TEST');
        expect(description.text()).toBe('description TEST');
        expect(category.text()).toBe('category TEST');
        expect(price.text()).toContain('€');  //Check filter is working and prefixing euro symbol
        //€
    })

  })

});
