import { rest } from "msw";

export const handlers = [
  rest.get("/productList", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          sku: 1,
          name: "Product One",
          description: "Product One description",
          price: 1.11,
          basketLimit: 5,
        },
        {
          sku: 2,
          name: "Product Two",
          description: "Product Two description",
          price: 2.22,
          basketLimit: 4,
        },
        {
          sku: 3,
          name: "Product Three",
          description: "Product Three description",
          price: 3.33,
          basketLimit: 3,
        },
        {
          sku: 4,
          name: "Product Four",
          description: "Product Four description",
          price: 4.44,
          basketLimit: 2,
        },
        {
          sku: 5,
          name: "Product Five",
          description: "Product Five description",
          price: 5.55,
          basketLimit: 1,
        },
      ]),
    );
  }),
  rest.post("/pay", async (req, res, ctx) => {
    const cardNumber = await req.text();

    if (!cardNumber.length) return res(ctx.status(400, "No Card number in body"));

    const strippedCardNumber = cardNumber.replace(/\s+/g, "");
    if (strippedCardNumber === "1111222233334444") return res(ctx.status(200), ctx.json(true));

    return res(ctx.status(200), ctx.json(false));
  }),
];
