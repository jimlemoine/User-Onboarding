describe("User Form App", () => {
    beforeEach(() => {
        cy.visit('localhost:3000');
    })

    // Helpers
    const nameInput = () => cy.get('input[name=name]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const termsInput = () => cy.get('input[name=terms]');
    const submitButton = () => cy.get('button[id=submitButton]')

    it('Name Test', () => {
        nameInput()
            .should('have.value', '')
            .type('Jim')
            .should('have.value', 'Jim')
    })

    it('Email Test', () => {
        emailInput()
            .type('someone@whatever.com')
    })

    it('Password Input', () => {
        passwordInput()
            .type('apassword')
    })

    it('Check the terms box', () => {
        termsInput()
            .check()
            .should('be.checked')
    })

    it('Click Submit button', () => {
        nameInput()
            .type('Jim');
        emailInput()
            .type('someone@whatever.com');
        passwordInput()
            .type('arandompword');
        termsInput()
            .check();
        submitButton()
            .click()
    })

})
//do not type here... DANGER ZONE