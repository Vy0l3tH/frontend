import http from "../http-common";

class FormulaireataService {
  getAll() {
    return http.get("/formulaires");
  }
  create(data) {
    return http.post("/formulaires", data);
  }
}

export default new FormulaireataService();
