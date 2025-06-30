import "dotenv/config";
import express from "express";
import {
  ButtonStyleTypes,
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKeyMiddleware,
} from "discord-interactions";
import {
  SessionType,
  getLastFPResults,
  getLastQualifyingResults,
  getLastGPResults,
} from "./src/f1.js";
import {
  DiscordRequest,
  toMarkdownTable,
  toMarkdownTableHeader,
} from "./src/utils.js";

// Create an express app
const app = express();
// Get port, or default to 3123
const PORT = process.env.PORT || 3123;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.PUBLIC_KEY),
  async function (req, res) {
    // Interaction id, type and data
    const { id, type, data } = req.body;

    // Handle verification requests
    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;

      // "test" command
      if (name === "test") {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            flags: InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
              {
                type: MessageComponentTypes.TEXT_DISPLAY,
                content: "f1buddy here! 🏎️ 🤖",
              },
            ],
          },
        });
      }

      if (name === "race") {
        const session = await getLastGPResults(SessionType.RACE);
        const tableHeader = ["Pos", "Team", "Driver", "Time"];
        const tableCols = ["position", "team", "driver", "time"];
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            flags: InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
              {
                type: MessageComponentTypes.TEXT_DISPLAY,
                content:
                  toMarkdownTableHeader([
                    session.type,
                    session.date,
                    session.raceName,
                  ]) + toMarkdownTable(session.results, tableCols, tableHeader),
              },
            ],
          },
        });
      }

      if (name === "quali") {
        const session = await getLastQualifyingResults(SessionType.QUALY);
        const tableHeader = ["Pos", "Team", "Driver", "Q1", "Q2", "Q3"];
        const tableCols = ["position", "team", "driver", "q1", "q2", "q3"];
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            flags: InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
              {
                type: MessageComponentTypes.TEXT_DISPLAY,
                content:
                  toMarkdownTableHeader([
                    session.type,
                    session.date,
                    session.raceName,
                  ]) + toMarkdownTable(session.results, tableCols, tableHeader),
              },
            ],
          },
        });
      }

      if (name === "fp3") {
        const session = await getLastFPResults(SessionType.FP3);
        const tableHeader = ["Pos", "Team", "Driver", "Time"];
        const tableCols = ["position", "team", "driver", "time"];
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            flags: InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
              {
                type: MessageComponentTypes.TEXT_DISPLAY,
                content:
                  toMarkdownTableHeader([
                    session.type,
                    session.date,
                    session.raceName,
                  ]) + toMarkdownTable(session.results, tableCols, tableHeader),
              },
            ],
          },
        });
      }

      if (name === "fp2") {
        const session = await getLastFPResults(SessionType.FP2);
        const tableHeader = ["Pos", "Team", "Driver", "Time"];
        const tableCols = ["position", "team", "driver", "time"];
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            flags: InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
              {
                type: MessageComponentTypes.TEXT_DISPLAY,
                content:
                  toMarkdownTableHeader([
                    session.type,
                    session.date,
                    session.raceName,
                  ]) + toMarkdownTable(session.results, tableCols, tableHeader),
              },
            ],
          },
        });
      }

      if (name === "fp1") {
        const session = await getLastFPResults(SessionType.FP1);
        const tableHeader = ["Pos", "Team", "Driver", "Time"];
        const tableCols = ["position", "team", "driver", "time"];
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            flags: InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
              {
                type: MessageComponentTypes.TEXT_DISPLAY,
                content:
                  toMarkdownTableHeader([
                    session.type,
                    session.date,
                    session.raceName,
                  ]) + toMarkdownTable(session.results, tableCols, tableHeader),
              },
            ],
          },
        });
      }

      if (name === "sprintq") {
        const session = await getLastQualifyingResults(
          SessionType.SPRINT_QUALY
        );
        const tableHeader = ["Pos", "Team", "Driver", "Q1", "Q2", "Q3"];
        const tableCols = ["position", "team", "driver", "q1", "q2", "q3"];
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            flags: InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
              {
                type: MessageComponentTypes.TEXT_DISPLAY,
                content:
                  toMarkdownTableHeader([
                    session.type,
                    session.date,
                    session.raceName,
                  ]) + toMarkdownTable(session.results, tableCols, tableHeader),
              },
            ],
          },
        });
      }

      if (name === "sprintr") {
        const session = await getLastGPResults(SessionType.SPRINT_RACE);
        const tableHeader = ["Pos", "Team", "Driver", "Time"];
        const tableCols = ["position", "team", "driver", "time"];
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            flags: InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
              {
                type: MessageComponentTypes.TEXT_DISPLAY,
                content:
                  toMarkdownTableHeader([
                    session.type,
                    session.date,
                    session.raceName,
                  ]) + toMarkdownTable(session.results, tableCols, tableHeader),
              },
            ],
          },
        });
      }

      console.log(`unknown command: ${name}`);
      return res.status(400).json({ error: "unknown command" });
    }
    console.log("unknown interaction type", type);
    return res.status(400).json({ error: "unknown interaction type" });
  }
);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
