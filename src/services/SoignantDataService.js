import http from "../http-common";

class SoignantataService {
  getAll() {
    return http.get("/soignants");
  }
  create(data) {
    return http.post("/soignants", data);
  }
  getForms(id) {
    return http.get(`/soignants/${id}/form`);
  }
  addForms(id,data) {
    return http.post(`/soignants/${id}/form`,data);
  }
}

export default new SoignantataService();
