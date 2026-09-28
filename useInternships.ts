import { useCallback, useEffect, useState } from "react";
import { fetchInternships } from "../services/internshipApi";
import type { Internship } from "../types/internship";

interface InternshipState {
  internships: Internship[];
  loading: boolean;
  error: string | null;
}

interface UseInternshipsResult extends InternshipState {
  reload: () => void;
}

export function useInternships(): UseInternshipsResult {
  const [state, setState] = useState<InternshipState>({
    internships: [],
    loading: true,
    error: null,
  });
  const [reloadToken, setReloadToken] = useState(0);

  const reload = useCallback(() => {
    setReloadToken((current) => current + 1);
  }, []);

  useEffect(() => {
    let active = true;

    setState((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    fetchInternships()
      .then((internships) => {
        if (active) {
          setState({ internships, loading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (active) {
          const message =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.";
          setState({ internships: [], loading: false, error: message });
        }
      });

    return () => {
      active = false;
    };
  }, [reloadToken]);

  return { ...state, reload };
}
