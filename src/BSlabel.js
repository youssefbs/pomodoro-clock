import React, { PureComponent } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp,faArrowDown} from '@fortawesome/free-solid-svg-icons'

class BSlabel extends PureComponent {
    render() {
        const {val,label,idlabel}=this.props
        return (
            <div className='BS'>
                <h2 id={`${idlabel}-label`}>{label} Length</h2>
                <div className='controll'>
                    <div id={`${idlabel}-increment`}  onClick={()=>this.props.add({label})} style={{cursor:'pointer'}}>
                        <FontAwesomeIcon icon={faArrowUp}  />
                    </div>
                    <div id={`${idlabel}-length`}>    
                        {val}
                    </div >
                    <div id={`${idlabel}-decrement`} onClick={()=>this.props.substract({label})} style={{cursor:'pointer'}}>    
                        <FontAwesomeIcon icon={faArrowDown} />
                    </div>    
                </div>
            </div>
        );
    }
}

export default BSlabel;