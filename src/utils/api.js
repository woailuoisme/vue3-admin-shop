import qs from "qs"

export function buildBaseParams(data) {
  let params = {}
  if (data?.page) params.page = data?.page
  if (data?.rowsPerPage) params.per_page = data?.rowsPerPage
  if (data?.sortBy) params.sortBy = data.sortBy
  if (data?.sortType) params.sortType = data.sortType
  if (data?.keyword) params.keyword = data.keyword
  return params
}

const data = {
  page: 1,
  rowsPerPage: 5,
  sortBy: "age",
  sortType: "desc",
  filters: [
    // { name: "amount", compare: ">", value: 3 },
    // { name: "age", compare: "!=", value: 3 },
    // { name: "name", compare: "like", value: "haha" },
  ],
  // sortBy: ['indicator.weight', 'number'],
  // sortType: ['desc', 'asc'],
}

const compareSymbols = [
  { label: "大于", value: ">", short: "gt", full: "greater_than" },
  { label: "大于等于", value: ">=", short: "gte", full: "greater_and_equal" },
  { label: "等于", value: "=", short: "eq", full: "equal" },
  { label: "小于", value: "<", short: "lt", full: "less_than" },
  { label: "大于等于", value: ">=", short: "lt", full: "less_and_equal" },
  { label: "不等于", value: "!=", short: "lt", full: "not_equal" },
  { label: "好像", value: "like", short: "like", full: "like" },
  { label: "精准", value: "exact", short: "exact", full: "exact" },
  { label: "其中", value: "in", short: "in", full: "in" },
  { label: "不在其中", value: "not in", short: "not in", full: "not_in" },
  { label: "之间", value: "between", short: "between", full: "between" },
  { label: "不在之间", value: "not between", short: "not between", full: "not_between" },
]

export function buildQueryParams(data) {
  let params = {}
  if (data?.page) params.page = data?.page
  if (data?.rowsPerPage) params.per_page = data?.rowsPerPage
  if (data?.sortBy && data?.sortType) params.sort = data.sortType === "asc" ? data.sortType : `-${data?.sortType}`
  if (data?.keyword) params.keyword = data.keyword
  if (data?.filters && Array.isArray(data.filters)) {
    params.filter = {}
    for (const filter of data.filters) {
      const index = compareSymbols.findIndex((s) => s.value === filter.compare)
      if (["like", "exact"].includes(compareSymbols[index].short)) {
        params.filter[`${filter.name}`] = filter.value
      } else {
        params.filter[`${filter.name}_${compareSymbols[index].short}`] = filter.value
      }
    }
  }
  console.log(params)
  return params
}
const params = buildQueryParams(data)

export function buildQueryString(data) {
  const params = buildQueryParams(data)
  const queryString = qs.stringify(params, {
    arrayFormat: "brackets", // 指定数组格式为 []
    encodeValuesOnly: true, // 只编码值，不编码键
    skipNulls: true, // 跳过值为 null 或 undefined 的属性
  })
  return queryString
}

// // 构建查询参数
// const query = {
//   filter: {
//     price_gt: 30,
//     price_lt: 40,
//     age_lte:50,
//     name:'分类算法就'
//   },
//   sort: '-created_at' // 按照创建时间降序排列
// };

// 使用 qs.stringify 方法将 query 对象转换成查询字符串
const queryString = qs.stringify(params, {
  arrayFormat: "brackets", // 指定数组格式为 []
  encodeValuesOnly: true, // 只编码值，不编码键
  skipNulls: true, // 跳过值为 null 或 undefined 的属性
})
// 构建完整的 API URL，包含查询字符串
const apiUrl = `/api/products?${queryString}`
