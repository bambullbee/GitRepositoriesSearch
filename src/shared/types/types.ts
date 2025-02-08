interface repository {
  name: string;
  description: string;
  link: string;
  stargazers_count: number;
  id: number;
}

type loadingState = "idle" | "loading" | "error";

export { repository, loadingState };
