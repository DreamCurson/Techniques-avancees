import http from "../http-common";
class ForfaisDataService {
  getAll() {
    return http.get("/forfais");
  }

  create(data) {
    return http.post("/forfais", data);
  }

  get(id) {
    return http.get(`/forfais/${id}`);
  }

  update(id, data) {
    return http.put(`/forfais/${id}`, data);
  }

  delete(id) {
    return http.delete(`/forfais/${id}`);
  }
}
export default new ForfaisDataService();
