describe('Búsqueda de Mascotas', () => {
    it('Debería filtrar las mascotas por especie, región, y tamaño aproximado', () => {
        cy.visit('http://localhost:5173/inicio');

        cy.get('select[name="especie"]').select('Perro');
        cy.get('select[name="region"]').select('Metropolitana');
        cy.get('select[name="tamano_aproximado"]').select('Mediano');
        cy.get('button.search-btn').click();

        cy.get('.mascota-card').each((mascota) => {

            cy.wrap(mascota).should('contain', 'Nombre');
            cy.wrap(mascota).should('contain', 'Especie');
            cy.wrap(mascota).should('contain', 'Raza');
            cy.wrap(mascota).should('contain', 'Edad');
            cy.wrap(mascota).should('contain', 'Región');
            cy.wrap(mascota).should('contain', 'Mediano');

        });
    });

    it('Debería mostrar un mensaje cuando no haya mascotas que coincidan con los filtros', () => {
        cy.visit('http://localhost:5173/inicio');

        cy.get('select[name="especie"]').select('Gato');
        cy.get('select[name="region"]').select('Magallanes');
        cy.get('select[name="tamano_aproximado"]').select('Grande');
        cy.get('button.search-btn').click();

        cy.get('.no-results-message').should('be.visible').and('contain', 'No hay mascotas que coincidan con tu búsqueda.');
    });
});
