

export default function TaskInput({ data, handleKeyPress }) {
    return (
        <>
            <div>
                <input className='ml-6 border-2 rounded-md border-cyan-400' type="text"
                key={data.id}
                onKeyDown={(e)=>{handleKeyPress(data.id, e)}}/>
            </div>
        </>
    )
}