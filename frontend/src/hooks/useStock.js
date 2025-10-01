import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getStock } from "../services/api";

export function useStock(idMarca) {
  return useQuery({
    queryKey: ["stock", idMarca],   // clave de cache
    queryFn: () => getStock(idMarca),     // función que trae las marcas
    staleTime: 1000 * 60 * 10, // 10 minutos en cache
  });
};