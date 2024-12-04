describe('Flujo de Registro e Inicio de Sesión', () => {
  
  it('Debería registrar un nuevo usuario e iniciar sesión', () => {
    // Visita la página de registro
    cy.visit('http://localhost:5173/registro')
    
    // Interactuar con los campos de registro usando los atributos name
    cy.get('input[name="username"]').type('usuario_prueba') // Usa name="username"
    cy.get('input[name="email"]').type('usuario_prueba@example.com') // Usa name="email"
    cy.get('input[name="password"]').type('password123') // Usa name="password"
    
    // Hacer clic en el botón de registro
    cy.get('button[type="submit"]').click()

    // Verifica que redirige a la página de inicio después del registro
    cy.url().should('include', '/inicio')

    // Realiza el login
    cy.visit('/login')
    cy.get('input[name="email"]').type('usuario_prueba@example.com') // Usa name="email"
    cy.get('input[name="password"]').type('password123') // Usa name="password"
    cy.get('button[type="submit"]').click()

    // Verifica que redirige a la página de inicio después del inicio de sesión
    cy.url().should('include', '/inicio')
  })
})
