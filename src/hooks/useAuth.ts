import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStoredUser, login, logout, persistUser, register } from "@/lib/api";
import { User } from "@/types";

const AUTH_KEY = ["auth"];

export function useCurrentUser() {
  return useQuery<User | null>({
    queryKey: AUTH_KEY,
    queryFn: () => Promise.resolve(getStoredUser()),
    initialData: typeof window === "undefined" ? null : getStoredUser(),
    staleTime: Infinity,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      persistUser(user);
      queryClient.setQueryData(AUTH_KEY, user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: ({ user }) => {
      persistUser(user);
      queryClient.setQueryData(AUTH_KEY, user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.setQueryData(AUTH_KEY, null),
  });
}
