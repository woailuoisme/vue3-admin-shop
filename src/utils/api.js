export function getBaseFilterParams(data) {
  let params = {}
  if (data?.page) params.page = data?.page
  if (data?.rowsPerPage) params.per_page = data?.rowsPerPage
  if (data?.sortBy) params.sortBy = data.sortBy
  if (data?.sortType) params.sortType = data.sortType
  if (data?.keyword) params.keyword = data.keyword
  return params
}
