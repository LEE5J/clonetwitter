
import { useState, useEffect, useRef } from "react";
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";
import {v4 as uuidv4} from "uuid";


const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment ] = useState("");
    const fileInput = useRef();
    useEffect(() => {
       dbService.collection("nweets").onSnapshot((snapshot) => {
           const newArray = snapshot.docs.map((document) => ({
               id: document.id,
               ...document.data(),
           }));
           setNweets(newArray);
       })
    },[]);
    
    console.log(nweets);



    

    const onSubmit = async (event) => {
        event.preventDefault();
        // await dbService.collection("nweets").add({
        //     text: nweet,
        //     createdAt: Date.now(),
        //     creatorId: userObj.uid,
        // });
        // setNweet("");
        const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        console.log(response);
    };


    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value}, 
        }=event;
        setNweet(value);
    };


    const onFileChange = (event) => {
    console.log(event.target.files)
        const {
            target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
        // console.log(finishedEvent);
        const {
            currentTarget: { result } ,
        } = finishedEvent;
        setAttachment(result);
    };
    reader.readAsDataURL(theFile);
    };
    
    const onClearAttachment = () => {
        fileInput.current.value = "";
        setAttachment("");
    };


    return (
        <>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" 
            placeholder="place holder at home.js onsubmit" maxLength={120} />
            <input type="submit" value="Nweet" />
            
            <br/>
            <input ref={fileInput} type="file" accept="image/*" onChange={onFileChange}/>
            <br/>
            {attachment && (
            <div>
                <img src={attachment}  width="200px" height="200px" />
                <button onClick={onClearAttachment}>Clear</button>
            </div>
            )}
        </form>
        <div>
            {nweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
        </>
    );
};

export default Home;