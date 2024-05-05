
import React, { use, useEffect, useState } from 'react'
import ConversationItem from './ConversationItem';
import { useAuth } from '@/app/authContext';
import axios from 'axios';
const Conversation = () => {
    const {user,loading,setChatId,chatId}=useAuth();
    console.log(user)
    const [chats,setChats]=useState([])
    const getUserChats=async()=>{
        const res=await axios.get("http://localhost:3000/api/chat/user/"+user.id)
        console.log(res)
        if(res.status===200){
            
            setChats((prev)=>{
                return res.data.data
            })
        }
    }
    useEffect(()=>{
        if(user && !loading){
            getUserChats()
        }
    },[user,loading])
    const data = [
        {name:'Rey Jhon',time:'just now', message: 'Hey there! Are you finish creating the chat app?', active: true},
        {name:'Cherry Ann',time:'12:00', message: 'Hello? Are you available tonight?'},
        {name:'Lalaine',time:'yesterday', message: 'I\'m thingking of resigning'},
        {name:'Princess',time:'1 day ago', message: 'I found a job :)'},
        {name:'Charm',time:'1 day ago', message: 'Can you me some chocolates?'},
        {name:'Garen',time:'1 day ago', message: 'I\'m the bravest of all kind'},
        {name:'Rey Jhon',time:'just now', message: 'Hey there! Are you finish creating the chat app?', active: true},
        {name:'Cherry Ann',time:'12:00', message: 'Hello? Are you available tonight?'},
        {name:'Lalaine',time:'yesterday', message: 'I\'m thingking of resigning'},
        {name:'Princess',time:'1 day ago', message: 'I found a job :)'},
        {name:'Charm',time:'1 day ago', message: 'Can you me some chocolates?'},
        {name:'Garen',time:'1 day ago', message: 'I\'m the bravest of all kind'},
        {name:'Rey Jhon',time:'just now', message: 'Hey there! Are you finish creating the chat app?', active: true},
        {name:'Cherry Ann',time:'12:00', message: 'Hello? Are you available tonight?'},
        {name:'Lalaine',time:'yesterday', message: 'I\'m thingking of resigning'},
        {name:'Princess',time:'1 day ago', message: 'I found a job :)'},
        {name:'Charm',time:'1 day ago', message: 'Can you me some chocolates?'},
        {name:'Garen',time:'1 day ago', message: 'I\'m the bravest of all kind'},
    ]
    
    return (
        <div className="p-1">
            {
                chats.map((item, index) => (
                    <ConversationItem 
                        key={index}
                        message={"Hey"}
                        time={item.createdAt.split('T')[0]} 
                        name={item.name} 
                        venom={item.id}
                        active={chatId===item.id}
                        setter={setChatId}
                        uone={item.userOne}
                        utwo={item.userTwo}
                    />
                ))
            }
        </div>
    )
}

export default Conversation
