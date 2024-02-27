import { test, expect } from "@playwright/test";
import path from "path";

const URI_URL = "http://localhost:5173/";
// const ADD_PAGE_URL = "http://localhost:5173/add-hotel"

// login first befor everything
test.beforeEach(async ({ page }) => {
  // go to homepage
  await page.goto(URI_URL);
  // click the Sign in button
  await page.getByRole("link", { name: "Sign in" }).click();
  // See if there is a heading Login
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  // fill up the form email section
  await page.locator("[name=email]").fill("test@gmail.com");
  // fill up the form password section
  await page.locator("[name=password]").fill("password");
  // click the login button
  await page.getByRole("button", { name: "Login" }).click();
  // expect success message
  await expect(page.getByText("Login successfully")).toBeVisible();
});

test("should allow user to add a new hotel", async ({ page }) => {
  // goto add page url
  // await page.goto(ADD_PAGE_URL);
  await page.goto(`${URI_URL}add-hotel`);
  // expect heading of Add Hotel
  await expect(page.getByRole("heading", { name: "Add Hotel" })).toBeVisible();
  // fill the add hotel form name, city, country, description, pricePerNight, starRating, type, facilities, adultCount, childCount, imageFiles
  await page.locator("[name=name]").fill("My Hotel 2");
  await page.locator("[name=city]").fill("Bayabas");
  await page.locator("[name=country]").fill("Philippines");
  await page.locator("[name=description]").fill("Very beautiful hotel");
  await page.locator("[name=pricePerNight]").fill("500");
  await page.selectOption("select[name=starRating]", "5");
  await page.getByText("Budget").click();
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Family Rooms").check();
  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("1");
  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files", "hotel1.jpg"),
    path.join(__dirname, "files", "hotel2.jpg"),
    path.join(__dirname, "files", "hotel3.jpg"),
  ]);
  await page.getByRole("button", { name: "Save your Hotel" }).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible({timeout: 10000});
});
