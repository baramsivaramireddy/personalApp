


const BreathingExercisePage = () => {


    let message = "slowing breath in"
    let countDown = 4

    return (<>


        <div className="flex justify-center items-center min-h-screen">

            <div>
                <p> {message}</p>

                <p> {countDown}</p>
                <button className="border-2  font-bold uppercase bg-green-500 text-white py-2 rounded-full hover:scale-105 hover:bg-green-700 shadow-md  px-4 ">
                    start
                </button>
            </div>
        </div>
    </>)
}

export default BreathingExercisePage;