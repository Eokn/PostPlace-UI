import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import { useSelector } from 'react-redux';
import { selectProfile } from '../../features/auth/authSlice';

const Likes = ({item, noText}) => {

        const profile = useSelector(selectProfile)

    if (noText) {
      return item.likes.find(like => like === (profile?.result?.googleId || profile?.result?._id)) ? (
        <> <ThumbUpAltIcon fontSize='small' /></>
      ) : ( 
        <> <ThumbUpAltOutlined fontSize='small' /></>
       )
    }

    if (item.likes.length > 0) {
      return item.likes.find((like) => like === (profile?.result?.googleId || profile?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{item.likes.length > 2 ? `You and ${item.likes.length - 1} others` : `${item.likes.length} like${item.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{item.likes.length} {item.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
};

export default Likes
