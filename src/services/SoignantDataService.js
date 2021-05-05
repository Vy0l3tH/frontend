import http from "../http-common";

class SoignantDataService {
  getAll() {
    return http.get("/caregivers");
  }
  getSoignant(id){
    return http.get(`/caregivers/${id}`);
  }
  updateSoignant(id, data){
    return http.put(`/caregivers/${id}`, data);
  }
  deleteSoignant(id) {
    return http.delete(`/caregivers/${id}`);
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

export default new SoignantDataService();
