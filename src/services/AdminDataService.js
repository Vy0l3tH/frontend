import http from "../http-common";

class AdminataService {
  getAll() {
    return http.get("/administrators");
  }
  create(data) {
    return http.post("/administrators", data);
  }
  getForms(id) {
    return http.get(`/administrators/${id}/form`);
  }
  addForms(id,data) {
    return http.post(`/administrators/${id}/form`,data);
  }
}

export default new AdminataService();
