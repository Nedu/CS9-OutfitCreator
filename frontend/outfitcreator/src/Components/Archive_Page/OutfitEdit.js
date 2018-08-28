import React from 'react';
import { Card,  CardImg,  CardDeck } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router';
import './OutfitEdit.css';

const testUser = '5b745597a48cb52b0c1baedf';
const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://lambda-outfit-creator-api.herokuapp.com/' : 'http://localhost:5000';

class OutfitEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outfit: '',
            name: '',
            worn: Date,
            top: '',
            bottom: '',
            shoes: ''
        }
    }

    componentDidMount() {
        this.getOutfit();
    }

    getOutfit = () => {
        const outfitId = this.props.location.pathname.split('Edit/')[1];
        axios.get(`${ROOT_URL}/outfits/${testUser}/${outfitId}`)
            .then(response => {
                const { data } = response;
                const lastWorn = data.worn.split('T')[0];
                this.setState({ outfit: data, name: data.name, worn: lastWorn })
            })
            .catch(err => {
                console.log(err);
            })
    }

    populate = id => {
        axios.get(`${ROOT_URL}/items/${testUser}/${id}`)
            .then(response => {
                this.setState({ [response.data.type]: response.data })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    redirectArchive = () => {
        this.props.location.pathname = '/Archive/';
        window.location = this.props.location.pathname;
    }

    submitChanges = () => {
        const outfitId = this.props.location.pathname.split('Edit/')[1];
        const {name, worn} = this.state;
        const newInfo = { name, worn};
        axios.put(`${ROOT_URL}/outfits/${testUser}/${outfitId}`, newInfo)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
        this.redirectArchive();
    }

    render() {
        const { outfit, top, bottom, shoes } = this.state;
        const sources = [];
        if (outfit) {
            sources.push(...outfit.top, ...outfit.bottom, outfit.shoes);
        }
        if (!top && !bottom && !shoes) {
            sources.forEach((id) => this.populate(id));
        }
        console.log(this.state)
        return (
            outfit ? (
                <div className="createContainer">
                    <CardDeck>
                        <Card inverse>
                            <CardImg
                                width="80%"
                                src={top.image}
                                alt="Card image cap"
                            />
                        </Card>
                        <Card inverse>
                            <CardImg
                                width="80%"
                                src={bottom.image}
                                alt="Card image cap"
                            />
                        </Card>
                        <Card inverse>
                            <CardImg
                                width="80%"
                                src={shoes.image}
                                alt="Card image cap"
                            />
                        </Card>
                    </CardDeck>
                    <div className='container--editbox'>
                        <div className='edit--header'>
                            <div className='header--title'>
                                Name: <input
                                    type='text'
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.handleInput}
                                    className='edit--input'
                                />
                            </div>
                            <div className='edit--footer'>
                                Worn on: <input
                                    type='text'
                                    name='worn'
                                    value={this.state.worn}
                                    onChange={this.handleInput}
                                    className='edit--input'
                                />
                            </div>
                        </div>
                        <div className='edit--buttons'>
                            <button className='edit--submit' onClick={this.submitChanges}>Submit</button>
                            <button className='edit--cancel' onClick={this.redirectArchive}>Cancel</button>
                        </div>
                    </div>
                </div>
            ) : (
                    <div className='container--archive'>
                        Loading Outfit
                    </div>
                )
        )
    }
}

export default withRouter(OutfitEdit);