import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API;

class FDService {

    getMachines(){
        return axios.get(API_BASE_URL+'machine/GetAllMachine');
    }

    getOperators(){
        return axios.get(API_BASE_URL+'operator/GetAllOperator');
    }

    getShift(){
        return axios.get(API_BASE_URL+'shift/GetAllShift');
    }

    createMachine(machine){
        return axios.post(API_BASE_URL+'machine/AddMachine', machine);
    }

    getMachineById(id){
        return axios.get(API_BASE_URL +'machine/GetMachineById/' + id);
    }

    updateMachine(id, machine){
        return axios.put(API_BASE_URL +'machine/PutMachine/' + id, machine);
    }

    deleteMachine(id){
        return axios.delete(API_BASE_URL+'machine/DeleteMachine/' + id);
    } 
}

export default new FDService()