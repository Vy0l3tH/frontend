import http from "../http-common";

class AdminDataService {
  getAll() {
    return http.get("/administrators");
  }
  getAdmin(id){
    return http.get(`/administrators/${id}`);
  }
  updateAdmin(id, data){
    return http.put(`/administrators/${id}`, data);
  }
  create(data) {
    return http.post("/administrators", data);
  }
  deleteAdmin(id) {
    return http.delete(`/administrators/${id}`);
  }
  getForms(id) {
    return http.get(`/administrators/${id}/form`);
  }
  addForms(id,data) {
    return http.post(`/administrators/${id}/form`,data);
  }
}

export default new AdminDataService();
