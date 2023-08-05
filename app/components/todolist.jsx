'use client'
import { useState} from 'react'
import Image from 'next/image'

// let idcountdays = 0;
// let idcounttasks=0;
let idun;
let localDays;
let localId;


const originalDate = new Date();
const year = originalDate.getFullYear();
const month = String(originalDate.getMonth() + 1).padStart(2, "0");
const day = String(originalDate.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;
let localDate=formattedDate;
// let localDate;

if (typeof window !== undefined) {
    let localIdStr = localStorage.getItem('localId');
    localId = JSON.parse(localIdStr);
    if (localId===null) {
        idun=0;
    }
    idun=localId;
    
    let localDaysStr = localStorage.getItem('localDays');
    localDays = JSON.parse(localDaysStr);
    if (localDays===null || localDays?.length===0) {
        localDays=[{id:idun, tasks:[], date:localDate}];
    } 


} else {
    idun=0;
    localDays=[{id:idun, tasks:[], date:localDate}];
}







export default function ToDoList() {

    
    const [days, setDays] = useState(localDays);
    const [typein, setTypein] = useState(new Array(9999).fill(''));
    // const [date, setDate] = useState(localDate);
    const [dragged, setDragged] = useState(null);
    // const [tasks, setTasks] = useState([]);

    function onAddDay() {
        idun++
        let newDays = [...days]
        newDays.push({
            id: idun,
            tasks: [],
            date: localDate
        })
        // localDays = JSON.stringify(newDays);
        // localStorage.setItem('localDays', localDays);
        // localId = JSON.stringify(idun);
        // localStorage.setItem('localId', localId);
        
        setDays(newDays)
        
    }

    function onAddTask(dayid) {
        if (typein[dayid]!=='') {
            let updatedtasks = [...days]
            const foundday = updatedtasks.findIndex((obj) => obj.id === dayid);
            updatedtasks[foundday].tasks.push({
                id: idun,
                text: typein[dayid]
            })
            
            typein[dayid]='';
            idun++

            // localDays = JSON.stringify(updatedtasks);
            // localStorage.setItem('localDays', localDays);
            // localId = JSON.stringify(idun);
            // localStorage.setItem('localId', localId);

            setDays(updatedtasks)
        }
    }

    const handleChangeTask = (index, event) => {
        let newTypein = [...typein]
        newTypein[index] = event.target.value
        setTypein(newTypein)
    };

    const handleChangeDate = (index, event) => {
        
        let updatedDays = [...days]
        const founddate = updatedDays.findIndex((obj) => obj.id === index);

        updatedDays[founddate].date=event.target.value;


        // let newDate = [...date]
        // newDate[index] = event.target.value
        // localDays = JSON.stringify(updatedDays);
        // localStorage.setItem('localDays', localDays);
        setDays(updatedDays)
        console.log(days)
    };

    function drag(day, task, event) {
        setDragged([day, task])
    }

    function handleKeyPress(id, event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
          onAddTask(id);
        }
      };

    function drop(event) {
        // console.log(event.target.id)
        if (event.target.nodeName==='DIV') {
            let delid = dragged[0].id;
            let updatedtasks = [...days]

            const foundday = updatedtasks.findIndex((obj) => obj.id == delid);

            let clearedtasks = updatedtasks[foundday].tasks.filter((task)=>task.id !== dragged[1].id)
            updatedtasks[foundday].tasks=clearedtasks;
            let dropid = parseInt(event.target.id);
            const foundday2 = updatedtasks.findIndex((obj) => obj.id === dropid);
            updatedtasks[foundday2].tasks.push(dragged[1])
            // localDays = JSON.stringify(updatedtasks);
            // localStorage.setItem('localDays', localDays);
            setDays(updatedtasks)
            setDragged(null)
        } else if (event.target.id==='bucket') {
            let delid = dragged[0].id;
            let updatedtasks = [...days]

            const foundday = updatedtasks.findIndex((obj) => obj.id == delid);

            let clearedtasks = updatedtasks[foundday].tasks.filter((task)=>task.id !== dragged[1].id)
            updatedtasks[foundday].tasks=clearedtasks;
            // localDays = JSON.stringify(updatedtasks);
            // localStorage.setItem('localDays', localDays);
            setDays(updatedtasks)
            setDragged(null)
        }
        else {setDragged(null)}

        
      }

      function deleteDay(delid) {
        let updatedtasks = [...days]
        let cleareddays = updatedtasks.filter((day)=>day.id !== delid)
        updatedtasks=cleareddays;

        // localDays = JSON.stringify(updatedtasks);
        // localStorage.setItem('localDays', localDays);

        setDays(updatedtasks)
      }

    let dayscards = days.map((data) => {
        let taskscards=[];
        if (data.tasks?.length > 0) {
            taskscards = data.tasks.map((task, ind) => {
            return <li 
            className='px-2 py-1 mb-2 rounded-2xl bg-green-400'
            key={task.id}
            id={task.id}
            draggable={true}
            onDragStart={(e)=>{drag(data, task, e)}}> 
            {1+ind + '. ' + task.text} 
            </li>
            })
        } else {taskscards=<li></li>}
        
        return (
            <div 
            id={data.id}
            key={data.id} 
            onDrop={(e)=>{}}
            // onDragOver={(e)=>{e.preventDefault()}}
            className='m-6 w-72 h-96 bg-green-200 rounded-lg relative'
            >
                <input type="date" className='mt-2 ml-4 border-2 border-green-300 '
                value={days[days.findIndex((obj) => obj.id == data.id)].date} onChange={(e)=>{handleChangeDate(data.id, e)}}/>
                <button className='bg-red-300 absolute right-0 p-1 m-3 rounded-lg'><Image 
                    onDrop={(e)=>drop(e)}
                    onDragOver={(e)=>{e.preventDefault()}}
                    src='/images/delete.png' width={20} height={20} alt=''
                    onClick={()=>deleteDay(data.id)}>
                    </Image>
                </button>
                <div 
                className='h-4/6'
                id={data.id}
                onDrop={(e)=>drop(e)}
                onDragOver={(e)=>{e.preventDefault()}}
                >
                    <ul 
                    className='p-3' 
                    id={data.id}
                    onDrop={(e)=>{}}
                    // onDragOver={(e)=>{e.preventDefault()}}
                    >
                        {taskscards}
                    </ul>
                </div>
                <div>
                    <input className='ml-6 border-2 border-green-300' type="text"
                    key={data.id}
                    value={typein[data.id]}
                    onChange={(e)=>{handleChangeTask(data.id, e)}}
                    onKeyDown={(e)=>{handleKeyPress(data.id, e)}}/>
                </div>
                <div>
                    <button className='p-1 mt-3 ml-6 bg-gray-300 rounded-lg'
                    onClick={onAddTask.bind(null, data.id)}
                    key={data.id}
                    
                    >Add new task +</button>
                </div>
                
            </div>  
        )
        
    })


    return (
        <>
            <div className='flex items-center relative'>
                <button className='h-18 p-3 mt-6 ml-6  bg-gray-300 rounded-lg '
                onClick={onAddDay}>Add new day +</button>
                <div className='absolute top-0 right-6 p-3 mt-5 ml-40 bg-gray-300 rounded-lg' style={{backgroundColor: dragged!==null ? 'red' : 'gray'}}
                
                >
                    <button className=' rounded-lg'
                    
                    > 
                    <Image 
                    id={"bucket"}
                    onDrop={(e)=>drop(e)}
                    onDragOver={(e)=>{e.preventDefault()}}
                    src='/images/delete.png' width={40} height={40} alt=''></Image></button>
                </div>
                
            </div>
            
            
            <div className='flex flex-wrap'>
                {dayscards}
            </div>
            
        </>
    )
}