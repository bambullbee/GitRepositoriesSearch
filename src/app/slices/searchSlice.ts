import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunkTs, loadingState, type repository } from "@/shared";

interface initialStateI {
  repositories: repository[];
  page: number;
  author: string;
  state: {
    type: loadingState;
    errorType: number;
  };
}

interface fetchedRepository extends repository {
  html_url: string;
}

interface searchInfoI {
  repoName: string;
  isNewPage: boolean;
}

export const fetchRepositories = createAsyncThunkTs(
  "search/fetcRepositories",
  async (searchInfo: searchInfoI, { rejectWithValue, getState, dispatch }) => {
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
      )
        .then((res) => {
          console.dir(res.headers.get("X-RateLimit-Remaining"));
          return res;
        })
        .catch(() => {
          throw new Error("Error catched!");
        });
    } catch (error) {
      return rejectWithValue(0);
    }
    try {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
    } catch (error) {
      return rejectWithValue(parseInt(error.message));
    }
    if (!searchInfo.isNewPage) {
      dispatch({ type: "search/oneMorePage" });
    } else {
      dispatch({ type: "search/resetPages" });
    }
    const data = await response.json();
    const processedData = data.items.map((el: fetchedRepository) => {
      return {
        name: el.name,
        description: el.description,
        link: el.html_url,
        stargazers_count: el.stargazers_count,
        id: el.id,
      };
    });
    console.log(data, currentPage);
    return {
      data: processedData,
      author: data.items[0]?.owner.login,
      isNewPage: searchInfo.isNewPage,
    };
  }
);

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
