import { createFontAwesomeUrl } from "./font-awesome-loader";
import { createGoogleFontUrl } from "./google-font-loader";

const fonts = [
  createFontAwesomeUrl(),
  createGoogleFontUrl("Prompt", ["300", "400", "500", "600", "700"]),
  createGoogleFontUrl("Caudex", ["400", "700"])
];

function loadFont(href: string) {
  const link = document.createElement("link");
  link.href = href;
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

export const loadFonts = () => fonts.forEach(href => loadFont(href));
