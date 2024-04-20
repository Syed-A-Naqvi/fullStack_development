/**
 * this is the testing file for Cypress, DO NOT TOUCH
 */

import rgbHex from "rgb-hex";

const DEFAULTLEN = 6;
const MAXTH = 8;

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
    // stubbing the response
    cy.intercept("GET", "*/api/students/*", {
      fixture: "students.json",
    }).as("payload");

    // connecting to the file
    cy.visit("./index.html");

    // awaiting for load, sometimes it's finicky
    cy.wait("@payload");

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
    it("Lab 4: testing the table headers", () => {
      // they should be in a certain order
      const ordering = ["name", "id", "gpa"];

      // they should have headers
      cy.get("table#chart > thead > tr > th").should(
        "have.length.gte",
        ordering.length
      );

      cy.get("table#chart > thead > tr > th").then((ths) => {
        for (let i = 0; i < ordering.length; ++i) {
          expect(ths[i].innerText.toLowerCase()).to.eq(ordering[i]);
        }
      });
    });

    context("Lab 4: asserting the IDs of tags", () => {
      /// mass testing
      ["input#name", "input#gpa", "input#id", "button#submit"].map((sel) => {
        return it(`${sel} should exist and be within div.row`, () => {
          cy.get("div.row").find(sel).should("exist");
        });
      });

      it("table#chart should exist", () => {
        cy.get("table#chart").should("exist");
      });
    });

    context("Lab 4: testing the attributes of the input tags", () => {
      return ["name", "gpa", "id"].map((id) => {
        return it(`input#${id} should have placeholder "${id}"`, () => {
          cy.get("div.row")
            .find(`input#${id}`)
            .should("have.attr", "placeholder")
            .then((text) => {
              expect(text.toLowerCase()).to.eq(id);
            });
        });
      });
    });

    context("Lab 6: testing the API buttons", () => {
      /// mass testing
      ["button#to_csv", "button#to_xml", "button#to_json"].map((sel) => {
        return it(`${sel} should exist and be within div.row`, () => {
          cy.get("div.row").find(sel).should("exist");
        });
      });
    });

    context("Lab 7: testing the API buttons", () => {
      /// mass testing
      [
        "input#assignment1",
        "input#assignment2",
        "input#labs",
        "input#midterm",
        "input#final",
      ].map((sel) => {
        return it(`${sel} should exist and be within div.row`, () => {
          cy.get("div.row").find(sel).should("exist");
        });
      });
    });

    it("Lab 7: testing the table headers", () => {
      // they should be in a certain order
      const ordering = [
        "name",
        "id",
        "gpa",
        "Assignment 1",
        "Assignment 2",
        "Labs",
        "Midterm",
        "Final",
      ];

      // they should have headers
      cy.get("table#chart > thead > tr > th").should(
        "have.length",
        ordering.length
      );

      cy.get("table#chart > thead > tr > th").then((ths) => {
        for (let i = 0; i < ordering.length; ++i) {
          expect(ths[i].innerText.toLowerCase()).to.eq(
            ordering[i].toLowerCase()
          );
        }
      });
    });
  });

  context("Lab 4: testing the page's CSS", () => {
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

  context("Lab 4: testing the page's JS", () => {
    const mapping = [
      "input#name",
      "input#id",
      "input#gpa",
      "input#assignment1",
      "input#assignment2",
      "input#labs",
      "input#midterm",
      "input#final",
    ];
    const data = ["fort nite", "100000000", "4.3", "1", "2", "3", "4", "5"];

    it("function should append data properly", () => {
      // setting the values
      for (let i = 0; i < mapping.length; ++i) {
        cy.get(mapping[i]).type(data[i]);
      }

      // clicking the button
      cy.get("button#submit").click();

      // inspecting the table
      cy.get("#chart > tbody > tr")
        .should("have.length", DEFAULTLEN + 1) // TRs: default & inputted
        .last("tr")
        .find("td")
        .should("have.length", MAXTH)
        // the TDs should have data in specific indices
        .then(($tds) => {
          for (let i = 0; i < mapping.length; ++i) {
            cy.wrap($tds[i].innerText).should("be.eq", data[i]);
          }
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
            .should("have.length", DEFAULTLEN);
        });
      });
    });
  });
});
