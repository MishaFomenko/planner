

export default function TaskDumpster({ dragged, drop }) {
    return (
        <>
            <div className='w-screen flex justify-center'>
                
                <div className='w-48 mt-3 p-3 rounded-lg border-cyan-200 border-4 border-dashed duration-500 z-10' style={{borderColor: dragged!==null ? 'red' : ''}}
                id={"bucket1"}
                onDrop={(e)=>drop(e)}
                onDragOver={(e)=>{e.preventDefault()}}
                >
                    <p className='text-cyan-200 text-xl text-center duration-500' 
                    id={"bucket2"}>Tasks dumpster
                    </p>
                </div>
                
            </div>
        </>
    )
}