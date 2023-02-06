import { notFoundError } from "@/errors";
import {  paymentRequiredError } from "@/errors/payment-required-error";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRespository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";


async function getHotels(userId: number) {
  
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
  if(!enrollment){
    throw notFoundError();    
  }   
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(!ticket){
    throw notFoundError();
  }
  
    const hotels = await hotelRespository.getHotels();
    if (!hotels) {
      throw notFoundError();
    }
    return hotels;
  }

  async function getHotelById(userId: number, hotelId: number) { 
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);     
    if(!enrollment){
      throw notFoundError();    
    }   
    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);       
    if(!ticket){
      throw notFoundError();
    }       
    
    const hotel = await hotelRespository.getHotelById(hotelId);  
      if(!hotel){
        throw notFoundError();
      }     
    if( ticket.status === "RESERVED" || ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false){
      throw paymentRequiredError();
    }else{
      return hotel;
    }
    
    
  }
  

  const hotelService = {
    getHotels,
    getHotelById
  }
  export default hotelService;