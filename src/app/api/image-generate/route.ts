/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { uploadToImageKit } from "@/lib/imagekit";

// URL to the Chromium binary package hosted in /public
const CHROMIUM_PACK_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/chromium-pack.tar`
  : "https://github.com/gabenunez/puppeteer-on-vercel/raw/refs/heads/main/example/chromium-dont-use-in-prod.tar";

let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

async function getChromiumPath(): Promise<string> {
  if (cachedExecutablePath) return cachedExecutablePath;

  if (!downloadPromise) {
    const chromium = (await import("@sparticuz/chromium-min")).default;
    downloadPromise = chromium
      .executablePath(CHROMIUM_PACK_URL)
      .then((path) => {
        cachedExecutablePath = path;
        console.log("Chromium path resolved:", path);
        return path;
      })
      .catch((error) => {
        console.error("Failed to get Chromium path:", error);
        downloadPromise = null;
        throw error;
      });
  }

  return downloadPromise;
}

export async function POST(request: NextRequest) {
  let browser;
  try {
    const body = await request.json();
    const {
      title = "MASTERING REACT IN 2026",
      subtitle = "Advanced architecture patterns explained simply",
      tag = "TUTORIAL",
      variant = "cyber",
      layout = "split-left",
      highlightColor = "#3b82f6"
    } = body;

    // Construct the preview URL
    // Use localhost or the base URL of the app
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const searchParams = new URLSearchParams({
      title,
      subtitle,
      tag,
      variant,
      layout,
      highlightColor,
    });
    const previewUrl = `${baseUrl}/preview?${searchParams.toString()}`;

    // Configure browser
    const isVercel = !!process.env.VERCEL_ENV;
    let puppeteer: any,
      launchOptions: any = {
        headless: true,
      };

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium-min")).default;
      puppeteer = await import("puppeteer-core");
      const executablePath = await getChromiumPath();
      launchOptions = {
        ...launchOptions,
        args: ["--no-sandbox", "--disable-setuid-sandbox", ...chromium.args],
        executablePath,
      };
    } else {
      puppeteer = await import("puppeteer");
      launchOptions = {
        ...launchOptions,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      };
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // Set viewport to exactly the card resolution — no surrounding chrome
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

    // Navigate and wait
    await page.goto(previewUrl, { waitUntil: "networkidle2", timeout: 30000 });

    // Capture only the thumbnail card element
    const cardElement = await page.$("#thumbnail-card");
    if (!cardElement) throw new Error("#thumbnail-card element not found on the preview page.");
    const box = await cardElement.boundingBox();
    if (!box) throw new Error("Could not get bounding box for #thumbnail-card.");
    const screenshotBuffer = await page.screenshot({
      type: "png",
      clip: { x: box.x, y: box.y, width: box.width, height: box.height },
    });

    // Upload to ImageKit
    const fileName = `thumb_${Date.now()}.png`;
    const publicUrl = await uploadToImageKit(fileName, screenshotBuffer as Buffer);

    return NextResponse.json({
      url: publicUrl,
      publicId: `thumbnails_puppeteer/${fileName}`,
    });

  } catch (error: any) {
    console.error("Screenshot error:", error);
    return NextResponse.json(
      { error: "An error occurred while generating the screenshot.", details: error.message },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}

// Keep GET for basic screenshot functionality if needed
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const urlParam = searchParams.get("url");
  if (!urlParam) return new NextResponse("Please provide a URL.", { status: 400 });

  let inputUrl = urlParam.trim();
  if (!/^https?:\/\//i.test(inputUrl)) inputUrl = `http://${inputUrl}`;

  let browser;
  try {
    const isVercel = !!process.env.VERCEL_ENV;
    let puppeteer: any, launchOptions: any = { headless: true };

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium-min")).default;
      puppeteer = await import("puppeteer-core");
      const executablePath = await getChromiumPath();
      launchOptions = { ...launchOptions, args: ["--no-sandbox", "--disable-setuid-sandbox", ...chromium.args], executablePath };
    } else {
      puppeteer = await import("puppeteer");
      launchOptions = { ...launchOptions, args: ["--no-sandbox", "--disable-setuid-sandbox"] };
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.goto(new URL(inputUrl).toString(), { waitUntil: "networkidle2" });
    const screenshot = await page.screenshot({ type: "png" });

    return new NextResponse(screenshot as unknown as BodyInit, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  } finally {
    if (browser) await browser.close();
  }
}
