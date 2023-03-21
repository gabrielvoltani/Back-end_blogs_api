// const { serviceBlogPost } = require('../services/index');

// const generateListId = async (getAll) => {
//   const listIdAll = getAll.message.map((category) => category.id);

//   return listIdAll;
// };

// const postIdValidate = async (arrayOfIdsForValidate, allPosts) => {
//   const listIdAllPosts = await generateListId(allPosts);

//   for (let i = 0; i < arrayOfIdsForValidate.length; i += 1) {
//     if (!listIdAllPosts.includes(arrayOfIdsForValidate[i])) {
//       return { type: 404, message: { message: 'Post does not exist' } };
//     }
//   }
//   return false;
// };

// module.exports = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const listAllPosts = await serviceBlogPost.getAllposts();
//     const errorId = await postIdValidate([Number(id)], listAllPosts);

//     if (errorId) return res.status(errorId.type).json(errorId.message);
//   } catch (error) {
//     return res.status(401).json({ message: error.message });
//   }
//   return next();
// };
