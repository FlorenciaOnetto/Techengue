describe('Publicación de Mascota', () => {
    it('Debería permitir al usuario publicar una nueva mascota', () => {
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
  
        // 4. Visitar la página de publicar mascota
        cy.visit('http://localhost:5173/publicar-mascota');
        
        cy.get('input[name="nombre"]').type('Rex');
        cy.get('select[name="tamano_aproximado"]').select('Mediano');
        cy.get('input[name="edad_aproximada"]').type('2');
        cy.get('select[name="edad_unidad"]').select('años');
        cy.get('select[name="especie"]').select('Perro');
        cy.get('input[name="raza"]').type('Labrador');
        cy.get('select[name="region"]').select('Metropolitana');
        cy.get('textarea[name="comportamiento"]').type('Amistoso con niños y otros perros');
        cy.get('input[name="salud"]').check(); // Marcar la opción "Con problemas de salud"
  
        // Cargar el archivo de imagen como base64
        cy.fixture('test_image.jpg', 'base64').then((fileContent) => {
            cy.get('input[type="file"]').attachFile({
            fileContent,
            fileName: 'test_image.jpg',
            mimeType: 'image/jpeg',
            encoding: 'base64',
            });
        });
  
  
        // 5. Enviar el formulario
        cy.get('button[type="submit"]').click();
        
        cy.get('.success-message').should('be.visible').and('contain', 'Mascota publicada correctamente');
      });
    });
  });
  