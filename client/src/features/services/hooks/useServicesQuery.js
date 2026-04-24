import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useServicesQuery() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/service");
      return res.data;
    },

    refetchInterval: 10000, // 🔥 каждые 10 секунд
  });
}