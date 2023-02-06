import { Router } from "express";
import hotelController from "@/controllers/hotel-controller";
import { authenticateToken } from "@/middlewares";

const hotelRouter = Router();

hotelRouter.all("/*", authenticateToken);
hotelRouter.get("/", hotelController.getAllHotels);
hotelRouter.get("/:hotelId", hotelController.getHotel);

export { hotelRouter };

