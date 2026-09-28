import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { FilterSelect } from "../components/FilterSelect";
import { InternshipCard } from "../components/InternshipCard";
import { LoadingState } from "../components/LoadingState";
import { SearchBar } from "../components/SearchBar";
import { useInternships } from "../hooks/useInternships";

export function Home() {
  const { internships, loading, error, reload } = useInternships();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const locations = useMemo(
    () => [...new Set(internships.map((internship) => internship.location))].sort(),
    [internships],
  );

  const categories = useMemo(
    () => [...new Set(internships.map((internship) => internship.category))].sort(),
    [internships],
  );

  const filteredInternships = useMemo(() => {
    const query = search.trim().toLowerCase();

    return internships.filter((internship) => {
      const matchesSearch =
        query.length === 0 ||
        internship.title.toLowerCase().includes(query) ||
        internship.company.toLowerCase().includes(query);

      const matchesLocation =
        location.length === 0 || internship.location === location;

      const matchesCategory =
        category.length === 0 || internship.category === category;

      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [internships, search, location, category]);

  const clearFilters = (): void => {
    setSearch("");
    setLocation("");
    setCategory("");
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark">TB</span>
          <span>TalentBridge</span>
        </Link>
        <span className="header-status">
          <span className="status-dot" /> Live API connected
        </span>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Career launchpad</span>
            <h1>Find an internship built for your next move.</h1>
            <p>
              Search practical opportunities, filter by what matters, and open
              a complete posting before applying.
            </p>
          </div>
          <div className="hero-stat">
            <strong>{internships.length}</strong>
            <span>open demo postings</span>
          </div>
        </section>

        <section className="toolbar" aria-label="Internship filters">
          <SearchBar value={search} onChange={handleSearchChange} />
          <div className="filters">
            <FilterSelect
              label="Location"
              value={location}
              options={locations}
              onChange={setLocation}
            />
            <FilterSelect
              label="Category"
              value={category}
              options={categories}
              onChange={setCategory}
            />
          </div>
        </section>

        <section className="results-header">
          <div>
            <span className="eyebrow">Opportunities</span>
            <h2>
              {filteredInternships.length} internship
              {filteredInternships.length === 1 ? "" : "s"} found
            </h2>
          </div>
          {(search || location || category) && (
            <button className="clear-button" type="button" onClick={clearFilters}>
              Reset filters
            </button>
          )}
        </section>

        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} onRetry={reload} />}

        {!loading && !error && filteredInternships.length === 0 && (
          <EmptyState onClear={clearFilters} />
        )}

        {!loading && !error && filteredInternships.length > 0 && (
          <div className="card-grid">
            {filteredInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        )}
      </main>

      <footer className="site-footer">
        <span>TalentBridge · React + TypeScript + PostgreSQL</span>
        <span>Live PostgreSQL-backed API</span>
      </footer>
    </div>
  );
}
