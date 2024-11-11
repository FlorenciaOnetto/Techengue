describe('Flujo de Registro e Inicio de Sesión', () => {
  
  it('Debería registrar un nuevo usuario e iniciar sesión', () => {
    // Visita la página de registro
    cy.visit('/registro')
    cy.get('input[name="username"]').type('usuario_prueba')
    cy.get('input[name="email"]').type('usuario_prueba@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()

    // Verifica que redirige a la página de inicio después del registro
    cy.url().should('include', '/inicio')

    // Cerrar sesión para probar el inicio de sesión
    cy.visit('/login')
    cy.get('input[name="email"]').type('usuario_prueba@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()

    // Verifica que redirige a la página de inicio después del inicio de sesión
    cy.url().should('include', '/inicio')
  })
})