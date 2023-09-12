import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './TweetBox.css';
import { Avatar, Button } from '@mui/material';
import axios from 'axios';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const TweetBox = () => {
    const [post, setPost] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [loggedInUser] = useLoggedInUser();
    const [user] = useAuthState(auth);
    const email = user?.email;
    const userProfilePic = loggedInUser[0]?.profileImage
        ? loggedInUser[0]?.profileImage
        : 'http://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

    const handleImageUpload = e => {
        setIsLoading(true);
        const image = e.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.set('image', image);
        axios
            .post(
                'https://api.imgbb.com/1/upload?key=019c87c262426b59cdd2c4713e823c4b',
                formData
            )
            .then(res => {
                setImageURL(res.data.data.display_url);
                console.log(res.data.data.display_url);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
                setIsLoading(false);
            });
    };

    const handleTweet = e => {
        e.preventDefault();

        if (user.providerData[0].providerId === 'password') {
            fetch(
                `https://twitterclone-backend-h2ft.onrender.com/loggedInUser?email=${email}`
            )
                .then(res => res.json())
                .then(data => {
                    setName(data[0]?.name);
                    setUsername(data[0].username);
                });
        } else {
            setName(user?.displayName);
            setUsername(email?.split('@')[0]);
        }
        if (name) {
            const userPost = {
                profileImage: userProfilePic,
                post: post,
                image: imageURL,
                username: username,
                name: name,
                email: email,
            };
            setPost('');
            setImageURL('');
            fetch(`https://twitterclone-backend-h2ft.onrender.com/post`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userPost),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('User Data from DB => ', data);
                });
        }
    };
    return (
        <div className='tweetBox'>
            <form onSubmit={handleTweet}>
                <div className='tweetBox_input'>
                    <Avatar src={userProfilePic} />
                    <input
                        type='text'
                        placeholder="What's happening?"
                        onChange={e => setPost(e.target.value)}
                        value={post}
                        required
                    />
                </div>
                <div className='imageIcon_tweetButton'>
                    <label htmlFor='image' className='imageIcon'>
                        {isLoading ? (
                            <p>Uploading Image...</p>
                        ) : (
                            <p>
                                {imageURL ? (
                                    'Image Uploaded'
                                ) : (
                                    <AddPhotoAlternateIcon />
                                )}
                            </p>
                        )}
                    </label>
                    <input
                        type='file'
                        id='image'
                        className='imageInput'
                        onChange={handleImageUpload}
                    />
                    <Button className='tweetBox_tweetButton' type='submit'>
                        Tweet
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TweetBox;
