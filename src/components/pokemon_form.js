import React from 'react';
import { Form, Select, Input, Button, Row, Col, Card, Spin} from 'antd';
import { PokemonService } from '../api/pokemon.service.js';

const FormItem = Form.Item;
const Option = Select.Option;


class PokemonForm extends React.Component {
    pokemonGeneration = [
        ['Bulbasaur', 'Charmander', 'Squirtle'],
        ['Chikorita', 'Cyndaquil', 'Totodile'],
        ['Treecko', 'Torchic', 'Mudkip'],
        ['Turtwig', 'Chimchar', 'Piplup'],
        ['Snivy', 'Tepig', 'Oshawott'],
        ['Chespin', 'Fennekin', 'Froakie'],
        ['Rowlet', 'Litten', 'Popplio']
    ];
    hometown = [
        { id: "pallet", value: "Pallet Town", region:'Kanto region',prof:'oak.png'},
        { id: "newBark", value: "New Bark Town", region:'Johto region',prof:'elm.png'},
        { id: "littleroot", value: "Littleroot Town", region:'Hoenn region (The Best Region dont @ me)',prof:'birch.png'},
        { id: "twinleaf", value: "Twinleaf Town", region:'Sinnoh region',prof:'rowan.png'},
        { id: "nuverna", value: "Nuverna Town", region:'Unova region',prof:'juniper.png'},
        { id: "vaniville", value: "Vaniville Town",region:'Kalos region',prof:'sycamore.png'},
        { id: "hauoli", value: "Hau'oli Town",region:'Alola region',prof:'kukui.png'},
    ]
    playerName = [
        {
            id: 'boy',
            list: ["Blue", "Green", "Silver", "Brendan", "Wally", "Barry", "Cheren", "Calem", "Hau", "Gladion"]
        },
        {
            id: 'girl',
            list: ["May", "Bianca", "Serena"]
        }
    ]
    colorData = {
        'fire':'#F08030',
        'grass':'#78C850',
        'water':'#6890F0'
    }
    constructor(props) {
        super(props);
        this.state = {
            gender: '',
            name: '',
            hometown: '',
            starterPokemon: '',
            pokemonData: '',
            loading:'',
            region:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onHomeTownSelect = this.onHomeTownSelect.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.resetAll = this.resetAll.bind(this);
        this.onStarterPokemonSelected = this.onStarterPokemonSelected.bind(this);
        this.resetState = this.resetState.bind(this);
        this.resetHard = this.resetHard.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.handleSubmitFrom(this.state)
            }
        });
    }
    onHomeTownSelect(value,option) {
        this.props.form.resetFields(['starterPokemon'])
        this.setState({
            hometown: option.props.children,
            region: option.props.region,
            starterPokemon:''
        });
    }

    onGenderChange(value) {
        this.setState({ gender: value });
    }

    onNameChange(e) {
        const { value } = e.target;
        this.setState({ name: value });
    }
    onStarterPokemonSelected = async (value) => {
        var pokemonData = await PokemonService.getPokemonData(value);
        this.setState({ starterPokemon: value, pokemonData: pokemonData });
    }
    resetHard() {
        this.resetAll();
        this.resetState();
    }
    resetAll() {
        this.props.form.resetFields();
    }
    resetState() {
        this.setState({
            gender: '',
            name: '',
            hometown: '',
            starterPokemon: '',
            pokemonData:''
        })
    }
    randomized = async () => {
        this.setState({loading:true});
        var random = (Math.ceil(Math.random() * 6));
        var randomPokemon = (Math.ceil(Math.random() * 2));
        var newNumber = random % 2;
        var newPlayerName = '';
        var gender = ''
        var randomPlayer = ''

        if (newNumber === 0) {
            randomPlayer = (Math.ceil(Math.random() * this.playerName[0].list.length - 1));
            newPlayerName = this.playerName[0].list[randomPlayer];
            gender = this.playerName[0].id
        } else {
            randomPlayer = (Math.ceil(Math.random() * this.playerName[1].list.length - 1));
            newPlayerName = this.playerName[1].list[randomPlayer];
            gender = this.playerName[1].id
        }


        var selectedHomeTown = this.hometown[random].value;
        var selectedRegion = this.hometown[random].region;
        var selectedPokemon = this.pokemonGeneration[random][randomPokemon];

        var newPokemonData = await PokemonService.getPokemonData(selectedPokemon.toLowerCase());

        // fill form fields without initialValue
        this.props.form.setFieldsValue({
            gender: gender,
            hometown: selectedHomeTown,
            starterPokemon: selectedPokemon,
            name: newPlayerName,
            region: selectedRegion
        });

        // set state for submit
        this.setState({
            gender: gender,
            hometown: selectedHomeTown,
            starterPokemon: selectedPokemon,
            name: newPlayerName,
            pokemonData:newPokemonData,
            region: selectedRegion,
            loading:false
        })

    }
    componentDidMount(){
        console.log('DidMount')
    }
    handleImageLoaded(){
        console.log('fired')
        // this.setState({loading:false})
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        var starterSelect = 
        <FormItem label='Starter Pokemon'>
            {getFieldDecorator('starterPokemon', { rules: [{ required: true, message: 'Please choose your starter pokemon!' }] })(
                <Select placeholder="Please choose your hometown first" disabled={true} />
            )}
        </FormItem>

        if (this.state.hometown !== '') {
            var starterPokemon
            var professorSelected
            switch (this.state.hometown) {
                case 'Pallet Town':
                    starterPokemon = this.pokemonGeneration[0].map((value) => {
                        return (<Option key={Math.random()} value={`${value.toLowerCase()}`}>{value}</Option>);
                    })
                    professorSelected= this.hometown[0].prof;
                    break;
                case 'New Bark Town':
                    starterPokemon = this.pokemonGeneration[1].map((value) => {
                        return (<Option key={Math.random()} value={`${value.toLowerCase()}`}>{value}</Option>);
                    })
                    professorSelected= this.hometown[1].prof;
                    break;
                case 'Littleroot Town':
                    starterPokemon = this.pokemonGeneration[2].map((value) => {
                        return (<Option key={Math.random()} value={`${value.toLowerCase()}`}>{value}</Option>);
                    })
                    professorSelected= this.hometown[2].prof;
                    break;
                case 'Twinleaf Town':
                    starterPokemon = this.pokemonGeneration[3].map((value) => {
                        return (<Option key={Math.random()} value={`${value.toLowerCase()}`}>{value}</Option>);
                    })
                    professorSelected= this.hometown[3].prof;
                    break;
                case 'Nuverna Town':
                    starterPokemon = this.pokemonGeneration[4].map((value) => {
                        return (<Option key={Math.random()} value={`${value.toLowerCase()}`}>{value}</Option>);
                    })
                    professorSelected= this.hometown[4].prof;
                    break;
                case 'Vaniville Town':
                    starterPokemon = this.pokemonGeneration[5].map((value) => {
                        return (<Option key={Math.random()} value={`${value.toLowerCase()}`}>{value}</Option>);
                    })
                    professorSelected= this.hometown[5].prof;
                    break;
                case "Hau'oli Town":
                    starterPokemon = this.pokemonGeneration[6].map((value) => {
                        return (<Option key={Math.random()} value={`${value.toLowerCase()}`}>{value}</Option>);
                    })
                    professorSelected= this.hometown[6].prof;
                    break;
                default:
                    break;
            }
            starterSelect =
                <FormItem label='Starter Pokemon'>
                    {getFieldDecorator('starterPokemon', { rules: [{ required: true, message: 'Please choose your starter pokemon!' }] })(
                        <Select placeholder="Please choose your starter pokemon" onSelect={this.onStarterPokemonSelected}>{starterPokemon}</Select>
                    )}
                </FormItem>
        }
        var buttonDisabled = true;
        for (var key in this.state) {
            if (this.state[key] !== '' && this.state[key] !== undefined) {
                buttonDisabled = false
            }
        }
        var rowStyle = { gutter: 10 }
        var homeTownOptions = (
            this.hometown.map((e) => {
                return (<Option key={Math.random()} value={`${e.id}`} region={e.region} >{e.value}</Option>)
            })
        )
        
        var bg = 'white';
        if(this.state.pokemonData !== ''){
            this.state.pokemonData.types.map((e)=>{
                for(var key in this.colorData){
                    if(key===e.type.name){
                        bg = this.colorData[key];
                    }
                }
            })
        }

        var stateStatusStyle = { marginTop: '38px', paddingLeft:'40px'}
        var formItemSpan = 16;
        var stateStatusSpan = 8;

        return (
            <div className="Main-Form-Container">
                <Row>
                    <Col span={12} style={{background:'white',padding:'50px 30px 10px 50px',borderRadius:'50px',boxShadow:'10px 10px 5px 0px rgba(0,0,0,0.26)'}}>
                        <Form onSubmit={this.handleSubmit}>
                            <Row {...rowStyle}>
                                <Col xs={formItemSpan}>
                                    <FormItem label="Gender">
                                        {getFieldDecorator('gender', { rules: [{ required: true, message: 'Please select your gender!' }] })(
                                            <Select onSelect={this.onGenderChange} placeholder="Select your gender">
                                                <Option key={Math.random()} value='boy'>Boy</Option>
                                                <Option key={Math.random()} value='girl'>Girl</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={stateStatusSpan} style={{ ...stateStatusStyle }}>Gender State : {this.state.gender === '' ? 'Empty' : this.state.gender}</Col>
                            </Row>
                            <Row {...rowStyle}>
                                <Col xs={formItemSpan}>
                                    <FormItem label="Your Name">
                                        {getFieldDecorator('name', { rules: [{ required: true, message: 'Please input your name!' }] })(
                                            <Input onChange={this.onNameChange} placeholder="Input your name" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={stateStatusSpan} style={{ ...stateStatusStyle }}>Name State : {this.state.name === '' ? 'Empty' : this.state.name}</Col>
                            </Row>
                            <Row {...rowStyle}>
                                <Col xs={formItemSpan}>
                                    <FormItem label="Your Hometown">
                                        {getFieldDecorator('hometown', { rules: [{ required: true, message: 'Please select your hometown!' }] })(
                                            <Select onSelect={this.onHomeTownSelect} placeholder='select your hometown'>
                                                {homeTownOptions}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={stateStatusSpan} style={{ ...stateStatusStyle }}>Hometown State : {this.state.hometown === '' ? 'Empty' : this.state.hometown}</Col>
                            </Row>
                            <Row {...rowStyle}>
                                <Col xs={formItemSpan}>
                                    {starterSelect}
                                </Col>
                                <Col xs={stateStatusSpan} style={{ ...stateStatusStyle }}>Pokemon State : {this.state.starterPokemon === '' ? 'Empty' : this.state.starterPokemon}</Col>
                            </Row>
                            <Row {...rowStyle}>
                                <Col xs={6}>
                                    <FormItem>
                                        <Button style={{ width: '100%' }} type="primary" htmlType="submit">Submit</Button>
                                    </FormItem>
                                </Col>
                                <Col xs={10} push={5}>
                                    <FormItem>
                                        <Button onClick={this.randomized}>Randomized</Button>
                                    </FormItem>
                                </Col>
                                <Col xs={9} >
                                    <FormItem>
                                        <Button type="primary" disabled={buttonDisabled} onClick={this.resetHard} style={{ width: '100%' }}>Reset Form</Button>
                                    </FormItem>
                                    <Row>
                                        <Col xs={10}>
                                            <FormItem>
                                                <Button disabled={buttonDisabled} type="primary" onClick={this.resetAll}>Reset Fields</Button>
                                            </FormItem>
                                        </Col>
                                        <Col xs={10} style={{ float: 'right' }}>
                                            <FormItem>
                                                <Button disabled={buttonDisabled} type="primary" onClick={this.resetState}>Reset State</Button>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col span={12}>
                        {this.state.pokemonData!=='' && this.state.pokemonData!==undefined ?
                        <div className="poke-card-container">
                            <Row>
                                <Col span={24} style={{textAlign:'center'}} >
                                    <div className="poke-card-title">
                                        <h2>Here's Your Pokemon Partner</h2>
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col span={24} style={{textAlign:'center'}}>
                                    <div className="poke-card">
                                        <Card style={{ width: 240 }} bodyStyle={{ padding: 0, border:`5px solid ${bg}`, borderRadius:'5px' }}>
                                            <div className="custom-image">
                                                <div style={{position:'absolute',padding:'10px',backgroundColor:`${bg}`,borderRadius: '0px 0px 5px 0px'}}>
                                                    <p style={{color:'white',fontSize:'18px'}}>#{this.state.pokemonData.id}</p>
                                                </div>
                                                {this.state.loading===true 
                                                ? <Spin style={{width:'100%',margin:'104px 0px'}}/> 
                                                : <img onLoad={this.handleImageLoaded} style={{width:'100%',height:'228px'}} src={this.state.pokemonData.sprites.front_default} alt="Pokemon Sprite"/>}
                                            </div>
                                            <div className="custom-card">
                                                <Row>
                                                    <Col style={{textTransform:'capitalize',textAlign:'center',fontSize:'24px',borderTop:`5px solid ${bg}`}}>{this.state.pokemonData.name}</Col>
                                                </Row>
                                                <Row>
                                                    {this.state.pokemonData.types.map((e)=>{
                                                        return(
                                                            <Col span={24} key={Math.random()} style={{textAlign:'center',fontSize:'18px',backgroundColor:`${bg}`,color:'white', textTransform:'capitalize'}}>{e.type.name}</Col>
                                                        )
                                                    })}
                                                </Row>
                                            </div>
                                        </Card>
                                    </div>
                                    <div className="poke-prof-container">
                                        <img className="poke-prof-img" src={process.env.PUBLIC_URL + '/background/' + professorSelected} alt="Professor"></img>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        :
                        <div className="poke-card-container">
                            <Row>
                                <Col span={24}>
                                    <div className="poke-card-blank">
                                    <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }} bordered={false} noHovering={true}>
                                        <div className="custom-image" style={{textAlign:'center'}}>
                                            <img alt="Error" style={{width:'173px',heigh:'173px'}} src={process.env.PUBLIC_URL + '/pikachu.png'}/>
                                        </div>
                                        <div className="custom-card" style={{textAlign:'Center',padding:'10px'}}>
                                            <h2>Choose Your Pokemon!</h2>
                                        </div>
                                    </Card>
                                    </div>
                                    {this.state.hometown!=="" && 
                                        <div className="poke-prof-container">
                                            <img className="poke-prof-img-blank" src={process.env.PUBLIC_URL + '/background/' + professorSelected} alt="Professor"></img>
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </div>
                        }
                    </Col>
                </Row>
                <style jsx>{`
                .Main-Form-Container{
                    padding:50px 50px
                }
                .poke-prof-container{
                    transform: translateY(-100px) translateX(100px);
                }
                .poke-prof-img{
                    height: 300px;
                    z-index: 1;
                }
                .poke-prof-img-blank{
                    height: 300px;
                    z-index: 1;
                }
                .poke-card{
                    background:white;
                    padding:0px 0px 20px 20px;
                    width:280px;
                    margin:auto;
                    border-radius:0px 0px 10px 10px;
                }
                .poke-card-title{
                    background:white;
                    border-radius:15px 15px 0px 0px;
                    width:280px;
                    margin:0px auto;
                    padding:12px 0px;
                }
                .poke-card-blank{
                    background:white;
                    padding:20px 0px 20px 20px;
                    width:280px;
                    margin:auto;
                    border-radius:10px;
                }
            `}</style>
            </div>
        )
    }
}

const WrappedPokemonForm = Form.create()(PokemonForm);
export default WrappedPokemonForm;