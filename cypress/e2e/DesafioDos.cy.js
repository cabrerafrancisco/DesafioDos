describe("hooks", () => {
    
    let data, tareitas;

    before(() => {
        cy.fixture("datos").then((datitos) =>{
            data = datitos;
            tareitas = data.tareas;
        })
    });

    beforeEach(() => {
        cy.visit("");
        cy.get('#registertoggle').dblclick();
        cy.get('#user').type(Cypress.env().usuario)
        cy.get('#pass').type(Cypress.env().password)
        cy.get("#submitForm").click();
        cy.get('#todolistlink').click()
        cy.get('[data-cy="removeAll"]').should('be.visible').click();
    })

    it('Primer test', () => {

        cy.get('#task', {timeout : 2000}).type(tareitas.tarea1)
        cy.get('#sendTask').click()

        cy.get('#task').clear()
        cy.get('#task').wait(2000).type(tareitas.tarea2)
        cy.get('#sendTask').click()

        cy.get('#task').clear()
        cy.get('#task').wait(2000).type(tareitas.tarea3)
        cy.get('#sendTask').click()

        cy.get('#task').clear()
        cy.get('#task').wait(2000).type(tareitas.tarea4)
        cy.get('#sendTask').click()

        cy.get('#task').clear()
        cy.get('#task', {timeout : 2000}).type(tareitas.tarea5)
        cy.get('#sendTask').click()

    })

    it('Segundo test', () => {
        cy.get('#task', {timeout : 1000});
        cy.xpath('//*[@id="all"]').should('exist').and('have.text','All');
        cy.get('#completed').should('exist').and('have.text','Completed');
        cy.xpath("//ul//div//div//div//div//button[@id='active']").should('exist').and('have.text','Active');
        cy.get('[data-cy="removeAll"]').should('exist').and('have.text','Remove all');
        
    })

    it('Tercer test', () => {
        cy.get('#task', {timeout : 2000}).type(tareitas.tarea1)
        cy.get('#sendTask').click()

        cy.get('#task').clear()
        cy.get('#task', {timeout : 2000}).type(tareitas.tarea2)
        cy.get('#sendTask').click()

        cy.wait(2000);//uso wait ya que no se puede usar timeout en xpath
        cy.xpath('//*[@id="root"]/div/div[2]/ul/div/div[1]').click();
        cy.wait(3000);
        cy.xpath('//*[@id="root"]/div/div[2]/ul/div/div[2]/li/div').click()
        cy.wait(3000);
        cy.xpath('//*[@id="root"]/div/div[2]/ul/div/div[2]/li/div/button').click()
        
    })

    it('Cuarto test', () => {
        cy.get('#task', {timeout : 2000}).type(tareitas.tarea1)
        cy.get('#sendTask').click()
        cy.get('#task').clear()
        cy.get('#task', {timeout : 2000}).type(tareitas.tarea2)
        cy.get('#sendTask').click()
        cy.wait(3000);
        cy.xpath('//*[@id="root"]/div/div[2]/ul/div/div[1]/li/div/button').click()
    })


    afterEach(() => {
        cy.wait(3000);
    })

    after(() => {
        cy.log('After')
    })
})