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
              text: 'Analyze the uploaded image. \
              If it is NOT a valid receipt, set imgType to "NOT_A_RECEIPT" and set all other fields to null or empty arrays as appropriate. \
              If it IS a valid receipt, set imgType to "RECEIPT" then parse and extract the following details: \
                    - items: an array of { id, name, quantity, unit_price, assignedPals } \
                    - discounts: an array of { id, description, amount, percentage } \
                    - tax: { amount, rate, base } \
                    - total, net_total, subtotal \
                    \
                    Important rules for parsing items: \
                    1. If a line contains a quantity and a total price (e.g. "2  DIET COKE £5.00"), divide the total price by the quantity to get the unit_price (e.g. £2.50). \
                    2. If the line shows a unit price in parentheses (e.g. "2  DIET COKE (2 @ £2.50) £5.00"), use the unit price directly from parentheses. \
                    3. All prices in the items list must be the unit price, not the total for that line. \
                    4. Quantity must always be an integer greater than 0. \
                    5. Assign unique IDs starting from zero. Use the format item_0, item_1, … for item.id values, and discount_0, discount_1, … for discount.id values. \
                    6. Each item must include an empty array for assignedPals: []. \
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

    // Check imgType and throw error if NOT_A_RECEIPT
    const parsedResponse = JSON.parse(response.output_text);
    if (parsedResponse.imgType === "NOT_A_RECEIPT") {
      throw new Error("Image is not a valid receipt");
    } else {
      return NextResponse.json(response.output_text);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 400 });
  }
}
