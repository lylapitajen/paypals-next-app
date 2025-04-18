const responseSchema = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          quantity: { type: "integer" },
          price: { type: "number" },
        },
        required: ["name", "quantity", "price"],
        additionalProperties: false,
      },
    },
    discounts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          description: { type: "string" },
          amount: { type: "number" },
          percentage: { type: "number" },
        },
        required: ["description", "amount", "percentage"],
        additionalProperties: false,
      },
    },
    tax: {
      type: "object",
      properties: {
        amount: { type: "number" },
        rate: { type: "number" },
        base: { type: "number" },
      },
      required: ["amount", "rate", "base"],
      additionalProperties: false,
    },
    total: { type: "number" },
    net_total: { type: "number" },
    subtotal: { type: "number" },
  },
  required: ["items", "discounts", "tax", "total", "net_total", "subtotal"],
  additionalProperties: false,
};

export default responseSchema;
