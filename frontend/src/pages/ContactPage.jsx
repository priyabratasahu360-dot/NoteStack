import { Navbar } from "../components/Navbar"
export const ContactPage = () => {
    const handleSubmit = (e) => {
         e.preventDefault();
    }
    return(
        <>
        <Navbar />
        <div className="flex justify-center items-center w-full mt-30">
            <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col flex-1 m-5 border rounded-lg p-4 gap-5">
                <div>
                <h1 className="font-bold text-3xl">Contact</h1>
                <p className="opacity-50 text-sm">Fill the form and send us a message</p>
                </div>
                <label className="flex gap-5">
                    <input type="text" placeholder="Firstname" className="input"/>
                    <input type="text" placeholder="Lastname" className="input"/>
                </label>
                <label>
                    <input type="email" className="w-full input" placeholder="Email"/>
                </label>
                <label>
                    <textarea placeholder="Message" className="input h-30 w-full"></textarea>
                </label>

                <button className="btn bg-primary text-white opacity-80" type="submit">Contact</button>
            </form>
        </div>
        </>
    )
}