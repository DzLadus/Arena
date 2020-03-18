import React from 'react';
import Unit from '../logic/units/Unit';
import defence from '../img/defence.png';

type MyProps = {
    priorityQueue: Unit[],
    toggle: any
};

export default class Info extends React.Component<MyProps>{
    constructor(props: MyProps){
        super(props);
    }

    render(){
        return(
            <div className="info-container">
                <img src={defence} alt="defence" className="defence" onClick={() => {this.props.toggle();}}/>
                <div className="priorityQueue">
                    <div className="nextInQueue">
                        { 
                            typeof this.props.priorityQueue[this.props.priorityQueue.length - 1] !== 'undefined'
                                ? this.props.priorityQueue[this.props.priorityQueue.length - 1].name
                                : ""
                        }
                    </div>
                    <div className="nextInQueue">
                        { 
                            typeof this.props.priorityQueue[this.props.priorityQueue.length - 2] !== 'undefined'
                                ? this.props.priorityQueue[this.props.priorityQueue.length - 2].name
                                : ""
                        }
                    </div>
                    <div className="nextInQueue">
                        { 
                            typeof this.props.priorityQueue[this.props.priorityQueue.length - 3] !== 'undefined'
                                ? this.props.priorityQueue[this.props.priorityQueue.length - 3].name
                                : ""
                        }
                    </div>
                    <div className="nextInQueue">
                        { 
                            typeof this.props.priorityQueue[this.props.priorityQueue.length - 4] !== 'undefined'
                                ? this.props.priorityQueue[this.props.priorityQueue.length - 4].name
                                : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}