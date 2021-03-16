import http from "../http-common";

class PatientataService {
  getAll() {
    return http.get("/patients");
  }
  create(data) {
    return http.post("/patients", data);
  }
  getForms(id) {
    return http.get(`/patients/${id}/form`);
  }
  addForms(id,data) {
    return http.post(`/patients/${id}/form`,data);
  }
}

export default new PatientataService();
