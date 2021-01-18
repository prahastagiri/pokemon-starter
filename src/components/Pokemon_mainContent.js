import React from 'react';
import PokemonForm from '../components/pokemon_form.js';
import {Row,Col,Modal,Button} from 'antd';

class PokemonMainContent extends React.Component{
    constructor(){
        super()
        this.state = {
            visible : false,
            showModal2: false,
            modalText : '',
            loading:false
        }
        this.handleSubmitFromForm = this.handleSubmitFromForm.bind(this);
        this.handleRickRoll = this.handleRickRoll.bind(this);
    }
    handleSubmitFromForm(value){
        var text = 
        <div style={{fontSize:'15px',lineHeight:'1.8'}}>
            <div>
            {`So you are ${value.gender} named ${value.name} from ${value.hometown}.`}
            </div>
            <div>
            {`You and your pokemon ${value.starterPokemon} is going to challenge the Elite Four of ${value.region}.`}
            </div>
            <div>
            {`Is it Correct?`}
            </div>
        </div>
        this.setState({
            visible: true,
            modalText:text
        })
    }
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
    }
    handleOk = (e) => {
        this.setState({
          visible: false,
          showModal2:true,
        });
    }
    handleRickRoll = () =>{
        this.setState({
            showModal2:false
        })
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','_blank');

    }

    render(){
        return(
            <div>
                <Row>
                    <Col>
                        <div className="poke-main-form">
                            <PokemonForm
                                ref={'pokemon'}
                                handleSubmitFrom={this.handleSubmitFromForm}
                            />
                        </div>
                        <div className="poke-modal-1">
                            <Modal
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                closable={false}
                                footer={[
                                    <Button key="back" size="large" onClick={this.handleCancel}>Cancel</Button>,
                                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>Continue</Button>
                                ]}
                                width={580}
                            >
                                {this.state.modalText}   
                            </Modal>
                        </div>
                        <div className='poke-modal-2'>
                            <Modal
                                visible={this.state.showModal2}
                                closable={false}
                                footer={[
                                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleRickRoll}>Submit</Button>
                                ]}
                            >
                                <div style={{fontSize:'24px'}}>
                                    Good luck on your journey and remember to use repel in a cave!
                                </div>   
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default PokemonMainContent;