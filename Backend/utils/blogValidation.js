const validateBlog = ({ title, content }) => {
  if (!title || !content) {
    throw new Error("Title and Content are required");
  } else if (title.length < 5 || title.length > 100) {
    throw new Error("Title must be between 5 and 100 characters");
  } else if (content.length < 16 || content.length > 400) {
    throw new Error("Content must be between 16 and 400 characters");
  }

  return true;
};

export default validateBlog;
