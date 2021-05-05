import http from "../http-common";

class GroupDataService {
  getAll() {
    return http.get("/groups");
  }
  getGroup(id){
    return http.get(`/groups/${id}`);
  }
  updateGroup(id, data){
    return http.put(`/groups/${id}`, data);
  }
  create(data) {
    return http.post("/groups", data);
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
