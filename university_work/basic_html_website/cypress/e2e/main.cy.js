/**
 * this is the testing file for Cypress, DO NOT TOUCH
 */

import rgbHex from "rgb-hex";

describe("Testing the student's HTML page", () => {
  /**
   * need tests for:
   * CSS
   * - the <th>s should have classes and should be tested for their background-color
   * HTML
   * - there should be a table
   *  - it should have three columns
   * - there should be three inputs & one button in a div
   *  - these should have ids
   * JS
   * - the function add_record() should:
   *  - append a new tr to the tbody of the table with the data inputted
   *  - it should do NOTHING if one of the fields is empty
   */

  beforeEach("Reading the HTML file", () => {
    // connecting to the file
    cy.visit("./index.html");
  });

  context("Testing the page's HTML structure", () => {
    it("testing the table headers", () => {
      // they should have headers
      cy.get("table#chart > thead > tr > th").should("have.length", 3);

      // they should be in a certain order
      const ordering = ["name", "id", "gpa"];

      cy.get("table#chart > thead > tr > th").then((ths) => {
        for (const index in [0, 1, 2]) {
          expect(ths[index].innerText.toLowerCase()).to.eq(ordering[index]);
        }
      });
    });

    it("testing for ids", () => {
      /// testing the ids of the inputs
      cy.get("div > input#name").should("exist");
      cy.get("div > input#gpa").should("exist");
      cy.get("div > input#id").should("exist");
      cy.get("div > button#submit").should("exist");
      cy.get("table#chart").should("exist");
    });

    it("testing the attributes of the input tags", () => {
      cy.get("div > input#name")
        .should("have.attr", "placeholder")
        .then((text) => {
          expect(text.toLowerCase()).to.eq("name");
        });
      cy.get("div > input#gpa")
        .should("have.attr", "placeholder")
        .then((text) => {
          expect(text.toLowerCase()).to.eq("gpa");
        });
      cy.get("div > input#id")
        .should("have.attr", "placeholder")
        .then((text) => {
          expect(text.toLowerCase()).to.eq("id");
        });
    });
  });

  context("Testing the page's CSS", () => {
    it("testing the table headers", () => {
      // testing the id column
      cy.get("table#chart > thead > tr > th.red")
        .should("have.text", "id")
        .invoke("css", "background-color")
        .then((bgcolor) => {
          expect(rgbHex(bgcolor)).to.eq("ff0000");
        });

      // testing the name column
      cy.get("table#chart > thead > tr > th.green")
        .should("have.text", "name")
        .invoke("css", "background-color")
        .then((bgcolor) => {
          expect(rgbHex(bgcolor)).to.eq("00ff00");
        });

      // testing the gpa column
      cy.get("table#chart > thead > tr > th.blue")
        .should("have.text", "gpa")
        .invoke("css", "background-color")
        .then((bgcolor) => {
          expect(rgbHex(bgcolor)).to.eq("0000ff");
        });
    });
  });

  context("Testing the page's JS", () => {
    const data = ["fort nite", "100000000", "4.3"];

    it("function should append data properly", () => {
      // setting the values
      cy.get("input#name").type(data[0]);
      cy.get("input#id").type(data[1]);
      cy.get("input#gpa").type(data[2]);

      // clicking the button
      cy.get("button#submit").click().wait(50);

      // inspecting the table
      cy.get("#chart > tbody > tr")
        .should("have.length", 2) // TRs: default & inputted
        .eq(1)
        .find("td")
        .should("have.length", 3)
        // the TDs should have data in specific indices
        .then(($tds) => {
          for (const index in [0, 1, 2])
            cy.wrap($tds[index].innerText).should("be.eq", data[index]);
        });
    });

    it("function should do nothing if a field is empty", () => {
      const mapping = ["input#name", "input#id", "input#gpa"];

      // typing into select fields
      for (const skip in mapping) {
        for (const index in mapping) {
          // skipping this index
          if (skip === index) continue;

          console.log(mapping, index, mapping[index]);

          // typing into the inputs
          cy.get(mapping[index]).type(data[index]);
        }

        // the button shouldn't do anything
        cy.get("button#submit")
          .click()
          .wait(50)
          .get("table#chart > tbody")
          .find("tr")
          .should("have.length", 1);

        // clearing inputs
        for (const el of mapping) {
          cy.get(el).clear();
        }
      }
    });
  });
});
