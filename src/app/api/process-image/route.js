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
              text: 'Analyze the receipt and return a structured JSON object with: \
              - items: \
              - discounts\
              - tax: \
              - total: \
              \
              Important rules for parsing items: \
              1. If a line contains quantity and a total price (e.g. "2  DIET COKE £5.00"), divide the total price by the quantity to get the unit_price (e.g. £2.50). \
              2. If the line shows a unit price in parentheses (e.g. "2  DIET COKE (2 @ £2.50) £5.00"), use the unit price directly from parentheses. \
              3. All prices in the items list must be the unit price, not the total for that line. \
              4. Quantity is always an integer greater than 0. \
              5. Assign unique IDs starting from zero. Use the format item_0, item_1, … for item.id values, and discount_0, discount_1, … for discount.id values. \
              \
              Output must strictly follow the provided JSON schema.',
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
