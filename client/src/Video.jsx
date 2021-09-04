const Video = (props) => {
    return (<>
        <div>
            <video id='video' width="1024" height="576" controls>
                <source src={props.video} type="video/mp4" />
            </video>
        </div>
    </>)
}

export default Video
