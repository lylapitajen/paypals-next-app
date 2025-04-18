import { NextResponse } from "next/server";
import OpenAI from "openai";
import responseSchema from "./schema";

export async function POST(req, res) {
  return NextResponse.json(
    JSON.stringify({
      items: [
        {
          name: "Burrata",
          quantity: 1,
          price: 16,
        },
        {
          name: "Pan de Coca",
          quantity: 1,
          price: 3.5,
        },
        {
          name: "Solomillo a la Sal",
          quantity: 2,
          price: 22,
        },
        {
          name: "Chocolate fondat",
          quantity: 1,
          price: 8.5,
        },
        {
          name: "Agua 1/2",
          quantity: 1,
          price: 4.5,
        },
        {
          name: "Copa Aphrodisiaque T.",
          quantity: 2,
          price: 6,
        },
      ],
      discounts: [
        {
          description: "Portal Reserva 30%",
          amount: -26.55,
          percentage: 30,
        },
      ],
      tax: {
        amount: 5.63,
        rate: 10,
        base: 61.95,
      },
      total: 61.95,
      net_total: 56.32,
      subtotal: 61.95,
    })
  );

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
  }
}
