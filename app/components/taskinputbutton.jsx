

export default function TaskInputButton({ data, onAddTask }) {
    return (
        <>
            <div>
                <button className='p-1 mt-3 ml-6 bg-cyan-600 rounded-lg border-cyan-400 border-2'
                onClick={onAddTask.bind(null, data.id)}
                key={data.id}
                
                >Add new task +</button>
            </div>
        </>
    )
}