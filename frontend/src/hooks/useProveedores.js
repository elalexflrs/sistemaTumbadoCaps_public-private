import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getProveedores } from "../services/api"; // esta llama a tu endpoint

export function useProveedores() {
  return useQuery({
    queryKey: ["proveedores"], // clave en cache
    queryFn: getProveedores,
    staleTime: 1000 * 60 * 10, // 10 minutos fresco
  });
}
