import DateInput from './dateinput'
import DeleteButton from './deletebutton'
import TaskList from './tasklist'
import TaskInput from './taskinput'
import TaskInputButton from './taskinputbutton'

export default function DayList({ data, screenCondition, days, drop, handleChangeDate, deleteDay, taskscards, handleKeyPress, onAddTask, setCurrentCard}) {
    return(
    
        <div 
        id={data.id}
        key={data.id} 
        onClick={()=>{setCurrentCard(data.id)}}
        className={screenCondition ? 'phone-one-card' : 'm-6 w-72 h-96 bg-cyan-600 border-cyan-400 border-2 bg-opacity-50 rounded-lg relative'}
        >
            
            <DateInput screenCondition={screenCondition} data={data} days={days} drop={drop} handleChangeDate={handleChangeDate}/>

            <DeleteButton screenCondition={screenCondition} data={data} drop={drop} deleteDay={deleteDay}/>
            
            {screenCondition 
            ? <></>
            : <>
            <TaskList data={data} taskscards={taskscards} drop={drop}/>

            <TaskInput data={data} handleKeyPress={handleKeyPress}/>

            <TaskInputButton data={data} onAddTask={onAddTask} />
            </>
            }
            
        </div> 
        
    )
}