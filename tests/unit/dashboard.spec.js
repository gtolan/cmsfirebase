import { shallowMount } from "@vue/test-utils";

import Dashboard from "@/views/Dashboard.vue";


describe("Dashboard.vue", () => {
  const wrapper = shallowMount(Dashboard, {   stubs: ['router-link', 'router-view']});
  it("has a wrapper", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("the wrapper has a class of dashboard", () => {
    expect(wrapper.classes()).toContain('dashboard');
  });

  it("has a container wrapping components", () => {
    expect(wrapper.find('.profile-wrapper').exists()).toBe(true)
  });

});
