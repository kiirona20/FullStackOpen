const dummy = (blogs) => {
    return 1
}
  
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    let index = 0
    for(let i=0; i<blogs.length; i++){
        if (blogs[i].likes>blogs[index].likes){
            index=i
        }
    }
    return blogs[index];
}

  module.exports = {
    dummy, totalLikes, favoriteBlog
  }