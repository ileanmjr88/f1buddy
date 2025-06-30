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

import { DiscordRequest } from "./src/utils.js";

// Create an express app
const app = express();
// Get port, or default to 3123
const PORT = process.env.PORT || 3123;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post("/interactions", verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res){
  // Interaction id, type and data
  const {id, type, data} = req.body;

  // Handle verification requests
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND){
    const { name } = data;

    // "test" command
    if (name === "test"){
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.IS_COMPONENTS_V2,
          components: [
            {
              type: MessageComponentTypes.TEXT_DISPLAY,
              content: 'f1buddy here! 🏎️ 🤖'
            },
          ],
        },
      });
    }
  }


})



app.listen(PORT, () => {
  console.log("Listening on port", PORT);
})