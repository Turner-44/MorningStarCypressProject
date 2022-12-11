import { A_D } from "../fixtures/nyseStockTickersA-D.js";

describe("morningStarGetPageValues", () => {
  it("goToIncomeFinances", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    A_D.forEach((stock) => {
      cy.visit(`https://www.morningstar.com/stocks/xnys/${stock}/financials`, {
        timeout: 20000,
      });

      cy.intercept("GET", "**/incomeStatement/detail?*").as("incomeStatement");
      cy.intercept("GET", "**/balanceSheet/detail?*").as(
        "balanceSheetStatement"
      );
      cy.intercept("GET", "**/cashFlow/detail?*").as("cashFlowStatement");

      cy.contains("Expand Detail View").click();
      cy.wait("@incomeStatement").then((req) => {
        cy.writeFile(
          `outputs/nyse/A_D/incomeStatment/${stock}.json`,
          JSON.stringify(req.response.body)
        );
      });

      cy.get("#balanceSheet").click();
      cy.wait("@balanceSheetStatement").then((req) => {
        cy.writeFile(
          `outputs/nyse/A_D/balanceSheet/${stock}.json`,
          JSON.stringify(req.response.body)
        );
      });

      cy.get("#cashFlow").click();
      cy.wait("@cashFlowStatement").then((req) => {
        cy.writeFile(
          `outputs/nyse/A_D/cashFlow/${stock}.json`,
          JSON.stringify(req.response.body)
        );
      });
    });
  });
});
