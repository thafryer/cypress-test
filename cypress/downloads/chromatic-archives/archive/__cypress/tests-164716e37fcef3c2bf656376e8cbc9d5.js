/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!*******************************!*\
  !*** ./cypress/e2e/app.cy.ts ***!
  \*******************************/

/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress
Object.defineProperty(exports, "__esModule", ({ value: true }));
// Cypress E2E Test
describe("Navigation", function () {
    it("should navigate to the about page", function () {
        // Start from the index page
        cy.visit("http://localhost:3000");
        // Find a link with an href attribute containing "about" and click it
        cy.get('a[href*="about"]').click();
        // The new url should include "/about"
        cy.url().should("include", "/about");
        // The new page should contain an h1 with "About page"
        cy.get("h1").contains("About Page");
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmN5LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIscUVBQXFFO0FBQ3JFLHFHQUFxRztBQUNyRyxzREFBc0Q7O0FBRXRELG1CQUFtQjtBQUNuQixRQUFRLENBQUMsWUFBWSxFQUFFO0lBQ3JCLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtRQUN0Qyw0QkFBNEI7UUFDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRWxDLHFFQUFxRTtRQUNyRSxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbkMsc0NBQXNDO1FBQ3RDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXJDLHNEQUFzRDtRQUN0RCxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY3lwcmVzcy9lMmUvYXBwLmN5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG4vLyBEaXNhYmxlIEVTTGludCB0byBwcmV2ZW50IGZhaWxpbmcgbGludGluZyBpbnNpZGUgdGhlIE5leHQuanMgcmVwby5cbi8vIElmIHlvdSdyZSB1c2luZyBFU0xpbnQgb24geW91ciBwcm9qZWN0LCB3ZSByZWNvbW1lbmQgaW5zdGFsbGluZyB0aGUgRVNMaW50IEN5cHJlc3MgcGx1Z2luIGluc3RlYWQ6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vY3lwcmVzcy1pby9lc2xpbnQtcGx1Z2luLWN5cHJlc3NcblxuLy8gQ3lwcmVzcyBFMkUgVGVzdFxuZGVzY3JpYmUoXCJOYXZpZ2F0aW9uXCIsICgpID0+IHtcbiAgaXQoXCJzaG91bGQgbmF2aWdhdGUgdG8gdGhlIGFib3V0IHBhZ2VcIiwgKCkgPT4ge1xuICAgIC8vIFN0YXJ0IGZyb20gdGhlIGluZGV4IHBhZ2VcbiAgICBjeS52aXNpdChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiKTtcblxuICAgIC8vIEZpbmQgYSBsaW5rIHdpdGggYW4gaHJlZiBhdHRyaWJ1dGUgY29udGFpbmluZyBcImFib3V0XCIgYW5kIGNsaWNrIGl0XG4gICAgY3kuZ2V0KCdhW2hyZWYqPVwiYWJvdXRcIl0nKS5jbGljaygpO1xuXG4gICAgLy8gVGhlIG5ldyB1cmwgc2hvdWxkIGluY2x1ZGUgXCIvYWJvdXRcIlxuICAgIGN5LnVybCgpLnNob3VsZChcImluY2x1ZGVcIiwgXCIvYWJvdXRcIik7XG5cbiAgICAvLyBUaGUgbmV3IHBhZ2Ugc2hvdWxkIGNvbnRhaW4gYW4gaDEgd2l0aCBcIkFib3V0IHBhZ2VcIlxuICAgIGN5LmdldChcImgxXCIpLmNvbnRhaW5zKFwiQWJvdXQgUGFnZVwiKTtcbiAgfSk7XG59KTtcblxuLy8gUHJldmVudCBUeXBlU2NyaXB0IGZyb20gcmVhZGluZyBmaWxlIGFzIGxlZ2FjeSBzY3JpcHRcbmV4cG9ydCB7fTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==