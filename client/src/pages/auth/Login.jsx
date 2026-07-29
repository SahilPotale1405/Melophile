function Login(){
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-x1 shadow-lg w-96">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                <input
                    type= "email"
                    placeholder ="Email"
                    className ="w-full p-3 mb-4 rounded-lg bg-grey-800 border-gery-700 outline-none" 
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 rounded-lg bg-grey-800 border-gery-700 outline-none"
                />
                <button className= "w-full bg-purple-600 hover:bg-purple-700 p- rounded-lg font-semibold">
                    Login
                </button>
            </div>
        </div>
    );
}
export default Login;