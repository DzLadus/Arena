import * as React from 'react';
import FieldContainer from '../containers/FieldContainer';
import InfoContainer from '../containers/InfoContainer';

export default class App extends React.Component{
    render(){
        return(
            <div className="page">
                <InfoContainer />
                <FieldContainer />
            </div>
        )
    }
}