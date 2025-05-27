import React, {useEffect, useState} from 'react'
import './PlayVideo.css'
// import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
// import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
// import jack from '../../assets/jack.png'
// import user_profile from '../../assets/user_profile.jpg'
import { API_KEY,value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

    const {videoId} =  useParams();
    const [apiData, setApiData] = useState(null);
    const[channeldata, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState([])

    const fetchvideoData = async () => {
        const video_details_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(video_details_url).then(response => response.json()).then(data =>setApiData(data.items[0]))
    }

    const fetchChannelData = async () => {
        const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch (channel_url).then(response=>response.json()).then(data=>setChannelData(data.items[0]))

        const commentdata_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?maxResults=50&part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
        await fetch (commentdata_url).then(response=>response.json()).then(data=>setCommentData(data.items))
    }

    useEffect(() => {
        fetchvideoData();
    },[videoId])

    useEffect(() => {
        fetchChannelData();
    },[apiData])

    



  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):"100 views"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():"2 days ago"}</p>
            <div>
                <span><img src={like} alt="like" />{apiData?value_converter(apiData.statistics.likeCount):"125"}</span>
                {/* <span><img src={dislike} alt="dislike" />{apiData?value_converter(apiData.statistics.likeCount):"125"}</span> */}
                <span><img src={share} alt="share" />Share</span>
                <span><img src={save} alt="save" />Save</span>
            </div>
        </div>
        <hr/>
        <div className="publisher">
            <img src={channeldata?channeldata.snippet.thumbnails.default.url:""} alt="user profile" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:""}</p>
                <span>{channeldata?value_converter(channeldata.statistics.subscriberCount):"1m"}</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="vid-description">
            <p>{apiData?apiData.snippet.description:"viddescription"}</p>
            <hr/>
            <h4>{apiData?value_converter(apiData.statistics.commentCount):"130"} Comments</h4>
            {commentData.map((item,index)=>{
                return(
                    <div key = {index} className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                    <h3> {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                        {/* <img src={dislike} alt="" />
                        <span>25</span> */}
                    </div>
                </div>
            </div>
                )
            })}
            
            
        </div>
    </div>
  )
}

export default PlayVideo
