import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, me, register } from "@/lib/api";
import { User } from "@/types";

const AUTH_KEY = ["auth"];

export function useCurrentUser() {
  return useQuery<User>({
    queryKey: AUTH_KEY,
    queryFn: me,
    retry: 1,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: AUTH_KEY }),
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: AUTH_KEY }),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: AUTH_KEY }),
  });
}
