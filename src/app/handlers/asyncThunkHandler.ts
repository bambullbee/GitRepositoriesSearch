import { createAsyncThunkTs, repository } from "@/shared";
import formatDate from "./formatDate";

interface fetchedRepository extends repository {
  html_url: string;
  updated_at: string;
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
        date: formatDate(el.updated_at),
      };
    });
    return {
      data: processedData,
      author: data.items[0]?.owner.login,
      isNewPage: searchInfo.isNewPage,
    };
  }
);
