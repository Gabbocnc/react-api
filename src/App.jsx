import { useState, useEffect } from 'react'
import './App.css'

const initialBlog = [

  {
    name: '',
    status: '',
    image: '/img/0.jpg',
    content: '',
    tags: ''
  }


]



function App() {

  const [articles, setArticles] = useState(initialBlog)
  const [newArticle, setNewArticle] = useState({
    name: '',
    status: '',
    image: '',
    content: '',
    tags: ''
  })
  const [searchText, setSearchText] = useState('')
  const [filteredArticles, setFilteredArticles] = useState([])
  const [tagsSelected, setTagsSelected] = useState('')


  useEffect(() => {
    const filtered = articles.filter((article) => article.name && article.name.toLowerCase().includes(searchText.toLowerCase()))
    setFilteredArticles(filtered)
  }, [articles, searchText])


  function addArticle(e) {
    e.preventDefault()

    const newArticles = [
      newArticle,
      ...articles
    ]
    setArticles(newArticles)

    setNewArticle({
      name: '',
      status: '',
      image: '',
      content: '',
      tags: ''
    })
  }

  function handleTrashTaskClick(e) {
    e.preventDefault()

    const taskIndexToTrash = Number(e.target.getAttribute('data-index'))

    const newArticles = articles.filter((article, index) => index != taskIndexToTrash)

    setArticles(newArticles)
  }

  function handleSearchForm(e) {
    e.preventDefault()

  }

  function hadleSelectedTags(e) {
    setTagsSelected(e.target.value)
  }





  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <h1>My Blog</h1>

        <form>
          <div className="mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* New Blog*/}
      <form onSubmit={addArticle}>
        <div className="mb-3">
          <label htmlFor="task" className="form-label">
            Blog
          </label>

          <div className="input-group mb-3">
            {/* BLOG NAME */}
            <input
              type="text"
              className="form-control"
              placeholder="Blog Name"
              value={newArticle.name}
              onChange={(e) =>
                setNewArticle({ ...newArticle, name: e.target.value })
              }
            />
            {/* BLOG CONTENT */}
            <input
              type="text"
              className="form-control"
              placeholder="Blog Content"
              value={newArticle.content}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
            />
            {/* BLOG IMG */}
            <input
              type="file"
              className="form-control"
              placeholder="Choose your image"
              accept='image/*'
              onChange={(e) => {
                const fileImg = e.target.files[0];
                const imageUrl = fileImg ? URL.createObjectURL(fileImg) : '/img/0.jpg';
                setNewArticle({ ...newArticle, image: imageUrl });
              }}
            />
            {/* BLOG TAGS */}
            <div class="input-group input-group-sm mb-3">
              <select
                className="form-select"
                value={tagsSelected}
                onChange={hadleSelectedTags}
              >
                <option value="" disabled>Choose a Tags</option>
                <option>HTML</option>
                <option>CSS</option>
                <option>JS</option>
                <option>Node Express</option>
              </select>
            </div>
            {/* BLOG STATUS */}
            <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
              <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" />
              <label class="btn btn-outline-primary" for="btncheck1">Checkbox 1</label>

              <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" />
              <label class="btn btn-outline-primary" for="btncheck2">Checkbox 2</label>

              <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" />
              <label class="btn btn-outline-primary" for="btncheck3">Checkbox 3</label>
            </div>


            <button className="btn btn-outline-secondary" type="submit">
              Add Blog
            </button>
          </div>

        </div>
      </form>

      {/* Blog List */}
      <ul className="list-group">
        {filteredArticles.map((article, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5><strong>Title :</strong> {article.name}</h5>
              <p><strong>Content :</strong> {article.content}</p>
              <p className="text-muted">{article.tags}</p>
              <p><strong>Tags: </strong>{tagsSelected}</p>
              <img src={article.image} alt="Blog" style={{ width: "100px" }} />
            </div>
            <button
              onClick={handleTrashTaskClick}
              data-index={index}
              className="btn btn-danger"
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
