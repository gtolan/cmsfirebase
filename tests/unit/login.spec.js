import { mount } from "@vue/test-utils";

import Login from "@/views/Login.vue";


describe("Login wrapper exists", () => {
  const wrapper = mount(Login);
  
  describe("it has a wrapper with a class of Login", () => {
    it("has a wrapper", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("the wrapper has a class of login", () => {
        expect(wrapper.classes()).toContain('login');
    });
  })

  describe("clicking the register tab", () => {
    it('has an initial state of showRegister falsey', () => {
        expect(wrapper.vm.showRegister).toBe(false)  //Check state of Login/Register Modal
        const loginTab = wrapper.findAll('button').at(0);   //get Login tab button
        expect(loginTab.text()).toBe('Login');              //check the text is correct
        expect(loginTab.classes()).toContain('active');     //check the tab is active
    })
    it('on Click the state showRegister is truthy', () => {
        const registerTab = wrapper.findAll('button').at(1); 
        expect(registerTab.text()).toBe('Register');
        registerTab.trigger('click');
        expect(wrapper.vm.showRegister).toBe(true)
   
    })
  });

  it("has the correct welcome text - Sometimes we need just a little advice", ()=>{
    
    expect(wrapper.text()).toContain('Login')
  })
});
