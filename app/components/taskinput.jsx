

export default function TaskInput({ data, typein, handleChangeTask, handleKeyPress }) {
    return (
        <>
            <div>
                <input className='ml-6 border-2 rounded-md border-cyan-400' type="text"
                key={data.id}
                value={typein[data.id]}
                onChange={(e)=>{handleChangeTask(data.id, e)}}
                onKeyDown={(e)=>{handleKeyPress(data.id, e)}}/>
            </div>
        </>
    )
}