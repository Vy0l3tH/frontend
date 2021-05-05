import http from "../http-common";

class ShippingPolicyataService {
  getAll() {
    return http.get("/shippingPolicies");
  }
  getShippingPolicy(id){
    return http.get(`/shippingPolicies/${id}`);
  }
  updateShippingPolicy(id, data){
    return http.put(`/shippingPolicies/${id}`, data);
  }
  create(data) {
    return http.post("/shippingPolicies", data);
  }
  deleteShippingPolicy(id) {
    return http.delete(`/shippingPolicies/${id}`);
  }
}

export default new ShippingPolicyataService();
