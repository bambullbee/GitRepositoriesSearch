interface repository {
  name: string;
  description: string;
  link: string;
  stargazers_count: number;
  id: number;
  date: number;
}

type loadingState = "idle" | "loading" | "error" | "successfull";

export { repository, loadingState };
