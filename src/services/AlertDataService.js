import http from "../http-common";

class AlertDataService {
  getAll(userId) {
    return http.get(`/alerts/${userId}`);
  }
  getAlert(userId,id){
    return http.get(`/alerts/${userId}/${id}`);
  }
  updateAlert(userId,id, data){
    return http.put(`/alerts/${userId}/${id}`, data);
  }
  findByCaregiverId(userId){
    return http.get(`/alerts/caregiver/${userId}`);
  }
  create(userId,data) {
    return http.post(`/alerts/${userId}`, data);
  }
  deleteAlert(userId,id) {
    return http.delete(`/alerts/${userId}/${id}`);
  }
}

export default new AlertDataService();
