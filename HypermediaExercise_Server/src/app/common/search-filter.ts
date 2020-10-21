import { IFilter } from './types/filter.type';
import { IOrderBy } from './types/order-by.type';
import { IPagination } from './types/pagination.type';
import { ISearchFilter } from './types/search-filter.type';

export interface SearchFilter {
  filter?: Array<IFilter>;
  search?: ISearchFilter;
  orderBy?: IOrderBy;
  pagination?: IPagination;
}
