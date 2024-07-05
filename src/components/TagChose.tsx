import React, {useEffect, useState} from 'react';
import TagsList, {ITag} from "@/components/TagsList";
import '@/assets/styles/Profile.css'

const TagChose = ({setTagsSelected, tagsSelected, type}: {setTagsSelected: Function, tagsSelected: Array<ITag>, type: 0|1}) => {

    const [showTagSearch, setShowTagSearch] = useState(false);

    useEffect(() => {
        window.addEventListener('click', () => {
            setShowTagSearch(false)
        });

        return () => {
            window.removeEventListener('click', () => {
                setShowTagSearch(false)
            });
        }
    }, []);

    return (
        <>
            {type===0?(
                <div className='tags-chose__button' onClick={(e)=>{
                    e.stopPropagation();
                    setShowTagSearch(prev=>!prev)
                }}>
                    <p>Tags</p>
                    <i className="fa-solid fa-arrow-down"></i>
                    <TagsList setTagsSelected={setTagsSelected} style={{visibility: showTagSearch?'visible':'hidden', position: 'absolute', backgroundColor: 'beige', width: '160px', padding: '10px', top: '48px', left: '0'}} tagsSelected={tagsSelected}/>
                </div>
            ):(
                <div className='tags-chose__setting' onClick={(e)=>{
                    e.stopPropagation();
                    setShowTagSearch(prev=>!prev)
                }}>
                    <i className="fa-solid fa-gear"></i>
                    <TagsList setTagsSelected={setTagsSelected} style={{visibility: showTagSearch?'visible':'hidden', position: 'absolute', backgroundColor: 'beige', width: '160px', padding: '10px', top: '32px', left: '0'}} tagsSelected={tagsSelected}/>
                </div>
            )}
        </>
    );
};

export default TagChose;