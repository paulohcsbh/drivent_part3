import { Request, Response  } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotel-service";
import httpStatus from "http-status";

async function getAllHotels(req: AuthenticatedRequest, res: Response) {
    try {
      const { userId } = req;
      const hotels = await hotelService.getHotels(userId);  
      return res.status(httpStatus.OK).send(hotels);
    } catch (error) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }

 async function getHotel(req: AuthenticatedRequest, res: Response) {
    try {
      const { userId } = req;
      const  hotelId  = Number(req.params.hotelId)
      
      if (!hotelId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
      const hotel = await hotelService.getHotelById(userId, hotelId)
      return res.status(httpStatus.OK).send(hotel);
    } catch (error) {
      if (error.name === "NotFoundError") {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      if(error.name === "PaymentRequired"){
        return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
      }
      
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
 }
  const hotelController = {
    getAllHotels,
    getHotel
  }
  export default hotelController;