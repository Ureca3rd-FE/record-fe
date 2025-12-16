import type { SearchUserDto } from "@/models/user";
import { getMyInfo, searchUsers } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export function useMyInfo() {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });
}

export function useSearchUsers(keyword: string) {
  return useQuery<SearchUserDto[]>({
    queryKey: ["userSearch", keyword],
    queryFn: () => searchUsers(keyword),
    enabled: keyword.trim().length >= 1,
  });
}
