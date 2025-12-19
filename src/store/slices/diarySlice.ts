import type { SubmitDiaryResponseDTO } from "@/models/diary";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface DiaryState {
  diarySummary: SubmitDiaryResponseDTO | null;
}

const initialState: DiaryState = {
  diarySummary: null,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setDiarySummary: (state, action: PayloadAction<SubmitDiaryResponseDTO>) => {
      state.diarySummary = action.payload;
    },
  },
});

export const { setDiarySummary } = diarySlice.actions;
export default diarySlice.reducer;
