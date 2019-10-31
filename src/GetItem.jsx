import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class GetItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state={
            exceed: false
        }
    }

    addChoice() {
        let choices = this.props.choices;
        let val = document.getElementById('choice-name').value.toLowerCase();
        let choicesLower = choices.map((choice) => choice.toLowerCase());
        if(choicesLower.includes(val)) {
            document.getElementById('choice-name').value = '';
            alert("Choice already exists");
        }else {
            choices.push(document.getElementById('choice-name').value);
            this.props.onHide();
        }
    }

    checkLength(e) {
        let length = e.target.value.length;
        if(length > 40) {
            this.setState({exceed: true});
        }else {
            this.setState({exceed: false});
        }
    }

    render() {
        return (
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add choice
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                    <div>
                    <label className="col-sm-2 col-form-label">Choice: </label>
                    <input type="text" id="choice-name" onChange={(e) => this.checkLength(e)}/>
                    {this.state.exceed? <small className="mandat">Choice exceeds word limit</small> : null}
                    </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => this.addChoice()}>Add</Button>
                <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                
              </Modal.Footer>
            </Modal>
          );
    }
}

export default GetItem;