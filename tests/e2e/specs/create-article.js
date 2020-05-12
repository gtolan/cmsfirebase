// https://docs.cypress.io/api/introduction/api.html
//Attributes
    //cy.get('form.login-form input[type="password"]').should('have.attr', 'value', '123456')
    //cy.get('form.login-form input[type="password"]').invoke('attr', 'value', '123456')
    //.should('have.attr', 'value', '123456')  
    //cy.url().should('include', '/login') 


//Fill in form test credentials
const loginUser = () =>{
    cy.get('form.login-form input[type="email"]').type('tolangerard@gmail.com')
    cy.get('form.login-form input[type="password"]').type('123456{enter}');
}


describe("Send message user story", () => {
it("Visits the app root url", () => {
  cy.visit("/");
  cy.contains("h1", "Sometimes we need just a little advice");
})
it("Visits the login page", () => {
  //cy.get('nav').find('>a:nth-child(3)').trigger('click');  
  //OR test using data-cy attr if native/css selector too many queries
  cy.get('nav').find('[data-cy=login]').trigger('click'); 
  cy.url().should('include', '/login') 
});
it("logs in the test user", () => {
  
  loginUser()   
});


it("opens the write article ", () => {
  //cy.visit('/dashboard')
  cy.get('nav button.dropdown').trigger('click');
  cy.get('nav button.dropdown .menu.active').children().eq(1).trigger('click'); 
  cy.visit('/add-blog-article');
})

it("fills out the form for new article ", () => {

  cy.get('form .use-image-url button').click();
  cy.get('form .use-image-url input').type('https://static.officeholidays.com/images/1280x853c/easter-eggs-10.jpg')
  cy.get('form input[type="date"]').type('2020-04-01')
  cy.get('form input[name="title"]').type('Article Title TEST')
  cy.get('form input[name="summary"]').type('article Summary TEST');
  cy.get('form textarea').type('article content TEST');
  cy.get('form button[type="submit"]').click();

})
it("gets success message on form submission ", () => {
   
   cy.contains(".success-container h1", "Thank you for contributing!");
    //form.login-form input[type="password"]
});




});
