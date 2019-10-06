import React, {Component} from 'react';
import Auxiliary from "../Auxiliary/Auxiliary";
import Notification from '../../components/UI/notification/Notification';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,

            responseTimestamp: null,
            shouldUpdate: false
        };

        componentDidUpdate(prevProps, prevState, snapshot) {
            if(prevState.responseTimestamp !== this.state.responseTimestamp){
                this.setState({
                    ...this.state,
                    shouldUpdate: true
                })
            } else if(this.state.shouldUpdate === true){
                this.setState({
                    ...this.state,
                    shouldUpdate: false
                })
            }
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }


        componentDidMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( {
                    ...this.state,
                    error: null
                } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( {
                    ...this.state,
                    error: error,
                    responseTimestamp: new Date().getTime()
                } );
            } );
        }

        render () {
            let msg = null;
            if (this.state.error){
                msg = this.state.error
            }
            if(this.state.response !== undefined && this.state.error.response !== null){
                msg = this.state.error.response.status === 401 ? 'Bad Credentials' : this.state.response.data.message;
            }
            let notification = null;
            if (this.state.shouldUpdate && msg !== null){
                notification = <Notification type='error' msg={msg.toString()} title='Error!'/>
            }
            return (
                <Auxiliary>
                    {notification}
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
};

export default errorHandler;
