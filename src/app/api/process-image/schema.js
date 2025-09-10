const responseSchema = {
  type: "object",
  properties: {
    imgType: { type: "string", enum: ["RECEIPT", "NOT_A_RECEIPT"] },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          quantity: { type: "integer" },
          price: { type: "number" },
          id: { type: "string" },
        },
        required: ["name", "quantity", "price", "id"],
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
    serviceCharge: {
      type: "object",
      properties: {
        amount: { type: "number" },
        rate: { type: "number" },
      },
      required: ["amount", "rate"],
      additionalProperties: false,
    },
    total: { type: "number" },
    subtotal: { type: "number" },
  },
  required: ["imgType", "items", "discounts", "tax", "serviceCharge", "total", "subtotal"],
  additionalProperties: false,
};

export default responseSchema;
