import axios from "axios";
const BASE_API_URL="http://localhost:8080/api/v1/employees";

class EmpService{

    saveEmp(emp)
    {
        return axios.post(BASE_API_URL,emp);
    }
    getAllEmployees()
    {
        return axios.get(BASE_API_URL+"/p");
    }
    getAllEmployeesByPage(pageNo,pageSize){
        return axios.get(BASE_API_URL+"/p?page="+pageNo+"&size="+pageSize);
    }
    getAllEmployeeFromId(id)
    {
        return axios.get(BASE_API_URL+"/"+id);
    }
    delete(id){
        return axios.delete(BASE_API_URL+"/"+id);
    }
    update(id,emp){
        return axios.post(BASE_API_URL+"/"+id,emp);
    }

}
export default new EmpService();