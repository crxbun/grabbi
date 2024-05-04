import Desserts from "../components/Desserts";
import Popular from "../components/Popular";
import Vegetarian from "../components/Vegetarian";
import Drinks from "../components/Drinks";
import '../styles/Home.css';
import Category from "../components/Category";
import Search from "../components/Search";

function Home() {
    return (
        <div className="component">
            <Search />

            <Category />
            <div className="popular">
                <Popular />
            </div>
            <div className="veggie">
                <Vegetarian />
            </div>
            <div className="desserts">
                <Desserts />
            </div>
            <div className="drinks">
                <Drinks />
            </div>
        </div>
    );
}

export default Home;
