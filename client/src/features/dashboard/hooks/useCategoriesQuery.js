import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/category");
      return res.data;
    },
  });
}