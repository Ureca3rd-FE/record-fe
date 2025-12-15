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
  return useQuery({
    queryKey: ["userSearch", keyword],
    queryFn: () => searchUsers(keyword),
    enabled: keyword.trim().length >= 1,

    // 🔥 핵심: UI에는 배열만 간다
    select: (data) => {
      if (Array.isArray(data)) return data;
      return [];
    },

    // 초기에도 배열
    initialData: [],
  });
}
