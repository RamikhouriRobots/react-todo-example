import axios from "axios";
const apiRootUri = `${process.env.REACT_APP_API_URI}`;

export function getAll(route) {
    try {
     return axios.get(`${apiRootUri}/${route}`);   
    } catch (error) {
      return []  
    }
}

export function addNew(route, object) {
  return axios.post(`${apiRootUri}/${route}`, object);
}

export function updateById(route,id, object) {
  return axios.post(`${apiRootUri}/${route}/${id}`, object);
}

export function deleteById(route,id) {
  return axios.get(`${apiRootUri}/${route}/${id}`);
}
