import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req, res) {
  const openai = new OpenAI();
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
              text: "Analyze the receipt and return a structured JSON with the items, quantities, and prices and any discounts and tax.",
            },
            {
              type: "input_image",
              image_url: image,
            },
          ],
        },
      ],
    });
    return NextResponse.json(response.output_text);
  } catch (error) {
    console.error(error);
  }
}
