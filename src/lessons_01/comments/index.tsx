import {
  FC,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import avatar from "../images/avatar.jpg";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import classNames from "classnames";
import Child1 from "../child/index01";
import Child2 from "../child/index02";
import A from "./A";
interface User {
  // 假设用户对象有 id 和 name，根据实际情况调整
  uid: string;
  uname: string;
  avatar: string;
}

interface Comment {
  rpid: string; // 假设 rpid 是一个字符串类型的 UUID
  user: User; // 使用上面定义的 User 接口
  content: string; // 内容为字符串类型
  ctime: string; // 创建时间为字符串类型，格式为 "MM-DD HH: MM"
  like: number; // 喜欢的数量为数字类型
}
const user: User = {
  uid: "13258165",
  avatar: avatar,
  uname: "周杰伦",
};

const list: Comment[] = [
  {
    rpid: "3",
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
    rpid: "1",
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
    rpid: "2",
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

// learn context
const msg = "this is a message";
export const MsgContext = createContext<string | null>(null); // 创建 Context，并给定一个默认值
const Comments: FC = () => {
  const [commentList, setCommentList] = useState<Comment[]>(list);
  const [content, setContent] = useState("");
  const [type, setType] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const param: Comment = {
      rpid: uuidv4(),
      user,
      content,
      ctime: "11-13 11: 29",
      like: 0,
    };
    // 使用不可变更新数据
    const newList = [...commentList, param];
    setCommentList(newList);
    setContent("");
    // 2.聚焦 dom(useRef) - focus
    inputRef.current?.focus();
  };
  const handleClick = (name: string) => {
    console.log(name);
    setName(name);
  };

  const handleClickTab = (type: string) => {
    setType(type);

    // 复制原数组以避免直接修改状态
    let newList = [...commentList];
    if (type === "hot") {
      // 对副本进行排序
      newList.sort((a, b) => b.like - a.like);
    } else if (type === "time") {
      // 对副本进行排序
      newList.sort((a, b) => {
        const dateA = new Date(
          a.ctime.replace(
            /(\d{2})-(\d{2}) (\d{2}):(\d{2})/,
            "2024-$1-$2T$3:$4:00"
          )
        );
        const dateB = new Date(
          b.ctime.replace(
            /(\d{2})-(\d{2}) (\d{2}):(\d{2})/,
            "2024-$1-$2T$3:$4:00"
          )
        );
        return dateB.getTime() - dateA.getTime();
      });
    }

    // 使用排序后的新列表更新状态
    setCommentList(newList);
  };
  useEffect(() => {
    console.log("Comment list updated", commentList);
  }, [commentList]);
  return (
    <>
      <div className="app">
        <div className="reply-navigation">
          <ul className="nav-bar">
            <li className="nav-title">
              <span className="nav-title-text">评论</span>
              <span className="total-reply">{10}</span>
            </li>
            <li className="nav-sort">
              {tabs.map((item) => {
                return (
                  <span
                    key={item.type}
                    className={classNames("nav-item", {
                      active: type === item.type,
                    })}
                    onClick={() => handleClickTab(item.type)}
                  >
                    {item.type}
                  </span>
                );
              })}
            </li>
          </ul>
        </div>
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
      <Child1 name={name}>
        <span>哈哈哈有意思</span>
      </Child1>
      <Child2 onHandleClick={handleClick}></Child2>
      {/* contextDemo */}

      <MsgContext.Provider value={msg}>
        <div>
          <A></A>
        </div>
      </MsgContext.Provider>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default Comments;
