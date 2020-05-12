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


it("shows the user profile", () => {
  //cy.visit('/dashboard')
  cy.location().should((loc) => {
    expect(loc.origin).to.eq('http://localhost:8080')
    expect(loc.pathname).to.eq('/dashboard')
  })
});
it("should have a list of articles", () => {
    //cy.visit('/dashboard')
    cy.get('.article-container').children().should('have.length', 7)
  });
it("should have a list of contacts", () => {
  //cy.visit('/dashboard')
  cy.get('#contactCon').children().should('have.length', 3);
  cy.get('#contactCon').children().eq(2).find('.send-message').trigger('click');
  cy.wait(1000);
  //cy.get('select').select('user-1')
});

it("should open a SEND message modal", () => {
    //cy.visit('/dashboard')
    cy.get('form .write-message textarea').type("This is a test message to another USER")
    cy.get('form .write-message button').click();
    cy.contains(".success", "Message Sent!");
    //expect('f')
  });


});
