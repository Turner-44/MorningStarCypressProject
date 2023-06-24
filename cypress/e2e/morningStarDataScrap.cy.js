import { A_D } from "../fixtures/nyseStockTickersA-D.js";

describe("morningStarGetPageValues", () => {
  A_D.forEach((stock) => {
    it(`Running scrape for ${stock}`, () => {
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });

      cy.intercept("**/financials").as("stockData");

      cy.visit(`https://www.morningstar.com/stocks/xnys/${stock}/financials`, {
        timeout: 20000,
        failOnStatusCode: false,
      });

      cy.wait("@stockData").then((req) => {
        if (req.response.statusCode == 200) {
          cy.intercept("GET", "**/incomeStatement/detail?*").as(
            "incomeStatement"
          );
          cy.intercept("GET", "**/balanceSheet/detail?*").as(
            "balanceSheetStatement"
          );
          cy.intercept("GET", "**/cashFlow/detail?*").as("cashFlowStatement");

          cy.contains("Expand Detail View", { timeout: 10000 }).click();
          cy.wait("@incomeStatement").then((req) => {
            cy.writeFile(
              `outputs/xyse/A_D/incomeStatment/${stock}.json`,
              JSON.stringify(req.response.body)
            );
          });

          cy.get("#balanceSheet").click();
          cy.wait("@balanceSheetStatement").then((req) => {
            cy.writeFile(
              `outputs/xyse/A_D/balanceSheet/${stock}.json`,
              JSON.stringify(req.response.body)
            );
          });

          cy.get("#cashFlow").click();
          cy.wait("@cashFlowStatement").then((req) => {
            cy.writeFile(
              `outputs/xyse/A_D/cashFlow/${stock}.json`,
              JSON.stringify(req.response.body)
            );
          });
        } else {
          cy.writeFile(`outputs/xyse/A_D/failures/${stock}.text`, "");
        }
      });
    });
  });
});
