

export default function DateInput({ screenCondition, data, days, drop, handleChangeDate }) {
    return (
        <>
            {screenCondition
                ?
                <div className='flex w-full'>
                    <p className='w-2/3 pt-2.5 text-center'
                    id={data.id}
                    onDrop={(e)=>drop(e)}
                    onDragOver={(e)=>{e.preventDefault()}}
                    >
                        {days[days.findIndex((obj) => obj.id == data.id)].date.substring(5)}
                    </p>
                    <p className=' w-1/3 pt-2.5 text-center'>[{data.tasks.length}]</p>
                </div>
                :
                <input type="date" className='mt-2 ml-2 rounded-md border-2 border-cyan-300'
                value={days[days.findIndex((obj) => obj.id == data.id)].date} onChange={(e)=>{handleChangeDate(data.id, e)}}/>
            }
        </>
    )
}