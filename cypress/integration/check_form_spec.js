describe('Check form', function() {
  it('表示確認', function() {
    cy.visit('/')

    // UI should reflect
    cy.get('main').should('contain', 'お問い合わせフォーム')
  })
})
