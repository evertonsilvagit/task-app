export type Sort = {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
}

export type Pageable = {
    pageNumber: number,
    pageSize: number,
    sort: Sort,
    offset: number,
    unpaged: boolean,
    paged: boolean
}

export interface ApiPageResponse<T> {
    content: T[],
    pageable: Pageable,
    last: boolean,
    totalPages: number,
    totalElements: number,
    first: boolean,
    size: number,
    number: number,
    sort: Sort,
    numberOfElements: number,
    empty: boolean
}
