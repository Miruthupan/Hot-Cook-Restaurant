import axios from "axios";

class ReservationService {
    static BASE_URL = "http://localhost:8080"

    static async reservation(customerName, startTime, endTime, tableNumber, numberOfPeople, userId) {
        try {
            const response = await axios.post(`${ReservationService.BASE_URL}/reservations/create`, null, {
                params: {
                  customerName: customerName,
                  startTime: startTime,
                  endTime: endTime,
                  tableNumber: tableNumber,
                  numberOfPeople: numberOfPeople,
                  userId: userId
                }
              });
            return response.data;
        } catch (error) {
            if(error.response && error.response.data) {
                throw new Error(error.response.data.message);
                
            }
        }
    }

    static async getAllReservations() {
        try {
          const response = await axios.get(`${ReservationService.BASE_URL}/reservations/all`);
          return response.data;
        } catch (error) {
          throw new Error(error.response ? error.response.data.message : "Failed to fetch reservations.");
        }
      }
    
      // Delete Reservation by ID
      static async deleteReservation(reservationId) {
        try {
          await axios.delete(`${ReservationService.BASE_URL}/reservations/delete/${reservationId}`);
        } catch (error) {
          throw new Error(error.response ? error.response.data.message : "Failed to delete reservation.");
        }
      }
}

export default ReservationService;