import {test,expect} from "@playwright/test"
const UI_URL = "http://localhost:5173/";
import path from "path";
test.beforeEach(async({page})=>{
    await page.goto(UI_URL);

    //get signin button
    await page.getByRole("link",{name:"Sign In"}).click();
    
    await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();

    await page.locator("[name=email]").fill("rtkkmwt@gmail.com");
    await page.locator("[name=password]").fill("123456");

    await page.getByRole("button",{name:"Login"}).click();

    await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow user to add hotel",async({page})=>{
    await page.goto(`${UI_URL}add-hotel`)
    
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test country");
    await page.locator('[name="description"]').fill("This is a desc for test Hotel");
    
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]',"3");
    
    await page.getByText("Budget").click();
    
    await page.getByLabel("Free Wifi").check();
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files","1.jpg"),
        path.join(__dirname,"files","2.jpg"),
    ]);

    await page.getByRole('button',{name:"Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
})