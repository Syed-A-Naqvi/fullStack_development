/**
 * this is the testing file for Cypress, DO NOT TOUCH
 */

import rgbHex from "rgb-hex";

describe("testing the student's HTML page", () => {
  /**
   * need tests for:
   * CSS
   * - the <th>s should have classes and should be tested for their background-color
   * - the div should:
   *   - display: flex;
   *   - flex-direction: row;
   * HTML
   * - there should be a table
   *  - it should have three columns
   * - there should be three inputs & one button in a div
   *  - these should have ids
   * JS
   * - the button#submit should:
   *  - append a new tr to the tbody of the table with the data inputted
   *  - it should do NOTHING if one of the fields is empty
   */

  beforeEach("Reading the HTML file", () => {
    // connecting to the file
    cy.visit("./index.html");

    // awaiting for load, sometimes it's finicky
    cy.wait(100);

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
  });

  context("testing the HTML", () => {
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

    context("asserting the IDs of tags", () => {
      /// mass testing
      ["input#name", "input#gpa", "input#id", "button#submit"].map((sel) => {
        return it(`${sel} should exist and be within div.row`, () => {
          cy.get(`div > ${sel}`).should("exist");
        });
      });

      it("table#chart should exist", () => {
        cy.get("table#chart").should("exist");
      });
    });

    context("testing the attributes of the input tags", () => {
      return ["name", "gpa", "id"].map((id) => {
        return it(`input#${id} should have placeholder "${id}"`, () => {
          cy.get(`div > input#${id}`)
            .should("have.attr", "placeholder")
            .then((text) => {
              expect(text.toLowerCase()).to.eq(id);
            });
        });
      });
    });
  });

  context("testing the page's CSS", () => {
    context("testing table headers", () => {
      [
        { class: "green", column: "name", color: "00ff00" },
        { class: "blue", column: "gpa", color: "0000ff" },
        { class: "red", column: "id", color: "ff0000" },
      ].map((header) => {
        return it(`th.${header.column} should have background-color: #${header.color}`, () => {
          cy.get(`table#chart > thead > tr > th.${header.class}`)
            .should("have.text", header.column)
            .invoke("css", "background-color")
            .then((bgcolor) => {
              expect(rgbHex(bgcolor)).to.eq(header.color);
            });
        });
      });
    });

    it("testing `div.row`", () => {
      cy.get("div.row")
        .should("have.css", "display", "flex")
        .and("have.css", "flex-direction", "row");
    });
  });

  context("testing the page's JS", () => {
    const mapping = ["input#name", "input#id", "input#gpa"];
    const data = ["fort nite", "100000000", "4.3"];

    it("function should append data properly", () => {
      // setting the values
      for (const index in [0, 1, 2]) {
        cy.get(mapping[index]).type(data[index]);
      }

      // clicking the button
      cy.get("button#submit").click();

      // inspecting the table
      cy.get("#chart > tbody > tr")
        .should("have.length", 1) // TRs: default & inputted
        .find("td")
        .should("have.length", 3)
        // the TDs should have data in specific indices
        .then(($tds) => {
          for (const index in [0, 1, 2])
            cy.wrap($tds[index].innerText).should("be.eq", data[index]);
        });
    });

    context("function should do nothing if a field is empty", () => {
      mapping.map((el) => {
        return it(`should do nothing if ${el} is empty`, () => {
          for (const index in mapping) {
            // skipping this index
            if (el === mapping[index]) continue;

            // typing into the inputs
            cy.get(mapping[index]).type(data[index]);
          }

          // the button shouldn't do anything
          cy.get("button#submit")
            .click()
            .get("table#chart > tbody")
            .children()
            .should("have.length", 0);

          // clearing inputs
          for (const el of mapping) {
            cy.get(el).clear();
          }
        });
      });
    });
  });
});
