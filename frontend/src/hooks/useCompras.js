import { useQuery } from "@tanstack/react-query";
import { getCompras } from "../services/api";

export const useCompras = () => {
  return useQuery({
    queryKey: ["compras"],   // clave de cache
    queryFn: getCompras,     // función que trae las marcas
    staleTime: 1000 * 60 * 10, // 10 minutos en cache
  });
};