import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import * as Markov from "https://esm.sh/markov-typescript@1.1.0";
import { content } from "./internals/dataset.ts";

/**
 * Custom function for a reply
 */

export const ReplyDefinition = DefineFunction({
  callback_id: "reply",
  title: "Retrieve a message",
  description: "A function for generating a reply.",
  source_file: "functions/reply.ts",
  input_parameters: {
    properties: {},
    required: [],
  },
  output_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
      },
    },
    required: ["message"],
  },
});

export default SlackFunction(
  ReplyDefinition,
  () => {
    const chain = new Markov.MarkovChain();
    const split_lines = content.split("\n");

    split_lines.forEach((line) => {
      chain.learn(line.split(" "));
    });

    const message = chain.walk().join(" ");

    return { outputs: { message } };
  },
);
