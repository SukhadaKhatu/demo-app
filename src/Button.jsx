import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

class ButtonCustom extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false
        }
    }

    onClick(e) {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false})
        }, 500);
        this.props.onClick(e);
    }

    render() {
        let loading = this.state.loading;
        return(
            <Button variant={this.props.variant} disabled={this.props.disabled} onClick={(e) => this.onClick(e)}>
                {loading && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                />}
                <span>{this.props.text}</span>
            </Button>
        );
    }
}

export default ButtonCustom;