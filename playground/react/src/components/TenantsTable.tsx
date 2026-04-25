import { useCallback, useState } from 'react';

const DEFAULT_PER_PAGE = 15;
const PER_PAGE_OPTIONS = [10, 15, 25, 50] as const;

export function TenantsTable(): JSX.Element {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<typeof PER_PAGE_OPTIONS[number]>(
    DEFAULT_PER_PAGE
  );

  const goToPrev = useCallback(() => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  }, []);

  const goToNext = useCallback(() => {
    setPage((currentPage) => currentPage + 1);
  }, []);

  return (
    <section>
      <h2>Tenants</h2>
      <p>
        Page {page}, {perPage} per page
      </p>
      <div>
        <button type="button" onClick={goToPrev}>
          Previous
        </button>
        <button type="button" onClick={goToNext}>
          Next
        </button>
      </div>
      <div>
        {PER_PAGE_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setPerPage(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}
