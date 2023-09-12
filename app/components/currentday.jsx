import Image from 'next/image'


export default function CurrentDay({ currentDay, taskscards, typein, setCurrentCard, handleChangeDate, drop, deleteDay, handleKeyPress, onAddTask }) {
    return (
        <>
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
                    // value={typein[currentDay.id]}
                    // onChange={()=>{}}
                    // onChange={(e)=>{handleChangeTask(currentDay.id, e)}}
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
        </>
    )
}