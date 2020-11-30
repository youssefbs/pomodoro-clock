import React from 'react';
import BSlabel from './BSlabel'
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync,faPlay,faPause} from '@fortawesome/free-solid-svg-icons'

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      BreakValeurInitial:5,
      SessionValeurInitial:25,
      MinBreak:5,
      MinSession:25,
      SecBreak:0,
      SecSession:0,
      moment:'Session',
      button:faPlay,
      funct:undefined
    }  
    this.audio=React.createRef();
  }





//ADD Function   

  add=(param)=>{ 
    console.log(this.state.MinBreak);
    if(param.label==='Session' && this.state.SessionValeurInitial<60){
      this.setState((prevState)=>{
        return{
          MinSession:prevState.MinSession+1,
          SessionValeurInitial:prevState.SessionValeurInitial+1
        }
      })
    }else if(param.label==='Break' && this.state.BreakValeurInitial<60){
      this.setState((prevState)=>{
        return{
          MinBreak:prevState.MinBreak+1,
          BreakValeurInitial:prevState.BreakValeurInitial+1
        }
      })
    }
  }



//Substract Function   

  substract=(param)=>{
    if(param.label==='Session' && this.state.SessionValeurInitial>1){
      this.setState((prevState)=>{
        return{
          MinSession:prevState.MinSession-1,
          SessionValeurInitial:prevState.SessionValeurInitial-1
        }
      })
    }else if(param.label==='Break' && this.state.BreakValeurInitial>1){
      this.setState((prevState)=>{
        return{
          MinBreak:prevState.MinBreak-1,
          BreakValeurInitial:prevState.BreakValeurInitial-1
        }
      })
    }
  }


//Reset  
  reset=()=>{
    this.audio.current.pause();
    this.audio.current.currentTime=0;
    this.setState({
      BreakValeurInitial:5,
      SessionValeurInitial:25,
      MinBreak:5,
      MinSession:25,
      SecBreak:0,
      SecSession:0,
      moment:'Session',
      button:faPlay
    })
    clearInterval(this.state.funct);
  }

  
//Function execute in SETINTERVAL

  Prog=()=>{
    const {MinBreak,MinSession,SecBreak,SecSession,moment}=this.state;
    if(moment==='Session' && MinSession>0){
        if(SecSession===0){
          this.setState((prevState)=>{
            return{
              MinSession:prevState.MinSession-1,
              SecSession:59
            }
          })
        }else{
          this.setState((prevState)=>{
            return{
              SecSession:prevState.SecSession-1
            }
          })
        }
    }else if(moment==='Session' && MinSession===0 && SecSession>0){
      this.setState((prevState)=>{
        return{
          SecSession:prevState.SecSession-1
        }
      })
    }
    else if(moment==='Session' && MinSession===0 && SecSession===0){
      this.audio.current.play();
      console.log(this.state.SessionValeurInitial);
      this.setState((state)=>{
        return{
          MinSession:state.SessionValeurInitial,
          moment:'Break'
        } 
      })
    }else if(moment==='Break' && MinBreak>0){
      if(SecBreak===0){
        this.setState((prevState)=>{
          return{
            MinBreak:prevState.MinBreak-1,
            SecBreak:59
          }
        })
      }else{
        this.setState((prevState)=>{
          return{
            SecBreak:prevState.SecBreak-1
          }
        })
      }
    }else if(moment==='Break' && MinBreak===0 && SecBreak>0){
      this.setState((prevState)=>{
        return{
          SecBreak:prevState.SecBreak-1
        }
      })
    }
    else if(moment==='Break' && MinBreak===0 && SecBreak===0){
      this.audio.current.play();
      this.setState((state)=>{
        return{
          MinBreak:state.BreakValeurInitial,
          moment:'Session'
        } 
      })
    }
  }



//PLAY/PAUSE

  Int=(btn)=>{
    if(btn.iconName==='play'){
      this.setState({
        button:faPause
      })
      this.setState({
        funct:setInterval(this.Prog,1000)
      })
      
    }
    else{
      this.setState({
        button:faPlay
      })
      clearInterval(this.state.funct);
    } 
  }




  render(){

    const {MinBreak,MinSession,SecBreak,SecSession,moment}=this.state;
    let time='';
    let M='';
    let S=''
    if(moment==='Session'){
      if(MinSession/10>=1){
        M=`${MinSession}`
      }else{
        M=`0${MinSession}`
      }

      if(SecSession/10>=1){
        S=`${SecSession}`
      }else{
        S=`0${SecSession}`
      }
    }else{
      if(MinBreak/10>=1){
        M=`${MinBreak}`
      }else{
        M=`0${MinBreak}`
      }

      if(SecBreak/10>=1){
        S=`${SecBreak}`
      }else{
        S=`0${SecBreak}`
      }
    }
    time=`${M}:${S}`
    return(
     <div className='App'>
       <h1>Pomodoro Clock</h1>
       <div className='BSlabel'>
          <BSlabel label='Session' idlabel='session' val={this.state.SessionValeurInitial} add={this.add} substract={this.substract}/>
          <BSlabel label='Break'  idlabel='break' val={this.state.BreakValeurInitial} add={this.add} substract={this.substract}/>
       </div>
       <div className='timer'>
         <div id='time'>
        <h2 id='timer-label'>{this.state.moment}</h2>
        <div id='time-left'>
          {time}
        </div>
        </div>
        <FontAwesomeIcon icon={this.state.button}  onClick={()=>this.Int(this.state.button)}/>
        <FontAwesomeIcon icon={faSync} onClick={this.reset} />
       </div>
       <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' id='beep' ref={this.audio}/>
     </div> 
    )
  }
}

export default App;
