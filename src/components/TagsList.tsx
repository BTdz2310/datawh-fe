import React, {CSSProperties} from 'react';
import {useTags} from "@/components/DataProvider";
import '@/assets/styles/TagsList.css'

export interface ITag {
    _id: string,
    name: string
}

const TagsList = ({style, tagsSelected, setTagsSelected}: {style?: CSSProperties, tagsSelected: Array<ITag>, setTagsSelected: Function}) => {

    const {tags} = useTags();

    const handleChange = (_id: string, name: string) => {
        const idList = tagsSelected.map((tag: ITag)=>tag._id);

        console.log(idList, idList.includes(_id))

        if(idList.includes(_id)){
            setTagsSelected(tagsSelected.filter((tag: ITag)=>tag._id!==_id));
        }else{
            setTagsSelected([
                ...tagsSelected,
                {
                    name: name,
                    _id: _id
                }
            ])
        }
    }

    return (
        <div className='tag__list' style={style} onClick={(e)=>e.stopPropagation()}>
            {tags.map((tag: ITag)=>(
                <label key={tag._id} className='tag__label'>
                    <p>{tag.name}</p>
                    <input type="checkbox" checked={tagsSelected.map((tag: ITag)=>tag.name).includes(tag.name)} className='tag__item' onChange={()=>handleChange(tag._id, tag.name)}/>
                </label>
            ))}
        </div>
    );
};

export default TagsList;