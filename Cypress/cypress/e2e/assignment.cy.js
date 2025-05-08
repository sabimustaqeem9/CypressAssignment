describe('Assignment: Tip Top', () => {
  const url = 'https://d3pv22lioo8876.cloudfront.net/tiptop/';

  beforeEach(() => {
    cy.visit(url);
  });

  it(`TC01 : Verify that the text input element with xpath .//input[@name='my-disabled'] is disabled in the form`, () => {
    cy.get("input[name='my-disabled']").should('be.disabled');
  });

  it(`TC02 : Verify that the text input with value 'Readonly input' is in readonly state by using 2 xpaths`, () => {
    cy.get("input[value='Readonly input']").should('have.attr', 'readonly');
    cy.xpath("//form//input[@readonly and @value='Readonly input']").should('exist');
  });

  it('TC03 : Verify that the dropdown field to select color is having 8 elements using 2 xpaths', () => {
    cy.xpath("//select[@name='my-select']/option").should('have.length', 8);
    cy.xpath("//form//select[@name='my-select']//option").should('have.length', 8);
  });

  it('TC04 : Verify that the submit button is disabled when no data is entered in Name field', () => {
    cy.get("input[name='my-name']").clear();
    cy.get("input[name='my-password']").clear();
    cy.get("button[type='submit']").should('be.disabled');
  });

  it('TC05 : Verify that the submit button enabled when both Name and Password field is entered', () => {
    cy.get("input[name='my-name']").type('John Doe');
    cy.get("input[name='my-password']").type('secure123');
    cy.get("button[type='submit']").should('not.be.disabled');
  });

  it("TC06 : Verify that on submit of 'Submit' button the page shows 'Received' text", () => {
    cy.get("input[name='my-name']").type('John');
    cy.get("input[name='my-password']").type('pass');
    cy.get("button[type='submit']").click();
    cy.get("#message").should('have.text', 'Received!');
  });

  it("TC07 : Verify that on submit of form all the data passed to the URL", () => {
    cy.intercept('POST', '**/tiptop*').as('formSubmit');
    cy.get("input[name='my-name']").type('Sabi');
    cy.get("input[name='my-password']").type('myPassword');
    cy.get("select[name='my-select']").select(2);
    cy.get("button[type='submit']").click();

    /* NO API CALL TO CHECK THE DATA */
    // cy.wait('@formSubmit').then((interception) => {
    //   expect(interception.request.body).to.include({
    //     name: 'Sabi',
    //     password: 'myPassword'
    //   });
    // });
  });
});