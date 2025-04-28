import React, { useState } from "react";
import { Modal, Input, Button as AntButton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { commentSelector, userSelector } from "../Store/Selectors";
import { addComment, setModalOpen } from "../Features/CommentSlice";
import axios from "axios";
import { backendUrl } from "../Store/Constants";
import { IoSendSharp } from "react-icons/io5";

const CommentModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, commentsByBlogId, currentBlogId } = useSelector(commentSelector);
  const { token } = useSelector(userSelector);
  const [value, setValue] = useState("");

  const comments = commentsByBlogId[currentBlogId] || [];

  const handleAddComment = async () => {
    if (!value.trim()) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/comment/add`,
        {
          parentId: currentBlogId,
          comment: value,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        dispatch(
          addComment({
            ...response.data.data,
            parentId: currentBlogId,
          })
        );
        setValue("");
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Modal
      title="Comments"
      open={modalOpen}
      footer={null}
      onCancel={() => dispatch(setModalOpen(false))}>
      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto mb-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="border rounded-xl border-gray-200 p-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-blue-400">
                  @{comment.authorName.split(" ").join("_")}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="font-semibold roboto-regular">{comment.comment}</p>
            </div>
          ))
        )}
        <label
          htmlFor="addcomment"
          className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 mt-4 mb-2">
          <input
            id="addcomment"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddComment();
                setValue("");
              }
            }}
            className="w-full outline-none border-none"
            placeholder="Write a comment..."
          />
          <button
            className="hover:text-blue-700"
            onClick={handleAddComment}>
            <IoSendSharp />
          </button>
        </label>
      </div>
    </Modal>
  );
};

export default CommentModal;
