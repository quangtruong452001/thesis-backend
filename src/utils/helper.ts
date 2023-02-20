// import { pickBy } from 'lodash';
import mongoose from 'mongoose';
import {
  // productQuery,
  productSort,
} from './type';
import { pickBy } from 'lodash';

export function generateTextSearch(value, fts = false) {
  return fts
    ? {
        $text: { $search: value },
      }
    : {
        $regex: value,
        $options: 'i',
      };
}

export const cleanObject = (originalObject = {}) => {
  const validArrays = pickBy(
      originalObject,
      (e) => Array.isArray(e) && e.length > 0,
    ),
    validObjects = pickBy(
      originalObject,
      (e) =>
        e !== undefined &&
        e !== null &&
        e !== '' &&
        !Array.isArray(e) &&
        typeof e === 'object' &&
        Object.keys(e).length > 0,
    ),
    validProperties = pickBy(
      originalObject,
      (e) =>
        e !== undefined &&
        e !== null &&
        e !== '' &&
        !Array.isArray(e) &&
        typeof e !== 'object',
    );
  return {
    ...validProperties,
    ...validArrays,
    ...validObjects,
  };
};
export function handleOrderFilters(filters) {
  if (!filters) {
    return {};
  }
  const { status, ...rest } = filters;

  const query: any = {};
  if (status) {
    query.status = status;
  }

  return { ...query, ...rest };
}

export function handleProductFilters(filters) {
  if (!filters) {
    return {};
  }
  const { name, categories, minPrice, maxPrice, ...rest } = filters;

  const query: any = {};
  // $or = [];
  if (name) {
    // query.name = generateTextSearch(name);
    query.name = new RegExp(name, 'i');
  }
  if (categories) {
    query.categories = new mongoose.Types.ObjectId(categories);
  }
  if (minPrice && maxPrice) {
    query.price = {
      $gte: minPrice,
      $lte: maxPrice,
    };
  } else if (maxPrice) {
    query.price = {
      $lte: maxPrice,
    };
  } else if (minPrice) {
    query.price = {
      $gte: minPrice,
    };
  }
  // if (minPrice && maxPrice) {
  //   $or.push(
  //     ...[
  //       {
  //         ['price']: {
  //           $gte: minPrice,
  //           $lte: maxPrice,
  //         },
  //       },
  //     ],
  //   );
  // } else if (minPrice) {
  //   $or.push(
  //     ...[
  //       {
  //         ['price']: {
  //           $gte: minPrice,
  //         },
  //       },
  //     ],
  //   );
  // } else {
  //   $or.push(
  //     ...[
  //       {
  //         ['price']: {
  //           $lte: maxPrice,
  //         },
  //       },
  //     ],
  //   );
  // }
  // if ($or.length) {
  //   query.$or = $or;
  // }
  // console.log({ ...query, ...rest });
  return { ...query, ...rest };
}

export function getDefaultPagingOptions(
  page = 1,
  limit = 20,
  sort = '-createdAt',
  replaceDocsName = 'data',
  select = null,
  populate = '',
) {
  return cleanObject({
    sort,
    select,
    page: page,
    limit: limit,
    customLabels: {
      totalDocs: 'total',
      docs: replaceDocsName,
      perPage: 'limit',
      currentPage: 'currentPage',
      next: 'nextPage',
      prev: 'prevPage',
      pageCount: 'totalPages',
      slNo: 'pagingCounter',
    },
    populate,
  });
}

export function handleProductSorts(sorts) {
  if (!sorts) {
    return {};
  }
  const sort: productSort = {};
  if (sorts === 'priceAsc') {
    sort.price = 'asc';
  }
  if (sorts === 'priceDesc') {
    sort.price = 'desc';
  }
  if (sorts === 'date') {
    sort.createdAt = -1;
  }
  return { ...sort };
}

export function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}
