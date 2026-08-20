import { useEffect,useState } from "react";

function Sessions(){
    const [ sessions, setSessions] = useState([]);
    const [loading,setLoading] =useState(true);

    useEffect (()=>{
        fetch("http://localhost:5000/api/sessions")
        .then((res) => res.json())
        .then((data)=> {
            setSessions(data);
            setLoading(false);
        })
        .catch((error)=>{
            consloe.error("Failed to fetch sessions:",error);
            setLoading(false);
        });

    },[]);

    if (loading){
        return <p>Loading sessions...</p>;
    }
    return(
        <>
        <h1 className = "text-3xl font-bold mb6">
            Sessions
        </h1>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className = "w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                            Student
                        </th>
                        
                        <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                            Date
                        </th>

                        <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                            Type
                        </th>

                        <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold uppercase">
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {sessions.map((session)=>(

                        <tr
                            key={session._id}
                            className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition"
                        >

                            <td className="px-6 py-4 border-b">
                                {session.student?.name || "Unknown"}
                            </td>

                            <td className="px-6 py-4 border-b">
                                {new Date(
                                    session.date
                                ).toLocaleDateString("en-IN")}
                            </td>

                            <td className="px-6 py-4 border-b">
                                {session.type}
                            </td>

                            <td className="px-6 py-4 border-b">
                                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                                    {session.status}
                                </span>
                                
                                
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default Sessions;