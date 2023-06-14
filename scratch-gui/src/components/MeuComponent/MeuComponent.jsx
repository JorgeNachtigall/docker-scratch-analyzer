import React from 'react';
import styles from './mycomp.css';
import axios from 'axios';

class MeuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: true,
            url: '',
            includes: false,
            doneReq: false,
            nickSetted: false,
            nick: '',
            class: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentWillMount() {
        const path = await axios.get('https://elimu-analyzer.herokuapp.com/urls');

        if (path.data.data.includes(window.location.pathname.substring(1))) {
            this.setState({ includes: true });
            const classNick = await axios.post('https://elimu-analyzer.herokuapp.com/class', {
                url: window.location.pathname.substring(1)
            });
            this.setState({ class: classNick.data.data });
        }
        this.setState({ doneReq: true });

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ nickSetted: true });
        window.nickName = this.state.nick;
        event.preventDefault();
    }

    buttonClick() {
        this.setState({ visibility: false });
    }

    render() {
        if (true) {
            if (this.state.includes) {
                if (this.state.nickSetted)
                    return (null);
                else {
                    return (
                        <div className={styles.background}>
                            <form onSubmit={this.handleSubmit}>
                                <h3>Bem-vindo ao Scratch da turma: {this.state.class}</h3>
                                <h3>Digite seu nome:</h3>
                                <input type="text" value={this.state.nick} onChange={this.handleChange} name="nick" placeholder="Nome" />
                                <button type="submit">Enviar</button>
                            </form>
                        </div>
                    );
                }
            }
            else {
                return (
                    <div className={styles.background}>
                        <div class="buttonDiv">
                            <div className={styles.title}>
                                <h3>Bem-vindo ao Scratch Elimu!</h3>
                                <h2>Parece que você está tentando acessar o Scratch Elimu através de um link inválido de turma.</h2>
                                <h2>Por favor, verifique o link de acesso ou, caso não possua uma turma, você pode criá-la clicando no botão abaixo.</h2>
                                <h4>
                                    <a href="https://scratch.elimusocial.com.br/create" class="button">Crie sua turma!</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else {
            return (
                <div className={styles.background}>
                    <div className={styles.title}>
                        <h2>Carregando!</h2>
                    </div>
                </div>
            );
        }
    }
}

export default MeuComponent;

