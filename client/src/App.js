import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import {Paper,Button, TextField, Container, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MyItem from './component/lists';
const useStyles=makeStyles({
  paper:{
    backgroundColor:'rgb(240, 171, 24)'
  },
  chatSec:{
    backgroundColor:'rgb(240, 201, 114)'
  }
})
const socket=io('localhost:5000');
function App() {

  const [currMsg,setCurrMsg]=useState('');
 const [message,setMessage]=useState('');
 const [msgArr,setMsgArr]=useState([]);
useEffect( ()=>{

  socket.on('newmsg',(msg)=>{
    console.log('message received',msg);
      setMessage(msg);
   });
  
  socket.off();
},[message]);

  const classes=useStyles();
const handleChange=()=>{
  console.log("button Clicked");
}
const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(currMsg);
setMessage(currMsg);
console.log('updated msg',currMsg);
setMsgArr(prevState=>[...prevState,currMsg]);
socket.emit('chat message',currMsg);}


  return (
    <Paper className={classes.paper}>
     <h3>
       Welcome to ChatApp!!
     </h3>
     <Container className={classes.chatSec}>
       <List>
       {
         msgArr.map((val,idx)=>{
           return (<MyItem idx={idx} msg={val}/>)
         })
       }
       </List>
     <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField id="standard-basic" onChange={e=>setCurrMsg(e.target.value)} label="Type to Chat" />
      <Button type="submit" onClick={handleChange}>Submit</Button>
    </form>
    </Container>
    </Paper>
  );
}

export default App;
