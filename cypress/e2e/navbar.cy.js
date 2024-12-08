describe('Navbar', () => {
  it('Debería navegar correctamente a las distintas páginas desde el Navbar', () => {
    cy.visit('http://localhost:5173/inicio');

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/login', 
      body: {
        email: 'usuario_prueba@example.com',  
        password: 'password123'               
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const { token, nombre, id } = response.body;

      localStorage.setItem('token', token);
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('userId', id);

      cy.reload();
    });

    cy.get('a').contains('Perfil de Usuario').should('be.visible');
    cy.get('a').contains('Publicar Mascota').should('be.visible');

    cy.get('a').contains('Perfil de Usuario').click();
    cy.url().should('include', '/perfilusuario'); 

    cy.get('a').contains('Publicar Mascota').click();
    cy.url().should('include', '/publicar-mascota');
  });

  it('No debería mostrar el perfil de usuario ni publicar mascota si no está logeado', () => {
    cy.visit('http://localhost:5173/inicio');

    cy.get('a').contains('Perfil de Usuario').should('not.exist');
    cy.get('a').contains('Publicar Mascota').should('not.exist');
  });
});
