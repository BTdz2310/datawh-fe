import React, {useEffect, useState} from 'react';
import {IPost, IPostRes} from "@/pages/Profile";
import {ITag} from "@/components/TagsList";
import '@/assets/styles/Profile.css'
import TagChose from "@/components/TagChose";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/components/DataProvider";
import axiosConfig from "@/axiosConfig";

const Post = ({post, index, setData, data}: {post: IPost, index: number, setData: Function, data: IPostRes}) => {

    const [change, setChange] = useState(true);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState<Array<ITag>>([])
    const [check, setCheck] = useState(false);

    const navigate = useNavigate();
    const {logout} = useAuth();

    useEffect(() => {
        setTags(post.tags)
        setTitle(post.title)
        setDescription(post.description)
    }, []);

    useEffect(() => {
        if(title!==post.title||description!==post.description||!checkEqualArr(tags.map((tag: ITag)=>tag._id), post.tags.map((tag: ITag)=>tag._id))) setCheck(true)
        else setCheck(false)
    }, [title, description, tags]);

    const checkEqualArr = (a: Array<String>, b: Array<String>) => {
        return a.every(_id => b.includes(_id)) && b.every(_id => a.includes(_id))
    }

    const revert = () => {
        setTags(post.tags)
        setTitle(post.title)
        setDescription(post.description)
    }

    const handleChange = async () => {

        if(!title){
            alert('Bạn Chưa Nhập Title')
            return
        }

        if(!description){
            alert('Bạn Chưa Nhập Description')
            return
        }

        try{

            const response = await axiosConfig.put(`${process.env.REACT_APP_URL_BE||""}/posts/${post._id}`, JSON.stringify({
                title: title,
                description: description,
                tags: tags.map((tag: ITag)=>tag._id)
            }),{withCredentials: true})

            console.log(response)

            const dataAfter = data.posts.slice();

            for(let i=0; i<dataAfter.length; i++){
                if(dataAfter[i]._id===response.data.data._id){
                    dataAfter[i].title = response.data.data.title;
                    dataAfter[i].description = response.data.data.description;
                    dataAfter[i].tags = response.data.data.tags;
                    break;
                }
            }

            setData({
                ...data,
                posts: dataAfter
            })

            setChange(true)
            setCheck(false)


        }catch(error){
            logout();
            navigate('/signin')
        }
    }

    const handleDelete = async () => {
        try{

            const response = await axiosConfig.delete(`${process.env.REACT_APP_URL_BE||""}/posts/${post._id}`, {withCredentials: true})

            const dataAfter = data.posts.slice().filter((post1: IPost)=>post1._id!==post._id);

            const totalNow = data.total - 1;
            const totalPageNow = Math.ceil(totalNow/data.page_size);

            setData({
                ...data,
                posts: dataAfter,
                total: totalNow,
                total_page: totalPageNow
            })

        }catch(error){
            logout();
            navigate('/signin')
        }
    }

    return (
        <div className="posts__item">
            <div className="posts__item--first">{index}</div>
            <div className="posts__item--second">
                <input type="text" readOnly={change} value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="posts__item--third">
                <input type="text" readOnly={change} value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className="posts__item--fourth">
                <p>{tags.map((tag: ITag)=>tag.name).join(', ')}</p>
                {!change&&<TagChose setTagsSelected={setTags} tagsSelected={tags} type={1} />}
            </div>
            <div className="posts__item--fifth">
                {check?<i className="fa-solid fa-check" onClick={handleChange}></i>:<i className="fa-solid fa-pen" onClick={() => setChange(prev => !prev)}></i>}
                <i className="fa-solid fa-trash" onClick={handleDelete}></i>
                {check&&<i className="fa-solid fa-rotate-right" onClick={revert}></i>}
            </div>
        </div>
    );
};

export default Post;