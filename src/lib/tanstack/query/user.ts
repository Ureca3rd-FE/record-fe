import { SearchUserDto } from "@/models/user";
import { getMyInfo, searchUsers } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export function useMyInfo() {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });
}
export function useSearchUsers(nickname: string) {
  const trimmed = nickname.trim();

  return useQuery<SearchUserDto[]>({
    queryKey: ["userSearch", trimmed],
    queryFn: () => searchUsers(trimmed),
    enabled: trimmed.length >= 1,
    retry: false,
  });
}
