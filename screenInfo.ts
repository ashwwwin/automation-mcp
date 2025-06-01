import { FastMCP, imageContent } from "fastmcp";
import { z } from "zod";
import * as child_process from "child_process";
const nutjs = require("./nutjs/nut.js/core/nut.js/dist/index.js");
const { screen } = nutjs;

export const screenInfo = async (nutjsAvailable: boolean) => {
  if (nutjsAvailable) {
    try {
      const width = await screen.width();
      const height = await screen.height();
      return `Screen dimensions: ${width}x${height} pixels`;
    } catch (e) {
      // Fallback to system command
    }
  }

  // Fallback method using system_profiler
  try {
    const output = child_process
      .execSync("system_profiler SPDisplaysDataType | grep Resolution")
      .toString();
    const match = output.match(/(\d+) x (\d+)/);
    if (match) {
      return `Screen dimensions: ${match[1]}x${match[2]} pixels`;
    }
  } catch (e) {
    // Another fallback
  }

  return "Screen dimensions unavailable (nutjs not fully loaded)";
};
