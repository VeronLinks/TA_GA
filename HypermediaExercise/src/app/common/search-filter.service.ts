import { isString, isNumber } from 'lodash';
import { Service } from 'typedi';

import { SearchFilter } from './search-filter';
import { IOrderBy } from './types/order-by.type';
import { IPagination } from './types/pagination.type';
import { ISearchFilter } from './types/search-filter.type';
import { IFilter } from './types/filter.type';
import { DBQuery } from '../../database/models/db-query';

@Service()
export class SearchFilterService {

  transformSearchFilterToSQL(searchFilter: SearchFilter): DBQuery {
    const result: any = { sql: '', params: [] };
    let numParam = 1;

    const { filter, search, orderBy, pagination } = searchFilter;

    if (search != null) {
      const searchQuery = this._generateSearchSQLCode(search, numParam);
      result.sql = searchQuery.sql;

      if (searchQuery.params != null && searchQuery.params.length > 0) {
        result.params = result.params.concat(searchQuery.params);
        numParam = searchQuery.params.length + 1;
      }
    }

    if (filter != null) {
      if (search != null) {
        result.sql = result.sql + ' AND ';
      }

      const filterQuery = this._generateFilterSQLCode(filter, numParam);
      result.sql = result.sql + filterQuery.sql;

      if (filterQuery.params != null && filterQuery.params.length > 0) {
        result.params = result.params.concat(filterQuery.params);
      }
    }

    if (orderBy != null && this._areValidOrderByParams(orderBy)) {
      result.sql = result.sql + this._generateOrderBySQLCode(orderBy);
    }

    if (pagination != null && this._areValidPaginationParams(pagination)) {
      result.sql = result.sql + this._generatePaginationSQLCode(pagination);
    }

    return result;
  }

  /**
   * Esta función genera el código SQL que permite el filtrado por la
   * intersección de las condiciones de dentro del array "filter".
   */
  private _generateFilterSQLCode(filter: IFilter[], paramNum: number): DBQuery {
    let searchSQL = '(';
    const params: any = [];

    for (const { field, text } of filter) {
      if (this._isValidTheFieldName(field)) {
        searchSQL = searchSQL.concat(`${field} = $${paramNum++} AND `);
        params.push(text);
      }
    }

    return  {
      sql: searchSQL.substr(0, searchSQL.length - 5).concat(')'),
      params
    };
  }

  /**
   * Esta función genera el código SQL que permite el filtrado por la
   * unión de las condiciones de dentro del array "filter".
   */
  private _generateSearchSQLCode(searchFilter: ISearchFilter, paramNum: number): DBQuery {
    let searchSQL = '(';
    const params: any = [];
    const searchText = searchFilter.text;

    for (const field of searchFilter.fields) {
      if (this._isValidTheFieldName(field)) {
        searchSQL = searchSQL.concat(`${field} LIKE $${paramNum++} OR `);
        params.push(`%${searchText}%`);
      }
    }

    return {
      sql: searchSQL.substr(0, searchSQL.length - 4).concat(')'),
      params
    };
  }

  /**
   * Esta función genera el código SQL que permite la ordenación del resultado
   * de la query en función de la condición de "orderBy".
   */
  private _generateOrderBySQLCode(orderBy: IOrderBy): string {
    const { type, field } = orderBy;
    return ` ORDER BY ${field} ${type}`;
  }

  /**
   * Esta función genera el código SQL que permite la paginación del resultado
   * de la query en función de la página que se le pase en el "pagination".
   */
  private _generatePaginationSQLCode(pagination: IPagination): string {
    const { limit, page } = pagination;
    const offset = limit * (page - 1);

    return ` OFFSET ${offset} LIMIT ${limit}`;
  }

  /**
   * Con esta función nos aseguramos que los parámetros que nos llegan para hacer
   * la paginación son números, es decir, que al obligar a que sean números nos
   * aseguramos que no hay codigo malicioso a inyectar en la consulta.
   */
  private _areValidPaginationParams(pagination: IPagination): boolean {
    return isNumber(pagination.limit) && isNumber(pagination.page);
  }

  /**
   * Con esta función nos aseguramos que los strings que nos llegan para hacer
   * la ordenación de la búsqueda son seguros, es decir, que no hay codigo
   * malicioso a inyectar en la consulta.
   */
  private _areValidOrderByParams(orderBy: IOrderBy): boolean {
    const fieldNameRegExp = new RegExp('^[A-Za-z_]+$');
    return fieldNameRegExp.test(orderBy.field)
      && fieldNameRegExp.test(orderBy.type);
  }

  /**
   * Con esta función nos aseguramos que los strings que nos marcan el nombre
   * de los campos de las tablas sean seguros, es decir, que no hay codigo
   * malicioso a inyectar en la consulta.
   */
  private _isValidTheFieldName(field: string): boolean {
    const fieldNameRegExp = new RegExp('^[A-Za-z_]+$');
    return fieldNameRegExp.test(field);
  }

}
