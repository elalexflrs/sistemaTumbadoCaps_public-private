import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getModelos } from "../services/api"; // esta llama a tu endpoint

export function useModelos(idMarca) {
  return useQuery({
    queryKey: ["modelos", idMarca], // clave depende de la marca seleccionada
    queryFn: () => getModelos(idMarca),
    staleTime: 1000 * 60 * 10, // 10 minutos fresco
  });
}
