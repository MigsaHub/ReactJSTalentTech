import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const usePaginacion = (items, itemsPerPage = 3, isLoading = false) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const pageInUrl = Number(pageParam);
  const requestedPage =
    Number.isInteger(pageInUrl) && pageInUrl > 0 ? pageInUrl : 1;
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const currentPage = Math.min(requestedPage, totalPages);

  useEffect(() => {
    const isPageParamValid = !pageParam || pageParam === String(requestedPage);

    if (isLoading || (requestedPage === currentPage && isPageParamValid)) {
      return;
    }

    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        if (currentPage === 1) {
          nextParams.delete("page");
        } else {
          nextParams.set("page", String(currentPage));
        }

        return nextParams;
      },
      { replace: true },
    );
  }, [currentPage, isLoading, pageParam, requestedPage, setSearchParams]);

  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);

    if (nextPage === currentPage) return;

    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (nextPage === 1) {
        nextParams.delete("page");
      } else {
        nextParams.set("page", String(nextPage));
      }

      return nextParams;
    });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  return {
    currentPage,
    totalPages,
    paginatedItems: items.slice(startIndex, startIndex + itemsPerPage),
    goToPage,
  };
};
