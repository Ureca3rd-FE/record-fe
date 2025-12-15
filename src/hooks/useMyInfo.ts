import { getMyInfo } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
//
export function useMyInfo() {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });
}
