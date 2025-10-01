import { useQuery } from "@tanstack/react-query";
import { getApartados } from "../services/api";

export const useApartados = () => {
  return useQuery({
    queryKey: ["apartados"],   // clave de cache
    queryFn: getApartados,     // función que trae las marcas
    staleTime: 1000 * 60 * 10, // 10 minutos en cache
  });
};