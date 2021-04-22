import http from "../http-common";

class SoignantataService {
  getAll() {
    return http.get("/caregivers");
  }
  create(data) {
    return http.post("/caregivers", data);
  }
  getForms(id) {
    return http.get(`/caregivers/${id}/form`);
  }
  addForms(id,data) {
    return http.post(`/caregivers/${id}/form`,data);
  }
}

export default new SoignantataService();
