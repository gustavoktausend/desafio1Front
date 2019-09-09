import axios from 'axios';

const tok = 'admin:123';
const hash = btoa(tok);
const Basic = 'Basic ' + hash;

const get = (url, config) => axios.get(url,config);

const post = (url, params, config) => axios.post(url, params, config);

const del = (url, config) => axios.delete(url, config);

const put = (url, params, config) => axios.put(url, params, config);

class Api {
    constructor(baseUrl = ''){
        this.baseUrl = baseUrl;
    }

    get = id => get(`${this.baseUrl}/${id}`,{headers : { 'Authorization' : Basic }});
    create = params => post(this.baseUrl, params, {headers : { 'Authorization' : Basic }});
    delete = id => del(`${this.baseUrl}/${id}`,{headers : { 'Authorization' : Basic }});
    update = (id, params) => put(`${this.baseUrl}/${id}`, params,{headers : { 'Authorization' : Basic }});
}

class PessoaApi extends Api{
    constructor(){
        super(`http://localhost:8080/api/pessoa`)
    }

    createPessoa = (nome, email, sexo, dataNascimento, cpf, naturalidade, nacionalidade) =>
        post(`${this.baseUrl}?nome=${nome}&email=${email|| ''}&genero=${sexo|| ''}&dataNascimento=${dataNascimento}&documentId=${cpf}&naturalidade=${naturalidade|| ''}&nacionalidade=${nacionalidade|| ''}`,{},{headers : { 'Authorization' : Basic }})

    updatePessoa = (id, nome, email, sexo, dataNascimento, cpf, naturalidade, nacionalidade) =>
        put(`${this.baseUrl}/${id}?nome=${nome}&email=${email|| ''}&genero=${sexo|| ''}&dataNascimento=${dataNascimento}&documentId=${cpf}&naturalidade=${naturalidade|| ''}&nacionalidade=${nacionalidade|| ''}`,{},{headers : { 'Authorization' : Basic }})

}

export const pessoaApi = new PessoaApi();