describe('Check actions', () => {
	beforeEach(() => {
		cy.clearLocalStorage();
		cy.visit('/edit');
	});
	it('should update markdown code', () => {
		cy.get('#markdown')
			.invoke('val')
			.then((oldText) => {
				cy.get('#editor').click('bottom').type('{enter}C --> HistoryTest');
				cy.get('#markdown')
					.invoke('val')
					.then((newText) => {
						expect(oldText).to.not.eq(newText);
					});
			});
	});

	it('should load gists from URL', () => {
		cy.get('#gist').type('https://gist.github.com/sidharthv96/6268a23e673a533dcb198f241fd7012a');
		cy.contains('Load Gist').click();
		cy.contains('Go shopping!!');
	});
});
