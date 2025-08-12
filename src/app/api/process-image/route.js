"use server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import responseSchema from "./schema";

export async function POST(req, res) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const { image } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Analyze the receipt and return a structured JSON with the a list of items (name, quantity, price, unique key) and any discounts, tax.",
            },
            {
              type: "input_image",
              image_url: image,
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "receipt_data",
          schema: responseSchema,
        },
      },
    });
    console.log(response.output_text);
    return NextResponse.json(response.output_text);
  } catch (error) {
    console.error(error);
    // TODO: Handle error response
  }
}
