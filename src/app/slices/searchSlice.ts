import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunkTs, type repository } from "@/shared";

interface initialStateI {
  repositories: repository[];
}

export const fetchRepositories = createAsyncThunkTs(
  "search/fetcRepositories",
  async (repoName: string, { rejectWithValue }) => {
    if (repoName === "") {
      return { items: [] };
    }
    let response;
    try {
      response = await fetch(
        `https://api.github.com/search/repositories?q=user:${repoName}`
      );
    } catch (error) {
      return rejectWithValue(
        ""
        //    error has to be checked
      );
    }
    if (!response.ok) {
      //    error has to be checked
      return rejectWithValue("");
    }
    const data = await response.json();
    return data;
  }
);

const initialState: initialStateI = {
  repositories: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchRepositories.fulfilled,
      (state, action: PayloadAction<{ items: repository[] }>) => {
        state.repositories = action.payload.items.map((el) => {
          return {
            name: el.name,
            description: el.description,
            link: el.link,
            stargazers_count: el.stargazers_count,
            id: el.id,
          };
        });
      }
    );
    builder.addCase(fetchRepositories.pending, (state, action) => {});
    builder.addCase(fetchRepositories.rejected, (state, action) => {});
  },
});

export const {} = searchSlice.actions;

export default searchSlice.reducer;
