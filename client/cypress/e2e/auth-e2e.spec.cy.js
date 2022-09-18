/// <reference types="cypress" />

describe("Auth (e2e)", () => {
  it("should load and redirect to /login", () => {
    cy.visit("http://localhost:3001");

    cy.url().should("include", "login");
  });

  it("should have default initial state", () => {
    const initialAppState = {
      auth: {
        user: null,
        jwt: null,
        isAuthenticated: false,
        isLoading: false,
        isSuccess: false,
        isError: false,
      },
    };

    cy.window()
      .its("store")
      .invoke("getState")
      .should("deep.equal", initialAppState);
  });

  const randomInt = Math.floor(Math.random() * 100000);
  const name = `user-${randomInt}`;
  const email = `user-${randomInt}@email.com`;
  const password = "password";

  it("should navigate to log-in upon registration", () => {
    cy.get("#signup-link").click();

    cy.get("#name").click().type(name);
    cy.get("#email").click().type(email);
    cy.get("#password").click().type(password);
    cy.get("#confirmPassword").click().type(password);

    cy.get("#signup-btn").click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
    cy.wait(500);

    cy.url().should("include", "login");
  });

  it("should contain a disabled log-in button in the log-in form", () => {
    cy.contains("#login-btn", "Continue").should("have.attr", "disabled");
  });

  it("should enable the log-in button when input fields are filled in properly", () => {
    cy.get("#email").click().type(email);
    cy.get("#password").click().type(password);

    cy.contains("#login-btn", "Continue").should("not.have.attr", "disabled");
  });

  it("should navigate to home page upon filling out the login form with valid credentials and submitting the form", () => {
    cy.contains("#login-btn", "Continue").click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
    cy.wait(500);

    cy.url().should("not.include", "login");
    cy.url().should("include", "/");
  });
});
