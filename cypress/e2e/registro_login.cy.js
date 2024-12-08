describe('Flujo de Registro e Inicio de Sesión', () => {
  it('Debería registrar un nuevo usuario e iniciar sesión', () => {
    cy.visit('http://localhost:5173/registro');
    
    cy.get('input[name="username"]').type('usuario_prueba');
    cy.get('input[name="email"]').type('usuario_prueba@example.com');
    cy.get('input[name="password"]').type('password123');
    
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login');  

    cy.get('input[name="email"]').type('usuario_prueba@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/inicio');
  });

});
