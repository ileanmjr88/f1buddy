import "dotenv/config";

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = "https://discord.com/api/v10/" + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent":
        "DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)",
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: "PUT", body: commands });
  } catch (err) {
    console.error(err);
  }
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeFirst(str) {
  if (!str) return "";
  if (str.includes("_")) str = str.replace(/_/g, " ");
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toMarkdownTable(data, columns, headers) {
  if (!Array.isArray(data) || data.length === 0) return "No data available.";

  // Calculate max width for each column
  const colWidths = columns.map((col, i) =>
    Math.max(
      headers[i].length,
      ...data.map((row) => String(row[col] ?? "").length)
    )
  );

  // Helper to pad each cell
  const pad = (str, len) => String(str).padEnd(len, " ");

  // Build header and separator
  let lines = [];
  lines.push(
    headers.map((h, i) => pad(h, colWidths[i])).join(" | ")
  );
  lines.push(
    colWidths.map((w) => "-".repeat(w)).join("-|-")
  );

  // Build rows
  for (const row of data) {
    lines.push(
      columns.map((col, i) => pad(row[col] ?? "", colWidths[i])).join(" | ")
    );
  }

  // Wrap in code block
  return "```\n" + lines.join("\n") + "\n```";
}

export function toMarkdownTableHeader(headers){
  if (!Array.isArray(headers) || headers.length < 3) return "";
  const [session, date, raceName] = headers;
  return `# ${raceName}  \n## ${session} | ${date} \n`;
}