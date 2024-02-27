import { test, expect } from "@playwright/test";

// URL of Frontend home page
const UI_URL = "http://localhost:5173/";

test("should allow user to sign up", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@testmail.com`;

  // go to hompage
  await page.goto(UI_URL);
  // click the sign up button
  await page.getByRole("link", { name: "Sign up" }).click();
  // expect a heading that have a text of "Create an Account"
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();
  // fill the first name, last name, email, password and confirm password
  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password");
  await page.locator("[name=confirmPassword]").fill("password");
  // click the Create Account button
  await page.getByRole("button", { name: "Create Account" }).click();
  // expect the success toast message
  await expect(page.getByText("Register succesfully")).toBeVisible();
  // expect the links of My booking and My Hotels
  await expect(page.getByRole("link", { name: "My booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My hotels" })).toBeVisible();
  // expect the button of Sign out
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("should allow user to sign in and sign out", async ({ page }) => {
  // goto home page and sign in
  await page.goto(UI_URL);
  // click the sign in button
  await page.getByRole("link", { name: "Sign in" }).click();
  // expect header Login
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  // fill up the form (email and password)
  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("password");
  // click the login button
  await page.getByRole("button", { name: "Login" }).click();
  // expect success toast message of Login successfully
  await expect(page.getByText("Login successfully")).toBeVisible();

  // click the sign out button
  await page.getByRole("button", { name: "Sign out" }).click();
  // expect a success toast message of "Logout successfully!"
  await expect(page.getByText("Logout successfully!")).toBeVisible();
  // expect to see the Sign up and Sign in link
  await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
});
