import http from "../http-common";

class PatientataService {
  getAll() {
    return http.get("/patients");
  }
  getPatient(id){
    return http.get(`/patients/${id}`);
  }
  updatePatient(id, data){
    return http.put(`/patients/${id}`, data);
  }
  create(data) {
    return http.post("/patients", data);
  }
  deletePatient(id) {
    return http.delete(`/patients/${id}`);
  }
  getForms(id) {
    return http.get(`/patients/${id}/form`);
  }
  addForms(id,data) {
    return http.post(`/patients/${id}/form`,data);
  }
}

export default new PatientataService();
