import api from "@/lib/axios/index";

export const getMyInfo = async () => {
  const res = await api.get("/users/me");
  return res.data.result;
};
