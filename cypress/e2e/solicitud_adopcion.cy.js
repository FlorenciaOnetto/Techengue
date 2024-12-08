describe('Solicitud de Adopción', () => {
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/auth/login', 
            body: {
                email: 'usuario_prueba@example.com', 
                password: 'password123' 
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            window.localStorage.setItem('token', response.body.token);
        });
    });

    it('Debería mostrar un error si los campos obligatorios no están completos', () => {
        cy.visit('http://localhost:5173/SolicitudAdopcion/1'); 

        cy.get('form').should('be.visible');

        cy.get('textarea[name="razones"]').type('Quiero darle un hogar a esta mascota');
        cy.get('input[name="contacto"]').type('123456789');
        cy.get('input[name="otrosAnimales"]').check('Sí');
        cy.get('input[name="experiencia"]').check('Sí');

        cy.get('button[type="submit"]').click();

        cy.get('.error-message').should('be.visible').and('contain', 'Este campo es obligatorio');
    });

    it('Debería enviar la solicitud correctamente si todos los campos están completos', () => {
        cy.visit('http://localhost:5173/SolicitudAdopcion/1'); 

        cy.get('textarea[name="razones"]').type('Quiero darle un hogar a esta mascota');
        cy.get('input[name="contacto"]').type('123456789');
        cy.get('input[name="otrosAnimales"]').check('Sí');
        cy.get('input[name="experiencia"]').check('Sí');

        cy.get('input[type="checkbox"]').check();

        cy.intercept('POST', 'http://localhost:3000/solicitudes/crear', {
            statusCode: 201,
            body: { message: 'Solicitud creada exitosamente' },
        }).as('createRequest');

        cy.get('button[type="submit"]').click();

        cy.wait('@createRequest').its('response.body.message').should('eq', 'Solicitud creada exitosamente');
    });
    
    
});
