import { useEffect, useState } from "react";

type UseGitStarsResult = {
  stars: number | null;
  loading: boolean;
  error: string | null;
};

const REPO_API =
  "https://api.github.com/repos/Nelson-5553/NodeGraph";

export default function useGitStars(): UseGitStarsResult {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abort = new AbortController();

    async function fetchStars() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(REPO_API, { signal: abort.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        } else {
          setStars(null);
          setError("stargazers_count not found");
        }
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err.message || String(err));
        setStars(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStars();

    return () => abort.abort();
  }, []);

  return { stars, loading, error };
}
