describe('Test themes', () => {
	describe('Test light themes', () => {
		beforeEach(() => {
			cy.clearLocalStorage();
			cy.visit('/edit', {
				onBeforeLoad(win) {
					cy.stub(win, 'matchMedia')
						.callThrough()
						.withArgs('(prefers-color-scheme: dark)')
						.returns({
							matches: false
						});
				}
			});
			cy.contains('Change Theme').click();
		});

		it('should set light theme as default', () => {
			cy.contains('light').parent().should('have.class', 'bordered');
			cy.contains('dark').parent().should('not.have.class', 'bordered');
			cy.getLocalStorage('themeStore').snapshot();
		});

		it('should change themes when clicked', () => {
			cy.contains('light').parent().should('have.class', 'bordered');
			cy.contains('cupcake').click();
			cy.contains('cupcake').parent().should('have.class', 'bordered');
			cy.contains('light').parent().should('not.have.class', 'bordered');
			cy.contains('dark').parent().should('not.have.class', 'bordered');
			cy.getLocalStorage('themeStore').snapshot();
		});
	});

	describe('Test dark mode', () => {
		// eslint-disable-next-line mocha/no-hooks-for-single-case
		beforeEach(() => {
			cy.clearLocalStorage();
			cy.visit('/edit', {
				onBeforeLoad(win) {
					cy.stub(win, 'matchMedia')
						.callThrough()
						.withArgs('(prefers-color-scheme: dark)')
						.returns({
							matches: true
						});
				}
			});
			cy.contains('Change Theme').click();
		});

		it('should set dark theme as default', () => {
			cy.contains('light').parent().should('not.have.class', 'bordered');
			cy.contains('dark').parent().should('have.class', 'bordered');
			cy.getLocalStorage('themeStore').snapshot();
		});
	});
});
