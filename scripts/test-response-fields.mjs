import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

async function assertResponseFieldsStable(page, label) {
  const section = page.locator("h3", { hasText: "Response Fields" });
  await section.waitFor({ state: "visible", timeout: 15000 });
  await page.waitForTimeout(1500);
  const stillVisible = await section.isVisible();
  if (!stillVisible) {
    throw new Error(`${label}: Response Fields section disappeared`);
  }
  console.log(`  ✓ ${label}: Response Fields section stayed visible`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`Testing playground at ${BASE}/playground\n`);

  await page.goto(`${BASE}/playground`, { waitUntil: "networkidle" });

  // Test 1: Quick select — section should appear and NOT disappear
  console.log("Test 1: Select /users");
  await page.getByRole("button", { name: "/users", exact: true }).click();
  await assertResponseFieldsStable(page, "After selecting /users");

  // Test 2: Switch keyword — section should remain stable
  console.log("Test 2: Switch to /posts");
  await page.getByRole("button", { name: "/posts", exact: true }).click();
  await assertResponseFieldsStable(page, "After switching to /posts");

  // Test 3: Generate — fields should populate (from schema or response fallback)
  console.log("Test 3: Generate /posts");
  await page.getByRole("button", { name: "Generate", exact: true }).click();
  await page.getByText("Response received").waitFor({ state: "visible", timeout: 30000 });

  const fieldChip = page.locator("button", { has: page.locator("code", { hasText: "title" }) });
  await fieldChip.first().waitFor({ state: "visible", timeout: 10000 });
  console.log("  ✓ Fields populated after generate (e.g. title)");

  const previewFilter = page
    .locator("[data-slot=card]")
    .filter({ hasText: "JSON Preview" })
    .getByRole("button")
    .filter({ hasText: /fields|All fields/ });
  await previewFilter.first().waitFor({ state: "visible", timeout: 10000 });
  console.log("  ✓ Post-response filter visible in JSON preview");

  // Test 4: New keyword after response — pre-generate panel returns
  console.log("Test 4: Switch to /products after response");
  await page.getByRole("button", { name: "/products", exact: true }).click();
  await assertResponseFieldsStable(page, "After switching to /products post-response");

  // Test 5: AI keyword shows stable placeholder
  console.log("Test 5: Select AI keyword /invoices");
  await page.getByRole("button", { name: /\/invoices/ }).click();
  await assertResponseFieldsStable(page, "After selecting AI keyword");

  const aiHint = page.getByText(/dynamic fields|Generate once to load available fields/);
  await aiHint.first().waitFor({ state: "visible", timeout: 10000 });
  console.log("  ✓ AI keyword shows stable placeholder message");

  console.log("\nAll Response Fields tests passed.");
  await browser.close();
}

main().catch((err) => {
  console.error("\nTest failed:", err.message);
  process.exit(1);
});
