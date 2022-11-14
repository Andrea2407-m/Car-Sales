import {
    Pagination,
    PaginationItem,
    PaginationRenderItemParams,
  } from "@mui/material";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { forwardRef } from 'react';
import { getAsString } from '../pages/getAsString';


export function CarPagination({ totalPages }: { totalPages: number }) {
  const { query } = useRouter();

  return (
    <Pagination
      page={parseInt(getAsString(query.page) || '1')}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={MaterialUiLink}
          query={query}
          item={item}
          {...item}
        />
      )}
    />
  );
}

export interface MaterialUiLinkProps {
  item: PaginationRenderItemParams;
  query: ParsedUrlQuery;
}

const MaterialUiLink = forwardRef<HTMLAnchorElement, MaterialUiLinkProps>(
  ({ item, query, ...props }, ref) => (
    <Link
      href={{
        pathname: '/cars',
        query: { ...query, page: item.page },
      }}
      shallow {...props} ref={ref}
    >
    </Link>
  )
);