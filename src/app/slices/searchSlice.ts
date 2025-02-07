import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunkTs, type repository } from "@/shared";

interface initialStateI {
  repositories: repository[];
  page: number;
  author: string;
}

interface fetchData {
  data: repository[];
  author: string;
}

interface searchInfoI {
  repoName: string;
  isNewPage: boolean;
}

export const fetchRepositories = createAsyncThunkTs(
  "search/fetcRepositories",
  async (searchInfo: searchInfoI, { rejectWithValue, getState, dispatch }) => {
    console.log(searchInfo, "searchInfo");
    const currentPage = getState().search.page;
    if (searchInfo.repoName === "") {
      return {
        data: getState().search.repositories,
        isNewPage: false,
        author: searchInfo.repoName,
      };
    }
    let response;
    try {
      response = await fetch(
        `https://api.github.com/search/repositories?q=user:${
          searchInfo.repoName
        }&per_page=20&page=${
          searchInfo.isNewPage ? currentPage + 1 : currentPage
        }`
      );
    } catch (error) {
      console.log("error");
      return rejectWithValue(
        ""
        //    error has to be checked
      );
    }
    if (!response.ok) {
      //    error has to be checked
      return rejectWithValue("");
    }
    if (searchInfo.isNewPage) {
      dispatch({ type: "search/oneMorePage" });
    }
    const data = await response.json();
    const processedData = data.items.map((el: repository) => {
      return {
        name: el.name,
        description: el.description,
        link: el.link,
        stargazers_count: el.stargazers_count,
        id: el.id,
      };
    });
    return {
      data: processedData,
      author: data.items[0].owner.login,
      isNewPage: searchInfo.isNewPage,
    };
  }
);

const initialState: initialStateI = {
  repositories: [],
  page: 1,
  author: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    oneMorePage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepositories.pending, (state, action) => {});
    builder.addCase(fetchRepositories.rejected, (state, action) => {});
    builder.addCase(fetchRepositories.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.isNewPage) {
        state.repositories = [...state.repositories, ...action.payload.data];
      } else {
        state.repositories = action.payload.data;
      }
      state.author = action.payload.author;
    });
  },
});

export const {} = searchSlice.actions;

export default searchSlice.reducer;
