import React from 'react';
import { Button} from 'react-bootstrap';
import GetItem from './GetItem';
import ButtonCustom from './Button';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: true,
            choices: [],
            show: false,
            selected: '',
            label: '',
            required: false,
            displayAlpha: true,
            default: '',      
        };
        //this.build = this.state;
    }

    addItem(e) {
        this.setState({show: true});
    }

    removeItem(e) {
        let choices = this.state.choices;
        let index = choices.indexOf(this.state.selected);
        choices.splice(index, 1);
        this.setState({choices: choices});
    }

    onClear(e) {
        this.setState({
            isValid: true,
            choices: [],
            show: false,
            selected: '',
            label: '',
            required: false,
            displayAlpha: true,
            default: '',
        });
    }

    checkValid(e) {
        if(e.target.value === '') {
            this.setState({isValid: false,
            label: e.target.value});
        }else {
            this.setState({isValid: true,
                label: e.target.value});
        }
    }

    onClose(val) {
        this.setState({show: val});
    }

    getSelectedValue(e) {
        this.setState({selected: e.target.value});
    }

    setRequired(e) {
        this.setState({required: e.target.checked});
    }

    getOrder(e) {
        //this.setState({order: e.target.value});
        let value = JSON.parse(e.target.value)
        this.setState({displayAlpha: value});
    }

    setDefault(e) {
        this.setState({default: e.target.value});
    }

    onSubmit(e) {
        //error if label is empty
        if(this.state.label === '') {
            alert("Please enter a label");
            return;
        }
        //if default not in choices add it in choices.
        if(this.state.default !== '') {
            if(!this.state.choices.includes(this.state.default)) {
                if(this.state.choices.length >= 50) {
                    alert("Please choose a default value from the choices --limit exceeded");
                    return;
                }
                let choices = this.state.choices;
                choices.push(this.state.default);
                this.setState({choices: choices});
            }
        }
        let state = {
            label: this.state.label,
            required: this.state.required,
            choices: this.state.choices,
            displayAlpha: this.state.displayAlpha,
            default: this.state.default
        }
        console.log(JSON.stringify(state));
        
        fetch("http://www.mocky.io/v2/566061f21200008e3aabd919", {
            method: "POST",
            body:  JSON.stringify(state)
        })
        .then(function(response){ 
            return response.json();   
        })
        .then(function(state){ 
            console.log(state)
        });
    }

    componentDidMount() {
        const label = localStorage.getItem('label');
        
        let ch = localStorage.getItem('choices');
        let arr = [];
        if(ch !== null && ch !== '') {
            arr = ch.split(',')
        }
        const required = JSON.parse(localStorage.getItem('required'));
        const displayAlpha = JSON.parse(localStorage.getItem('displayAlpha'));
        let defaultVal = '';
        if(localStorage.getItem('default') !== null && localStorage.getItem('default') !== '') {
            defaultVal = localStorage.getItem('default');
        }

        this.setState({choices: arr,
        label: label,
        required: required,
        displayAlpha: displayAlpha,
        default: defaultVal
        });
        
        window.addEventListener("beforeunload", (e) => {
            localStorage.setItem('label', this.state.label);
            localStorage.setItem('choices', this.state.choices);
            localStorage.setItem('required', this.state.required);
            localStorage.setItem('displayAlpha', this.state.displayAlpha);
            localStorage.setItem('default', this.state.default);
        });
    }

    render() {
        let choices = this.state.choices;
        
        let options = [];
        let index = 0;
        choices.forEach((choice) => {
            options.push(<option value={choice} key={index++}>{choice}
                </option>);
        });
        return (<div className="container">
        <h2 className="title">Field Builder</h2>
        <form className="border border-medium p-5">
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Label:</label>
                <div className="col-sm-10">
                <input type="text" onChange={(e) => this.checkValid(e)} 
                className="form-control" id="label-name" value={this.state.label}></input>
                {!this.state.isValid ?
                <small className="mandat">Label is mandatory</small>
                : null}
                </div>
            </div>
            
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Type <b>Multi-select</b></label>
                <div className="col-sm-10">
                <input id="confirmField" type="checkbox" 
                onChange={(e) => this.setRequired(e)} 
                checked={this.state.required} className="form-check-input"></input>
                <label className="form-check-label">A value is required</label></div>
            </div>
            

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Default value: </label>
                <div className="col-sm-10">
                <input type="text" onChange={(e) => this.setDefault(e)}
                className="form-control" id="default-value" value={this.state.default}></input>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Choices: </label>
                <div className="col-sm-10">
                <select size="4" onChange={(e) => this.getSelectedValue(e)}
                className="form-control">
                    {options}
                </select> 
                </div>
            </div>
            
            <div className="form-group row">
            {this.state.choices.length > 50?
            <div className="col-sm-2"><Button variant="primary" disabled>Add</Button></div>
            :<div className="col-sm-2"><Button variant="primary" onClick={(e) => this.addItem(e)}>Add</Button></div>}
            <div className="col-sm-2"><ButtonCustom variant="primary" disabled={false} onClick={(e) => this.removeItem(e)} 
            text="Delete"></ButtonCustom>
            </div></div>

            {this.state.show? <GetItem show={this.state.show} choices={this.state.choices} onHide={() => this.onClose(false)} ></GetItem>
            : null}

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Order:</label>
                <div className="col-sm-10">
                <select onChange={(e) => this.getOrder(e)} className="form-control" id="order" value={this.state.displayAlpha}>
                    <option value={true}>Display choices in Alphabetical order</option>
                    <option value={false}>Display choices unsorted</option>
                </select>
                </div>
            </div>
            
            <div className="form-group row">
            <div className="col-sm-2"><Button variant="primary" onClick={(e) => this.onSubmit(e)}>Save Changes</Button></div> 
            <div className="col-sm-2"><Button variant="secondary" onClick={(e) => this.onClear(e)}>Clear</Button></div></div>
            
        </form>
    </div>);
    }
}

export default Form;