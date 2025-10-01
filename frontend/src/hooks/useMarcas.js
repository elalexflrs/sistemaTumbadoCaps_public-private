// hooks/useMarcas.js
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getMarcas } from "../services/api";

export const useMarcas = () => {
  return useQuery({
    queryKey: ["marcas"],   // clave de cache
    queryFn: getMarcas,     // función que trae las marcas
    staleTime: 1000 * 60 * 10, // 10 minutos en cache
  });
};

