import http from "../http-common";

class PatientDataService {
  getAll() {
    return http.get("/patients");
  }
  getPatient(id){
    return http.get(`/patients/${id}`);
  }
  findPatientByCaregiverId(id){
    return http.get(`/patients/caregiver/${id}`);
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

export default new PatientDataService();
