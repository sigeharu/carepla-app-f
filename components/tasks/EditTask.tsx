export const EditTask = () => {
  return (
    <div>
      <form>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="新規けあプラ"
          type="text"
          value={''}
        />
        <button className="disabled:opacity-40 my-3 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded">
          新規作成
        </button>
      </form>
    </div>
  )
}
