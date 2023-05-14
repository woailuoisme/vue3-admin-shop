/** 用户性别 */
export const genderLabels = {
  0: "female",
  1: "male",
  2: "unknown",
}
export const genderOptions = [
  { value: "0", label: genderLabels["0"] },
  { value: "1", label: genderLabels["1"] },
  { value: "2", label: genderLabels["2"] },
]

/** 用户状态 */
export const userStatusLabels = {
  1: "active",
  2: "disabled",
  4: "deleted",
}

export const userStatusOptions = [
  { value: "1", label: userStatusLabels["1"] },
  { value: "2", label: userStatusLabels["2"] },
  { value: "4", label: userStatusLabels["4"] },
]

export const numberCompare = [
  { value: "=", label: "等于", abbr: "eq" },
  { value: ">=", label: "大于等于", abbr: "gte" },
  { value: ">", label: "大于", abbr: "gt" },
  { value: "<=", label: "小于等于", abbr: "lte" },
  { value: "<", label: "小于", abbr: "lt" },
  { value: "!=", label: "不等于", abbr: "ne" },
]
