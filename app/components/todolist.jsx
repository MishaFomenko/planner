'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'


let idun;
let localDays;
let localId;


const originalDate = new Date();
const year = originalDate.getFullYear();
const month = String(originalDate.getMonth() + 1).padStart(2, "0");
const day = String(originalDate.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;
let localDate=formattedDate;


idun=9999999;
localDays=[{id:idun, tasks:[], date:localDate}];


export default function ToDoList() {


    const [windowWidth, setWindowWidth] = useState(1440);

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(()=>{
        
    let localIdStr = localStorage.getItem('localId');
    localId = JSON.parse(localIdStr);
    if (localId===null) {
        idun=9999999;
    } else {
        idun=localId;
    }
    
    let localDaysStr = localStorage.getItem('localDays');
    localDays = JSON.parse(localDaysStr);
    if (localDays===null || localDays?.length===0) {
        localDays=[{id:idun, tasks:[], date:localDate}];
    } 
    setDays(localDays)
}, [])


    const [days, setDays] = useState(localDays);
    const [typein, setTypein] = useState(new Array(9999).fill(''));
    const [dragged, setDragged] = useState(null);
    const [currentCard, setCurrentCard] = useState(days[0].id)
    
    let currentDayIndex = days.findIndex((el)=>el.id===currentCard)
    let currentDay = days[currentDayIndex]

    


    const onAddDay = () => {
        idun++
    let newDays = [...days]
    newDays.push({
        id: idun,
        tasks: [],
        date: localDate
    })
    localDays = JSON.stringify(newDays);
    localStorage.setItem('localDays', localDays);
    localId = JSON.stringify(idun);
    localStorage.setItem('localId', localId);
    
    setDays(newDays)
    

}

    const onAddTask = (dayid) => {
    if (typein[dayid]!=='') {
        let updatedtasks = [...days]
        const foundday = updatedtasks.findIndex((obj) => obj.id === dayid);
        updatedtasks[foundday].tasks.push({
            id: idun,
            text: typein[dayid]
        })
        
        typein[dayid]='';
        idun++

        localDays = JSON.stringify(updatedtasks);
        localStorage.setItem('localDays', localDays);
        localId = JSON.stringify(idun);
        localStorage.setItem('localId', localId);

        setDays(updatedtasks)
    }
}

    const deleteDay = (delid) => {
    let updatedtasks = [...days]
    let cleareddays = updatedtasks.filter((day)=>day.id !== delid)
    updatedtasks=cleareddays;

    localDays = JSON.stringify(updatedtasks);
    localStorage.setItem('localDays', localDays);

    setDays(updatedtasks)
  }

    const drag = (day, task, event) => {
    setDragged([day, task])
}

    const drop = (event) => {
    // console.log(event.target)
    if (event.target.nodeName==='DIV' || event.target.nodeName==='P') {
        let delid = dragged[0].id;
        let updatedtasks = [...days]

        const foundday = updatedtasks.findIndex((obj) => obj.id == delid);

        let clearedtasks = updatedtasks[foundday].tasks.filter((task)=>task.id !== dragged[1].id)
        updatedtasks[foundday].tasks=clearedtasks;
        let dropid = parseInt(event.target.id);
        const foundday2 = updatedtasks.findIndex((obj) => obj.id === dropid);
        updatedtasks[foundday2].tasks.push(dragged[1])
        localDays = JSON.stringify(updatedtasks);
        localStorage.setItem('localDays', localDays);
        setDays(updatedtasks)
        setDragged(null)
    } else if (event.target.id==='bucket1' || event.target.id==='bucket2') {
        let delid = dragged[0].id;
        let updatedtasks = [...days]

        const foundday = updatedtasks.findIndex((obj) => obj.id == delid);

        let clearedtasks = updatedtasks[foundday].tasks.filter((task)=>task.id !== dragged[1].id)
        updatedtasks[foundday].tasks=clearedtasks;
        localDays = JSON.stringify(updatedtasks);
        localStorage.setItem('localDays', localDays);
        setDays(updatedtasks)
        setDragged(null)
    }
    else {setDragged(null)}

    
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
    localDays = JSON.stringify(updatedDays);
    localStorage.setItem('localDays', localDays);
    setDays(updatedDays)
    // console.log(days)
};

    const handleKeyPress = (id, event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      onAddTask(id);
    }
  };

    let small2large = windowWidth <= 640;

    let dayscards = days.map((data) => {

        // TASKS FOR THE CARDS
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
            // onDrop={(e)=>drop(e)}
            // onDragOver={(e)=>{e.preventDefault()}}
            onClick={()=>{setCurrentCard(data.id)}}
            // className='m-6 w-72 h-96 bg-green-200 rounded-lg relative'
            className={small2large ? 'phone-one-card' : 'm-6 w-72 h-96 bg-green-200 rounded-lg relative'}
            >
                {/* DATE INPUT */}
                {small2large 
                ?
                <div className='flex w-full'>
                    <p className='w-3/4 p-2.5 border-2 border-green-300 text-center'
                    id={data.id}
                    onDrop={(e)=>drop(e)}
                    onDragOver={(e)=>{e.preventDefault()}}
                    >
                        {days[days.findIndex((obj) => obj.id == data.id)].date}
                    </p>
                    <p className=' w-1/4 p-2.5 text-center '>({data.tasks.length})</p>
                </div>
                :
                <input type="date" className='mt-2 ml-2 border-2 border-green-300 '
                value={days[days.findIndex((obj) => obj.id == data.id)].date} onChange={(e)=>{handleChangeDate(data.id, e)}}/>
                }

                {small2large
                ? <></>
                :
                <button className='bg-red-300 absolute right-0 p-1 m-3 rounded-lg'>
                    <Image 
                    onDrop={(e)=>drop(e)}
                    onDragOver={(e)=>{e.preventDefault()}}
                    src='/images/delete.png' width={20} height={20} alt=''
                    onClick={()=>deleteDay(data.id)}>
                    </Image>
                </button>
                }   
                
                {small2large 
                ? <></>
                : <>
                {/* TASK LIST ELEMENT */}
                <div 
                className=' h-4/6'
                id={data.id}
                onDrop={(e)=>drop(e)}
                onDragOver={(e)=>{e.preventDefault()}}
                >
                    <ul 
                    className='p-3' 
                    id={data.id}
                    onDrop={()=>{}}
                    >
                        {taskscards}
                    </ul>
                </div>

                {/* INPUT FIELD FOR TASKS */}
                <div>
                    <input className='ml-6 border-2 border-green-300' type="text"
                    key={data.id}
                    value={typein[data.id]}
                    onChange={(e)=>{handleChangeTask(data.id, e)}}
                    onKeyDown={(e)=>{handleKeyPress(data.id, e)}}/>
                </div>

                {/* TASK INPUT BUTTON */}
                <div>
                    <button className='p-1 mt-3 ml-6 bg-gray-300 rounded-lg'
                    onClick={onAddTask.bind(null, data.id)}
                    key={data.id}
                    
                    >Add new task +</button>
                </div></>
                }
                
            </div>  
        )
        
    })

    // TASKS FOR THE CARDS
    let taskscards=[];
    if (small2large && currentDay!==undefined && currentDay.tasks?.length > 0) {
        taskscards = currentDay.tasks.map((task, ind) => {
        return <li 
        className='px-2 py-1 mb-2 rounded-2xl bg-green-400'
        key={task.id}
        id={task.id}
        draggable={true}
        onDragStart={(e)=>{drag(currentDay, task, e)}}> 
        {1+ind + '. ' + task.text} 
        </li>
        })
    } else {taskscards=<li></li>}

    return (
        <>
        <div onDrop={()=>setDragged(null)}
        onDragOver={(e)=>{e.preventDefault()}}
        >

            {/* TASKS DUMPSTER */}
            <div className='w-screen flex justify-center'>
                
                <div className='w-48 mt-3 p-3 rounded-lg border-grey-200 border-4 border-dashed duration-500 ' style={{borderColor: dragged!==null ? 'red' : ''}}
                id={"bucket1"}
                onDrop={(e)=>drop(e)}
                onDragOver={(e)=>{e.preventDefault()}}
                >
                    <button className='rounded-lg'> 
                            <Image 
                            className='mx-14 duration-500'
                            style={{opacity: dragged!==null ? 1 : 0.3}}
                            id={"bucket2"}
                            onDrop={(e)=>drop(e)}
                            onDragOver={(e)=>{e.preventDefault()}}
                            src='/images/delete.png' width={40} height={40} alt=''></Image> 
                    </button>
                </div>
                
            </div>
            
            <div className={small2large ? 'grid grid-columns-2' : 'flex flex-wrap'}>
                <div className={small2large ? '' : 'flex flex-wrap justify-center'}
                >
                    {dayscards} 
                    
                    <button className={small2large ? 'phone-addDay' : 
                    'phone-add-days item-center mt-24 ml-6 w-52 h-52 border-green-300 border-8 border-dashed rounded-lg hover:bg-green-300 duration-500'}
                    onClick={onAddDay}>Add new day +</button>

                </div>
                {(small2large && currentDay!==undefined)
                ? 
                // <div className='col-start-2 phone-current-card'>
                //         <p className='p-24'>hello world</p>
                // </div>
                
                <div 
                id={currentDay.id}
                key={currentDay.id} 
                onDrop={()=>{}}
                onClick={()=>{setCurrentCard(currentDay.id)}}

                className='col-start-2 phone-current-card'
                >
                {/* DATE INPUT */}
                
                <input type="date" className='mt-2 ml-2 border-2 border-green-300 '
                value={currentDay.date} onChange={(e)=>{handleChangeDate(currentDay.id, e)}}/>
                

                <button className='bg-red-300 absolute right-0 p-1 m-3 rounded-lg'>
                    <Image 
                    onDrop={(e)=>drop(e)}
                    onDragOver={(e)=>{e.preventDefault()}}
                    src='/images/delete.png' width={20} height={20} alt=''
                    onClick={()=>deleteDay(currentDay.id)}>
                    </Image>
                </button>
                
                
                {/* TASK LIST ELEMENT */}
                <div 
                className=' h-4/6'
                id={currentDay.id}
                onDrop={(e)=>drop(e)}
                onDragOver={(e)=>{e.preventDefault()}}
                >
                    <ul 
                    className='p-3' 
                    id={currentDay.id}
                    onDrop={()=>{}}
                    >
                        {taskscards}
                    </ul>
                </div>

                {/* INPUT FIELD FOR TASKS */}
                <div>
                    <input className='ml-6 border-2 border-green-300' type="text"
                    key={currentDay.id}
                    value={typein[currentDay.id]}
                    onChange={(e)=>{handleChangeTask(currentDay.id, e)}}
                    onKeyDown={(e)=>{handleKeyPress(currentDay.id, e)}}/>
                </div>

                {/* TASK INPUT BUTTON */}
                <div>
                    <button className='p-1 mt-3 ml-6 bg-gray-300 rounded-lg'
                    onClick={onAddTask.bind(null, currentDay.id)}
                    key={currentDay.id}
                    
                    >Add new task +</button>
                </div>
                
                
                </div>  
                : <>{small2large && currentDay===undefined 
                ? 
                <div className='col-start-2 phone-empty-card'>
                    <p className='text-center p-10 text-3xl text-green-400'>Choose a daycard to view</p>
                </div>  
                : <><div className='h-10'></div></>
                }
                </>
                }
                
                
            </div>
            
            </div>
        </>
    )
}