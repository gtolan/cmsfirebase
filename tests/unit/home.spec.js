import { shallowMount } from "@vue/test-utils";
//import HelloWorld from "@/components/HelloWorld.vue";
import Home from "@/views/Home.vue";


describe("Home.vue", () => {
  const wrapper = shallowMount(Home);
  it("has a wrapper", () => {
    //const wrapper = mount(Home);
    expect(wrapper.exists()).toBe(true);
  });

  it("the wrapper has a class of home", () => {
    //const wrapper = mount(Home);
    expect(wrapper.classes()).toContain('home');
  });

  it("has a video element", () => {
    //const wrapper = mount(Home);
    expect(wrapper.find('video').exists()).toBe(true)
  });
  it("has the correct welcome text - Sometimes we need just a little advice", ()=>{
    
    expect(wrapper.text()).toBe('Sometimes we need just a little advice')
  })
});
