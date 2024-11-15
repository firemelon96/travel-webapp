'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

const useUpdateQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParams = (url: string, params: {}) => {
    const newQueryString = qs.stringify(
      { url, ...params },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(`/${newQueryString}`);
  };

  return updateQueryParams;
};

export default useUpdateQueryParams;
