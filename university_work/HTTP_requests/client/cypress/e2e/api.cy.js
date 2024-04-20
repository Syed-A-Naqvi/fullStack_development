/**
 * this is the testing file for Cypress, DO NOT TOUCH
 */

describe("testing the API portion of the website", () => {
  /**
   * need to test how the student's website handles API information
   * - stubbing any request to http://localhost with students.json
   *
   * tests
   * - if there is no error, then there should be 6 <tr>s in the table
   * - existing functionality should still work too
   *   - adding a <tr> should still work (there will be 7)
   */

  it("the table should render the data from the API", () => {
    // stubbing the response
    cy.intercept("GET", "*/api/students/*", {
      fixture: "students.json",
    }).as("payload");

    // loading the page
    cy.visit("../../index.html");

    // awaiting HTTP request
    cy.wait("@payload");

    /// HTML page requested data, processing it

    // examing the table to test for records
    cy.get("table#chart > tbody > tr")
      // the student should have removed the default <tr>
      .should("have.length", 6);
  });
});
