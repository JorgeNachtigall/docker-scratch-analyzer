import React from 'react';
import axios from 'axios';
import styles from './home.css';
import sucessLogo from './carraca.svg';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            school: '',
            nameClass: '',
            email: '',
            submited: false,
            url: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ submited: true });
        this.setState({ url: Math.random().toString(36).substr(2, 3) + '-' + Math.random().toString(36).substr(2, 3) + '-' + Math.random().toString(36).substr(2, 3) }, () => {
            axios.post('https://elimu-analyzer.herokuapp.com/urls', {
                url: this.state.url,
                creator: this.state.name,
                school: this.state.school,
                nameClass: this.state.nameClass,
                email: this.state.email
            });
        });
        //console.log(window.location.pathname);
        event.preventDefault();
    }

    render() {
        if (this.state.submited === false) {
            return (
                <div className={styles.background}>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Crie sua turma</h1>
                        <h3>Digite seu nome:</h3>
                        <input type="text" value={this.state.name} onChange={this.handleChange} name="name" placeholder="Seu nome" />
                        <h3>Escola/Instituição:</h3>
                        <input type="text" value={this.state.school} onChange={this.handleChange} name="school" placeholder="Nome da sua escola/instituição" />
                        <h3>Apelido/Nome para sua turma:</h3>
                        <input type="text" value={this.state.nameClass} onChange={this.handleChange} name="nameClass" placeholder="Nome/apelido para a sua turma" />
                        <h3>E-mail:</h3>
                        <input type="email" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Seu e-mail" />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            );
        }
        else {
            return (
                <div className={styles.background}>
                    <img src={sucessLogo} alt="sucess logo" />
                    <h1>Turma criada com sucesso!</h1>
                    <h2>Link de acesso da sua turma: https://scratch.elimusocial.com.br/{this.state.url}</h2>
                    <h2>Envie este link para seus alunos para começar a coletar os dados de seus projetos.</h2>
                    <h2>Atenção: é importante que você sempre crie um novo link de acesso caso queira analisar diferentes turmas/atividades individualmente.</h2>
                </div>
            );
        }
    }
}

export default Home;