import http from "../http-common";

class FormataService {
  getAll() {
    return http.get("/forms");
  }
  getForm(id){
    return http.get(`/forms/${id}`);
  }
  updateForm(id, data){
    return http.put(`/forms/${id}`, data);
  }
  create(data) {
    return http.post("/forms", data);
  }
  deleteForm(id) {
    return http.delete(`/forms/${id}`);
  }
  getForms(id) {
    return http.get(`/forms/${id}/form`);
  }
  addForms(id,data) {
    return http.post(`/forms/${id}/form`,data);
  }
}

export default new FormataService();
