import React, {Fragment, useEffect, useState} from 'react';
import logo from '@/assets/images/logo.png'
import '@/assets/styles/Profile.css'
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useAuth, useTags} from "@/components/DataProvider";
import NewPost from "@/components/NewPost";
import TagsList, {ITag} from "@/components/TagsList";
import axiosConfig from "@/axiosConfig";
import TagChose from "@/components/TagChose";
import useDebounce from "@/useDebounce";
import Post from "@/components/Post";

export interface IPost{
    _id: string,
    title: string,
    description: string,
    tags: Array<ITag>
}

export interface IPostRes{
    current_page : number,
    page_size : number,
    posts : Array<IPost>,
    total : number,
    total_page : number
}

const serializeQuery = (query: any) => {
    const queryString = Object.keys(query).filter(key => Array.isArray(query[key]) ? !!query[key].length : !!query[key])
        .map(key => {
            if (Array.isArray(query[key])) {
                return query[key]
                    .map((value: any) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join('&');
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
        }).join('&')
    return queryString;
}

const getPageNumbers = (currentPage?: number, totalPages?: number) => {

    if(!currentPage||!totalPages) return [];

    if(currentPage>totalPages) return [];

    if (totalPages <= 1) {
        return [1];
    }

    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
        if (i >= 2 && i <= totalPages - 1) {
            range.push(i);
        }
    }
    range.push(totalPages);

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
}

const Profile = () => {

    const {isLoggedIn, loading} = useAuth();

    const [searchText, setSeatchText] = useState('');
    // const [tagsSelected, setTagsSelected] = useState<Array<ITag>>([]);
    const [tags, setTags] = useState<Array<ITag>>([]);
    const [page, setPage] = useState(1);
    const [data, setData] = useState<IPostRes|null>(null)

    const navigate = useNavigate();
    const {logout} = useAuth();
    const debounce = useDebounce(searchText, 400);

    useEffect(() => {
        if(!isLoggedIn&&!loading) navigate('/signin')
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const query = serializeQuery({
                tags: tags.map((tag: ITag)=>tag.name),
                page: page,
                title: debounce
            });
            try{
                const response = await axiosConfig.get(`${process.env.REACT_APP_URL_BE||""}/posts?${query}`, {withCredentials: true})
                console.log(response)
                setData(response.data)
            }catch(error){
                logout();
                navigate('/signin')
            }
        }
        fetchData()
        // console.log(serializeQuery({
        //     tags: tags.map((tag: ITag)=>tag.name),
        //     page: page,
        //     title: debounce
        // }))
    }, [tags, page, debounce]);

    console.log(data)

    return (
        <div className='profile'>
            <div className="profile__left">
                <Link to={'/'}><img src={logo} alt="logo"/></Link>
                <div className="profile__navbar">
                    <p>Posts</p>
                    <p className='profile__logout' style={{cursor: 'pointer'}} onClick={()=>{
                        logout();
                        navigate('/signin')
                    }}>Logout</p>
                </div>
            </div>
            <div className="profile__right">
                <div className="profile__top">
                    {/*<button className="__button">Add new</button>*/}
                    <NewPost data={data} setData={setData}/>
                    <div className="profile__task">
                        <div className="profile__search-text">
                            <input type="text" placeholder='Title' value={searchText} onChange={(e)=>setSeatchText(e.target.value)}/>
                        </div>
                        <TagChose setTagsSelected={setTags} tagsSelected={tags} type={0}/>
                    </div>
                </div>
                <div className="profile__center">
                    {/*{JSON.stringify(data)}*/}
                    <div className="posts__list">
                        <div className="posts__item">
                            <div className="posts__item--first">ID</div>
                            <div className="posts__item--second">Title</div>
                            <div className="posts__item--third">Description</div>
                            <div className="posts__item--fourth">Tags</div>
                            <div className="posts__item--fifth">Actions</div>
                        </div>
                        {data?.posts.map((post: IPost, index)=>(
                            <Post post={post} index={index} key={post._id} setData={setData} data={data}/>
                        ))}
                    </div>
                </div>
                <div className="profile__bottom">
                    <div className="page__list">
                        {getPageNumbers(data?.current_page, data?.total_page).map((item: any)=>(
                            <Fragment key={item}>
                                {typeof item === 'number' ? (
                                    <div className='page__item' style={{backgroundColor: page===item?'lightskyblue':'inherit'}} onClick={()=>setPage(item)}>
                                        {item}
                                    </div>
                                ):(
                                    <>...</>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;