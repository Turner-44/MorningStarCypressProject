/// <reference types="cypress" />

import 'cypress-wait-until';

Cypress.config()


describe('morningStarGetPageValues', () =>{

    it('openWebsite', () =>{
        cy.visit('https://www.morningstar.com/stocks/xnas/vrtx/financials', { timeout: 20000 })
    })

    it('goToIncomeFinances', () =>{
        //let incomeLink = document.querySelector('a[ng-if="!vm.financialSummaryOnly"]');
        //cy.get('a[ng-if="!vm.financialSummaryOnly"]', { timeout: 10000 }).eq(0).should('be.visible').click();
        cy.contains('Income Statement').click();
        cy.contains('a', 'Details View', { timeout: 20000 }).should('be.visible').click();
        
        //cy.get('button[ng-click="vm.export()"]').should('be.visible').click();

    })

    // it('getValues', () =>{
    //     cy.get('div[title="Total Diluted EPS"]', { timeout: 10000 })
    //     .parent()
    //     .invoke('attr','index')
    //     .then($index =>{
    //         let index = '"'+$index+'"';
    //         cy.get('div[index='+index+'].tg-row').eq(1)
    //         .children()
    //         .each($value =>{
    //         cy.log($value.text())
    //         })
    //         //'.tg-row[index=74]'
    //     })

    //     //Locator not finding elements out of focus inside the table I frame. 

       

    // })
    let incomeSheetValues = ['Total Revenue','Total Cost of Revenue','Total Gross Profit','Total Basic EPS','Total Diluted EPS'];
    let balanceSheetValues = ['Total Assets','Total Liabilities','Long Term Debt','Capital Stock'];
    let cashFlowSheetValues = ['Total Revenue','Total Cost of Revenue','Total Gross Profit','Total Basic EPS','Total Diluted EPS'];
    let resultsArray = [];
    let rowData = [];

    it('getHeaders', ()=>{
        resultsArray.push('Income Statement');
        cy.get('.sal-header-except-share').then($value => {let tableValues = $value.text() 
            resultsArray.push(tableValues)});
        resultsArray.push();
        rowData.push('Headers');
        cy.get('div.tg-header-table').eq(1)
        .children()
        .each(($value) =>{
            let output = $value.text();
            cy.log(output);
            rowData.push(output);
        })
        .then(()=>{
            if (rowData.length !== 0){
                resultsArray.push(rowData);
                rowData = [];
            }
        })    
    })

    it('getIncomeSheetValues', () =>{
        cy.window().scrollTo('top')
        cy.contains('span','More Financials Detail Data').click()
        incomeSheetValues.forEach(value => {
            cy.get(`div[title="${value}"]`, { timeout: 10000 })
            .parent()
            .invoke('attr','index')
            .then($index =>{              
                rowData.push(value);
                let index = '"'+$index+'"';
                cy.get('div[index='+index+'].tg-row').eq(1)
                .children()
                .each(($value) =>{
                    let output = $value.text();
                    cy.log(output);
                    rowData.push(output);
                })
                .then(()=>{
                    if (rowData.length !== 0){
                        resultsArray.push(rowData);
                        rowData = [];
                    }
                })   
            })
        })
    })

    it('goToIncomeFinances', () =>{
        //let incomeLink = document.querySelector('a[ng-if="!vm.financialSummaryOnly"]');
        //cy.get('a[ng-if="!vm.financialSummaryOnly"]', { timeout: 10000 }).eq(0).should('be.visible').click();
        cy.contains('Balance Sheet').click();
        //cy.contains('a', 'Details View', { timeout: 20000 }).should('be.visible').click();
        
        //cy.get('button[ng-click="vm.export()"]').should('be.visible').click();

    })

    it('getHeaders', ()=>{
        resultsArray.push('Balance Sheet');
        cy.get('.sal-header-except-share').then($value => {let tableValues = $value.text() 
            resultsArray.push(tableValues)});
        rowData.push('Headers');
        cy.get('div.tg-header-table').eq(1)
        .children()
        .each(($value) =>{
            let output = $value.text();
            cy.log(output);
            rowData.push(output);
        })
        .then(()=>{
            if (rowData.length !== 0){
                resultsArray.push(rowData);
                rowData = [];
            }
        })    
    })

    it('getBalanceSheetValues', () =>{
        cy.window().scrollTo('top')
        cy.contains('span','More Financials Detail Data').click()
        balanceSheetValues.forEach(value => {
            cy.get(`div[title="${value}"]`, { timeout: 10000 })
            .parent()
            .invoke('attr','index')
            .then($index =>{              
                rowData.push(value);
                let index = '"'+$index+'"';
                cy.get('div[index='+index+'].tg-row').eq(1)
                .children()
                .each(($value) =>{
                    let output = $value.text();
                    cy.log(output);
                    rowData.push(output);
                })
                .then(()=>{
                    if (rowData.length !== 0){
                        resultsArray.push(rowData);
                        rowData = [];
                    }
                })   
            })
        })
        cy.writeFile('path/output.txt', resultsArray)
    })
        
        //Locator not finding elements out of focus inside the table Iframe. ----
        //=== Update, values in Iframe load when scrolled to.    

})