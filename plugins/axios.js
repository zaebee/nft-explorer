import Vue from 'vue'
import axios from 'axios'


const baseURL = process.env.baseURL

const axiosConfig = {
  baseURL: baseURL,
  timeout: 30000,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  xsrfCookieName: 'csrf-token',
  xsrfHeaderName: 'X-CSRFToken'
}

let $http = axios.create(axiosConfig)

// export default $http
export default $http
