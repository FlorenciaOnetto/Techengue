describe('Navbar', () => {
  it('Debería navegar correctamente a las distintas páginas desde el Navbar', () => {
    cy.visit('http://localhost:5173/inicio');

    // 1. Iniciar sesión: Enviar una solicitud para obtener el token
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/login', 
      body: {
        email: 'usuario_prueba@example.com',  
        password: 'password123'               
      }
    }).then((response) => {
      // 2. Asegurarse de que la respuesta contiene un token
      expect(response.status).to.eq(200);
      const { token, nombre, id } = response.body;

      // 3. Guardar el token y nombre en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('userId', id);

      // Recargar la página para aplicar los cambios en el navbar
      cy.reload();
    });

    // 4. Verificar que los enlaces de la navbar estén visibles después de logearse
    cy.get('a').contains('Perfil de Usuario').should('be.visible');
    cy.get('a').contains('Publicar Mascota').should('be.visible');

    // 5. Acceder al perfil de usuario
    cy.get('a').contains('Perfil de Usuario').click();
    cy.url().should('include', '/perfilusuario'); // Asegúrate que la URL es correcta

    // 6. Acceder a la página para publicar mascota
    cy.get('a').contains('Publicar Mascota').click();
    cy.url().should('include', '/publicar-mascota'); // Asegúrate que la URL es correcta
  });

  it('No debería mostrar el perfil de usuario ni publicar mascota si no está logeado', () => {
    // Visitar la página sin estar logeado
    cy.visit('http://localhost:5173/inicio');

    // Verificar que "Perfil de Usuario" y "Publicar Mascota" no están visibles
    cy.get('a').contains('Perfil de Usuario').should('not.exist');
    cy.get('a').contains('Publicar Mascota').should('not.exist');
  });
});
