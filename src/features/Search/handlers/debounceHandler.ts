import { fetchRepositories, resetRepoList } from "@/app";

import { store } from "@/app";

type timer = ReturnType<typeof setTimeout>;

export default function debounce() {
  function closureDebounce() {
    let previousCall: number = undefined;
    let lastCall: number = undefined;
    let lastCallTimer: timer;
    return function perform(repoName: string) {
      previousCall = lastCall;

      lastCall = Date.now();

      if (previousCall && lastCall - previousCall <= 1000) {
        clearTimeout(lastCallTimer);
      }
      lastCallTimer = setTimeout(() => {
        store.dispatch(resetRepoList());
        store.dispatch(fetchRepositories({ repoName, isNewPage: false }));
      }, 1000);
    };
  }
  return closureDebounce();
}
