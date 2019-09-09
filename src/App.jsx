import React,{Component} from 'react';
import {pessoaApi} from './api'
import Line from './Components/Line'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Table,
  Label } from 'reactstrap';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchField: '',
      nome: '',
      email: '',
      sexo: '',
      dataNascimento:'',
      naturalidade:'',
      nacionalidade:'',
      cpf:'',
      pessoa:''
    };
  }

  onChangeSearchField = event => this.setState({searchField:event.target.value});

  onChangeNome = event => this.setState({nome: event.target.value});

  onChangeEmail = event => this.setState({email:event.target.value});

  onChangeSexo = event => this.setState({sexo:event.target.value});

  onChangeDataNascimento = event => this.setState({dataNascimento:event.target.value});

  onChangeNaturalidade = event => this.setState({naturalidade:event.target.value});

  onChangeNacionalidade = event => this.setState({nacionalidade:event.target.value});

  onChangeCpf = event => this.setState({cpf:event.target.value});

  savePessoa = async() => {
    const {
      nome,email,sexo,dataNascimento,naturalidade,nacionalidade,cpf
    } = this.state;
    try {
      await pessoaApi.createPessoa(nome, email, sexo, dataNascimento, cpf, naturalidade,nacionalidade)
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  onDeleteLine = () => {
    this.setState({pessoa:''})
  }

  findPessoa = async() => {
    const {searchField} = this.state;
    try {
      const content = await pessoaApi.get(searchField);
      this.setState({pessoa : content.data});
      console.log(this.state.pessoa);

    } catch (e) {
      console.log(e);
    } finally {
      console.log("ok")
    }
  }

  render(){
    const {pessoa } = this.state;
  return (
    <div className="App">
        <header className="header" >
            <h1> CRUD de Pessoas Java + Spring Boot + JPA / ReactJs </h1>
        </header>
        <br/>
        <Container className="Container">
          <Row>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>Consulta Pessoa</Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">Cod</InputGroupAddon>
                            <Input type="text" placeholder="Id Registro" onChange={this.onChangeSearchField} />
                          </InputGroup>
                        </FormGroup>
                        <Button color="primary" onClick={this.findPessoa}>Buscar</Button>{' '}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <br/>
              </Col>
              <Col>
                <Card>
                  <CardBody>
                    <Label>Cadastro Nova Pessoa</Label>
                    <Form>
                      <Row>
                        <Col>
                          <FormGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                              <InputGroupAddon addonType="prepend">Nome</InputGroupAddon>
                              <Input placeholder="Nome" type="text" onChange={this.onChangeNome} />
                            </InputGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                              <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                              <Input placeholder="Email" type="email" onChange={this.onChangeEmail} />
                            </InputGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                              <InputGroupAddon addonType="prepend">Sexo</InputGroupAddon>
                              <Input placeholder="Sexo" type="text" onChange={this.onChangeSexo}/>
                            </InputGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                              <InputGroupAddon addonType="prepend">Data de Nascimento</InputGroupAddon>
                              <Input type="date" placeholder="Data de Nascimento" onChange={this.onChangeDataNascimento} />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                          <InputGroup style={{paddingBottom: 10}}>
                            <InputGroupAddon addonType="prepend">Naturalidade</InputGroupAddon>
                            <Input placeholder="Naturalidade" type="text" onChange={this.onChangeNaturalidade} />
                          </InputGroup>
                          <InputGroup style={{paddingBottom: 10}}>
                            <InputGroupAddon addonType="prepend">Nacionaliade</InputGroupAddon>
                            <Input placeholder="Nacionalidade" type="text" onChange={this.onChangeNacionalidade} />
                          </InputGroup>
                          <InputGroup style={{paddingBottom: 10}}>
                            <InputGroupAddon addonType="prepend">CPF</InputGroupAddon>
                            <Input placeholder="Documento CPF" type="text" onChange={this.onChangeCpf} />
                          </InputGroup>
                          <Button color="success" onClick={this.savePessoa} >Cadastrar</Button>{' '}
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <br/>
              </Col>
          </Row>
          <Row>
            <Col> 
              <Card>
                <CardBody>
                  <Table >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Sexo</th>
                        <th>Data Nascimento</th>
                        <th>Data Criaçao</th>
                        <th>Ultima Atualizaçao</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        <Line lineId={pessoa.id} documentId={pessoa.documentId}
                              nome={pessoa.nome} email={pessoa.email} genero={pessoa.genero}
                              ultimaAlteracao={pessoa.ultimaAlteracao} dataHoraCadastro={pessoa.dataHoraCadastro}
                              dataNascimento={pessoa.dataNascimento} onDeleteLine={this.onDeleteLine}/>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
    </div>
  );
}
}
export default App;
