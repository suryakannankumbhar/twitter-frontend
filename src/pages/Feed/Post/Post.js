import { Avatar } from '@mui/material';
import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import './Post.css';
const Post = ({ p }) => {
    const { name, username, image, post, profileImage } = p;
    return (
        <div className='post'>
            <div className='post_avatar'>
                <Avatar src={profileImage} />
            </div>
            <div className='post_body'>
                <div className='post_header'>
                    <div className='post_headerText'>
                        <h3>
                            {name}{' '}
                            <span className='post_headerSpecial'>
                                <VerifiedIcon className='post_badge' /> @
                                {username}
                            </span>
                        </h3>
                    </div>
                    <div className='post_headerDescription'>
                        <p>{post}</p>
                    </div>

                    <img src={image} alt='' width='500' />
                    <div className='post_footer'>
                        <ChatBubbleOutlineIcon
                            className='post_footerIcon'
                            size='small'
                        />
                        <RepeatIcon className='post_footerIcon' size='small' />

                        <FavoriteBorderIcon
                            className='post_footerIcon'
                            size='small'
                        />
                        <PublishIcon className='post_footerIcon' size='small' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
