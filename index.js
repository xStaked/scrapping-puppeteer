import puppeteer from "puppeteer";
import fs from "fs/promises";
// async function openWebPage () {
//     const browser = await puppeteer.launch({
//         headless: false,
//         slowMo: 300
//     });
//     const page = await browser.newPage();
//     await page.goto('https://www.google.com');

//     await browser.close();
// }

// openWebPage();

async function captureScreenshot() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com");
  await page.screenshot({ path: "screenshot.png" });
  await browser.close();
}

// captureScreenshot();

async function navigateWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
  });
  const page = await browser.newPage();
  await page.goto("https://quotes.toscrape.com/");
  await page.click('a[href="/login"]');
  await new Promise((resolve) => setTimeout(resolve, 5000));

  await browser.close();
}

// openWebPage();

async function getDataFromWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
  });
  const page = await browser.newPage();
  // await page.goto('https://www.cancuntransportation.com/es/');

  await page.goto("https://www.example.com/");

  // use a regex to match a email in the footer
  // const result =  await   page.evaluate(() => {
  //     const email = document.querySelector('footer').innerText.match(/\S+@\S+/);
  //     return email;
  // })
  // console.log(result);
  // await new Promise(resolve => setTimeout(resolve, 5000));

  const result = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    const description = document.querySelector("p").innerText;
    const more = document.querySelector("a").href;

    return {
      title,
      description,
      more,
    };
  });

  console.log(result);

  await browser.close();
}

// getDataFromWebPage();

async function handleDynamicWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });
  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");

  const result = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");
    const data = [...quotes].map((quote) => {
      const text = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;
      const tags = [...quote.querySelectorAll(".tag")].map(
        (tag) => tag.innerText
      );
      return {
        text,
        author,
        tags,
      };
    });
    return data;
  });

  console.log(result);

  await fs.writeFile("quotes.json", JSON.stringify(result));

  await browser.close();
}

handleDynamicWebPage();
