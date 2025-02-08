import { createSlice } from "@reduxjs/toolkit";
import { loadingState, type repository } from "@/shared";
import { fetchRepositories } from "../handlers/asyncThunkHandler";

interface initialStateI {
  repositories: repository[];
  page: number;
  author: string;
  state: {
    type: loadingState;
    errorType: number;
  };
}

const initialState: initialStateI = {
  repositories: [],
  page: 1,
  author: "",
  state: {
    type: "successfull",
    errorType: null,
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    oneMorePage: (state) => {
      state.page += 1;
    },
    resetPages: (state) => {
      state.page = 1;
    },
    resetRepoList: (state) => {
      state.repositories = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepositories.pending, (state, action) => {
      state.state.type = "loading";
    });
    builder.addCase(fetchRepositories.rejected, (state, action) => {
      state.state.type = "error";
      if (typeof action.payload === "number") {
        state.state.errorType = action.payload;
        if (action.payload === 0) {
          state.repositories = [];
        }
      }
    });
    builder.addCase(fetchRepositories.fulfilled, (state, action) => {
      state.state.type = "successfull";
      state.state.errorType = null;
      if (state.repositories.length === 0) {
        const folder = document.getElementById("folder");
        folder.style.animation = "none";
        folder.offsetHeight;
        folder.style.animation = null;
      }
      if (action.payload.isNewPage) {
        state.repositories = [...state.repositories, ...action.payload.data];
      } else {
        state.repositories = action.payload.data;
      }
      state.author = action.payload.author;
    });
  },
});

export const { resetRepoList } = searchSlice.actions;

export default searchSlice.reducer;
