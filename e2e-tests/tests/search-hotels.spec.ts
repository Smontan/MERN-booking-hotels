import { expect, test } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  // goto home page
  await page.goto(`${UI_URL}login`);
  // locate email and fill "test@gmail.com"
  await page.locator("[name=email]").fill("test@gmail.com");
  // locate password and fill "password"
  await page.locator("[name=password]").fill("password");
  // get by role the login button and click it
  await page.getByRole("button", { name: "Login" }).click();
  // expect toast message of Login successfully
  await expect(page.getByText("Login successfully")).toBeVisible();
});

test("should show hotel resort", async ({ page }) => {
  // goto homepage
  await page.goto(UI_URL);
  // locate the destination and fill Sereneville
  await page.getByPlaceholder("Where are you going?").fill("Luxe Haven Hotel");
  // click the search button after typing in the input element
  await page.getByRole("button", { name: "Search" }).click();
  // expect text of Hotels found in Sereneville
  await expect(
    page.getByText("Hotels found in Luxe Haven Hotel")
  ).toBeVisible();
  // expect text of Luxe Haven Hotel
  await expect(
    page.getByText("Nestled in the heart of Sereneville")
  ).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
  // goto homepage
  await page.goto(UI_URL);
  // fill up the destination
  await page.getByPlaceholder("Where are you going?").fill("Lolinghayaw");
  // click the search button after typing in the input element
  await page.getByRole("button", { name: "Search" }).click();
  // click the Lolinghayaw
  await page.getByText("Lolinghayaw beach").click();
  // expect that the url has a /detail/
  await expect(page).toHaveURL(/detail/);
  // expect a button of booknow assuming that the user already signin
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});
