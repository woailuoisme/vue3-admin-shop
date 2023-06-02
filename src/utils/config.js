export const dataTableAttr = {
  rowsPerPageMessage: "每页",
  emptyMessage: "暂无数据",
  headerTextDirection: "center",
  bodyTextDirection: "center",
  alternating: false,
  buttonsPagination: true,
  tableClassName: "customize-table",
  // themeColor:"#f48225",
  // tableClassName: 'customize-table',
  // rowsItems: () => [10, 20, 50, 100],
}


export const setDataTableAttr = (themeColor = "#f48225", isDark = false, hideFooter = false,) => {
  return {
    rowsPerPageMessage: "每页",
    emptyMessage: "暂无数据",
    headerTextDirection: "center",
    bodyTextDirection: "center",
    alternating: false,
    buttonsPagination: true,
    hideFooter,
    themeColor,
    tableClassName: isDark ? "customize-table-dark" : "customize-table",
    rowsItems: () => [10, 20, 50],
  }
}
