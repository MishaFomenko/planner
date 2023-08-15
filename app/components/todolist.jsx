'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import DateInput from './dateinput'
import DeleteButton from './deletebutton'
import TaskList from './tasklist'
import TaskInput from './taskinput'
import TaskInputButton from './taskinputbutton'
import DayList from './daylist'
import TaskDumpster from './taskdumpster'


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
        if (days.length > 1) {
            let updatedtasks = [...days]
            let cleareddays = updatedtasks.filter((day)=>day.id !== delid)
            updatedtasks=cleareddays;

            localDays = JSON.stringify(updatedtasks);
            localStorage.setItem('localDays', localDays);

            setDays(updatedtasks)
        }
    
  }

    const drag = (day, task, event) => {
    setDragged([day, task])
}

    const drop = (event) => {
    // console.log(event.target)
    if (event.target.nodeName==='DIV' && event.target.id!=='bucket1' && event.target.id!=='bucket1') {
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

    const tasks = (someday, condition) => {
    let tasklist = <></>;
    if (condition) {
        tasklist = someday.tasks.map((task, ind) => {
        return <li 
        className='px-2 py-1 mb-2 rounded-2xl bg-green-400'
        key={task.id}
        id={task.id}
        draggable={true}
        onDragStart={(e)=>{drag(someday, task, e)}}> 
        {1+ind + '. ' + task.text} 
        </li>
        })
    } else {tasklist=<li></li>}
    return tasklist;

  }

    let small2large = windowWidth <= 680;

    let dayscards = days.map((data) => {

        let taskscards=tasks(data, data.tasks?.length > 0)

        return (
             <DayList key={data.id} data={data} screenCondition={small2large} typein={typein} days={days} drop={drop} handleChangeDate={handleChangeDate} deleteDay={deleteDay} taskscards={taskscards} handleChangeTask={handleChangeTask} handleKeyPress={handleKeyPress} onAddTask={onAddTask} setCurrentCard={setCurrentCard}/>
        )
        
    })

    let taskscards=tasks(currentDay, small2large && currentDay!==undefined && currentDay.tasks?.length > 0)

    return (
        <>
        <div onDrop={()=>setDragged(null)}
        onDragOver={(e)=>{e.preventDefault()}}
        className='bg-grad min-h-screen'
        >

            <TaskDumpster dragged={dragged} drop={drop}/>
            
            <div className={small2large ? 'grid grid-columns-2' : 'flex flex-wrap'}>
                <div className={small2large ? 'z-10 flex flex-col items-center' : 'flex flex-wrap justify-center z-10'}
                >
                    {dayscards}
                    
                    
                    <button className={small2large ? 'phone-addDay' : 
                    'phone-add-days item-center mt-24 ml-6 w-52 h-52 border-cyan-200 border-8 border-dashed rounded-lg hover:bg-green-300 duration-500'}
                    onClick={onAddDay}>Add new day +</button>

                </div>
                {(small2large && currentDay!==undefined)
                ? 
                <div 
                id={currentDay.id}
                key={currentDay.id} 
                onDrop={()=>{}}
                onClick={()=>{setCurrentCard(currentDay.id)}}

                className='col-start-2 phone-current-card bg-cyan-600 border-2 border-cyan-200'
                >
                {/* DATE INPUT */}
                
                <input type="date" className='mt-2 ml-2 border-2 rounded-md border-cyan-400'
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
                    <input className='ml-6 border-2 border-cyan-400 rounded-md' type="text"
                    key={currentDay.id}
                    value={typein[currentDay.id]}
                    onChange={(e)=>{handleChangeTask(currentDay.id, e)}}
                    onKeyDown={(e)=>{handleKeyPress(currentDay.id, e)}}/>
                </div>

                {/* TASK INPUT BUTTON */}
                <div>
                    <button className='p-1 mt-3 ml-6 bg-cyan-600 rounded-lg border-2 border-cyan-400'
                    onClick={onAddTask.bind(null, currentDay.id)}
                    key={currentDay.id}
                    
                    >Add new task +</button>
                </div>
                
                
                </div>  
                : <>{small2large && currentDay===undefined 
                ? 
                <div className='col-start-2 phone-empty-card border-8 rounded-lg border-dashed border-cyan-200'>
                    <p className='text-center p-10 text-3xl text-cyan-400'>Choose a daycard to view</p>
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