import http from "../http-common";

class GroupDataService {
  getAllPatientGroup() {
    return http.get("/groups/patient");
  }
  getAllCaregiversGroup() {
    return http.get("/groups/caregiver");
  }
  getGroup(id){
    return http.get(`/groups/${id}`);
  }
  updateGroup(id, data){
    return http.put(`/groups/${id}`, data);
  }
  createPatientGroup(data) {
    return http.post("/groups/patient", data);
  }
  createCaregiver(data) {
    return http.post("/groups/caregiver", data);
  }
  deleteGroup(id) {
    return http.delete(`/groups/${id}`);
  }
  addUserInGroup(groupId, userId) {

    return http.put(`/groups/${groupId}/${userId}`);
  }
  deleteUserInGroup(groupId, userId) {
    console.log("groupe : " + groupId + " user : " + userId)
    return http.delete(`/groups/${groupId}/${userId}`);
  }
}

export default new GroupDataService();
