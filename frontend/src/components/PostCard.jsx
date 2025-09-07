const PostCard = ({ title, body, image }) => (
    <div
        className="bg-gradient-to-r from-blue-500 to-blue-800 p-3 rounded-xl shadow-md hover:shadow-lg transition"
    >

        <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-md mb-4"
             />
        <h2 className="font-semibold text-lg mb-2 text-emerald-950">
            {title}
        </h2>
        <p className="text-white text-sm">{body}</p>
    </div>
)
export default PostCard;