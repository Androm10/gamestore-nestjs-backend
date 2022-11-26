import { Pagination } from 'src/core/types/pagination';

export function paginate(
  limit: number,
  offset: number,
  count: number,
  items: any[],
): Pagination<any> {
  return {
    items: items,
    count: count,
    page: offset / limit,
    pages: Math.ceil(count / limit),
  };
}
