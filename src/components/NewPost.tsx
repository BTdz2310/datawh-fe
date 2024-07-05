import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '@/assets/styles/Modal.css'
import TagsList, {ITag} from "@/components/TagsList";
import axiosConfig from "@/axiosConfig";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/components/DataProvider";
import {IPostRes} from "@/pages/Profile";

function NewPost({data, setData}: {data: IPostRes|null, setData: Function}) {
    const [show, setShow] = useState(false);

    const [tagsSelected, setTagsSelected] = useState<Array<ITag>>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();
    const {logout} = useAuth();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const clear = () => {
        setTitle('');
        setDescription('');
        setTagsSelected([]);
    }

    const handleSubmit = async () => {

        if(!title){
            alert('Bạn Chưa Nhập Title')
            return
        }

        if(!description){
            alert('Bạn Chưa Nhập Description')
            return
        }

        try{
            const response = await axiosConfig.post(`${process.env.REACT_APP_URL_BE||""}/posts`, JSON.stringify({
                title: title,
                description: description,
                tags: tagsSelected.map((tag: ITag)=>tag._id)
            }),{withCredentials: true})

            const dataAfter = [response.data.data, ...data?.posts.slice()||[]];

            setData({
                ...data,
                posts: dataAfter
            })

            clear()
            handleClose()
        }catch(error){
            logout()
            navigate('/signin')
        }
    }

    return (
        <>
            <button className='__button' onClick={handleShow}>
                Add new
            </button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <h2>Add New Post</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="new-post__group">
                        <div className="new-post__left">
                            <p>Title</p>
                        </div>
                        <div className="new-post__right">
                            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div className="new-post__group">
                        <div className="new-post__left">
                            <p>Description</p>
                        </div>
                        <div className="new-post__right">
                            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        </div>
                    </div>
                    <div className="new-post__group">
                        <div className="new-post__left">
                            <p>Tags</p>
                        </div>
                        <div className="new-post__right"><TagsList setTagsSelected={setTagsSelected} tagsSelected={tagsSelected} /></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='__button' style={{backgroundColor: 'rgb(108, 117, 125)'}} onClick={handleClose}>Close</button>
                    <button className='__button' onClick={handleSubmit}>Add</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewPost;