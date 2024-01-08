import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      notificationCtx.showNotification({
        title: "Please wait",
        message: "Loading comments",
        status: "pending",
      });
      fetch(`/api/comment/${eventId}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.comments);
          setCommentList(data.comments);
          notificationCtx.hideNotification();
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    console.log("i am here");
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API

    notificationCtx.showNotification({
      title: "Adding comment",
      message: "Adding comment...",
      status: "pending",
    });

    fetch(`/api/comment/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Comment Added!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={commentList} />}
    </section>
  );
}

export default Comments;
