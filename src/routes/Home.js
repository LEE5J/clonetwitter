
import { useState, useEffect } from "react";
import { dbservice } from "fbase";


const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async() => {
        const dbNweets = await dbservice.collection("nweets").get();
        dbNweets.forEach((document) =>{
            const nweetObject = { ...document.data(), id: document.id};
            setNweets((prev) => [nweetObject, ...prev])
        }
        );
    };


    useEffect(() => {
        getNweets();
    },[]);


    console.log(nweets);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbservice.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
        });
        setNweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNweet(value);
    };
    return (
        <>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="place holder at home.js onsubmit" maxLength={120} />
            <input type="submit" value="Nweet" />
        </form>
        <div>
            {nweets.map((nweet) => (
                <div key={nweet.id}>
                    <h4>{nweet.text}</h4>
                        </div>
            ))}
        </div>
        </>
    );
};

export default Home;