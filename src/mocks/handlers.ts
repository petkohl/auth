import { rest } from "msw";
import { nanoid } from "@reduxjs/toolkit";

export interface User {
  first_name: string;
  last_name: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

const token = nanoid();

export const handlers = [
  rest.get("/protected", (req, res, ctx) => {
    const headers = req.headers.getAllHeaders();
    if (headers.authentication !== `Bearer ${token}`) {
      return res(ctx.json({ message: "You shall not pass" }), ctx.status(401));
    }
    return res(ctx.json({ success: true, message: "This is top secret" }));
  }),
  rest.post("/login", (req, res, ctx) => {
    return res(
      ctx.delay(400),
      ctx.json({
        user: {
          first_name: "Test",
          last_name: "User"
        },
        token
      })
    );
  })
];
