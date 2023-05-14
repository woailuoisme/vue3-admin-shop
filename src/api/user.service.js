import client from "@/api/http.client"

class UserService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.keyword) params.keyword = data.keyword
    return client.instance().get("/users", { params })
  }

  toggleLottery(data) {
    const body = {
      user_id: data.id,
      is_active_lottery: data.is_active_lottery,
    }
    return client.instance().put(`/toggle_lottery`, body)
  }

  show(id) {
    return client.instance().get(`/users/${id}`)
  }

  brokerage(id, page = 1, perPage = 15) {
    const params = {
      page,
      perPage,
    }
    return client.instance().get(`/users/${id}/brokerage`, { params })
  }

  downloadExcel() {
    return client.instance().get("user_excel", { responseType: "arraybuffer" })
  }

  // async downloadFile() {
  //     try {
  //         const response = await client.instance().get('user_excel', {responseType: 'arraybuffer'})
  //         let blob = new Blob([response.data], {type: 'application/xlsx'})
  //         let link = document.createElement('a')
  //         link.href = window.URL.createObjectURL(blob)
  //         let now =moment().format('YYYY_MM_DD_HH_mm_ss')
  //         link.download = `user_excel_${now}.xlsx`
  //         link.click()
  //     }catch (e) {
  //         console.error(error)
  //     }
  //
  //
  // }
}

export default new UserService()
