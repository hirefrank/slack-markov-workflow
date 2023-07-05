import { Manifest } from "deno-slack-sdk/mod.ts";
import { ReplyDefinition } from "./functions/reply.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "A Markov Reply",
  description: "A simple workflow to respond with a markov reply.",
  icon: "assets/default_new_app_icon.png",
  functions: [ReplyDefinition],
  workflows: [],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
