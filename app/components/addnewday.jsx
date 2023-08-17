
export default function AddNewDay({ screenCondition, onAddDay }) {
    return (
        <>
            <button className={screenCondition ? 'phone-addDay' : 
                'phone-add-days item-center mt-24 ml-6 w-52 h-52 border-cyan-200 border-8 border-dashed rounded-lg hover:bg-green-300 duration-500'}
                onClick={onAddDay}>Add new day +
            </button>
        </>
    )
}