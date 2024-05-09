import Desserts from "../components/Desserts";
import Popular from "../components/Popular";
import Vegetarian from "../components/Vegetarian";
import Drinks from "../components/Drinks";
import '../styles/Home.css';
import Category from "../components/Category";
import Search from "../components/Search";
import { motion } from 'framer-motion';

function Home() {
    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
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
        </motion.div>

    );
}

export default Home;
