export interface CheckNicknameResponseDTO {
  isDuplicated: boolean;
}

export interface MyInfoDto {
  userId: number;
  email: string;
  nickname: string;
}

export interface SearchUserDto {
  id: number;
  nickname: string;
  email: string;
  isFollowed: boolean;
}
