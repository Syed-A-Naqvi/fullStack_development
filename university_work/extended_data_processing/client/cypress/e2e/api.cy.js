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

  beforeEach("setting HTTP request failure exception", () => {
    // setting a fetch error handler
    cy.on("uncaught:exception", (e) => {
      if (e.message.includes("NetworkError")) {
        // page made call to API but failed, ignoring
        return false;
      }
      if (e.message.includes("fetch")) {
        // page made call to API but failed, ignoring
        return false;
      }
    });
  })

  it("Lab 5: the table should render the data from the API", () => {
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

  context("Lab 6: testing each button that POSTs data to the API", () => {
    beforeEach("prepping the page", () => {
      // stubbing the response
      cy.intercept("GET", "*/api/students/*", {
        fixture: "students.json",
      }).as("payload");

      // stubbing the response
      cy.intercept("POST", "*/api/format/*").as("request");

      // loading the page
      cy.visit("../../index.html");

      // awaiting HTTP request
      cy.wait("@payload");
    });

    ["button#to_csv", "button#to_xml", "button#to_json"].map(sel => {
      const endpoint = sel.split("_")[1]
      const type = {
        "csv": "text/csv",
        "json": "application/json",
        "xml": "application/xml"
      }

      return it(`${sel} should make a POST to /api/format/${endpoint}`, () => {
        cy.get(sel) 
          .click()
          .wait("@request")
          .then(req => {
            // shorthand
            const request = req.request;
            const headers = request.headers;

            // asserting
            expect(request.body.length).not.eq(0, "the body shouldn't be empty");
            expect(request.method).to.eq("POST", "the method should be POST");
            expect(headers["accept"]).to.contain(type[endpoint], "the request should accept the proper MIME type");
            expect(headers["content-type"]).to.contain("text/html", "the request should contain the proper content-type");
          })
      })
    })
  });
});
