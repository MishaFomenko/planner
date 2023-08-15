import Image from 'next/image'

export default function DeleteButton({ screenCondition, data, drop, deleteDay }) {
    return (
        <>
            {screenCondition
                ? 
                <></>
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
        </>
    )
}