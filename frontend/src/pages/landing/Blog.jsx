import { useEffect, useState } from "react"
import axios from "axios"
import PostCard from "../../components/PostCard"

const Blog = () => {
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        const foo = async () => {
            const res = await axios.get("https://api.slingacademy.com/v1/sample-data/photos");
            setPosts(res.data.photos);
            console.log(res.data)
        }
        foo()
    }, [])

    return (
        <div className="w-full h-full">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-3">
                {posts &&
                    posts.map((post) => (
                        <PostCard key={post?.id} image={post.url} title={post?.title} body={post?.description} />
                    ))}
            </div>
        </div>
    )
}

export default Blog