/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./cypress/e2e/pages.cy.ts ***!
  \*********************************/
/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress
describe("Navigation", function () {
    it("should navigate to the about page", function () {
        // Start from the index page
        cy.visit("http://localhost:3000/home");
        // Find a link with an href attribute containing "about" and click it
        cy.get('a[href*="about"]').click();
        // The new url should include "/home/about"
        cy.url().should("include", "/home/about");
        // The new page should contain an h1 with "About"
        cy.get("h1").contains("About");
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMuY3kudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIscUVBQXFFO0FBQ3JFLHFHQUFxRztBQUNyRyxzREFBc0Q7QUFFdEQsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUNyQixFQUFFLENBQUMsbUNBQW1DLEVBQUU7UUFDdEMsNEJBQTRCO1FBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUV2QyxxRUFBcUU7UUFDckUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRW5DLDJDQUEyQztRQUMzQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUUxQyxpREFBaUQ7UUFDakQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2N5cHJlc3MvZTJlL3BhZ2VzLmN5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG4vLyBEaXNhYmxlIEVTTGludCB0byBwcmV2ZW50IGZhaWxpbmcgbGludGluZyBpbnNpZGUgdGhlIE5leHQuanMgcmVwby5cbi8vIElmIHlvdSdyZSB1c2luZyBFU0xpbnQgb24geW91ciBwcm9qZWN0LCB3ZSByZWNvbW1lbmQgaW5zdGFsbGluZyB0aGUgRVNMaW50IEN5cHJlc3MgcGx1Z2luIGluc3RlYWQ6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vY3lwcmVzcy1pby9lc2xpbnQtcGx1Z2luLWN5cHJlc3NcblxuZGVzY3JpYmUoXCJOYXZpZ2F0aW9uXCIsICgpID0+IHtcbiAgaXQoXCJzaG91bGQgbmF2aWdhdGUgdG8gdGhlIGFib3V0IHBhZ2VcIiwgKCkgPT4ge1xuICAgIC8vIFN0YXJ0IGZyb20gdGhlIGluZGV4IHBhZ2VcbiAgICBjeS52aXNpdChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9ob21lXCIpO1xuXG4gICAgLy8gRmluZCBhIGxpbmsgd2l0aCBhbiBocmVmIGF0dHJpYnV0ZSBjb250YWluaW5nIFwiYWJvdXRcIiBhbmQgY2xpY2sgaXRcbiAgICBjeS5nZXQoJ2FbaHJlZio9XCJhYm91dFwiXScpLmNsaWNrKCk7XG5cbiAgICAvLyBUaGUgbmV3IHVybCBzaG91bGQgaW5jbHVkZSBcIi9ob21lL2Fib3V0XCJcbiAgICBjeS51cmwoKS5zaG91bGQoXCJpbmNsdWRlXCIsIFwiL2hvbWUvYWJvdXRcIik7XG5cbiAgICAvLyBUaGUgbmV3IHBhZ2Ugc2hvdWxkIGNvbnRhaW4gYW4gaDEgd2l0aCBcIkFib3V0XCJcbiAgICBjeS5nZXQoXCJoMVwiKS5jb250YWlucyhcIkFib3V0XCIpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9