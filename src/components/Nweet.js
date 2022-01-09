import { dbService } from "fbase";
import { useState } from "react";

const Nweets = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        console.log(ok);
        if(ok) {
            console.log(nweetObj.id);
            const data = await dbService.doc(`nweets/${nweetObj.id}`).delete();
            console.log(data);
        }
    }
    const onChange = (event) =>{
        const {
            target: { value },
        } = event;
        setNewNweet(value);        
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({text: newNweet });
        setEditing(false);
    };

    const toggleEditing = () => setEditing ((prev) => !prev);
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newNweet} required />
                        <input type="submit" value="update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancle</button>
                </>
            ):(
                <>
                <h4>{nweetObj.text}</h4>
                {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button onClick={toggleEditing}>Edit Nweet</button>
                </>
            )}  
            
                </>
            )}            
        </div>
    );
};
export default Nweets;