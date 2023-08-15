

export default function TaskList({ data, taskscards, drop}) {
    return (
        <>
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
        </>
    )
}