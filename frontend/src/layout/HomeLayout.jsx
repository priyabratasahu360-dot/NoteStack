import { HomePage } from "../pages/HomePage";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
export const HomeLayout = () => {
    return(
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <HomePage />
            <Footer />
        </div>
    )
}