import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useReservationsQuery(clientID) {
  return useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/reservation?clientID=${clientID}&serviceParams=true`);
      return res.data;
    },

    refetchInterval: 10000
  });
}