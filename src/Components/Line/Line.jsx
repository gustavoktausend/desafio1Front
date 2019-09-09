import React, { Component } from 'react';
import {
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroup,
    InputGroupAddon, Input
} from 'reactstrap';
import {pessoaApi} from "../../api";

class Line extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            nomeN: '',
            emailN: '',
            sexoN: '',
            dataNascimentoN:'',
            naturalidadeN: '',
            nacionalidadeN:'',
            cpfN:'',
            ...props
        }

    }
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    deletePessoa = async() => {
        try {
            await pessoaApi.delete(this.props.lineId)
        } catch (e) {
            console.log(e);
        } finally {
            this.props.onDeleteLine();
        }
    }

    editPessoa = async() => {
        const {nomeN, emailN, sexoN, dataNascimentoN, naturalidadeN, nacionalidadeN, cpfN} = this.state;
        const {lineId} = this.props;
        try{
            await pessoaApi.updatePessoa(lineId, nomeN, emailN, sexoN, dataNascimentoN, naturalidadeN, nacionalidadeN, cpfN)
        } catch (e) {
            console.log(e);
        } finally {
            this.toggle();
        }
    }

    onChangeNome = event => this.setState({nomeN: event.target.value});

    onChangeEmail = event => this.setState({emailN:event.target.value});

    onChangeSexo = event => this.setState({sexoN:event.target.value});

    onChangeDataNascimento = event => this.setState({dataNascimentoN:event.target.value});

    onChangeNaturalidade = event => this.setState({naturalidadeN:event.target.value});

    onChangeNacionalidade = event => this.setState({nacionalidadeN:event.target.value});

    onChangeCpf = event => this.setState({cpfN:event.target.value});

    render(){
        const {lineId, documentId, nome, email, genero, ultimaAlteracao, dataHoraCadastro, dataNascimento, naturalidade, nacionalidade} = this.props;
        return(
            <>
                <tr>
                    <th scope="row"><strong>{lineId}</strong> </th>
                    <td>{nome}</td>
                    <td>{email}</td>
                    <td>{documentId}</td>
                    <td>{genero}</td>
                    <td>{dataNascimento}</td>
                    <td>{dataHoraCadastro}</td>
                    <td>{ultimaAlteracao}</td>
                    <td>
                        {!!lineId && <Button color="primary" onClick={this.toggle} >Editar</Button>}

                    </td>
                    <td>
                        {!!lineId && <Button color="danger" onClick={this.deletePessoa} >Remover</Button>}

                    </td>
                </tr>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Editar Registro</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                                <InputGroupAddon addonType="prepend">Nome</InputGroupAddon>
                                <Input placeholder={nome} type="text" onChange={this.onChangeNome} />
                            </InputGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                                <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                                <Input placeholder={email} type="email" onChange={this.onChangeEmail} />
                            </InputGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                                <InputGroupAddon addonType="prepend">Sexo</InputGroupAddon>
                                <Input placeholder={genero} type="text" onChange={this.onChangeSexo}/>
                            </InputGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                                <InputGroupAddon addonType="prepend">Data de Nascimento</InputGroupAddon>
                                <Input type="date" placeholder={dataNascimento} onChange={this.onChangeDataNascimento} />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                                <InputGroupAddon addonType="prepend">Naturalidade</InputGroupAddon>
                                <Input placeholder={naturalidade} type="text" onChange={this.onChangeNaturalidade} />
                            </InputGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                                <InputGroupAddon addonType="prepend">Nacionaliade</InputGroupAddon>
                                <Input placeholder={nacionalidade} type="text" onChange={this.onChangeNacionalidade} />
                            </InputGroup>
                            <InputGroup style={{paddingBottom: 10}}>
                                <InputGroupAddon addonType="prepend">CPF</InputGroupAddon>
                                <Input placeholder={documentId} type="text" onChange={this.onChangeCpf} />
                            </InputGroup>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.editPessoa}>Atualizar</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Line;