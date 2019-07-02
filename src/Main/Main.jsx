import React, { Component } from "react";
import { Comment, Avatar, Upload, Icon } from "antd";
import moment from "moment";
import uuidv1 from "uuid/v1";
import _ from "underscore";

import "./styles/Main.css";
import { Editor } from "../Editor";
import { CommentList } from "../CommentList";
import { AppContext } from "../App/context";
import { MainContext } from "./context";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const contentObj = (
  id,
  author,
  avatar,
  content,
  datetime,
  time,
  isEdit,
  onLoading
) => ({
    id: id,
    author: author,
    avatar: avatar,
    content: content,
    datetime: datetime,
    isEdit: isEdit || false,
    time: time,
    onLoading: onLoading || false
  });


const storage = window.localStorage;
export class Main extends Component {
  static contextType = AppContext;
  state = {
    loading: false,
    comments: [],
    submitting: false,
    value: "",
    name: storage.getItem("name") ? storage.getItem("name") : "guest",
    imageUrl: storage.getItem("imageUrl")
      ? storage.getItem("imageUrl")
      : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  };


  componentDidMount() {
    if (storage.getItem("comments")) {
      let comment = JSON.parse(storage.getItem("comments"));
      comment.forEach(obj => {
        this.state.comments.push(
          contentObj(
            obj.id,
            obj.author,
            obj.avatar,
            obj.content,
            `${moment.duration(moment(obj.time) - moment().unix(), "seconds").humanize()} ago`,
            obj.time,
            false,
            true
          )
        );
      });
      this.setState({
        comments: this.state.comments
      });
      this.setCommentLoadingDone(3000);
    }
  }


  setCommentLoadingDone = (time) => 
    setTimeout(time => {
        this.state.comments.forEach(obj => {
          obj.onLoading = false;
        });
        this.setState({
          comments: this.state.comments
        });
      }, time||1000);


  handleSubmit = () => {
    const { onPeopleCountChange } = this.context;
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true
    });
    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          contentObj(
            uuidv1(),
            this.state.name||'guest',
            this.state.imageUrl,
            this.state.value,
            moment().fromNow(),
            moment().unix(),
            false,
            true
          ),
          ...this.state.comments
        ]
      });
      storage.setItem("comments", JSON.stringify(this.state.comments));
      onPeopleCountChange && onPeopleCountChange(this.state.comments);
      this.setCommentLoadingDone();
    }, 1000);
  };

  handleChange = ({target:{value}}) =>  this.setState({ value: value }) ;
  handleChangeName = ({target:{value}}) => ((storage.setItem("name", value)),( this.setState({ name: value })))
 
  handleChangeImg = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        storage.setItem("imageUrl", imageUrl);
        this.setState({
          imageUrl,
          loading: false
        });
      });
    }
  };

  handleDelete = id => {
    const { onPeopleCountChange } = this.context;
    let newArray = [];
    this.state.comments.forEach(obj => {
      obj.id !== id && newArray.push(obj);
    });
    this.setState({
      comments: newArray
    });
    storage.setItem("comments", JSON.stringify(newArray));

    onPeopleCountChange && onPeopleCountChange(newArray);
  };

  handleEdit = id => {
    this.state.comments.forEach(obj => {
      obj.isEdit = obj.id === id ? true : false;
    });
    this.setState({
      comments: this.state.comments
    });
  };

  handleSave = (id, editMsg) => {
    this.state.comments.every(obj => {
      if (obj.id === id) {
        obj.content = editMsg;
        obj.isEdit = false;
        obj.onLoading = true;
        return false
      }
    });
    this.setState({
      comments: this.state.comments
    });
    storage.setItem("comments", JSON.stringify(this.state.comments));
    this.setCommentLoadingDone();
  };

  render() {
    let { comments, submitting, value, name, imageUrl, loading} = this.state;
    return (
      <div className="Main">
        <Comment
          avatar={
            <Upload
              name="avatar"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5185415ba171ea3a00704eed"
              onChange={this.handleChangeImg}
            >
              {loading ? (
                <Icon type="loading" />
              ) : (
                <Avatar src={imageUrl} alt="Han Solo" />
              )}
            </Upload>
          }
          content={
            <Editor
              onChange={this.handleChange}
              onChangeName={this.handleChangeName}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
              name={name}
            />
          }
        />
        <MainContext.Provider
          value={{
            onEdit: this.handleEdit,
            onDelete: this.handleDelete,
            onSave: this.handleSave
          }}
        >
          {comments.length > 0 && <CommentList comments={comments} />}
        </MainContext.Provider>
      </div>
    );
  }
}
