import { FC, useRef, useState } from "react";
import avatar from "../images/avatar.jpg";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const user = {
  uid: "13258165",
  avatar: avatar,
  uname: "周杰伦",
};

const list = [
  {
    rpid: '3',
    user: {
      uid: "13258165",
      avatar: "http://toutiao.itheima.net/resources/images/98.jpg",
      uname: "周杰伦",
    },
    content: "哎哟，不错哦",
    ctime: "10-18 08: 15",
    like: 126,
  },
  {
    rpid: '1',
    user: {
      uid: "30009257",
      avatar: avatar,
      uname: "黑马前端",
    },
    content: "学前端就来黑马",
    ctime: "10-19 09: 00",
    like: 66,
  },
  {
    rpid: '2',
    user: {
      uid: "36080105",
      avatar: "http://toutiao.itheima.net/resources/images/98.jpg",
      uname: "许嵩",
    },
    content: "我寻你千百度 日出到迟暮",
    ctime: "11-13 11: 29",
    like: 88,
  },
];

const tabs = [
  { type: "hot", text: "最热" },
  { type: "time", text: "最新" },
];
const Comments: FC = () => {
  const [commentList, setCommentList] = useState(list);
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  
  const handleSubmit = () => {
    const param = {
      rpid: uuidv4(),
      user,
      content,
      ctime: "11-13 11: 29",
      like: 0,
    };
    // 使用不可变更新数据
    const newList = [...commentList, param];
    setCommentList(newList);
  };
  return (
    <>
      <div className="app">
        <div className="reply-navigation"></div>
        <div className="reply-wrap">
          <div className="box-normal">
            <div className="reply-box-avatar">
              <div className="bili-avatar">
                <img className="bili-avatar-img" src={avatar} alt="用户头像" />
              </div>
            </div>
            <div className="reply-box-wrap">
              <textarea
                className="reply-box-textarea"
                placeholder="发一条友善的评论"
                ref={inputRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="reply-box-send">
                <div className="send-text" onClick={handleSubmit}>
                  发布
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reply-list">
          {commentList.map((item) => (
            <div key={item.rpid} className="reply-item">
              <div className="root-reply-avatar">
                <div className="bili-avatar">
                  <img
                    alt=""
                    src={item.user.avatar}
                    className="bili-avatar-img"
                  />
                </div>
              </div>
              <div className="content-wrap">
                <div className="user-info">
                  <div className="user-name">{item.user.uname}</div>
                </div>
                <div className="root-reply">
                  <span className="reply-content">{item.content}</span>
                </div>
                <div className="reply-info">
                  <span className="reply-time">{item.ctime}</span>
                  <span className="reply-time">点赞数:{item.like}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
